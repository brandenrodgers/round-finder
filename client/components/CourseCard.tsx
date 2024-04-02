import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Course } from "../../server/types/Course";
import { useNavigate } from "react-router-dom";

type CourseCardPropTypes = {
  course: Course;
};

const CourseCard: React.FC<CourseCardPropTypes> = ({ course }) => {
  const navigate = useNavigate();

  if (course.teeTimes) {
    return (
      <Card
        sx={{ maxWidth: 345 }}
        onClick={() => navigate(`/tee-times/${course.courseId}`)}
        elevation={4}
      >
        <CardMedia
          sx={{ height: 140 }}
          image={course.courseImage}
          title="course-photo"
        />
        <CardContent sx={{ pb: 0 }}>
          <Typography variant="h5" component="div">
            {course.courseName}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body1" component="div" color="primary">
            {course.teeTimes.length} tee times
          </Typography>
        </CardContent>
      </Card>
    );
  }
  return <Box>No tee times for this course</Box>;
};

export default CourseCard;
