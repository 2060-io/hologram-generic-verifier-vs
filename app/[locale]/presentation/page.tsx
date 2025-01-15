import Image from "next/image";
import { useTranslations } from "next-intl";

const data = [
  { key: "Nombre", value: "Daniel Fernando Rico Leon" },
  { key: "Edad", value: "25" },
  { key: "Nombre", value: "Daniel Fernando Rico Leon" },
  { key: "Edad", value: "25" },
  { key: "Nombre", value: "Daniel Fernando Rico Leon" },
  { key: "Edad", value: "25" },
  { key: "Nombre", value: "Daniel Fernando Rico Leon" },
  { key: "Edad", value: "25" },
  { key: "Nombre", value: "Daniel Fernando Rico Leon" },
  { key: "Edad", value: "25" },
  // Agrega más pares llave-valor según sea necesario
];

function Card({
  imageSrc,
  data,
}: {
  imageSrc: string;
  data: { key: string; value: string }[];
}) {
  return (
    <div className="max-w-4xl rounded overflow-hidden shadow-2xl m-4 flex bg-white dark:bg-black p-8">
      <div className="w-1/3">
        <Image
          className="w-full h-full object-cover"
          src={imageSrc}
          alt="Card Image"
          width={400}
          height={400}
        />
      </div>
      <div className="w-2/3 px-6 max-h-64 overflow-y-auto">
        <p className="font-bold text-xl mb-2">Claims</p>
        <div className="grid grid-cols-2 gap-4">
          {data.map((item, index) => (
            <div key={index} className="flex py-1">
              <span className="font-semibold text-sm">{item.key}:</span>
              <span className="font-normal text-sm">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Presentation() {
  const t = useTranslations();
  return (
    <>
      <span className="text-hologram-color text-2xl md:text-5xl lg:text-5xl font-semibold">
        {t('details')}
      </span>
      <div className="container mx-auto px-4 flex justify-center">
        <div className="flex flex-wrap justify-center -mx-4">
          <Card
            imageSrc="https://a.chatbot-demo.dev.2060.io/v1/qr"
            data={data}
          />
        </div>
      </div>
    </>
  );
}
