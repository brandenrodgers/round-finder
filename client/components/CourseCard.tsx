import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import MoodOutlinedIcon from "@mui/icons-material/MoodOutlined";
import SentimentNeutralOutlinedIcon from "@mui/icons-material/SentimentNeutralOutlined";
import MoodBadOutlinedIcon from "@mui/icons-material/MoodBadOutlined";
import { styled } from "@mui/material/styles";
import { Course } from "../../server/types/Course";
import { useNavigate } from "react-router-dom";

type CourseCardPropTypes = {
  course: Course;
};

const CardContentNoPadding = styled(CardContent)(`
  &:last-child {
    padding-bottom: 8px;
  }
`);

const CourseCard: React.FC<CourseCardPropTypes> = ({ course }) => {
  const navigate = useNavigate();

  const renderRankIcon = () => {
    const styles = {
      position: "absolute",
      right: 16,
      bottom: 8,
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
        <CardContentNoPadding sx={{ position: "relative" }}>
          <Typography variant="body1" component="div" color="primary">
            {course.teeTimes.length} tee times
          </Typography>
          {renderRankIcon()}
        </CardContentNoPadding>
      </Card>
    );
  }
  return <Box>No tee times</Box>;
};

export default CourseCard;
