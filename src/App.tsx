import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { PropsWithRoutes } from "types/global";
import { useTitle } from "@hooks/hooks";
import Navbar from "@components/navbar/Navbar";
import Footer from "@components/Footer";

function App(props: PropsWithRoutes) {
  useTitle();
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
