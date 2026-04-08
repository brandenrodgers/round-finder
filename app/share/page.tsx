import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import SportsGolfIcon from "@mui/icons-material/SportsGolf";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import courseHandlers, { manualCourseHandlers } from "@/lib/courseHandlers";
import PlayersIcon from "@/components/PlayersIcon";
import { Handler, ManualHandler } from "@/lib/types";

dayjs.extend(customParseFormat);

type SearchParams = {
  courseId?: string;
  date?: string;
  time?: string;
  holes?: string;
  side?: string;
};

export default async function SharePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { courseId, date, time, holes, side } = searchParams;

  if (!courseId || !date || !time || !holes) {
    notFound();
  }

  const handler =
    (courseHandlers as Record<string, Handler>)[courseId] ??
    (manualCourseHandlers as Record<string, ManualHandler>)[courseId];

  if (!handler) {
    notFound();
  }

  const [hoursStr, minutesStr] = time.split("-");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  let teeTimes: Awaited<ReturnType<Handler["formatResponse"]>> = [];
  if (handler.type === "live") {
    try {
      const resp = await handler.fetchTeeTimes(handler.formatParams({ date }));
      teeTimes = handler.formatResponse(resp);
    } catch {
      // leave teeTimes empty — show "no longer available" below
    }
  }

  const teeTime = teeTimes.find(
    (tt) =>
      tt.time.hours === hours &&
      tt.time.minutes === minutes &&
      tt.holes === Number(holes) &&
      (!side || tt.startSide === side)
  );

  const formattedTime = dayjs(`${hours}:${minutes}`, "H:m").format("h:mm a");
  const formattedDate = dayjs(date, "MM/DD/YYYY").format("dddd, MMMM D");

  let bookingUrl: string | null = null;
  try {
    const url = new URL(handler.bookLink);
    url.searchParams.append(
      "date",
      dayjs(date, "MM/DD/YYYY").format("YYYY-MM-DD")
    );
    bookingUrl = url.toString();
  } catch {
    bookingUrl = null;
  }

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        backgroundColor: "secondary.light",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pb: 10,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 600, position: "relative" }}>
        <CardMedia
          sx={{ height: 220 }}
          image={handler.image}
          title={handler.name}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)",
            px: 2.5,
            pt: 4,
            pb: 1.5,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "white",
              fontFamily: "var(--font-display), serif",
              textShadow: "0 1px 3px rgba(0,0,0,0.4)",
            }}
          >
            {handler.name}
          </Typography>
          {handler.location && (
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.85)",
                textShadow: "0 1px 3px rgba(0,0,0,0.4)",
                mt: 0.25,
              }}
            >
              {handler.location}
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ px: 3, pt: 4, pb: 2.5, textAlign: "center", maxWidth: 480 }}>
        <Typography
          sx={{
            fontFamily: "var(--font-display), serif",
            fontSize: "1.75rem",
            lineHeight: 1.2,
            mb: 0.75,
          }}
        >
          Want to join a round?
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {formattedDate} at {formattedTime}
        </Typography>
      </Box>

      <Box
        sx={{
          mx: 3,
          p: 2.5,
          borderRadius: 2,
          backgroundColor: "background.paper",
          borderLeft: teeTime ? "4px solid" : undefined,
          borderColor: teeTime ? "primary.main" : undefined,
          width: "calc(100% - 48px)",
          maxWidth: 432,
          textAlign: teeTime ? "left" : "center",
        }}
      >
        {teeTime ? (
          <>
            <Typography
              sx={{
                fontFamily: "var(--font-display), serif",
                fontSize: "2.5rem",
                lineHeight: 1,
                mb: 1.5,
              }}
            >
              {formattedTime}
            </Typography>
            <Box sx={{ display: "flex", gap: 2.5, mb: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <SportsGolfIcon sx={{ fontSize: 16, color: "primary.main" }} />
                <Typography
                  variant="body2"
                  fontWeight={500}
                  color="text.secondary"
                >
                  {teeTime.holes} holes
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                <Box
                  sx={{
                    display: "flex",
                    color: "primary.main",
                    "& svg": { fontSize: 16 },
                  }}
                >
                  <PlayersIcon players={teeTime.availablePlayers} />
                </Box>
                <Typography
                  variant="body2"
                  fontWeight={500}
                  color="text.secondary"
                >
                  {teeTime.availablePlayers}{" "}
                  {teeTime.availablePlayers === 1 ? "spot" : "spots"} available
                </Typography>
              </Box>
            </Box>
            <Typography variant="caption" color="text.disabled">
              Starting from the {teeTime.startSide}
            </Typography>
          </>
        ) : (
          <Typography color="text.secondary">
            This tee time is no longer available.
          </Typography>
        )}
      </Box>

      {bookingUrl && teeTime && (
        <Box sx={{ mt: 3, px: 3, width: "100%", maxWidth: 480 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
            sx={{ borderRadius: 2, py: 1.5, fontSize: "1rem" }}
          >
            Book this tee time
          </Button>
        </Box>
      )}
    </Box>
  );
}
