"use client";

import { getQR } from "../lib/actions";
import { useEffect, useState } from "react";
import { useSocket } from "../hook/useSocket";
import { QRCodeSVG } from "qrcode.react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Error from "./error";
import Loading from "./loading";

type RequestState = {
  loading: boolean;
  error: string | null;
  data: string | null;
};

export default function Home() {
  const t = useTranslations();
  const { isConnected, eventMessage, emitEvent } = useSocket();
  console.log('eventMessage', eventMessage);
  const [inputMessage, setInputMessage] = useState("");
  const [requestState, setRequestState] = useState<RequestState>({
    loading: true,
    error: null,
    data: null,
  });

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
      if (response?.ok) {
        setRequestState({ loading: false, error: null, data: "data here" });
      } else {
        setRequestState({
          loading: false,
          error: 'error',
          data: null,
        });
      }
      console.log("response", response);
    };
    makeGetRequest();
  }, []);

  if (requestState.loading) {
    return <Loading />;
  }
  if (requestState.error) {
    return <Error />;
  }
  return (
    <>
      <div>
        <p className="md:mb-2 lg:mb-3 ">
          <span className="text-hologram-color text-2xl md:text-5xl lg:text-5xl font-semibold text-center">
            {t("title")}
          </span>
        </p>
      </div>
      <div className="w-[300px] h-[300px] flex justify-center items-center mb-6 bg-white border-solid border-2 rounded-2xl border-gray-300">
        <QRCodeSVG
          value={
            "https://chatbot-demo.dev.2060.io/s?id=c1477ca7-7c7f-4eed-99b3-e001a92b1ab8"
          }
          size={256}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"H"}
        />
      </div>
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
