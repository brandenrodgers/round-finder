import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Home from "./views/HomeView";
import TeeTimesView from "./views/TeeTimesView";
import CourseListingsView from "./views/CourseListingsView";
import CourseTeeTimesView from "./views/CourseTeeTimesView";
import theme from "../theme";

const App: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="tee-times" element={<TeeTimesView />}>
              <Route index element={<CourseListingsView />} />
              <Route path=":courseId" element={<CourseTeeTimesView />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
};

export default App;
