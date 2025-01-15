"use client";

import { useTranslations } from "next-intl";

export default function Error() {
  const t = useTranslations();
  return (
    <p className="text-red-600 font-bold text-xl">{t("somethingWentWrong")}</p>
  );
}
