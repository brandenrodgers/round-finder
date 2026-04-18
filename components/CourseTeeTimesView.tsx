"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { TeeTime } from "@/lib/types";
import TeeTimeCard from "./TeeTimeCard";
import { getDate, getFilteredTeeTimesMemoized, getFavorites } from "@/store/selectors";
import { toggleFavorite } from "@/store/favoritesSlice";
import { HIDDEN_HEADER_ID } from "@/lib/constants";

const CourseTeeTimesView: React.FC = () => {
  const params = useParams();
  const courseId = params?.courseId as string | undefined;
  const date = useAppSelector(getDate);
  const courses = useAppSelector(getFilteredTeeTimesMemoized);
  const course = courseId ? courses[courseId] : null;
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector(getFavorites);
  const isFavorite = courseId ? favoriteIds.includes(courseId) : false;
  const [justToggled, setJustToggled] = useState(false);

  const handleFavoriteClick = () => {
    if (!courseId) return;
    dispatch(toggleFavorite(courseId));
    setJustToggled(true);
    setTimeout(() => setJustToggled(false), 350);
  };

  const router = useRouter();

  useEffect(() => {
    // Scroll back to top
    const hiddenHeaderElement = document.querySelector(`#${HIDDEN_HEADER_ID}`);
    if (hiddenHeaderElement) {
      hiddenHeaderElement.scrollIntoView();
    }

    if (!course) {
      router.push("/");
    }
  }, [course]);

  const renderTeeTime = (teeTime: TeeTime, index: number) => {
    return (
      <Box
        key={`${index}-${teeTime.time}`}
        sx={{
          animation: "cardFadeUp 0.3s ease-out both",
          animationDelay: `${Math.min(index, 9) * 45}ms`,
          "@keyframes cardFadeUp": {
            from: { opacity: 0, transform: "translateY(12px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}
      >
        <TeeTimeCard
          bookLink={course ? course.bookLink : undefined}
          date={date}
          teeTime={teeTime}
        />
      </Box>
    );
  };

  const renderTeeTimes = () => {
    if (course && course.teeTimes && course.teeTimes.length) {
      return (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 360px))",
            gap: 2.5,
            justifyContent: "center",
            pt: 2.5,
            px: 2,
          }}
        >
          {course.teeTimes.map(renderTeeTime)}
        </Box>
      );
    }
    return <Box>No tee times</Box>;
  };

  const renderContent = () => {
    if (course) {
      return (
        <Box>
          <Box sx={{ position: "relative" }}>
            <CardMedia
              sx={{ height: 200 }}
              image={course.courseImage}
              title="course-photo"
            />
            <IconButton
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "rgba(255,255,255,0.92)",
                "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                width: 36,
                height: 36,
                ...(justToggled && {
                  animation: "favPop 0.35s ease-out",
                  "@keyframes favPop": {
                    "0%": { transform: "scale(1)" },
                    "40%": { transform: "scale(1.45)" },
                    "70%": { transform: "scale(0.88)" },
                    "100%": { transform: "scale(1)" },
                  },
                }),
              }}
            >
              {isFavorite ? (
                <FavoriteIcon sx={{ fontSize: 20, color: "error.main" }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: 20, color: "text.secondary" }} />
              )}
            </IconButton>
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
                {course.courseName}
              </Typography>
              {course.location && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.85)",
                    textShadow: "0 1px 3px rgba(0,0,0,0.4)",
                    mt: 0.25,
                  }}
                >
                  {course.location}
                </Typography>
              )}
            </Box>
          </Box>
          {renderTeeTimes()}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box
      sx={{
        pb: 10,
        backgroundColor: (theme) => theme.palette.secondary.light,
      }}
    >
      {renderContent()}
    </Box>
  );
};

export default CourseTeeTimesView;
