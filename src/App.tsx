import Navbar from "@components/Navbar";
import { Outlet } from "react-router-dom";
import { PropsWithRoutes } from "types/global";
import { useTitle } from "@hooks/hooks";

function App(props: PropsWithRoutes) {
  useTitle();
  return (
    <>
      <Navbar routes={props.routes} />
      <Outlet />
    </>
  );
}

export default App;
