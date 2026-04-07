"use client";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SportsGolfIcon from "@mui/icons-material/SportsGolf";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PlayersIcon from "./PlayersIcon";
import { TeeTime } from "@/lib/types";

dayjs.extend(customParseFormat);

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
      sx={{
        width: 325,
        cursor: bookLink ? "pointer" : "default",
        borderLeft: (theme) => `4px solid ${theme.palette.primary.main}`,
      }}
      onClick={() => {
        if (bookLink) {
          const bookingSiteUrl = new URL(bookLink);
          const formattedDate = dayjs(date).format("YYYY-MM-DD");
          bookingSiteUrl.searchParams.append("date", formattedDate);
          window.open(bookingSiteUrl, "_blank", "noreferrer");
        }
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1.5,
          }}
        >
          <Typography
            sx={{
              fontFamily: "var(--font-display), serif",
              fontSize: "2rem",
              lineHeight: 1,
              color: "text.primary",
            }}
          >
            {dayjs(
              `${teeTime.time.hours}:${teeTime.time.minutes}`,
              "H:m"
            ).format("h:mm a")}
          </Typography>
          <OpenInNewIcon
            sx={{ color: "text.disabled", fontSize: 16, mt: 0.5 }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 2.5, mb: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <SportsGolfIcon
              sx={{ fontSize: 16, color: "primary.main" }}
            />
            <Typography variant="body2" fontWeight={500} color="text.secondary">
              {teeTime.holes} holes
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <Box sx={{ display: "flex", color: "primary.main", "& svg": { fontSize: 16 } }}>
              <PlayersIcon players={teeTime.availablePlayers} />
            </Box>
            <Typography variant="body2" fontWeight={500} color="text.secondary">
              {teeTime.availablePlayers}{" "}
              {teeTime.availablePlayers === 1 ? "player" : "players"}
            </Typography>
          </Box>
        </Box>

        <Typography variant="caption" color="text.disabled">
          Starting from the {teeTime.startSide}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TeeTimeCard;
