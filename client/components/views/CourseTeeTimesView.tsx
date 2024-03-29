import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Header from "../Header";
import { TeeTime } from "../../../server/types/TeeTime";

const DisplayCard = styled(Paper)(() => ({
  textAlign: "center",
  height: 60,
  lineHeight: "60px",
}));

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

  const renderTeeTime = (teeTime: TeeTime) => {
    return (
      <Box key={teeTime.time}>
        <Typography variant="h5">
          {teeTime.availablePlayers} spots for {teeTime.time}
        </Typography>
      </Box>
    );
  };

  const renderTeeTimes = () => {
    if (course && course.teeTimes && course.teeTimes.length) {
      return (
        <Box>
          <Box>{course.teeTimes.map(renderTeeTime)}</Box>
        </Box>
      );
    }
    return <Box>No tee Times</Box>;
  };

  const renderContent = () => {
    if (course) {
      return (
        <Box>
          <Typography variant="h4">{course.courseName}</Typography>
          <Button
            variant="contained"
            size="small"
            href={course.bookLink}
            endIcon={<OpenInNewIcon />}
            target="_blank"
            rel="noreferrer"
          >
            Book
          </Button>
          <Box>{renderTeeTimes()}</Box>
        </Box>
      );
    }
    return <Box>No info for this course</Box>;
  };

  return (
    <Box>
      <Header />
      <Button
        variant="contained"
        size="small"
        onClick={() => navigate("/tee-times")}
      >
        Back
      </Button>
      {renderContent()}
    </Box>
  );
};

export default CourseTeeTimesView;
