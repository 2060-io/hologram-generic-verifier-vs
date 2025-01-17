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
      <p className="text-red-600 font-bold text-xl bg-red-100 p-4 rounded-md shadow-md flex items-center space-x-2">
        <span>{t("requestRefused")}</span>
        <span>😢</span>
      </p>
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
