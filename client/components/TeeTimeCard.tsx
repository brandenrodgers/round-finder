import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SportsGolfIcon from "@mui/icons-material/SportsGolf";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { TeeTime } from "../../server/types/TeeTime";

dayjs.extend(customParseFormat);

type TeeTimeCardPropTypes = {
  bookLink?: string;
  teeTime: TeeTime;
};

const TeeTimeCard: React.FC<TeeTimeCardPropTypes> = ({ bookLink, teeTime }) => {
  return (
    <Card
      sx={{ maxWidth: 345, minWidth: 300 }}
      elevation={5}
      onClick={() => {
        if (bookLink) {
          window.open(bookLink, "_blank");
        }
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          backgroundColor: (theme) => theme.palette.primary.light,
        }}
      >
        <AccessTimeIcon
          fontSize="large"
          sx={{ color: "primary.contrastText" }}
        />
        <Typography variant="h4" component="div" color="primary.contrastText">
          {dayjs(`${teeTime.time.hours}:${teeTime.time.minutes}`, "H:m").format(
            "h:mm a"
          )}
        </Typography>
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <SportsGolfIcon />
          <Typography variant="h6" color="text.secondary">
            {teeTime.holes} Holes
          </Typography>
        </CardContent>
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <PersonIcon />
          <Typography variant="h6" color="text.secondary">
            {teeTime.availablePlayers} Players
          </Typography>
        </CardContent>
      </Box>
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="body1" color="text.secondary">
          Teeing off from the {teeTime.startSide}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TeeTimeCard;
