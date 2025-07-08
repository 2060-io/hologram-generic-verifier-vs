/* eslint-disable @typescript-eslint/no-require-imports */
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

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
    console.error(
      "Missing VS_AGENT_ADMIN_BASE_URL environment variable"
    );
    process.exit(1);
  }

  // Now attempt to get the credential definition id, either from the environment variable or the specified
  // issuer (provided it does have a VS Agent accessible by us)
  let credentialDefinitionId = process.env.CREDENTIAL_DEFINITION_ID

  if (!credentialDefinitionId) {

    const issuerVsAgentAdminBaseUrl = process.env.ISSUER_VS_AGENT_ADMIN_BASE_URL

    if (!issuerVsAgentAdminBaseUrl) {
      console.error(
        "You must define a CREDENTIAL_DEFINITION_ID, or ISSUER_VS_AGENT_ADMIN_BASE_URL to get the credential definition to request"
      );
      process.exit(1);
    }

    const url = `${issuerVsAgentAdminBaseUrl}/v1/credential-types`;
    const response = await fetch(url, {
      headers: {
        "accept": "application/json",
        },
        method: "GET",
      });
    const result = await response.json();

    const firstCredDefId = result[0]?.id
    if (!firstCredDefId) throw Error('VS Agent response does not contain any valid credential type')
    credentialDefinitionId = firstCredDefId
  }


  console.log(`Credential Definition ID: ${credentialDefinitionId}`)

  const PORT = process.env.NEXT_PUBLIC_PORT
    ? Number(process.env.NEXT_PUBLIC_PORT)
    : 3000;

  const PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}`
    : `http://localhost:${PORT}`;

  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log("A client connected info is:", socket.id);
    let message = {};
    socket.on("generateQR", async (data) => {
      try {
        const url = `${process.env.VS_AGENT_ADMIN_BASE_URL}/v1/invitation/presentation-request`;
        const requestBody = {
          callbackUrl: `${PUBLIC_BASE_URL}/api/presentation`,
          ref: data.socketConnectionId,
          requestedCredentials: [
            { 
              credentialDefinitionId
            },
          ],
        };
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(requestBody),
        });
        const result = await response.json();
        if (!result.shortUrl) throw Error('Result from VS Agent does not contain any short URL')
        message = {
          ok: true,
          invitationUrl: `https://hologram.zone/?_url=${Buffer.from(result.shortUrl).toString('base64url')}`,
        };
      } catch (error) {
        console.error(error);
        message = {
          ok: false,
          error: `${error}`,
        };
      } finally {
        io.to(data.socketConnectionId).emit("generateQREventMessage", {
          ...message,
        });
      }
    });
    socket.on("presentationEvent", (data) => {
      console.log("socket presentationEvent:", data);

      // Attach issuer invitation URL in case the user does not have any compatible credential
      if (data.status === "no-compatible-credentials") {
        data.issuerInvitationUrl = getIssuerInvitationUrl()
      }
      io.to(data.ref).emit("presentationEventMessage", data);
    });

    socket.on("error", (error) => {
      console.log("A server error has occurred", error);
    });

    socket.on("disconnect", () => {
      console.log("A client disconnected");
    });
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on ${PUBLIC_BASE_URL}`);
  });
});
