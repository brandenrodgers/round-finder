"use client";

import { useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IosShareIcon from "@mui/icons-material/IosShare";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SportsGolfIcon from "@mui/icons-material/SportsGolf";
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const params = new URLSearchParams({
      courseId: teeTime.courseId,
      date: date ?? "",
      time: `${teeTime.time.hours}-${teeTime.time.minutes}`,
      holes: String(teeTime.holes),
      side: teeTime.startSide,
    });
    const url = `${window.location.origin}/share?${params.toString()}`;
    const formattedTime = dayjs(
      `${teeTime.time.hours}:${teeTime.time.minutes}`,
      "H:m"
    ).format("h:mm a");
    const shareData = {
      title: `Tee time at ${teeTime.courseName}`,
      text: `Want to join a round? ${teeTime.holes} holes at ${teeTime.courseName} on ${date} at ${formattedTime}.`,
      url,
    };
    if (navigator.share && navigator.canShare?.(shareData)) {
      await navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(url);
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography variant="caption" fontWeight={500} color="text.disabled">
                Book
              </Typography>
              <OpenInNewIcon sx={{ color: "text.disabled", fontSize: 16 }} />
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 2.5 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <SportsGolfIcon sx={{ fontSize: 16, color: "primary.main" }} />
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

          <Divider sx={{ mt: 1.5, mb: 0.5, mx: -2 }} />

          <Box sx={{ mx: -1, mb: -2 }}>
            <IconButton
              size="small"
              onClick={handleShare}
              aria-label="Share tee time"
              sx={{ color: "primary.main", gap: 0.75, borderRadius: 1.5, px: 1, py: 0.75, width: "100%" }}
            >
              <IosShareIcon sx={{ fontSize: 20 }} />
              <Typography variant="body2" fontWeight={600} color="primary.main">
                Share this tee time
              </Typography>
            </IconButton>
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          icon={<CheckCircleIcon fontSize="small" />}
          severity="success"
          onClose={() => setSnackbarOpen(false)}
          sx={{ fontWeight: 600, borderRadius: 2, boxShadow: 3 }}
        >
          Link copied!
        </Alert>
      </Snackbar>
    </>
  );
};

export default TeeTimeCard;
