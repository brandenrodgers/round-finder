import axios from "axios";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Courses } from "../../../server/types/Course";
import { updateCourses } from "../../redux/courseSlice";
import CourseCard from "../CourseCard";
import { getDate, getFilteredTeeTimes } from "../../hooks/selectors";

const CourseListingsView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const date = useAppSelector(getDate);
  const teeTimesByCourse = useAppSelector(getFilteredTeeTimes);
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

  const renderCourseCard = (courseId: string) => {
    const course = teeTimesByCourse[courseId];

    return (
      <Box key={course.courseId} sx={{ px: 2 }}>
        <CourseCard course={course} />
      </Box>
    );
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

  if (!courseIds.length) {
    return <Box>No tee times</Box>;
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
