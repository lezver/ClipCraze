import { FC } from "react";
import Container from "../ui/Container";

interface FooterProps {
  children?: React.ReactNode;
}

const Footer: FC<FooterProps> = ({ children }) => (
  <footer>
    <Container>
      <></>
    </Container>
  </footer>
);

export default Footer;
