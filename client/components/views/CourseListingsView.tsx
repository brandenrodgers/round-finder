import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Courses } from "../../../server/types/Course";
import { updateCourses } from "../../redux/courseSlice";
import CourseCard from "../CourseCard";
import {
  getDate,
  getFilteredTeeTimesMemoized,
  getSortedCourseIdsMemoized,
} from "../../hooks/selectors";

const CourseListingsView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const date = useAppSelector(getDate);
  const filteredTeeTimes = useAppSelector(getFilteredTeeTimesMemoized);
  const sortedCourseIds = useAppSelector(getSortedCourseIdsMemoized);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (date) {
      setLoading(true);
      fetchTeeTimes();
    }
  }, [date]);

  const fetchTeeTimes = async () => {
    const resp = await axios.get<Courses>("/api/tee-times", {
      params: { date },
    });
    dispatch(updateCourses(resp.data));
    setLoading(false);
  };

  const renderCourseCard = (courseId: string) => {
    const course = filteredTeeTimes[courseId];

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
      <Stack spacing={4} sx={{ width: "100%", px: 2, pt: 2 }}>
        <Skeleton variant="rounded" width={"100%"} height={250} />
        <Skeleton variant="rounded" width={"100%"} height={250} />
      </Stack>
    );
  }

  if (!sortedCourseIds.length) {
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
            sx={{ height: 300 }}
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
              Return home
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
      {sortedCourseIds.map(renderCourseCard)}
    </Box>
  );
};

export default CourseListingsView;
