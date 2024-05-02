import { Tooltip, Button, ButtonProps, Link, LinkProps } from "@mui/material";

type ResumeLinkWithTooltipProps<T extends boolean> = {
  asLink: T;
  linkOrButtonProps?: T extends true ? LinkProps : ButtonProps;
  buttonText?: string;
};

const ResumeLinkWithTooltip = <T extends boolean>({
  asLink,
  linkOrButtonProps,
  buttonText,
}: ResumeLinkWithTooltipProps<T>) => {
  return (
    <Tooltip title="Don't worry, this won't download a pesky file!">
      {asLink ? (
        <Link href="/resume" {...(linkOrButtonProps as LinkProps)}>
          {buttonText ?? "Resume"}
        </Link>
      ) : (
        <Button href="/resume" {...(linkOrButtonProps as ButtonProps)}>
          {buttonText ?? "Resume"}
        </Button>
      )}
    </Tooltip>
  );
};

export default ResumeLinkWithTooltip;
