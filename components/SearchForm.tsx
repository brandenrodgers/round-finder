"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dayjs, { Dayjs } from "dayjs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
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

function getQuickDates() {
  const today = dayjs();
  const dow = today.day(); // 0=Sun … 4=Thu, 5=Fri, 6=Sat
  const tomorrow = today.add(1, "day");

  const daysUntilFriday = ((5 - dow + 7) % 7) || 7;
  const nextFriday = today.add(daysUntilFriday, "day");

  const daysUntilSaturday = ((6 - dow + 7) % 7) || 7;
  const nextSaturday = today.add(daysUntilSaturday, "day");

  // Thu: tomorrow=Fri, so skip Friday but keep Saturday (2 days away)
  // Fri/Sat: show Today + Tomorrow; next Fri/Sat are too far out
  const showToday = dow === 5 || dow === 6;
  const showFriday = dow < 4;
  const showSaturday = dow < 5;

  return [
    ...(showToday ? [{ label: "Today", date: today }] : []),
    { label: "Tomorrow", date: tomorrow },
    ...(showFriday ? [{ label: "Friday", date: nextFriday }] : []),
    ...(showSaturday ? [{ label: "Saturday", date: nextSaturday }] : []),
  ];
}

const SearchForm: React.FC = () => {
  const filter = useAppSelector(getFilter);
  const currentDate = useAppSelector(getDate);

  const [date, setDate] = React.useState(
    currentDate ? dayjs(currentDate) : dayjs()
  );
  const [holes, setHoles] = useState(filter.holes || (9 as Holes));
  const [players, setPlayers] = useState(filter.players || (1 as Players));
  const [times, setTimes] = useState<number[]>(filter.times || [7, 11]);
  const [isSearching, setIsSearching] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setDate(newValue);
    }
  };

  const handleSearch = () => {
    setIsSearching(true);
    dispatch(updateDate(date.format("MM/DD/YYYY")));
    dispatch(updateFilter({ holes, players, times }));
    setTimeout(() => router.push("/tee-times"), 650);
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
          py: { xs: 1.5, sm: 3 },
          px: 1,
          background: "rgba(255, 255, 255, 0.78)",
          backdropFilter: "blur(14px)",
          border: "1px solid rgba(255, 255, 255, 0.5)",
          borderRadius: 2,
          animation: "fadeUp 0.4s ease-out both",
          "@keyframes fadeUp": {
            from: { opacity: 0, transform: "translateY(14px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
        elevation={0}
      >
        <Grid container rowSpacing={{ xs: 1.5, sm: 2.5 }}>
          <Grid
            xs={12}
            display="flex"
            alignItems="center"
            flexDirection="column"
          >
            <Typography
              variant="overline"
              color="text.secondary"
              sx={{ letterSpacing: "0.12em", mb: { xs: 0.25, sm: 0.5 } }}
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
              sx={{ letterSpacing: "0.12em", mb: { xs: 0.25, sm: 0.5 } }}
            >
              Date
            </Typography>
            <DatePicker label="Date" value={date} onChange={handleDateChange} />
            <Box sx={{ display: "flex", gap: 0.75, mt: 1 }}>
              {getQuickDates().map(({ label, date: quickDate }) => (
                <Chip
                  key={label}
                  label={label}
                  size="small"
                  onClick={() => setDate(quickDate)}
                  variant={date.isSame(quickDate, "day") ? "filled" : "outlined"}
                  color={date.isSame(quickDate, "day") ? "primary" : "default"}
                  sx={{ cursor: "pointer" }}
                />
              ))}
            </Box>
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
              sx={{ letterSpacing: "0.12em", mb: { xs: 0.25, sm: 0.5 } }}
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
              sx={{ letterSpacing: "0.12em", mb: { xs: 0.25, sm: 0.5 } }}
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
              disabled={!holes || !players || !times.length || isSearching}
              onClick={handleSearch}
              sx={{
                borderRadius: 999,
                py: { xs: 1, sm: 1.5 },
                transition: "transform 0.1s ease",
                "&:active": { transform: "scale(0.97)" },
                ...(isSearching && {
                  background:
                    "linear-gradient(to right, #3BA783 50%, #0D9465 50%)",
                  backgroundSize: "200% 100%",
                  backgroundPosition: "100% center",
                  animation: "chargeFill 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                  "@keyframes chargeFill": {
                    "0%": { backgroundPosition: "100% center", transform: "scale(0.97)" },
                    "10%": { transform: "scale(1)" },
                    "70%": { backgroundPosition: "0% center" },
                    "83%": { backgroundPosition: "0% center", filter: "brightness(1.15)", transform: "scale(1.03)" },
                    "100%": { backgroundPosition: "0% center", filter: "brightness(1)", transform: "scale(1)" },
                  },
                }),
              }}
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
