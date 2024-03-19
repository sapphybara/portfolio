import { ComponentProps, ReactNode } from "react";

const Portfolio: (props: ComponentProps<"div">) => ReactNode = ({
  className,
}) => {
  return (
    <div className={className}>
      <h2>Portfolio</h2>
    </div>
  );
};

export default Portfolio;
