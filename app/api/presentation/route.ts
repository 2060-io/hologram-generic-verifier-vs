import { io } from "socket.io-client";

const SERVER_URL = process.env.PUBLIC_BASE_URL || "http://localhost:3000";

const socketIo = io(SERVER_URL, { transports: ["polling"] });

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!socketIo.connected) {
      socketIo.connect();
    }
    socketIo.emit("presentationEvent", data);
    return new Response(JSON.stringify({ message: "Hello World" }));
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
