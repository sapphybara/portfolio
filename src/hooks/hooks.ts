import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useTitle = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const titleSuffix =
      pathname === "/"
        ? ""
        : ` | ${pathname.charAt(1).toUpperCase()}${pathname.slice(2)}`;

    document.title = `Sapphyra Wiser${titleSuffix}`;
  }, [pathname]);
};
