import React, { Fragment, useState } from "react";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PeopleIcon from "@mui/icons-material/People";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessTimeFilledOutlinedIcon from "@mui/icons-material/AccessTimeFilledOutlined";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Holes, Players } from "../types/Filter";
import { updateFilter } from "../redux/filterSlice";
import HolesPicker from "./inputs/HolesPicker";
import PlayersPicker from "./inputs/PlayersPicker";
import TimesPicker from "./inputs/TimesPicker";
import { getFilter } from "../hooks/selectors";

const Footer: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const filter = useAppSelector(getFilter);
  const [holes, setHoles] = useState(filter.holes || (9 as Holes));
  const [players, setPlayers] = useState(filter.players || (1 as Players));
  const [times, setTimes] = useState<number[]>(filter.times || [7, 11]);

  const dispatch = useAppDispatch();

  const handleDrawerClose = () => {
    dispatch(updateFilter({ holes, players, times }));
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
    if (filter.players === 1) {
      return drawerOpen ? <PersonOutlineOutlinedIcon /> : <PersonIcon />;
    }
    return drawerOpen ? <PeopleAltOutlinedIcon /> : <PeopleIcon />;
  };

  if (filter.holes && filter.players && filter.times) {
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
          elevation={4}
        >
          <BottomNavigation showLabels>
            <BottomNavigationAction
              label={`${filter.holes} Holes`}
              icon={<GolfCourseIcon />}
              onClick={handleNavClick}
              showLabel={!drawerOpen}
            />
            <BottomNavigationAction
              label={`${filter.players} ${
                filter.players === 1 ? "Player" : "Players"
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
          <Grid container rowSpacing={2} paddingBottom={8} marginY={2}>
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
              <PlayersPicker
                value={players}
                onChange={(newPlayers) => setPlayers(newPlayers)}
              />
            </Grid>

            <Grid
              xs={12}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Typography variant="h5" gutterBottom>
                {players === 1 ? "Player" : "Players"} at
              </Typography>
              <TimesPicker
                value={times}
                onChange={(newTimes) => setTimes(newTimes)}
              />
            </Grid>

            <Grid
              xs={12}
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Button
                variant="contained"
                size="medium"
                endIcon={<FilterAltIcon />}
                onClick={handleDrawerClose}
              >
                Apply
              </Button>
            </Grid>
          </Grid>
        </Drawer>
      </Fragment>
    );
  }

  return null;
};

export default Footer;
