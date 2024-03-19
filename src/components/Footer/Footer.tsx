import { ComponentProps, ReactNode } from "react";
import "./Footer.css";

const Footer: (props: ComponentProps<"div">) => ReactNode = ({ id }) => {
  return (
    <div className="footer" id={id}>
      <p>- contact info goes here -</p>
    </div>
  );
};

export default Footer;
