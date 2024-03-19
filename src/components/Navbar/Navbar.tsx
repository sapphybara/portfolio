import { ComponentProps, useMemo } from "react";
import "./Navbar.css";
import { Link } from "@nextui-org/react";

export default function MemoizedNavbar(props: ComponentProps<"div">) {
  const Navbar = useMemo(() => {
    return (
      <div className="navbar" id={props.id}>
        <h1>Sapphyra Wiser</h1>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }, [props.id]);

  return Navbar;
}
