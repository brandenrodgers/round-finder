"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import SportsGolf from "@mui/icons-material/SportsGolf";
import { Course } from "@/lib/types";
import { getRankInfo } from "@/lib/rankInfo";
import { haversineDistance } from "@/lib/distance";
import { getLocation } from "@/store/selectors";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";

type CourseCardPropTypes = {
  course: Course;
};

const CourseCard: React.FC<CourseCardPropTypes> = ({ course }) => {
  const router = useRouter();
  const location = useAppSelector(getLocation);

  const distanceMi =
    location && course.coordinates
      ? haversineDistance(location, course.coordinates)
      : null;

  if (course.teeTimes && course.teeTimes.length) {
    return (
      <Card
        sx={{ maxWidth: 345, cursor: "pointer" }}
        onClick={() => router.push(`/tee-times/${course.courseId}`)}
      >
        <Box sx={{ position: "relative" }}>
          <Box sx={{ paddingTop: "40%", position: "relative" }}>
            <CardMedia
              sx={{ position: "absolute", inset: 0, height: "100%" }}
              image={course.courseImage}
              title="course-photo"
            />
          </Box>
          {(() => {
            const { Icon, label, color } = getRankInfo(course.rank);
            return (
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  bgcolor: "rgba(255,255,255,0.92)",
                  borderRadius: "50px",
                  height: 28,
                  px: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                <Icon sx={{ fontSize: 18, color }} />
                <Typography variant="caption" sx={{ fontWeight: 700, color, lineHeight: 1 }}>
                  {label}
                </Typography>
              </Box>
            );
          })()}
        </Box>
        <CardContent sx={{ pb: "12px !important" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontFamily: "var(--font-display), serif", mb: 0.25 }}
          >
            {course.courseName}
          </Typography>
          {course.location && (
            <Typography
              variant="caption"
              sx={{ color: "text.secondary", display: "block", mb: 0.75 }}
            >
              {course.location}
            </Typography>
          )}
          <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}>
            <Chip
              label={`${course.teeTimes.length} tee times`}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 600, fontSize: "0.75rem" }}
            />
            {course.nineHoleOnly && (
              <Chip
                label="9 holes"
                size="small"
                variant="outlined"
                sx={{ fontWeight: 600, fontSize: "0.75rem" }}
              />
            )}
            {course.hasRange && (
              <Chip
                label="range"
                size="small"
                variant="outlined"
                icon={<SportsGolf />}
                sx={{ fontWeight: 600, fontSize: "0.75rem" }}
              />
            )}
            {distanceMi !== null && (
              <Chip
                label={`${distanceMi.toFixed(1)} mi`}
                size="small"
                variant="outlined"
                sx={{ fontWeight: 600, fontSize: "0.75rem" }}
              />
            )}
          </Box>
        </CardContent>
      </Card>
    );
  }
  return <Box>No tee times</Box>;
};

export default CourseCard;
