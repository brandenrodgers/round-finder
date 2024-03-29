import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Course } from "../../server/types/Course";
import { useNavigate } from "react-router-dom";

type CourseCardPropTypes = {
  course: Course;
};

const DisplayCard = styled(Paper)(() => ({
  textAlign: "center",
  height: 60,
  lineHeight: "60px",
}));

const CourseCard: React.FC<CourseCardPropTypes> = ({ course }) => {
  const navigate = useNavigate();

  if (course.teeTimes) {
    return (
      <Box onClick={() => navigate(`/tee-times/${course.courseId}`)}>
        <DisplayCard elevation={8}>
          <Typography variant="h5">
            {course.courseName} has {course.teeTimes.length} tee times available
          </Typography>
        </DisplayCard>
      </Box>
    );
  }
  return <Box>No tee times for this course</Box>;
};

export default CourseCard;
