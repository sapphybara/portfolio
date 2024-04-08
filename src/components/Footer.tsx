import {
  EmailOutlined,
  GitHub,
  Instagram,
  LinkedIn,
  LocationCityOutlined,
  PhoneOutlined,
} from "@mui/icons-material";
import { Button, Divider, Paper, Stack } from "@mui/material";
import { HTMLAttributes } from "react";

const contactInfo = [
  {
    children: "sapphyra.wiser@gmail.com",
    href: "mailto:sapphyra.wiser@gmail.com",
    startIcon: <EmailOutlined />,
  },
  {
    children: "(830) 582-6020",
    href: "tel:+18305826020",
    startIcon: <PhoneOutlined />,
  },
  {
    children: "Denver, CO",
    href: "",
    startIcon: <LocationCityOutlined />,
  },
  {
    children: "LinkedIn",
    href: "https://www.linkedin.com/in/sapphybara",
    startIcon: <LinkedIn />,
  },
  {
    children: "GitHub",
    href: "https://github.com/sapphyrabara",
    startIcon: <GitHub />,
  },
  {
    children: "Instagram",
    href: "https://instagram.com/sapphybara",
    startIcon: <Instagram />,
  },
];

function Footer(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <Stack
      className={`${props.className ?? ""} flex justify-center w-full`}
      component={Paper}
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
    >
      {contactInfo.map((item, index) => (
        <Button
          key={index}
          {...item}
          target="_blank"
          rel="noopener noreferrer"
          variant="text"
        />
      ))}
    </Stack>
  );
}

export default Footer;
