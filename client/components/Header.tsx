import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import SportsGolfIcon from "@mui/icons-material/SportsGolf";
import HomeIcon from "@mui/icons-material/Home";
import { useAppSelector } from "../hooks/redux";

const Header: React.FC = () => {
  const date = useAppSelector((state) => state.date.value);

  const location = useLocation();
  const navigate = useNavigate();

  const renderHomeIcon = () => {
    if (location.pathname.includes("tee-times")) {
      return (
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => navigate("/")}
        >
          <HomeIcon />
        </IconButton>
      );
    }
    return null;
  };

  const renderDate = () => {
    if (date && location.pathname !== "/") {
      return (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Playing on {date}
        </Typography>
      );
    }
    return null;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {renderHomeIcon()}
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Round <SportsGolfIcon /> Finder
          </Typography>

          <Box sx={{ flexGrow: 0 }}>{renderDate()}</Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
