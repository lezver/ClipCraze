import { FC } from "react";

interface MainProps {
  children: React.ReactNode;
}

const Main: FC<MainProps> = ({ children }) => (
  <main className="main-radials flex flex-col">{children}</main>
);

export default Main;
