import React, { Fragment, useState } from "react";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PeopleIcon from "@mui/icons-material/People";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessTimeFilledOutlinedIcon from "@mui/icons-material/AccessTimeFilledOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Holes, People } from "../types/filter";
import { updateFilter } from "../redux/filterSlice";
import HolesPicker from "./inputs/HolesPicker";
import PeoplePicker from "./inputs/PeoplePicker";
import TimesPicker from "./inputs/TimesPicker";

const Footer: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const filter = useAppSelector((state) => state.filter.value);
  const [holes, setHoles] = useState(filter.holes || (9 as Holes));
  const [people, setPeople] = useState(filter.people || (1 as People));
  const [times, setTimes] = useState<number[]>(filter.times || [7, 11]);

  const dispatch = useAppDispatch();

  const handleDrawerClose = () => {
    dispatch(updateFilter({ holes, people, times }));
    setDrawerOpen(false);
  };

  const handleNavClick = () => {
    if (!drawerOpen) {
      setDrawerOpen(true);
    } else {
      handleDrawerClose();
    }
  };

  const getPersonIcon = () => {
    if (filter.people === 1) {
      return drawerOpen ? <PersonOutlineOutlinedIcon /> : <PersonIcon />;
    }
    return drawerOpen ? <PeopleAltOutlinedIcon /> : <PeopleIcon />;
  };

  if (filter.holes && filter.people && filter.times) {
    return (
      <Fragment>
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          elevation={3}
        >
          <BottomNavigation showLabels>
            <BottomNavigationAction
              label={`${filter.holes} Holes`}
              icon={<GolfCourseIcon />}
              onClick={handleNavClick}
              showLabel={!drawerOpen}
            />
            <BottomNavigationAction
              label={`${filter.people} ${
                filter.people === 1 ? "Player" : "Players"
              }`}
              icon={getPersonIcon()}
              onClick={handleNavClick}
              showLabel={!drawerOpen}
            />
            <BottomNavigationAction
              label={`${dayjs().hour(filter.times[0]).format("h a")} - ${dayjs()
                .hour(filter.times[1])
                .format("h a")}`}
              icon={
                drawerOpen ? (
                  <AccessTimeIcon />
                ) : (
                  <AccessTimeFilledOutlinedIcon />
                )
              }
              onClick={handleNavClick}
              showLabel={!drawerOpen}
            />
          </BottomNavigation>
        </Paper>
        <Drawer anchor="bottom" open={drawerOpen} onClose={handleDrawerClose}>
          <Box>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={handleDrawerClose}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Box>
          <Grid container rowSpacing={2} paddingBottom={8}>
            <Grid
              xs={12}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="h5" gutterBottom>
                I want to play
              </Typography>
              <HolesPicker
                value={holes}
                onChange={(newValue) => setHoles(newValue)}
              />
            </Grid>

            <Grid
              xs={12}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="h5" gutterBottom>
                Holes with
              </Typography>
              <PeoplePicker
                value={people}
                onChange={(newPeople) => setPeople(newPeople)}
              />
            </Grid>

            <Grid
              xs={12}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="h5" gutterBottom>
                {people === 1 ? "Person" : "People"} at
              </Typography>
              <TimesPicker
                value={times}
                onChange={(newTimes) => setTimes(newTimes)}
              />
            </Grid>
          </Grid>
        </Drawer>
      </Fragment>
    );
  }

  return null;
};

export default Footer;
