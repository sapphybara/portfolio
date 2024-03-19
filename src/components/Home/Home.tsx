import { ComponentProps, ReactNode } from "react";

const Home: (props: ComponentProps<"div">) => ReactNode = ({ className }) => {
  return <div className={className}>We're on the home page rn</div>;
};

export default Home;
