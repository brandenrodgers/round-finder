import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useAppSelector } from "../../hooks/redux";
import Header from "../Header";
import Footer from "../Footer";

const TeeTimesView: React.FC = () => {
  const date = useAppSelector((state) => state.date.value);
  const navigate = useNavigate();

  useEffect(() => {
    if (!date) {
      navigate("/");
    }
  }, [date]);

  return (
    <Box>
      <Header />
      <Box sx={{ pt: 2, pb: 8 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default TeeTimesView;
