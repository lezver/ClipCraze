"use client";

// import Image from "next/image";
import { useTranslations } from "next-intl";
import Container from "../ui/Container";
import { FC } from "react";

import Button from "../ui/Button";
import { useModal } from "@/providers/ModalProvider";
import Form from "./Form";
import TitleH1 from "../ui/TitleH1";
import Image from "next/image";

const Hero: FC = () => {
	const t = useTranslations("Hero");

	const { openModal } = useModal();

	return (
		<section className="pt-3 xl:pt-[27px] pb-[66px] xl:pb-25 relative hero-bg">
			<Container>
				<div className="grid 2xl:grid-cols-[57.5%_1fr] 2xl:gap-y-[42px] 2xl:gap-x-10 2xl:relative">
					<div className="mx-auto 2xl:mx-0">
						<Image
							src="/hero1.webp"
							alt={t("imageAlt")}
							width={664}
							height={466}
							className="hidden md:block rounded-2xl"
							priority={true}
						/>
						<Image
							src="/hero2.webp"
							alt={t("imageAlt")}
							width={313}
							height={356}
							className="md:hidden rounded-2xl"
							priority={true}
						/>
					</div>

					<div className="z-1 flex flex-col items-center 2xl:items-start 2xl:gap-y-4 2xl:absolute 2xl:bottom-3 2xl:right-0 2xl:max-w-138 w-full text-center 2xl:text-left -mt-20 mb-8 2xl:mb-0">
						<h2 className="text-[21px] lg:text-3xl font-bold bg-lg2 bg-clip-text text-transparent">
							{t("subtitle")}
						</h2>

						<TitleH1 text={t("title")} />
					</div>

					<div className="flex justify-center 2xl:justify-start 2xl:py-21 mb-11">
						<p className="text-center 2xl:text-left text-sm lg:text-base md:max-w-2/3 2xl:max-w-99">
							{t("text")}
						</p>
					</div>

					<div className="flex flex-col gap-y-[11] max-w-89 lg:max-w-[534] 2xl:order-2 mx-auto 2xl:mx-0 w-full">
						<Button
							onClick={() => openModal(<Form />)}
							className="h-15 lg:h-[74px] bg-white rounded-full text-black flex items-center justify-center font-semibold text-sm lg:text-2xl"
							text={t("button")}
							discount={true}
						/>
						<p className="flex gap-x-4 justify-center items-center">
							<span className="text-wild-watermelon font-semibold text-xl lg:text-2xl">
								{t("discountAfter")}
							</span>
							<span className="text-sm lg:text-base text-silver relative before:content-[''] before:absolute before:h-[1px] before:bg-silver before:w-[116%] before:top-1/2 before:-left-[8%]">
								{t("discountBefore")}
							</span>
						</p>
					</div>
				</div>
			</Container>
		</section>
	);
};

export default Hero;
