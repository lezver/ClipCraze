import { FC } from "react";
import clsx from "clsx";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => (
  <div
    className={clsx(
      "container w-full mx-auto max-w-300 px-[30px] lg:px-10",
      className,
    )}
  >
    {children}
  </div>
);

export default Container;
