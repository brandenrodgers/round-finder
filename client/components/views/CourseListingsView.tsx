import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Courses } from "../../../server/types/Course";
import { updateCourses } from "../../redux/courseSlice";
import CourseCard from "../CourseCard";
import { getDate, getFilteredTeeTimesMemoized } from "../../hooks/selectors";

const CourseListingsView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const date = useAppSelector(getDate);
  const teeTimesByCourse = useAppSelector(getFilteredTeeTimesMemoized);
  const courseIds = Object.keys(teeTimesByCourse);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (date) {
      setLoading(true);
      fetchTeeTimes();
    }
  }, [date]);

  const fetchTeeTimes = async () => {
    // const apiDomain = "http://localhost:3000";
    const resp = await axios.get<Courses>("/tee-times", {
      params: { date },
    });
    dispatch(updateCourses(resp.data));
    setLoading(false);
  };

  const doAnyTeeTimesExist = (): boolean => {
    return courseIds.some((courseId) => {
      if (teeTimesByCourse[courseId]) {
        const teeTimesForCourse = teeTimesByCourse[courseId].teeTimes;
        return teeTimesForCourse && teeTimesForCourse.length;
      }
      return false;
    });
  };

  const renderCourseCard = (courseId: string) => {
    const course = teeTimesByCourse[courseId];

    if (course && course.teeTimes && course.teeTimes.length) {
      return (
        <Box key={course.courseId} sx={{ px: 2 }}>
          <CourseCard course={course} />
        </Box>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Grid container minHeight={160}>
        <Grid xs display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  if (!courseIds.length || !doAnyTeeTimesExist()) {
    return (
      <Box
        sx={{
          pt: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card sx={{ width: "90%" }}>
          <CardContent>
            <Typography
              sx={{ textAlign: "center" }}
              variant="h5"
              component="div"
            >
              No tee times available
            </Typography>
          </CardContent>
          <CardMedia
            sx={{ height: 400 }}
            image="https://media.licdn.com/dms/image/C4E22AQH5mTLVpm2nnQ/feedshare-shrink_2048_1536/0/1647445330420?e=2147483647&v=beta&t=Us_zEwUdaj6db4-cDfnXVOO1_3RnIcFtXsuICOYp8qk"
            title="no-tee-times-photo"
          />
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/")}
            >
              Return to home
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        pt: 2,
        pb: 8,
        display: "grid",
        rowGap: 3,
        justifyContent: "center",
      }}
    >
      {courseIds.map(renderCourseCard)}
    </Box>
  );
};

export default CourseListingsView;
