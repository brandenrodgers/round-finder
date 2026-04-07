"use client";

import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { TeeTime } from "@/lib/types";
import TeeTimeCard from "./TeeTimeCard";
import { getDate, getFilteredTeeTimesMemoized } from "@/store/selectors";
import { HIDDEN_HEADER_ID } from "@/lib/constants";

const CourseTeeTimesView: React.FC = () => {
  const params = useParams();
  const courseId = params?.courseId as string | undefined;
  const date = useAppSelector(getDate);
  const courses = useAppSelector(getFilteredTeeTimesMemoized);
  const course = courseId ? courses[courseId] : null;

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
      <Box key={`${index}-${teeTime.time}`}>
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
