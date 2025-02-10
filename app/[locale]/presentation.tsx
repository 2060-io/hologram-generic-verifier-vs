import { useTranslations } from "next-intl";
import { PresentationEventMessage } from "@/app/lib/definitions";
import PresentationClaims from "./presentation-claims";

type Props = {
  presentationEventMessage: PresentationEventMessage;
};

export default function Presentation({ presentationEventMessage }: Props) {
  const t = useTranslations();
  const { claims, status } = presentationEventMessage;
  if (status === "refused") {
    return (
      <p className="font-bold text-xl">
        <span>{t("requestRefused")}</span>
      </p>
    );
  }
  if (status === "connected") {
    return (
      <div>
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 border-4 border-t-hologram-color border-r-transparent border-b-hologram-color border-l-transparent rounded-full animate-spin" />
        </div>
        <p className="font-bold text-xl">
          <span>{t("requestConnected")}</span>
        </p>
      </div>
    );
  }
  if (claims) {
    return (
      <div className="w-full md:w-3/6 flex flex-col items-center rounded-xl bg-gray-50 p-4">
        <p className="font-bold text-3xl text-hologram-color">{t("claims")}</p>
        <div className="container mx-auto px-4 flex justify-center">
          <PresentationClaims claims={claims} />
        </div>
      </div>
    );
  }
}
