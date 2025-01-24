import { io } from "socket.io-client";
import { PUBLIC_BASE_URL } from "@/app/lib/constants";

const socketIo = io(PUBLIC_BASE_URL, { transports: ["polling"] });

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
