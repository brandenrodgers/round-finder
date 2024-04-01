import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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

  useEffect(() => {
    if (date) {
      setLoading(true);
      fetchTeeTimes();
    }
  }, [date]);

  const fetchTeeTimes = async () => {
    const resp = await axios.get<Courses>(
      "http://localhost:3000/api/tee-times",
      {
        params: { date },
      }
    );
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
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              No tee times available
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box
      sx={{
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
