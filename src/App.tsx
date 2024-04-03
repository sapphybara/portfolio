import Navbar from "@components/Navbar";
import { Outlet } from "react-router-dom";
import { PropsWithRoutes } from "types/global";
import { useTitle } from "@hooks/hooks";
import { Box } from "@mui/material";

function App(props: PropsWithRoutes) {
  useTitle();
  return (
    <>
      <Navbar routes={props.routes} />
      <Box className="mt-16 mx-8" component="main">
        <Outlet />
      </Box>
    </>
  );
}

export default App;
