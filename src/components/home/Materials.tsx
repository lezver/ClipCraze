"use client";

import { FC } from "react";
import Container from "../ui/Container";
import { useTranslations } from "next-intl";
import Button from "../ui/Button";
import { useModal } from "@/providers/ModalProvider";
import Form from "./Form";

const Materials: FC = () => {
  const t = useTranslations("Materials");

  const { openModal } = useModal();

  return (
    <section className="pt-25 pb-10">
      <div className="materials-bg-lg relative py-[1px] before:content-[''] before:absolute before:top-0 before:bg-lg2 before:h-[1px] before:w-full after:content-[''] after:absolute after:top-0 after:bg-lg2 after:h-[1px] after:w-full">
        <div
          className="materials-image-fade py-[114px] xl:pt-15 xl:pb-[66px] relative overflow-hidden before:font-sansation before:uppercase before:text-3xl before:font-bold before:py-8 before:px-16 before:blur-[2.5px] before:-rotate-35 before:bottom-12 before:absolute before:-right-32 before:hidden xl:before:block"
          data-content={t("blurText")}
        >
          <Container>
            <div className="flex flex-col px-[26px] gap-y-[62px] xl:gap-y-[44px]">
              <div className="flex flex-col gap-y-5 max-w-[447px] mx-auto">
                <h2 className="text-center font-bold text-xl lg:text-4xl uppercase bg-lg2 bg-clip-text text-transparent">
                  {t.rich("title", {
                    span1: (text) => <span className="text-white">{text}</span>,
                    span2: (text) => <span>{text}</span>,
                  })}
                </h2>

                <p className="text-center font-medium text-sm lg:text-2xl">
                  {t("subtitle")}
                </p>
              </div>

              <Button
                onClick={() => openModal(<Form />)}
                className="h-17 lg:h-[74px] max-w-[534px] w-full mx-auto bg-lg1 rounded-full text-white flex items-center justify-center font-semibold text-sm lg:text-2xl before:h-17 before:w-[63px] pr-6 sm:pr-0"
                text={t("button")}
                discount={true}
              />
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
};

export default Materials;
