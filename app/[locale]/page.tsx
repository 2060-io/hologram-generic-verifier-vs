"use client";
import { useSocket } from "@/app//hook/useSocket";
import { QRCodeSVG } from "qrcode.react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import Error from "./error";
import Loading from "./loading";
import Presentation from "./presentation";

export default function Home() {
  const t = useTranslations();
  const { presentationEventMessage, requestQRState } = useSocket();

  useEffect(() => {
    if (
      requestQRState.invitationUrl &&
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    ) {
      window.location.href = requestQRState.invitationUrl;
    }
  }, [requestQRState.invitationUrl]);

  if (requestQRState.loading) {
    return <Loading />;
  }
  if (requestQRState.error) {
    return <Error error={requestQRState.error} />;
  }
  if (presentationEventMessage) {
    return <Presentation presentationEventMessage={presentationEventMessage} />;
  }
  return (
    <>
      <div>
        <p className="md:mb-2 lg:mb-3 ">
          <span className="text-hologram-color text-xl md:text-xl lg:text-2xl font-semibold text-center">
            {t("title")}
          </span>
        </p>
      </div>
      <div className="w-[300px] h-[300px] flex justify-center items-center mb-6 bg-white border-solid border-2 rounded-2xl border-gray-300">
        <QRCodeSVG
          value={requestQRState.invitationUrl ?? ""}
          size={256}
          bgColor={"#ffffff"}
          fgColor={"#000000"}
          level={"H"}
        />
      </div>
    </>
  );
}
