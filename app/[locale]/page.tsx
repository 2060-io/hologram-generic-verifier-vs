"use client";

import { getQR } from "../lib/actions";
import { useEffect, useState } from "react";
import { useSocket } from "../hook/useSocket";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  const { isConnected, eventMessage, emitEvent } = useSocket();
  console.log("eventMessage", eventMessage);
  const [inputMessage, setInputMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      emitEvent(inputMessage);
      setInputMessage("");
    }
  };
  useEffect(() => {
    const makeGetRequest = async () => {
      const response = await getQR();
      console.log("response", response);
    };
    makeGetRequest();
  }, []);
  /*
  const qr = await getQR();
  const response = await qr.json();
  if (response.error) {
    return <Error />;
  }
    */
  return (
    <>
      <div>
        <p className="md:mb-2 lg:mb-3 ">
          <span className="text-hologram-color text-2xl md:text-5xl lg:text-5xl font-semibold text-center">
            {t("title")}
          </span>
        </p>
      </div>
      <Image
        src="https://a.chatbot-demo.dev.2060.io/v1/qr"
        width={400}
        height={400}
        alt="QR demo presentation"
      />
      <Link href={`/presentation`}>
        <p className="hidden md:block">ir a detalles</p>
      </Link>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="flex-grow mr-2 p-2 border border-gray-300 rounded"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={!isConnected}
        >
          Send
        </button>
      </form>
    </>
  );
}
