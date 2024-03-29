import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { TeeTime } from "../../server/types/TeeTime";
import { updateTeeTimes } from "../redux/teeTimesSlice";
import Header from "./Header";
import Filter from "./Filter";
import CourseCard from "./CourseCard";

const TeeTimes: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const date = useAppSelector((state) => state.date.value);
  const teeTimesByCourse = useAppSelector((state) => state.teeTimes.value);
  const courseIds = Object.keys(teeTimesByCourse);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (date) {
      setLoading(true);
      fetchTeeTimes();
    } else {
      navigate("/");
    }
  }, [date]);

  const fetchTeeTimes = async () => {
    const resp = await axios.get<Array<TeeTime>>(
      "http://localhost:3000/api/tee-times",
      {
        params: { date },
      }
    );
    dispatch(updateTeeTimes(resp.data));
    setLoading(false);
  };

  const renderTeeTime = (courseId: string) => {
    const course = teeTimesByCourse[courseId];

    return (
      <Box key={course.courseId}>
        <CourseCard course={course} />
      </Box>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Box>
          <CircularProgress />
        </Box>
      );
    }
    if (!courseIds.length) {
      return <Box>No tee times</Box>;
    }
    return (
      <Box
        sx={{
          display: "grid",
          columnGap: 3,
          rowGap: 1,
        }}
      >
        {courseIds.map(renderTeeTime)}
      </Box>
    );
  };

  return (
    <Box>
      <Header />
      <Filter />
      {renderContent()}
    </Box>
  );
};

export default TeeTimes;