import React from "react";
import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../hooks/redux";

const Filter: React.FC = () => {
  const filter = useAppSelector((state) => state.filter.value);

  if (!filter.holes || !filter.people) {
    return null;
  }
  return (
    <Box sx={{ pb: 3 }}>
      <Typography
        variant="h6"
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          columnGap: 1,
        }}
      >
        Playing
        <Typography variant="h6" component="div" color="primary.main">
          {filter.holes}
        </Typography>
        holes with
        <Typography variant="h6" component="div" color="primary.main">
          {filter.people}
        </Typography>
        {filter.people === 1 ? "person" : "people"}
      </Typography>
      <Typography
        variant="h6"
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          columnGap: 1,
        }}
      >
        In the
        <Typography variant="h6" component="div" color="primary.main">
          {filter.times ? filter.times.join(" or ") : ""}
        </Typography>
      </Typography>
    </Box>
  );
};

export default Filter;
