import { io } from "socket.io-client";

const socketIo = io("http://localhost:3000", { transports: ["polling"] });

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
