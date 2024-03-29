import React from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../hooks/redux";

const Filter: React.FC = () => {
  const filter = useAppSelector((state) => state.filter.value);

  if (!filter.holes || !filter.people) {
    return null;
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5" component="div">
        Playing {filter.holes} holes with {filter.people}{" "}
        {filter.people === 1 ? "person" : "people"} in the{" "}
        {filter.times ? filter.times.join(" or ") : ""}
      </Typography>
    </Box>
  );
};

export default Filter;
