import Image from "next/image";
import { Claim } from "@/app/lib/definitions";

export default function PresentationClaims({ claims }: { claims: Claim[] }) {
  return (
    <div className="block w-full rounded shadow-2xl m-4 bg-white dark:bg-black p-8">
      {claims.map((item) => {
        return (
          <div key={item.key} className="flex py-1">
            <span className="font-semibold text-base mr-1">{item.key}:</span>
            {item.type === "image" ? (
              <Image
                className="w-2/3 h-full object-cover"
                src={item.value}
                alt="Card Image"
                width={20}
                height={20}
              />
            ) : (
              <span className="font-light text-base">{item.value}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
