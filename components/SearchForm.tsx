"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Holes, Players } from "@/lib/types";
import { updateFilter } from "@/store/filterSlice";
import { updateDate } from "@/store/dateSlice";
import HolesPicker from "./inputs/HolesPicker";
import PlayersPicker from "./inputs/PlayersPicker";
import TimesPicker from "./inputs/TimesPicker";
import { getDate, getFilter } from "@/store/selectors";

const SearchForm: React.FC = () => {
  const filter = useAppSelector(getFilter);
  const currentDate = useAppSelector(getDate);

  const [date, setDate] = React.useState(
    currentDate ? dayjs(currentDate) : dayjs()
  );
  const [holes, setHoles] = useState(filter.holes || (9 as Holes));
  const [players, setPlayers] = useState(filter.players || (1 as Players));
  const [times, setTimes] = useState<number[]>(filter.times || [7, 11]);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setDate(newValue);
    }
  };

  const handleSearch = () => {
    dispatch(updateDate(date.format("MM/DD/YYYY")));
    dispatch(updateFilter({ holes, players, times }));
    router.push("/tee-times");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Paper
        sx={{
          width: "90%",
          maxWidth: 560,
          py: 3,
          px: 1,
          background: "rgba(255, 255, 255, 0.78)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          borderRadius: 3,
          animation: "fadeUp 0.4s ease-out both",
          "@keyframes fadeUp": {
            from: { opacity: 0, transform: "translateY(14px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
        elevation={0}
      >
        <Grid container rowSpacing={2.5}>
          <Grid
            xs={12}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ letterSpacing: "0.12em", mb: 0.5 }}
            >
              Holes
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
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ letterSpacing: "0.12em", mb: 0.5 }}
            >
              Date
            </Typography>
            <DatePicker label="Date" value={date} onChange={handleDateChange} />
          </Grid>

          <Grid
            xs={12}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ letterSpacing: "0.12em", mb: 0.5 }}
            >
              Players
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
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ letterSpacing: "0.12em", mb: 0.5 }}
            >
              Time
            </Typography>
            <TimesPicker
              value={times}
              onChange={(newTimes) => setTimes(newTimes)}
            />
          </Grid>

          <Grid xs={12} px={2} pt={0.5}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<SearchIcon />}
              disabled={!holes || !players || !times.length}
              onClick={handleSearch}
              sx={{ borderRadius: 999, py: 1.5 }}
            >
              Find tee times
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SearchForm;
