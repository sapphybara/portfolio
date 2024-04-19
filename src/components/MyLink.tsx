import { HashLink, HashLinkProps } from "react-router-hash-link";
import { ForwardedRef, forwardRef } from "react";

const MyLink = forwardRef(
  (props: HashLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    return (
      <HashLink
        ref={ref}
        className="!ml-auto flex items-center gap-1"
        color="secondary"
        scroll={(el) => {
          const top = el.getBoundingClientRect().top + window.scrollY - 66;
          window.scrollTo({ top, behavior: "smooth" });
        }}
        smooth
        {...props}
      >
        {props.children}
      </HashLink>
    );
  }
);

export default MyLink;
