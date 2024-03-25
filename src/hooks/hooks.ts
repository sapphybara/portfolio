import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useTitle = () => {
  const location = useLocation();
  useEffect(() => {
    const title =
      location.pathname === "/"
        ? ""
        : location.pathname.charAt(1).toUpperCase() +
          location.pathname.slice(2);

    document.title = `Sapphyra Wiser${title ? ` | ${title}` : ""}`;
  }, [location.pathname]);
};
