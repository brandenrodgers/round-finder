"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import SportsGolf from "@mui/icons-material/SportsGolf";
import { Course } from "@/lib/types";
import { getRankInfo } from "@/lib/rankInfo";
import { haversineDistance } from "@/lib/distance";
import { getLocation, getFilter, getDate } from "@/store/selectors";
import { useAppSelector } from "@/store/hooks";

type ManualCourseCardProps = {
  course: Course;
};

const ManualCourseCard: React.FC<ManualCourseCardProps> = ({ course }) => {
  const location = useAppSelector(getLocation);
  const filter = useAppSelector(getFilter);
  const date = useAppSelector(getDate);

  const distanceMi =
    location && course.coordinates
      ? haversineDistance(location, course.coordinates)
      : null;

  const renderRankIcon = () => {
    const { Icon, color } = getRankInfo(course.rank);
    return <Icon sx={{ fontSize: 16, color }} />;
  };

  const handleBook = () => {
    const url = new URL(course.bookLink);
    if (url.hostname.endsWith("cps.golf")) {
      if (filter.times) {
        url.searchParams.set("TeeOffTimeMin", String(filter.times[0]));
        url.searchParams.set("TeeOffTimeMax", String(filter.times[1]));
      }
      if (filter.players) {
        url.searchParams.set("Player", String(filter.players));
      }
      if (filter.holes) {
        url.searchParams.set("Hole", String(filter.holes));
      }
    }
    if (url.hostname === "secure.cambridgema.gov") {
      if (date) {
        url.searchParams.set("begindate", date);
      }
      if (filter.players) {
        url.searchParams.set("numberofplayers", String(filter.players));
      }
      if (filter.holes) {
        url.searchParams.set("numberofholes", String(filter.holes));
      }
      if (filter.times) {
        const hour = filter.times[0];
        const period = hour < 12 ? "am" : "pm";
        const hour12 = hour % 12 === 0 ? 12 : hour % 12;
        url.searchParams.set(
          "begintime",
          `${String(hour12).padStart(2, "0")}:00 ${period}`
        );
      }
    }
    window.open(url.toString(), "_blank", "noreferrer");
  };

  return (
    <Card
      onClick={handleBook}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 1.25,
        cursor: "pointer",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          flexShrink: 0,
          borderRadius: 1.5,
          overflow: "hidden",
          bgcolor: "secondary.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {course.courseImage ? (
          <Box
            component="img"
            src={course.courseImage}
            alt={course.courseName}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <GolfCourseIcon sx={{ color: "primary.dark", fontSize: 32 }} />
        )}
      </Box>

      <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 0.25 }}>
        <Typography
          variant="body1"
          fontWeight={600}
          sx={{ fontFamily: "var(--font-display), serif", pr: 6 }}
        >
          {course.courseName}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          {renderRankIcon()}
          {course.nineHoleOnly && (
            <Chip
              label="9 holes"
              size="small"
              variant="outlined"
              sx={{ flexShrink: 0, fontSize: "0.7rem" }}
            />
          )}
          {course.hasRange && (
            <Chip
              label="range"
              size="small"
              variant="outlined"
              icon={<SportsGolf />}
              sx={{ flexShrink: 0, fontSize: "0.7rem" }}
            />
          )}
          {distanceMi !== null && (
            <Chip
              label={`${distanceMi.toFixed(1)} mi`}
              size="small"
              variant="outlined"
              sx={{ flexShrink: 0, fontSize: "0.7rem" }}
            />
          )}
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 12,
          display: "flex",
          alignItems: "center",
          gap: 0.25,
          color: "text.secondary",
        }}
      >
        <Typography variant="caption" sx={{ fontWeight: 700, lineHeight: 1 }}>
          Book
        </Typography>
        <OpenInNewIcon sx={{ fontSize: 12 }} />
      </Box>
    </Card>
  );
};

export default ManualCourseCard;
