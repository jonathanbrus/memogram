import { Typography } from "@mui/material";

import logo from "../../assets/logo.svg";

export const Logo = ({ variant }) => {
  const imgStyle = {
    width: "35px",
    height: "35px",
    margin: "auto 1rem",
  };

  return (
    <Typography
      variant={variant}
      sx={{
        fontWeight: "500",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      MemoGram <img src={logo} style={imgStyle} alt="Logo SVG" />
    </Typography>
  );
};
