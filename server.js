/* eslint-disable @typescript-eslint/no-require-imports */
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const SERVICE_AGENT_ADMIN_BASE_URL =
  process.env.SERVICE_AGENT_ADMIN_BASE_URL ||
  "https://a.chatbot-demo.dev.2060.io";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
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
        // Get credential types
        const credResponse = await fetch(`${SERVICE_AGENT_ADMIN_BASE_URL}/v1/credential-types`, {
          method: 'GET',
          headers: { accept: 'application/json', 'Content-Type': 'application/json' },
        })
        const credentialTypes = await credResponse.json();
        if (credentialTypes.length === 0) {
          console.log('No credential types have been found')
        }
        const credentialDefinitionId = credentialTypes[0].id
        const url = `${SERVICE_AGENT_ADMIN_BASE_URL}/v1/invitation/presentation-request`;
        const requestBody = {
          callbackUrl: `${PUBLIC_BASE_URL}/api/presentation`,
          ref: data.socketConnectionId,
          requestedCredentials: [
            { credentialDefinitionId },
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
        message = {
          ok: true,
          shortUrl: result?.shortUrl,
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
