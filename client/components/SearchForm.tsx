import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Holes, Players } from "../types/Filter";
import { updateFilter } from "../redux/filterSlice";
import { updateDate } from "../redux/dateSlice";
import HolesPicker from "./inputs/HolesPicker";
import PlayersPicker from "./inputs/PlayersPicker";
import TimesPicker from "./inputs/TimesPicker";
import { getDate, getFilter } from "../hooks/selectors";
import LocationSearchBar from "./LocationSearchBar";
import {
  FormControlLabel,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { updateLocation } from "../redux/locationSlice";
import { updateDistance } from "../redux/distanceSlice";

type GeoCoordinates = {
  lat: number;
  lon: number;
}; // TODO: figure out why I cant put this in the type folder and export it

const SearchForm: React.FC = () => {
  const filter = useAppSelector(getFilter);
  const currentDate = useAppSelector(getDate);

  const [date, setDate] = React.useState(
    currentDate ? dayjs(currentDate) : dayjs()
  );
  const [holes, setHoles] = useState(filter.holes || (9 as Holes));
  const [players, setPlayers] = useState(filter.players || (1 as Players));
  const [times, setTimes] = useState<number[]>(filter.times || [7, 11]);
  const [isUsingDistance, setIsUsingDistance] = useState<Boolean>(false);
  const [location, setLocation] = useState<GeoCoordinates>({
    lat: 91, // impossible number for lat
    lon: 91,
  });
  const [distance, setDistance] = useState<number>(30);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setDate(newValue);
    }
  };

  const handleSearch = () => {
    dispatch(updateDate(date.format("MM/DD/YYYY")));
    dispatch(updateFilter({ holes, players, times }));
    dispatch(updateDistance(distance));
    dispatch(updateLocation(location));
    navigate("/tee-times");
  };

  const handleUseDistanceToggle = () => {
    setIsUsingDistance((prevUseDistance) => !prevUseDistance);
  };

  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{ width: "90%", maxWidth: 600, py: 3, opacity: ".95" }}
        elevation={6}
      >
        <Grid container rowSpacing={2}>
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
              Holes on
            </Typography>
            <DatePicker
              label="Date"
              value={date as any}
              onChange={handleDateChange}
            />
          </Grid>

          <Grid
            xs={12}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="h5" gutterBottom>
              At
            </Typography>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={isUsingDistance as any}
                    onChange={handleUseDistanceToggle}
                  />
                }
                label="Use Distance"
              />
            </div>
            {isUsingDistance && (
              <LocationSearchBar
                location={location}
                setLocation={setLocation}
                distance={distance}
                setDistance={setDistance}
              />
            )}
            <Typography variant="h5" gutterBottom>
              {isUsingDistance ? "Distance" : "Any distance"}
            </Typography>
          </Grid>

          <Grid
            xs={12}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography variant="h5" gutterBottom>
              With
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
        </Grid>
      </Paper>
      <Grid
        xs={12}
        display="flex"
        alignItems="center"
        flexDirection="column"
        paddingTop={2}
      >
        <Button
          variant="contained"
          size="large"
          endIcon={<SearchIcon />}
          disabled={!holes || !players || !times.length}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Grid>
    </Box>
  );
};

export default SearchForm;
