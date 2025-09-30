"use client";

import { useTranslations } from "next-intl";

export default function Faq() {
  const t = useTranslations("Faq");

  return (
    <div className=" flex flex-col items-center justify-center ">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
    </div>
  );
}
