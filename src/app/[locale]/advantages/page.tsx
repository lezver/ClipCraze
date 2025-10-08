"use client";

import TitleH1 from "@/components/ui/TitleH1";
import { useTranslations } from "next-intl";

export default function Advantages() {
	const t = useTranslations("Advantages");

	return (
		<section className="flex-auto flex flex-col items-center justify-center ">
			<TitleH1 text={t("title")} />
		</section>
	);
}
