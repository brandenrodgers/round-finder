import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#3BA783",
      main: "#0D9465",
      dark: "#076646",
      contrastText: "#fff",
    },
    secondary: {
      light: "#F7F2EB",
      main: "#F5D9B5",
      dark: "#AB977E",
      contrastText: "#000",
    },
    text: {
      primary: "#1C2229",
      secondary: "#7A716A",
    },
    divider: "#DDD6CC",
    background: {
      default: "#F7F2EB",
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.02em",
    },
    h5: {
      fontWeight: 500,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: 12,
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
        },
        containedPrimary: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(10, 144, 96, 0.3)",
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          gap: "6px",
        },
        grouped: {
          border: "1px solid rgba(0,0,0,0.12) !important",
          borderRadius: "8px !important",
          "&:not(:first-of-type)": {
            marginLeft: "0 !important",
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          backgroundColor: "#076646",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        },
        elevation2: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        },
        elevation4: {
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 64,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: "16px 16px 0 0",
        },
      },
    },
  },
});

export default theme;
