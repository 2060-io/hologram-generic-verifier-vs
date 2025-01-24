"use client";

import { getQR } from "@/app/lib/actions";
import { QRRequestState } from "@/app/lib/definitions";
import { useEffect, useState } from "react";
import { useSocket } from "@/app//hook/useSocket";
import { QRCodeSVG } from "qrcode.react";
import { useTranslations } from "next-intl";
import Error from "./error";
import Loading from "./loading";
import Presentation from "./presentation";

export default function Home() {
  const t = useTranslations();
  const { presentationEventMessage, socketConnectionId } = useSocket();
  const [requestQRState, setRequestQRState] = useState<QRRequestState>({
    loading: true,
  });

  useEffect(() => {
    const makeGetQRRequest = async () => {
      const response = await getQR(socketConnectionId!);
      if (response.ok && response.shortUrl) {
        setRequestQRState({
          loading: false,
          shortUrl: response.shortUrl,
        });
      } else {
        setRequestQRState({
          loading: false,
          error: response.error ?? "An error occurred",
        });
      }
    };
    if (socketConnectionId) makeGetQRRequest();
  }, [socketConnectionId]);

  if (requestQRState.loading) {
    return <Loading />;
  }
  if (requestQRState.error) {
    return <Error />;
  }
  if (presentationEventMessage) {
    return <Presentation presentationEventMessage={presentationEventMessage} />;
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
          value={requestQRState?.shortUrl ?? ""}
          size={256}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"H"}
        />
      </div>
    </>
  );
}
