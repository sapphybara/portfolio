import { ComponentProps, ReactNode } from "react";

const Home: (props: ComponentProps<"div">) => ReactNode = ({ id }) => {
  return <div id={id}>This is the home page</div>;
};

export default Home;
