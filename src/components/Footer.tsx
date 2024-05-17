import { HTMLAttributes, useContext } from "react";
import {
  EmailOutlined,
  GitHub,
  LinkedIn,
  LocationCityOutlined,
  PhoneOutlined,
} from "@mui/icons-material";
import { Button, Divider, Stack, useMediaQuery, useTheme } from "@mui/material";
import { ThemeModeContext } from "@context/ThemeModeContext";

const contactInfo = [
  {
    children: "sapphyra.wiser@gmail.com",
    href: "mailto:sapphyra.wiser@gmail.com",
    startIcon: EmailOutlined,
  },
  {
    children: "(830) 582-6020",
    href: "tel:+18305826020",
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
    href: "https://www.linkedin.com/in/sapphybara",
    startIcon: LinkedIn,
  },
  {
    children: "GitHub",
    href: "https://github.com/sapphyrabara",
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
