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

const CourseTeeTimesView: React.FC = () => {
  const { courseId } = useParams();
  const course = useAppSelector((state) =>
    courseId ? state.teeTimes.value[courseId] : null
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!course) {
      navigate("/");
    }
  }, [course]);

  const renderTeeTime = (teeTime: TeeTime, index: number) => {
    return (
      <Box key={`${index}-${teeTime.time}`}>
        <TeeTimeCard teeTime={teeTime} />
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
            sx={{ pb: 2, display: "flex", justifyContent: "center" }}
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
        sx={{ pb: 2, px: 2, display: "flex", justifyContent: "space-between" }}
      >
        <Button
          variant="outlined"
          size="small"
          startIcon={<ChevronLeftIcon />}
          onClick={() => navigate("/tee-times")}
        >
          Back
        </Button>
        <Button
          variant="outlined"
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
