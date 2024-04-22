import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { PropsWithRoutes } from "types/global";
import { useTitle } from "@hooks/hooks";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import AuthProvider from "src/context/AuthProvider";

function App(props: PropsWithRoutes) {
  useTitle();
  return (
    <Box className="flex items-center flex-col h-screen">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <Navbar routes={props.routes} />
          <Box className="pt-16 px-8 max-w-4xl w-full" component="main">
            <Outlet />
          </Box>
          <Footer className="mt-auto" />
        </AuthProvider>
      </LocalizationProvider>
    </Box>
  );
}

export default App;
