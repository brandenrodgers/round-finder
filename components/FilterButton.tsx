"use client";

import React, { useState } from "react";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Grid from "@mui/material/Unstable_Grid2";
import { Holes, Players } from "@/lib/types";
import { updateFilter } from "@/store/filterSlice";
import HolesPicker from "./inputs/HolesPicker";
import PlayersPicker from "./inputs/PlayersPicker";
import TimesPicker from "./inputs/TimesPicker";
import RangePicker from "./inputs/RangePicker";
import { getFilter } from "@/store/selectors";

const FilterButton: React.FC<{ iconOnly?: boolean }> = ({ iconOnly }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const filter = useAppSelector(getFilter);
  const [holes, setHoles] = useState(filter.holes || (9 as Holes));
  const [players, setPlayers] = useState(filter.players || (1 as Players));
  const [times, setTimes] = useState<number[]>(filter.times || [7, 11]);
  const [range, setRange] = useState(filter.range || false);

  const dispatch = useAppDispatch();

  const handleDrawerClose = () => {
    dispatch(updateFilter({ holes, players, times, range: range || undefined }));
    setDrawerOpen(false);
  };

  if (!filter.holes || !filter.players || !filter.times) return null;

  const timeLabel = `${dayjs().hour(filter.times[0]).format("h a")}–${dayjs()
    .hour(filter.times[1])
    .format("h a")}`;
  const summary = `${filter.holes}H · ${filter.players}P · ${timeLabel}${filter.range ? " · Range" : ""}`;

  return (
    <>
      {iconOnly ? (
        <IconButton
          onClick={() => setDrawerOpen(true)}
          size="small"
          color="primary"
          aria-label={`Filter: ${summary}`}
        >
          <FilterAltIcon />
        </IconButton>
      ) : (
        <Button
          variant="text"
          endIcon={<FilterAltIcon />}
          onClick={() => setDrawerOpen(true)}
          aria-label={`Filter: ${summary}`}
        >
          Filter
        </Button>
      )}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            background: "rgba(255, 255, 255, 0.78)",
            backdropFilter: "blur(14px)",
          },
        }}
      >
        <Grid container rowSpacing={2.5} paddingBottom={8} marginY={2}>
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

          <Grid
            xs={12}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <RangePicker
              value={range}
              onChange={(newValue) => setRange(newValue)}
            />
          </Grid>

          <Grid
            xs={12}
            display="flex"
            alignItems="center"
            flexDirection="column"
            pt={0.5}
          >
            <Button
              variant="contained"
              size="medium"
              endIcon={<FilterAltIcon />}
              onClick={handleDrawerClose}
              sx={{ borderRadius: 999, px: 4 }}
            >
              Apply
            </Button>
          </Grid>
        </Grid>
      </Drawer>
    </>
  );
};

export default FilterButton;
