import Navbar from "@components/Navbar";
import { Outlet } from "react-router-dom";
import { PropsWithRoutes } from "types/global";
import { useTitle } from "@hooks/hooks";
import { Box } from "@mui/material";

function App(props: PropsWithRoutes) {
  useTitle();
  return (
    <Box className="flex items-center flex-col">
      <Navbar routes={props.routes} />
      <Box className="mt-16 mx-8 max-w-[60rem]" component="main">
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
