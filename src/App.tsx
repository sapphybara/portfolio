import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { PropsWithRoutes } from "types/global";
import { useTitle } from "@hooks/hooks";
import Navbar from "@components/navbar/Navbar";
import Footer from "@components/Footer";
import { useCallback, useEffect } from "react";

function App(props: PropsWithRoutes) {
  useTitle();
  const location = useLocation();

  const scrollToHash = useCallback(() => {
    if (location.hash) {
      const hash = location.hash.slice(1);
      const element = document.getElementById(hash);
      if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - 66;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    scrollToHash();
  }, [scrollToHash]);

  return (
    <Box className="flex items-center flex-col min-h-screen">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Navbar routes={props.routes} />
        <Box className="pt-16 px-8 max-w-5xl w-full" component="main">
          <Outlet />
        </Box>
        <Footer className="mt-auto" />
      </LocalizationProvider>
    </Box>
  );
}

export default App;
