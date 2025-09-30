"use client";

import { FC, useState } from "react";
import Container from "../ui/Container";
import LocaleSwitcher from "../ui/LocaleSwitcher";
import Logo from "../ui/Logo";
import NavList from "../ui/NavList";
import Button from "../ui/Button";
import { useTranslations } from "next-intl";
import { useModal } from "@/providers/ModalProvider";
import Form from "../home/Form";

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const t = useTranslations("Header");

  const { openModal } = useModal();

  const toggleMenu = () => {
    document.body.classList.toggle("overflow-hidden");

    setIsOpen(!isOpen);
  };

  return (
    <header className="z-10">
      <Container>
        <nav className="pt-[51px] pb-3 xl:py-10 flex items-center gap-x-7 lg:gap-x-[57px]">
          <Logo setIsOpen={setIsOpen} />

          <NavList isOpen={isOpen} setIsOpen={setIsOpen} />

          <LocaleSwitcher />

          <Button
            onClick={() => openModal(<Form />)}
            className="px-[31.5px] py-[10px] bg-lg2 rounded-full font-semibold text-xs/5 hidden xl:block"
            text={t("button")}
          />

          <Button
            onClick={toggleMenu}
            className="size-[35px] flex justify-center items-center xl:hidden z-10"
          >
            <img src={isOpen ? "/cross.svg" : "/menu.svg"} alt="menu" />
          </Button>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
