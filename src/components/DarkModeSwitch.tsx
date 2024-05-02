import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import { Switch, styled } from "@mui/material";
import { useContext } from "react";
import { ThemeModeContext } from "src/context/ThemeModeContext";

const StyledSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-root": {
    width: "32px",
  },
  "& .MuiSwitch-switchBase": {
    width: "26px",
    height: "26px",
    top: "50%",
    left: "4px",
    marginTop: "calc(-26px / 2)",
    backgroundColor: theme.palette.background.default,
    "&:hover": {
      backgroundColor: "#212121",
    },
    "&.Mui-checked": {
      transform: "translateX(30px)",
      left: 0,
      right: "4px",
      backgroundColor: theme.palette.background.default,
      "&:hover": {
        backgroundColor: "#ededed",
      },
    },
  },
}));

const DarkModeSwitch = () => {
  const { mode, toggleMode } = useContext(ThemeModeContext);

  return (
    <>
      <StyledSwitch
        checked={mode === "dark"}
        checkedIcon={<DarkModeOutlined className="p-0" color="secondary" />}
        color="primary"
        icon={<LightModeOutlined className="p-0" color="warning" />}
        onChange={toggleMode}
      />
    </>
  );
};

export default DarkModeSwitch;
