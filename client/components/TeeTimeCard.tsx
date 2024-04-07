import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import SportsGolfIcon from "@mui/icons-material/SportsGolf";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { styled } from "@mui/material/styles";
import PlayersIcon from "./PlayersIcon";
import { TeeTime } from "../../server/types/TeeTime";

dayjs.extend(customParseFormat);

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 8px;
  }
`);

type TeeTimeCardPropTypes = {
  bookLink?: string;
  date: string | null;
  teeTime: TeeTime;
};

const TeeTimeCard: React.FC<TeeTimeCardPropTypes> = ({
  bookLink,
  date,
  teeTime,
}) => {
  return (
    <Card
      sx={{ width: 325 }}
      elevation={5}
      onClick={() => {
        if (bookLink) {
          const bookingSiteUrl = new URL(bookLink);
          const formattedDate = dayjs(date).format("YYYY-MM-DD");
          bookingSiteUrl.searchParams.append("date", formattedDate);
          window.open(bookingSiteUrl, "_blank", "noreferrer");
        }
      }}
    >
      <CardContent
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 1,
          py: 1,
          backgroundColor: (theme) => theme.palette.primary.dark,
        }}
      >
        <AccessTimeIcon
          fontSize="medium"
          sx={{ color: "primary.contrastText" }}
        />
        <Typography variant="h5" component="div" color="primary.contrastText">
          {dayjs(`${teeTime.time.hours}:${teeTime.time.minutes}`, "H:m").format(
            "h:mm a"
          )}
        </Typography>
        <OpenInNewIcon
          sx={{ right: 8, position: "absolute", color: "primary.contrastText" }}
        />
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <CardContentNoPadding
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 1,
          }}
        >
          <SportsGolfIcon />
          <Typography variant="h6" color="text.secondary">
            {teeTime.holes} Holes
          </Typography>
        </CardContentNoPadding>

        <Divider orientation="vertical" flexItem />

        <CardContentNoPadding
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 1,
          }}
        >
          <PlayersIcon players={teeTime.availablePlayers} />
          <Typography variant="h6" color="text.secondary">
            {teeTime.availablePlayers}{" "}
            {teeTime.availablePlayers === 1 ? "Player" : "Players"}
          </Typography>
        </CardContentNoPadding>
      </Box>
      <Divider />
      <CardContentNoPadding
        sx={{ display: "flex", justifyContent: "center", py: 1 }}
      >
        <Typography variant="body1" color="text.secondary">
          Teeing off from the {teeTime.startSide}
        </Typography>
      </CardContentNoPadding>
    </Card>
  );
};

export default TeeTimeCard;
