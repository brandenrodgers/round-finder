import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
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
      >
        <CardMedia
          sx={{ height: 140 }}
          image={course.courseImage}
          title="course-photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {course.courseName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {course.teeTimes.length} tee times
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">See tee times</Button>
        </CardActions>
      </Card>
    );
  }
  return <Box>No tee times for this course</Box>;
};

export default CourseCard;
