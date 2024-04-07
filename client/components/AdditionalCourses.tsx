import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { ADDITIONAL_COURSES } from "../constants";

type AdditionalCourseKey = keyof typeof ADDITIONAL_COURSES;

const additionalCourseIds = Object.keys(
  ADDITIONAL_COURSES
) as Array<AdditionalCourseKey>;

const AdditionalCourses: React.FC = () => {
  const renderCourseItem = (courseId: AdditionalCourseKey) => {
    const course = ADDITIONAL_COURSES[courseId];

    return (
      <Box key={course.name}>
        <Box
          sx={{ display: "flex", alignItems: "center", pb: 1 }}
          onClick={() => {
            window.open(course.bookLink, "_blank", "noreferrer");
          }}
        >
          <Box
            component="img"
            sx={{ height: 60, width: 60 }}
            alt="course-img"
            src={course.image}
          />
          <Typography variant="h6" component="div" sx={{ pl: 1 }}>
            {course.name}
          </Typography>
        </Box>
        <Divider />
      </Box>
    );
  };

  return (
    <Accordion sx={{ maxWidth: 345 }} elevation={4}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3-content"
        id="panel3-header"
      >
        Additional courses
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={1}>
          <Typography variant="body2" component="div">
            This app is unable to fetch tee times for these courses. Use the
            links provided to manually look into tee time availability for each
            one.
          </Typography>
          {additionalCourseIds.map(renderCourseItem)}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default AdditionalCourses;
