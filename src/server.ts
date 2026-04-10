import { createServer } from 'http'
import { fileURLToPath, parse } from 'url'
import next from 'next'
import { Server } from 'socket.io'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev, dir: path.resolve(__dirname, '..') })
const handle = app.getRequestHandler()

function getIssuerInvitationUrl() {
  const issuerDid = process.env.ISSUER_DID

  if (!issuerDid) return
  const json = {
    '@type': 'https://didcomm.org/out-of-band/1.1/invitation',
    '@id': issuerDid,
    label: process.env.ISSUER_LABEL ?? 'Issuer',
    imageUrl: process.env.ISSUER_IMAGE_URL,
    services: [issuerDid],
    handshake_protocols: ['https://didcomm.org/didexchange/1.0'],
  }
  const jsonBase64 = Buffer.from(JSON.stringify(json)).toString('base64url')

  return `https://hologram.zone/?oob=${jsonBase64}`
}

app.prepare().then(async () => {
  if (!process.env.VS_AGENT_ADMIN_BASE_URL) {
    console.error('Missing VS_AGENT_ADMIN_BASE_URL environment variable')
    process.exit(1)
  }

  let credentialDefinitionId: string | undefined
  let jsonSchemaCredentialId: string | undefined

  if (process.env.JSON_SCHEMA_CREDENTIAL_ID) {
    jsonSchemaCredentialId = process.env.JSON_SCHEMA_CREDENTIAL_ID
    console.log(`JSON Schema Credential ID: ${jsonSchemaCredentialId}`)
  } else if (process.env.ISSUER_DID?.startsWith('did:webvh:')) {
    const parts = process.env.ISSUER_DID.split(':')
    const domain = parts.slice(3).join('/')
    const resourcesUrl = `https://${domain}/resources/?resourceType=anonCredsCredDef`
    try {
      const response = await fetch(resourcesUrl, {
        headers: { accept: 'application/json' },
        method: 'GET',
      })
      const result = await response.json()
      const firstCredDefId = result[0]?.id
      if (!firstCredDefId) {
        console.error('Issuer DID resources do not contain any anonCredsCredDef resource')
        process.exit(1)
      }
      credentialDefinitionId = firstCredDefId
      console.log(`Credential Definition ID (from issuer DID): ${credentialDefinitionId}`)
    } catch (error) {
      console.error('Error fetching anonCredsCredDef resources from issuer DID:', error)
      process.exit(1)
    }
  } else {
    console.error(
      'You must define JSON_SCHEMA_CREDENTIAL_ID or ISSUER_DID (did:webvh) to determine the credential to request',
    )
    process.exit(1)
  }

  const PORT = process.env.NEXT_PUBLIC_PORT ? Number(process.env.NEXT_PUBLIC_PORT) : 3000

  const PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}`
    : `http://localhost:${PORT}`

  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url ?? '/', true)
    if (parsedUrl.pathname === '/health') {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ status: 'ok' }))
      return
    }
    handle(req, res, parsedUrl)
  })

  const io = new Server(server, { cors: { origin: '*' } })

  io.on('connection', socket => {
    console.log('A client connected info is:', socket.id)
    let message = {}
    socket.on('generateQR', async data => {
      try {
        const url = `${process.env.VS_AGENT_ADMIN_BASE_URL}/v1/invitation/presentation-request`
        const requestBody = {
          callbackUrl: `${PUBLIC_BASE_URL}/api/presentation`,
          ref: data.socketConnectionId,
          requestedCredentials: [
            jsonSchemaCredentialId ? { jsonSchemaCredentialId } : { credentialDefinitionId },
          ],
        }
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(requestBody),
        })
        const result = await response.json()
        if (!result.shortUrl) throw Error('Result from VS Agent does not contain any short URL')
        message = {
          ok: true,
          invitationUrl: `https://hologram.zone/?_url=${Buffer.from(result.shortUrl).toString('base64url')}`,
        }
      } catch (error) {
        console.error(error)
        message = {
          ok: false,
          error: `${error}`,
        }
        process.exit(1)
      } finally {
        io.to(data.socketConnectionId).emit('generateQREventMessage', {
          ...message,
        })
      }
    })
    socket.on('presentationEvent', data => {
      console.log('socket presentationEvent:', data)

      // Attach issuer invitation URL in case the user does not have any compatible credential
      if (data.status === 'no-compatible-credentials') {
        data.issuerInvitationUrl = getIssuerInvitationUrl()
      }
      io.to(data.ref).emit('presentationEventMessage', data)
    })

    socket.on('error', error => {
      console.log('A server error has occurred', error)
    })

    socket.on('disconnect', () => {
      console.log('A client disconnected')
    })
  })

  server.listen(PORT, () => {
    console.log(`> Ready on ${PUBLIC_BASE_URL}`)
  })
  server.on('error', err => {
    console.error('Server error:', err)
    process.exit(1)
  })
})
