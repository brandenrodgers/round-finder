import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch } from "../hooks/redux";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import Grid from "@mui/material/Unstable_Grid2";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Holes, People } from "../types/filter";
import { updateFilter } from "../redux/filterSlice";
import { updateDate } from "../redux/dateSlice";
import { TIMES } from "../constants";

const SearchForm: React.FC = () => {
  const [date, setDate] = React.useState(dayjs());
  const [holes, setHoles] = useState(9 as Holes);
  const [people, setPeople] = useState(1 as People);
  const [times, setTimes] = useState([TIMES.AM]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setDate(newValue);
    }
  };

  const handleHolesChange = (
    event: React.MouseEvent<HTMLElement>,
    newHoles: Holes
  ) => {
    setHoles(newHoles);
  };

  const handlePeopleChange = (
    event: React.MouseEvent<HTMLElement>,
    newPeople: People
  ) => {
    setPeople(newPeople);
  };

  const handleTimesChange = (
    event: React.MouseEvent<HTMLElement>,
    newTimes: string[]
  ) => {
    setTimes(newTimes);
  };

  const handleSearch = () => {
    dispatch(updateDate(date.format("MM-DD-YYYY")));
    dispatch(updateFilter({ holes, people, times }));
    navigate("/tee-times");
  };

  return (
    <Grid container spacing={2}>
      <Grid xs={12} display="flex" alignItems="center" flexDirection="column">
        <Typography variant="h2" gutterBottom>
          I want to play
        </Typography>
        <ToggleButtonGroup
          color="primary"
          size="large"
          value={holes}
          exclusive
          onChange={handleHolesChange}
          aria-label="holes-input"
        >
          <ToggleButton value={9}>
            <Typography variant="h4"> 9</Typography>
          </ToggleButton>
          <ToggleButton value={18}>
            <Typography variant="h4">18</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid xs={12} display="flex" alignItems="center" flexDirection="column">
        <Typography variant="h2" gutterBottom>
          Holes on
        </Typography>
        <DatePicker label="Date" value={date} onChange={handleDateChange} />
      </Grid>

      <Grid xs={12} display="flex" alignItems="center" flexDirection="column">
        <Typography variant="h2" gutterBottom>
          With
        </Typography>
        <ToggleButtonGroup
          color="primary"
          size="large"
          value={people}
          exclusive
          onChange={handlePeopleChange}
          aria-label="people-input"
        >
          <ToggleButton value={1}>
            <Typography variant="h4">1</Typography>
          </ToggleButton>
          <ToggleButton value={2}>
            <Typography variant="h4">2</Typography>
          </ToggleButton>
          <ToggleButton value={3}>
            <Typography variant="h4">3</Typography>
          </ToggleButton>
          <ToggleButton value={4}>
            <Typography variant="h4">4</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>

      <Grid xs={12} display="flex" alignItems="center" flexDirection="column">
        <Typography variant="h2" gutterBottom>
          {people === 1 ? "Person" : "People"} in the
        </Typography>
        <ToggleButtonGroup
          color="primary"
          size="large"
          value={times}
          onChange={handleTimesChange}
          aria-label="times-input"
        >
          <ToggleButton value={TIMES.AM}>
            <Typography variant="h6">Morning</Typography>
          </ToggleButton>
          <ToggleButton value={TIMES.NOON}>
            <Typography variant="h6">Midday</Typography>
          </ToggleButton>
          <ToggleButton value={TIMES.PM}>
            <Typography variant="h6">Afternoon</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>

      <Grid xs={12} display="flex" alignItems="center" flexDirection="column">
        <Button
          variant="contained"
          size="large"
          endIcon={<GolfCourseIcon />}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchForm;
