import Image from "next/image";
import { useTranslations } from "next-intl";
import { Claim, PresentationEventMessage } from "@/app/lib/definitions";

function Card({ claims }: { claims: Claim[] }) {
  const t = useTranslations();
  return (
    <div className="max-w-4xl rounded overflow-hidden shadow-2xl m-4 flex bg-white dark:bg-black p-8">
      <div className="w-1/3">
        <Image
          className="w-full h-full object-cover"
          src={"https://a.chatbot-demo.dev.2060.io/v1/qr"}
          alt="Card Image"
          width={400}
          height={400}
        />
      </div>
      <div className="w-2/3 px-6 max-h-64 overflow-y-auto">
        <p className="font-bold text-xl mb-2">{t("claims")}</p>
        <div className="grid grid-cols-2 gap-4">
          {claims.map((item) => (
            <div key={item.key} className="flex py-1">
              <span className="font-semibold text-sm">{item.key}:</span>
              <span className="font-normal text-sm">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
type Props = {
  presentationEventMessage: PresentationEventMessage;
};

export default function Presentation({ presentationEventMessage }: Props) {
  const t = useTranslations();
  const { claims, status } = presentationEventMessage;
  if (status === "refused") {
    return <p>ha rechazado tu solicitud</p>;
  }
  if (claims) {
    return (
      <>
        <span className="text-hologram-color text-2xl md:text-5xl lg:text-5xl font-semibold">
          {t("details")}
        </span>
        <div className="container mx-auto px-4 flex justify-center">
          <div className="flex flex-wrap justify-center -mx-4">
            <Card claims={claims} />
          </div>
        </div>
      </>
    );
  }
}
