"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import SportsGolfIcon from "@mui/icons-material/SportsGolf";
import ViewListIcon from "@mui/icons-material/ViewList";
import MapIcon from "@mui/icons-material/Map";
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

const CourseMapView = dynamic(() => import("./CourseMapView"), {
  ssr: false,
  loading: () => (
    <Skeleton variant="rectangular" sx={{ height: "calc(100dvh - 112px)", width: "100%" }} />
  ),
});

const ManualCoursesSection: React.FC = () => {
  const manualCourses = useAppSelector(getManualCoursesMemoized);

  if (!manualCourses.length) return null;

  return (
    <Box sx={{ width: "100%", alignSelf: "stretch", px: 2, pt: 3 }}>
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

type ViewMode = "list" | "map";

const CourseListingsView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [displayedTeeTimes, setDisplayedTeeTimes] = useState(0);
  const [displayedCourses, setDisplayedCourses] = useState(0);
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

  const totalTeeTimes = Object.values(filteredTeeTimes).reduce(
    (sum, course) => sum + (course.teeTimes?.length ?? 0),
    0
  );

  useEffect(() => {
    if (loading || !totalTeeTimes) return;
    setDisplayedTeeTimes(0);
    setDisplayedCourses(0);
    const steps = 24;
    const duration = 700;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const eased = 1 - (1 - step / steps) ** 2;
      setDisplayedTeeTimes(Math.round(eased * totalTeeTimes));
      setDisplayedCourses(Math.round(eased * sortedCourseIds.length));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [loading, totalTeeTimes, sortedCourseIds.length]);

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

  const renderCourseCard = (courseId: string, index: number) => {
    const course = filteredTeeTimes[courseId];

    if (course && course.teeTimes && course.teeTimes.length) {
      return (
        <Box
          key={course.courseId}
          sx={{
            animation: "cardFadeUp 0.35s ease-out both",
            animationDelay: `${Math.min(index, 7) * 60}ms`,
            "@keyframes cardFadeUp": {
              from: { opacity: 0, transform: "translateY(16px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          <CourseCard course={course} />
        </Box>
      );
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
      <Box sx={{ backgroundColor: (theme) => theme.palette.secondary.light, pb: 4 }}>
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
        </Box>
        <ManualCoursesSection />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        pt: 2,
        pb: viewMode === "map" ? 0 : 4,
        backgroundColor: (theme) => theme.palette.secondary.light,
      }}
    >
      <WeatherBanner weather={weather} loading={weatherLoading} />
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2, gap: 1.5 }}>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
          Found{" "}
          <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
            {displayedTeeTimes}
          </Box>{" "}
          tee time{totalTeeTimes !== 1 ? "s" : ""} across{" "}
          <Box component="span" sx={{ color: "primary.main", fontWeight: 700 }}>
            {displayedCourses}
          </Box>{" "}
          course{sortedCourseIds.length !== 1 ? "s" : ""}
        </Typography>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          size="small"
          onChange={(_, val) => val && setViewMode(val)}
          aria-label="view mode"
        >
          <ToggleButton value="list" aria-label="list view">
            <ViewListIcon fontSize="small" />
          </ToggleButton>
          <ToggleButton value="map" aria-label="map view">
            <MapIcon fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box
        key={viewMode}
        sx={{
          animation: "viewFadeIn 150ms ease-in-out",
          "@keyframes viewFadeIn": { from: { opacity: 0 }, to: { opacity: 1 } },
        }}
      >
        {viewMode === "map" ? (
          <CourseMapView />
        ) : (
          <>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 345px))",
                gap: 3,
                justifyContent: "center",
                px: 2,
              }}
            >
              {sortedCourseIds.map((id, i) => renderCourseCard(id, i))}
            </Box>
            <ManualCoursesSection />
          </>
        )}
      </Box>
    </Box>
  );
};

export default CourseListingsView;
