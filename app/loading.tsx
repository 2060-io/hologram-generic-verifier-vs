import Image from "next/image";

export default async function Loading() {
  return (
    <Image
      src="/images/ico-hologram.png"
      alt="Hologram logo"
      width={180}
      height={38}
      priority
    />
  );
}
