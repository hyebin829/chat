import { createTheme } from "@mui/material";

const CustomMuiTheme = createTheme({
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 360,
      sm: 600,
      md: 800,
      lg: 1024,
      xl: 1920,
    },
  },

  typography: {
    fontSize: 15,
    body1: {
      letterSpacing: "-0.075em",
    },
    button: {
      letterSpacing: "-0.075em",
    },
  },
});
export default CustomMuiTheme;
