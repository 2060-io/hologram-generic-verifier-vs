import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [eventMessage, setEventMessage] = useState<string[]>([]);

  useEffect(() => {
    const socketIo = io();

    socketIo.on("connect", () => {
      setIsConnected(true);
    });

    socketIo.on("disconnect", () => {
      setIsConnected(false);
    });

    socketIo.on("demo event", (msg: string) => {
      setEventMessage((prevEventMessage) => [...prevEventMessage, msg]);
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  const emitEvent = (message: string) => {
    if (socket) {
      socket.emit("demo event", message);
    }
  };

  return { isConnected, eventMessage, emitEvent };
};
