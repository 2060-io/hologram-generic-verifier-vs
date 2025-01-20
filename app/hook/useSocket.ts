import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { transformClaimsData } from "../utils";
import {
  OriginalPresentationEventMessage,
  PresentationEventMessage,
} from "@/app/lib/definitions";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [presentationEventMessage, setPresentationEventMessage] =
    useState<PresentationEventMessage>();

  useEffect(() => {
    const socketIo = io();

    socketIo.on("connect", () => {
      setIsConnected(true);
    });

    socketIo.on("disconnect", () => {
      setIsConnected(false);
    });

    socketIo.on(
      "presentationEventMessage",
      (msg: OriginalPresentationEventMessage) => {
        console.log("presentationEventMessage has arrived", msg);
        if (msg.status === "ok" && msg.claims) {
          const transformedClaims = transformClaimsData(msg.claims);
          setPresentationEventMessage({ ...msg, claims: transformedClaims });
        } else {
          const { ref, status, proofExchangeId } = msg;
          setPresentationEventMessage({ ref, status, proofExchangeId });
        }
      },
    );

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return {
    isConnected,
    presentationEventMessage,
    socketConnectionId: socket?.id,
  };
};
