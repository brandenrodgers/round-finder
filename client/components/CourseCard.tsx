import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { Course } from "../types/Course";

type CourseCardPropTypes = {
  course: Course;
};

const DisplayCard = styled(Paper)(() => ({
  textAlign: "center",
  height: 60,
  lineHeight: "60px",
}));

const CourseCard: React.FC<CourseCardPropTypes> = ({ course }) => {
  return (
    <Box>
      <DisplayCard>
        <Typography variant="h5">
          {course.courseName} has {course.teeTimes.length} tee times available
        </Typography>
      </DisplayCard>
    </Box>
  );
};

export default CourseCard;
