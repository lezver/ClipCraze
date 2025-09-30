import { Link } from "@/i18n/navigation";
import { Dispatch, SetStateAction } from "react";

import { FC } from "react";

interface LogoProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Logo: FC<LogoProps> = ({ setIsOpen }) => {
  const closeMenu = () => {
    document.body.classList.remove("overflow-hidden");

    setIsOpen(false);
  };

  return (
    <Link
      onClick={closeMenu}
      className="font-sansation uppercase font-bold custom-transition-hover lg:text-lg z-10 text-nowrap bg-lg2 bg-clip-text text-transparent"
      href="/"
    >
      <span className="text-white">Aleko</span> Sokurashvili
    </Link>
  );
};

export default Logo;
