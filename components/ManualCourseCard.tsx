"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Course } from "@/lib/types";
import { getRankInfo } from "@/lib/rankInfo";
import { haversineDistance } from "@/lib/distance";
import { getLocation } from "@/store/selectors";
import { useAppSelector } from "@/store/hooks";

type ManualCourseCardProps = {
  course: Course;
};

const ManualCourseCard: React.FC<ManualCourseCardProps> = ({ course }) => {
  const location = useAppSelector(getLocation);

  const distanceMi =
    location && course.coordinates
      ? haversineDistance(location, course.coordinates)
      : null;

  const renderRankIcon = () => {
    const { Icon, color } = getRankInfo(course.rank);
    return <Icon sx={{ fontSize: 16, color }} />;
  };

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: 1.25,
        cursor: "default",
        "&:hover": { transform: "none", boxShadow: "none" },
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          flexShrink: 0,
          borderRadius: 0.75,
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
          <GolfCourseIcon sx={{ color: "primary.dark", fontSize: 24 }} />
        )}
      </Box>

      <Box sx={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 0.75 }}>
        {renderRankIcon()}
        <Typography variant="body2" fontWeight={600} noWrap>
          {course.courseName}
        </Typography>
        {distanceMi !== null && (
          <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
            {distanceMi.toFixed(1)} mi
          </Typography>
        )}
      </Box>

      <Button
        size="small"
        variant="outlined"
        endIcon={<OpenInNewIcon sx={{ fontSize: "13px !important" }} />}
        onClick={() => window.open(course.bookLink, "_blank", "noreferrer")}
        sx={{ flexShrink: 0, borderRadius: 999, fontSize: "0.7rem" }}
      >
        Book
      </Button>
    </Card>
  );
};

export default ManualCourseCard;
