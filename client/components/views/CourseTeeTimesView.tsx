import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Typography from "@mui/material/Typography";
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
          <Typography
            variant="h4"
            sx={{
              pb: 2,
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            {course.courseName}
          </Typography>
          {renderTeeTimes()}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box>
      <Box
        sx={{ pb: 2, px: 2, display: "flex", justifyContent: "space-evenly" }}
      >
        <Button
          variant="contained"
          color="secondary"
          size="small"
          startIcon={<ChevronLeftIcon />}
          onClick={() => navigate("/tee-times")}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          href={course ? course.bookLink : ""}
          endIcon={<OpenInNewIcon />}
          target="_blank"
          rel="noreferrer"
        >
          Book
        </Button>
      </Box>
      {renderContent()}
    </Box>
  );
};

export default CourseTeeTimesView;
