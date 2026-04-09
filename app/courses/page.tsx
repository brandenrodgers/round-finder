"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import courseHandlers, { manualCourseHandlers } from "@/lib/courseHandlers";

const liveCourses = Object.values(courseHandlers).sort((a, b) =>
  a.name.localeCompare(b.name)
);

const manualCourses = Object.values(manualCourseHandlers).sort((a, b) =>
  a.name.localeCompare(b.name)
);

export default function CoursesPage() {
  const router = useRouter();

  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: "background.default" }}>
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => router.push("/")}
            sx={{ mr: 1 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontFamily: "var(--font-display), serif", fontWeight: 400 }}
          >
            Supported Courses
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />

      <Box sx={{ maxWidth: 600, mx: "auto", px: 2, py: 3 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Round Finder checks tee time availability for these{" "}
          {liveCourses.length} courses in real time. There are an additional
          {manualCourses.length} courses you can check manually with convenient links.
        </Typography>

        <Typography
          variant="overline"
          color="text.disabled"
          sx={{ letterSpacing: "0.1em", display: "block", mb: 0.5, px: 0.5 }}
        >
          Real-time tee times ({liveCourses.length})
        </Typography>
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
            overflow: "hidden",
            mb: 4,
          }}
        >
          <List disablePadding>
            {liveCourses.map((course, i) => (
              <React.Fragment key={course.id}>
                {i > 0 && <Divider component="li" />}
                <ListItem
                  component="a"
                  href={course.bookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": { bgcolor: "action.hover" },
                    py: 1.5,
                  }}
                >
                  <ListItemText
                    primary={course.name}
                    secondary={course.location ?? null}
                    primaryTypographyProps={{ fontWeight: 500 }}
                    secondaryTypographyProps={{ variant: "body2" }}
                  />
                  {course.nineHoleOnly && (
                    <Chip
                      label="9 holes"
                      size="small"
                      variant="outlined"
                      sx={{ ml: 1, flexShrink: 0, fontSize: "0.7rem" }}
                    />
                  )}
                  <OpenInNewIcon
                    sx={{ fontSize: 16, color: "text.disabled", ml: 1, flexShrink: 0 }}
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Box>

        <Typography
          variant="overline"
          color="text.disabled"
          sx={{ letterSpacing: "0.1em", display: "block", mb: 0.5, px: 0.5 }}
        >
          Check availability yourself ({manualCourses.length})
        </Typography>
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
            overflow: "hidden",
            mb: 4,
          }}
        >
          <List disablePadding>
            {manualCourses.map((course, i) => (
              <React.Fragment key={course.id}>
                {i > 0 && <Divider component="li" />}
                <ListItem
                  component="a"
                  href={course.bookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": { bgcolor: "action.hover" },
                    py: 1.5,
                  }}
                >
                  <ListItemText
                    primary={course.name}
                    secondary={course.location ?? null}
                    primaryTypographyProps={{ fontWeight: 500 }}
                    secondaryTypographyProps={{ variant: "body2" }}
                  />
                  {course.nineHoleOnly && (
                    <Chip
                      label="9 holes"
                      size="small"
                      variant="outlined"
                      sx={{ ml: 1, flexShrink: 0, fontSize: "0.7rem" }}
                    />
                  )}
                  <Chip
                    label="Manual"
                    size="small"
                    sx={{ ml: 1, flexShrink: 0, fontSize: "0.7rem" }}
                  />
                  <OpenInNewIcon
                    sx={{ fontSize: 16, color: "text.disabled", ml: 0.5, flexShrink: 0 }}
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
}
