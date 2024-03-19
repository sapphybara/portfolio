import { ComponentProps, ReactNode } from "react";
import "./Navbar.css";

const Navbar: (props: ComponentProps<"div">) => ReactNode = ({ id }) => {
  return (
    <div className="navbar" id={id}>
      <h1>Sapphyra Wiser</h1>
    </div>
  );
};

export default Navbar;
