"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SportsGolfIcon from "@mui/icons-material/SportsGolf";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Courses } from "@/lib/types";
import { updateCourses } from "@/store/courseSlice";
import CourseCard from "./CourseCard";
import ManualCourseCard from "./ManualCourseCard";
import WeatherBanner from "./WeatherBanner";
import type { WeatherData } from "@/lib/weather";
import {
  getDate,
  getFilteredTeeTimesMemoized,
  getLocation,
  getManualCoursesMemoized,
  getSortedCourseIdsMemoized,
} from "@/store/selectors";

const ManualCoursesSection: React.FC = () => {
  const manualCourses = useAppSelector(getManualCoursesMemoized);

  if (!manualCourses.length) return null;

  return (
    <Box sx={{ width: "100%", px: 2, pt: 3 }}>
      <Box sx={{ maxWidth: 500, mx: "auto" }}>
        <Typography
          variant="overline"
          color="text.disabled"
          sx={{ letterSpacing: "0.1em", display: "block", mb: 1, px: 0.5 }}
        >
          Also nearby — check availability yourself
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {manualCourses.map((course) => (
            <ManualCourseCard key={course.courseId} course={course} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const CourseListingsView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const date = useAppSelector(getDate);
  const location = useAppSelector(getLocation);
  const filteredTeeTimes = useAppSelector(getFilteredTeeTimesMemoized);
  const sortedCourseIds = useAppSelector(getSortedCourseIdsMemoized);

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (date) {
      setLoading(true);
      fetchTeeTimes();
      fetchWeather();
    }
  }, [date]);

  const fetchTeeTimes = async () => {
    const resp = await axios.get<Courses>("/api/tee-times", {
      params: { date },
    });
    dispatch(updateCourses(resp.data));
    setLoading(false);
  };

  const fetchWeather = async () => {
    if (!date) return;
    setWeatherLoading(true);
    try {
      // Convert MM/DD/YYYY → YYYY-MM-DD for Open-Meteo
      const [month, day, year] = date.split("/");
      const isoDate = `${year}-${month}-${day}`;
      const params: Record<string, string> = { date: isoDate };
      if (location) {
        params.lat = String(location.lat);
        params.lng = String(location.lng);
      }
      const resp = await axios.get<WeatherData>("/api/weather", { params });
      setWeather(resp.data);
    } catch {
      setWeather(null);
    } finally {
      setWeatherLoading(false);
    }
  };

  const renderCourseCard = (courseId: string) => {
    const course = filteredTeeTimes[courseId];

    if (course && course.teeTimes && course.teeTimes.length) {
      return <CourseCard key={course.courseId} course={course} />;
    }
    return null;
  };

  if (loading) {
    return (
      <Box
        sx={{
          pt: 2,
          pb: 8,
          backgroundColor: (theme) => theme.palette.secondary.light,
        }}
      >
        <WeatherBanner weather={weather} loading={weatherLoading} />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 345px))",
            gap: 3,
            justifyContent: "center",
            px: 2,
          }}
        >
          <Skeleton variant="rounded" height={280} />
          <Skeleton variant="rounded" height={280} />
          <Skeleton variant="rounded" height={280} />
          <Skeleton variant="rounded" height={280} />
        </Box>
      </Box>
    );
  }

  if (!sortedCourseIds.length) {
    return (
      <Box
        sx={{
          minHeight: "60dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          px: 3,
          pt: 2,
          pb: 4,
          backgroundColor: (theme) => theme.palette.secondary.light,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 500 }}>
          <WeatherBanner weather={weather} loading={weatherLoading} />
        </Box>
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            bgcolor: "rgba(13, 148, 101, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SportsGolfIcon sx={{ fontSize: 40, color: "primary.main" }} />
        </Box>
        <Typography
          variant="h5"
          sx={{ fontFamily: "var(--font-display), serif", textAlign: "center" }}
        >
          No tee times found
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", maxWidth: 280 }}
        >
          No openings match your filters for that date. Try a different day or
          adjust your time range.
        </Typography>
        <Button
          variant="contained"
          size="medium"
          sx={{ borderRadius: 999, mt: 1 }}
          onClick={() => router.push("/")}
        >
          Adjust search
        </Button>
        <ManualCoursesSection />
      </Box>
    );
  }

  const totalTeeTimes = Object.values(filteredTeeTimes).reduce(
    (sum, course) => sum + (course.teeTimes?.length ?? 0),
    0
  );

  return (
    <Box
      sx={{
        pt: 2,
        pb: 4,
        backgroundColor: (theme) => theme.palette.secondary.light,
      }}
    >
      <WeatherBanner weather={weather} loading={weatherLoading} />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: "center", mb: 2 }}
      >
        Found{" "}
        <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
          {totalTeeTimes}
        </Box>{" "}
        tee time{totalTeeTimes !== 1 ? "s" : ""} across{" "}
        <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
          {sortedCourseIds.length}
        </Box>{" "}
        course{sortedCourseIds.length !== 1 ? "s" : ""}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 345px))",
          gap: 3,
          justifyContent: "center",
          px: 2,
        }}
      >
        {sortedCourseIds.map(renderCourseCard)}
      </Box>
      <ManualCoursesSection />
    </Box>
  );
};

export default CourseListingsView;
