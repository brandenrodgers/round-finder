import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#3BA783",
      main: "#0B9264",
      dark: "#076646",
      contrastText: "#fff",
    },
    secondary: {
      light: "#F78733",
      main: "#F56900",
      dark: "#AB4900",
      contrastText: "#000",
    },
  },
});

export default theme;
