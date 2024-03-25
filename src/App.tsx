import Navbar from "@components/Navbar";
import { Outlet } from "react-router-dom";
import { PropsWithRoutes } from "types/global";

function App(props: PropsWithRoutes) {
  return (
    <>
      <Navbar routes={props.routes} />
      <Outlet />
    </>
  );
}

export default App;
