"use client";

import { useTranslations } from "next-intl";

export default function Error({ error }: { error: string }) {
  const t = useTranslations();
  return (
    <p style={{ color: "rgb(255, 85, 85)" }} className="font-bold text-xl">
      {`${t("somethingWentWrong")}: ${error}`}
    </p>
  );
}
