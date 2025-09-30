"use client";

import { useTranslations } from "next-intl";

export default function Reviews() {
  const t = useTranslations("Reviews");

  return (
    <div className=" flex flex-col items-center justify-center ">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
    </div>
  );
}
