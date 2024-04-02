import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { TeeTime } from "../../../server/types/TeeTime";
import TeeTimeCard from "../TeeTimeCard";
import { getFilteredTeeTimesMemoized } from "../../hooks/selectors";
import { HIDDEN_HEADER_ID } from "../../constants";

const CourseTeeTimesView: React.FC = () => {
  const { courseId } = useParams();
  const courses = useAppSelector(getFilteredTeeTimesMemoized);
  const course = courseId ? courses[courseId] : null;

  const navigate = useNavigate();

  useEffect(() => {
    // Scroll back to top
    const hiddenHeaderElement = document.querySelector(`#${HIDDEN_HEADER_ID}`);
    if (hiddenHeaderElement) {
      hiddenHeaderElement.scrollIntoView();
    }

    if (!course) {
      navigate("/");
    }
  }, [course]);

  const renderTeeTime = (teeTime: TeeTime, index: number) => {
    return (
      <Box key={`${index}-${teeTime.time}`}>
        <TeeTimeCard
          bookLink={course ? course.bookLink : undefined}
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
            rowGap: 3,
            justifyContent: "center",
          }}
        >
          {course.teeTimes.map(renderTeeTime)}
        </Box>
      );
    }
    return <Box>No tee Times</Box>;
  };

  const renderContent = () => {
    if (course) {
      return (
        <Box>
          <Card sx={{ width: "100%", mb: 2 }} elevation={1} square>
            <Box sx={{ position: "relative" }}>
              <CardMedia
                sx={{ height: 200 }}
                image={course.courseImage}
                title="course-photo"
              />
              <Box
                style={{
                  opacity: ".85",
                  minWidth: 275,
                  maxWidth: 300,
                  position: "absolute",
                  color: "white",
                  top: "35%",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <Paper elevation={3}>
                  <Typography
                    variant="h5"
                    sx={{
                      py: 1,
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    {course.courseName}
                  </Typography>
                </Paper>
              </Box>
            </Box>
          </Card>
          {renderTeeTimes()}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box
      sx={{
        pb: 8,
        backgroundColor: (theme) => theme.palette.primary.light,
      }}
    >
      {renderContent()}
    </Box>
  );
};

export default CourseTeeTimesView;
