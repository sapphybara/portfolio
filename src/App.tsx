import Navbar from "@components/Navbar";
import { Outlet } from "react-router-dom";
import { PropsWithRoutes } from "types/global";
import { useTitle } from "@hooks/hooks";
import { Box } from "@mui/material";
import Footer from "@components/Footer";

function App(props: PropsWithRoutes) {
  useTitle();
  return (
    <Box className="flex items-center flex-col h-screen">
      <Navbar routes={props.routes} />
      <Box className="pt-16 px-8 max-w-4xl w-full" component="main">
        <Outlet />
      </Box>
      <Footer className="mt-auto" />
    </Box>
  );
}

export default App;
