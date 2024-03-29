import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Home from "./Home";
import TeeTimes from "./TeeTimes";

const App: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="tee-times" element={<TeeTimes />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
};

export default App;
