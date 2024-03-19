import { PropsWithChildren, ReactNode } from "react";
import "./MainContent.css";
const MainContent: (props: PropsWithChildren) => ReactNode = ({ children }) => {
  return <div className="main-content">{children}</div>;
};

export default MainContent;
