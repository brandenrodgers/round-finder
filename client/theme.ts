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
      light: "#f2e1cc",
      main: "#F5D9B5",
      dark: "#AB977E",
      contrastText: "#000",
    },
  },
});

export default theme;
