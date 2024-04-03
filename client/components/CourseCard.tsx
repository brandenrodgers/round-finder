import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import MoodOutlinedIcon from "@mui/icons-material/MoodOutlined";
import SentimentNeutralOutlinedIcon from "@mui/icons-material/SentimentNeutralOutlined";
import MoodBadOutlinedIcon from "@mui/icons-material/MoodBadOutlined";
import { Course } from "../../server/types/Course";
import { useNavigate } from "react-router-dom";

type CourseCardPropTypes = {
  course: Course;
};

const CourseCard: React.FC<CourseCardPropTypes> = ({ course }) => {
  const navigate = useNavigate();

  const renderRankIcon = () => {
    const styles = {
      position: "absolute",
      right: 16,
      bottom: 24,
    };
    if (course.rank > 7) {
      return <MoodOutlinedIcon sx={styles} />;
    }
    if (course.rank > 4) {
      return <SentimentNeutralOutlinedIcon sx={styles} />;
    }
    return <MoodBadOutlinedIcon sx={styles} />;
  };

  if (course.teeTimes && course.teeTimes.length) {
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
        <CardContent sx={{ position: "relative" }}>
          <Typography variant="body1" component="div" color="primary">
            {course.teeTimes.length} tee times
          </Typography>
          {renderRankIcon()}
        </CardContent>
      </Card>
    );
  }
  return <Box>No tee times</Box>;
};

export default CourseCard;
