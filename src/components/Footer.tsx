import { HTMLAttributes, useContext } from "react";
import {
  GitHub,
  LinkedIn,
  LocationCityOutlined,
  PhoneOutlined,
} from "@mui/icons-material";
import { Button, Divider, Stack, useMediaQuery, useTheme } from "@mui/material";
import { ThemeModeContext } from "@context/ThemeModeContext";

const contactInfo = [
  {
    children: "(720) 839-7618",
    href: "tel:+17208397618",
    startIcon: PhoneOutlined,
  },
  {
    children: "Denver, CO",
    href: "",
    startIcon: LocationCityOutlined,
    isInvisibleOnMobile: true,
  },
  {
    children: "LinkedIn",
    href: "https://www.linkedin.com/in/sapphyra-wiser",
    startIcon: LinkedIn,
  },
  {
    children: "GitHub",
    href: "https://github.com/sapphybara",
    startIcon: GitHub,
  },
];

function Footer(props: HTMLAttributes<HTMLDivElement>) {
  const theme = useTheme();
  const shouldRenderBtnTxt = useMediaQuery(theme.breakpoints.up("md"));
  const { isDarkMode } = useContext(ThemeModeContext);
  const btnCls = isDarkMode ? "" : "text-white";

  return (
    <Stack
      className={`${props.className ?? ""} flex justify-center w-full`}
      component="footer"
      bgcolor={isDarkMode ? "#272727" : "primary.main"}
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={
        useMediaQuery(theme.breakpoints.up("lg"))
          ? 2
          : shouldRenderBtnTxt
          ? 1
          : 0
      }
    >
      {contactInfo.map(
        (
          { children, isInvisibleOnMobile, startIcon: StartIcon, ...item },
          index
        ) => {
          if (isInvisibleOnMobile && !shouldRenderBtnTxt) {
            return null;
          }

          return (
            <Button
              className={`normal-case ${btnCls}`}
              color={isDarkMode ? "primary" : undefined}
              key={index}
              startIcon={<StartIcon className={btnCls} />}
              {...item}
              target="_blank"
              rel="noopener noreferrer"
              variant="text"
            >
              {shouldRenderBtnTxt && children}
            </Button>
          );
        }
      )}
    </Stack>
  );
}

export default Footer;
