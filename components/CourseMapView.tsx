"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAppSelector } from "@/store/hooks";
import {
  getFilteredTeeTimesMemoized,
  getLocation,
  getSortedCourseIdsMemoized,
} from "@/store/selectors";

const createMarkerIcon = (count: number) =>
  L.divIcon({
    html: `<div style="
      background: #0d9465;
      color: white;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 13px;
      font-family: sans-serif;
      border: 2px solid white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    ">${count}</div>`,
    className: "",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });

const CourseMapView: React.FC = () => {
  const filteredTeeTimes = useAppSelector(getFilteredTeeTimesMemoized);
  const sortedCourseIds = useAppSelector(getSortedCourseIdsMemoized);
  const location = useAppSelector(getLocation);
  const router = useRouter();

  const courses = sortedCourseIds
    .map((id) => filteredTeeTimes[id])
    .filter((c) => c?.coordinates && c?.teeTimes?.length);

  const center: [number, number] = location
    ? [location.lat, location.lng]
    : [42.3601, -71.0589];

  return (
    <Box sx={{ height: "calc(100dvh - 112px)", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {courses.map((course) => (
          <Marker
            key={course.courseId}
            position={[course.coordinates!.lat, course.coordinates!.lng]}
            icon={createMarkerIcon(course.teeTimes!.length)}
          >
            <Popup minWidth={180}>
              <Box sx={{ p: 0.5 }}>
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  sx={{ mb: 0.25 }}
                >
                  {course.courseName}
                </Typography>
                {course.location && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    {course.location}
                  </Typography>
                )}
                <Typography
                  variant="caption"
                  color="primary"
                  fontWeight={600}
                  display="block"
                  sx={{ mt: 0.5 }}
                >
                  {course.teeTimes!.length} tee time
                  {course.teeTimes!.length !== 1 ? "s" : ""}
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 1, borderRadius: 999, textTransform: "none" }}
                  onClick={() =>
                    router.push(`/tee-times/${course.courseId}`)
                  }
                >
                  View tee times
                </Button>
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default CourseMapView;
