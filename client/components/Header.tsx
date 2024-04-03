import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Typography from "@mui/material/Typography";
import SportsGolfIcon from "@mui/icons-material/SportsGolf";
import HomeIcon from "@mui/icons-material/Home";
import { useAppSelector } from "../hooks/redux";
import { getDate } from "../hooks/selectors";
import { HIDDEN_HEADER_ID } from "../constants";
import SortMenu from "./SortMenu";

const Header: React.FC = () => {
  const date = useAppSelector(getDate);
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const shouldRenderFixedDate = date && location.pathname !== "/";

  const renderHomeIcon = () => {
    if (location.pathname.includes("tee-times")) {
      return (
        <Box
          sx={{
            position: "absolute",
            left: 16,
            display: "flex",
            height: "100%",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => navigate("/")}
            sx={{ pr: 0 }}
          >
            <HomeIcon />
          </IconButton>
        </Box>
      );
    }
    return null;
  };

  // A hack to make fixed position work. Hide this behind the fixed toolbar
  const renderToolbar = (id?: string) => {
    return (
      <Toolbar id={id}>
        {renderHomeIcon()}
        <Typography
          variant="h4"
          component="div"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          Round <SportsGolfIcon /> Finder
        </Typography>
      </Toolbar>
    );
  };

  const renderDate = () => {
    return (
      <Typography
        variant="h6"
        component="div"
        sx={{
          py: 1,
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {dayjs(date).format("dddd, MMM D")}
      </Typography>
    );
  };

  const renderSubToolbarContent = () => {
    if (courseId) {
      return (
        <Box sx={{ display: "flex", position: "relative" }}>
          <Box
            sx={{
              position: "absolute",
              left: 8,
              display: "flex",
              height: "100%",
            }}
          >
            <Button
              variant="text"
              startIcon={<ChevronLeftIcon />}
              onClick={() => navigate("/tee-times")}
            >
              Back
            </Button>
          </Box>
          {renderDate()}
        </Box>
      );
    }
    return (
      <Box sx={{ display: "flex", position: "relative" }}>
        {renderDate()}
        <Box
          sx={{
            position: "absolute",
            right: 8,
            display: "flex",
            height: "100%",
          }}
        >
          <SortMenu />
        </Box>
      </Box>
    );
  };

  const renderSubToolbar = () => {
    if (shouldRenderFixedDate) {
      return (
        <Box
          sx={{
            position: "relative",
            zIndex: (theme) => theme.zIndex.appBar - 1,
          }}
        >
          <Toolbar
            disableGutters
            sx={{ position: "fixed", width: "100%", alignItems: "flex-start" }}
          >
            <Paper square elevation={2} sx={{ width: "100%", height: "100%" }}>
              {renderSubToolbarContent()}
            </Paper>
          </Toolbar>
          <Paper component={Box} sx={{ visibility: "hidden" }}>
            {renderSubToolbarContent()}
          </Paper>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" elevation={shouldRenderFixedDate ? 0 : 1}>
        {renderToolbar()}
      </AppBar>
      {renderToolbar(HIDDEN_HEADER_ID)}
      {renderSubToolbar()}
    </Box>
  );
};

export default Header;
