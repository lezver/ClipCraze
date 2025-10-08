"use client";

import TitleH1 from "@/components/ui/TitleH1";
import { useTranslations } from "next-intl";

export default function Reviews() {
	const t = useTranslations("Reviews");

	return (
		<div className="flex-auto flex flex-col items-center justify-center ">
			<TitleH1 text={t("title")} />
		</div>
	);
}
