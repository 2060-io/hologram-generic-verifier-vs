import { io } from "socket.io-client";

const socketIo = io(process.env.NEXT_PUBLIC_BASE_URL, {
  transports: ["polling"],
});

export async function POST(req: Request) {
  try {
    const data = await req.json();
    if (!socketIo.connected) {
      socketIo.connect();
    }
    socketIo.emit("presentationEvent", data);
    return new Response(JSON.stringify({ message: data }));
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
