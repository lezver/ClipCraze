"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { FC } from "react";

const LocaleSwitcher: FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    if (value !== locale) {
      router.replace(pathname, { locale: value });
      router.refresh();
    }
  };

  return (
    <select
      className="uppercase font-bold lg:w-12 outline-none hover:cursor-pointer custom-transition-hover ml-auto xl:ml-0 text-sm lg:text-base z-10"
      value={locale}
      onChange={switchLocale}
    >
      <option value="uk">ua</option>
      <option value="en">en</option>
    </select>
  );
};

export default LocaleSwitcher;
