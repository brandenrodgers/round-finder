import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch } from "../hooks/redux";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Unstable_Grid2";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Holes, People } from "../types/filter";
import { updateFilter } from "../redux/filterSlice";
import { updateDate } from "../redux/dateSlice";
import HolesPicker from "./inputs/HolesPicker";
import PeoplePicker from "./inputs/PeoplePicker";
import TimesPicker from "./inputs/TimesPicker";

const SearchForm: React.FC = () => {
  const [date, setDate] = React.useState(dayjs());
  const [holes, setHoles] = useState(9 as Holes);
  const [people, setPeople] = useState(1 as People);
  const [times, setTimes] = useState<number[]>([7, 11]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setDate(newValue);
    }
  };

  const handleSearch = () => {
    dispatch(updateDate(date.format("MM-DD-YYYY")));
    dispatch(updateFilter({ holes, people, times }));
    navigate("/tee-times");
  };

  return (
    <Grid container rowSpacing={2}>
      <Grid xs={12} display="flex" alignItems="center" flexDirection="column">
        <Typography variant="h3" gutterBottom>
          I want to play
        </Typography>
        <HolesPicker
          value={holes}
          onChange={(newValue) => setHoles(newValue)}
        />
      </Grid>
      <Grid xs={12} display="flex" alignItems="center" flexDirection="column">
        <Typography variant="h3" gutterBottom>
          Holes on
        </Typography>
        <DatePicker label="Date" value={date} onChange={handleDateChange} />
      </Grid>

      <Grid xs={12} display="flex" alignItems="center" flexDirection="column">
        <Typography variant="h3" gutterBottom>
          With
        </Typography>
        <PeoplePicker
          value={people}
          onChange={(newPeople) => setPeople(newPeople)}
        />
      </Grid>

      <Grid xs={12} display="flex" alignItems="center" flexDirection="column">
        <Typography variant="h3" gutterBottom>
          {people === 1 ? "Person" : "People"} at
        </Typography>
        <TimesPicker
          value={times}
          onChange={(newTimes) => setTimes(newTimes)}
        />
      </Grid>

      <Grid xs={12} display="flex" alignItems="center" flexDirection="column">
        <Button
          variant="contained"
          size="large"
          endIcon={<SearchIcon />}
          disabled={!holes || !people || !times.length}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchForm;
