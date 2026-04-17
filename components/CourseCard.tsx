"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SportsGolf from "@mui/icons-material/SportsGolf";
import { Course } from "@/lib/types";
import { getRankInfo } from "@/lib/rankInfo";
import { haversineDistance } from "@/lib/distance";
import { getLocation, getFavorites } from "@/store/selectors";
import { toggleFavorite } from "@/store/favoritesSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";

type CourseCardPropTypes = {
  course: Course;
};

const CourseCard: React.FC<CourseCardPropTypes> = ({ course }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const location = useAppSelector(getLocation);
  const favoriteIds = useAppSelector(getFavorites);
  const isFavorite = favoriteIds.includes(course.courseId);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleFavorite(course.courseId));
  };

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
          <IconButton
            size="small"
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            sx={{
              position: "absolute",
              top: 4,
              left: 4,
              bgcolor: "rgba(255,255,255,0.92)",
              "&:hover": { bgcolor: "rgba(255,255,255,1)" },
              width: 28,
              height: 28,
            }}
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ fontSize: 18, color: "error.main" }} />
            ) : (
              <FavoriteBorderIcon sx={{ fontSize: 18, color: "text.secondary" }} />
            )}
          </IconButton>
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
