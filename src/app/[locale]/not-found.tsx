import { getTranslations } from "next-intl/server";
import TitleH1 from "@/components/ui/TitleH1";
import TitleH2 from "@/components/ui/TitleH2";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default async function NotFoundPage() {
	const t = await getTranslations("NotFound");

	return (
		<section className="flex-auto flex flex-col items-center justify-center">
			<Container>
				<TitleH1 text={t("title")} />
				<TitleH2 text={t("subtitle")} />
				<Button text={t("button")} />
			</Container>
		</section>
	);
}
