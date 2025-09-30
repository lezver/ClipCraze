import { FC } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import Button from "./Button";
import { useModal } from "@/providers/ModalProvider";
import Form from "../home/Form";
import { Dispatch, SetStateAction } from "react";

const urlList: string[] = [
  "structure",
  "about",
  "advantages",
  "reviews",
  "faq",
];

interface NavListProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const NavList: FC<NavListProps> = ({ isOpen, setIsOpen }) => {
  const t = useTranslations("Header");

  const navList = t.raw("nav");

  const { openModal } = useModal();

  const closeMenu = () => {
    document.body.classList.remove("overflow-hidden");

    setIsOpen(false);
  };

  return (
    <div
      className={clsx(
        "absolute inset-0 flex flex-col items-center justify-center  gap-y-[10dvh] transition xl:static xl:ml-auto xl:translate-y-0",
        isOpen ? "translate-y-0 overlay-radials" : "-translate-y-[100%]",
      )}
    >
      <ul className="font-medium text-base flex flex-col xl:flex-row gap-y-[5dvh] items-center xl:gap-x-7">
        {navList.map((item: string, index: number) => (
          <li key={index}>
            <Link
              onClick={closeMenu}
              className="custom-transition-hover"
              href={`/${urlList[index]}`}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      <Button
        onClick={() => {
          closeMenu();

          openModal(<Form />);
        }}
        className="px-[31.5px] py-[10px] bg-lg2 rounded-full font-semibold text-xs/5 xl:hidden"
        text={t("button")}
      />
    </div>
  );
};

export default NavList;
