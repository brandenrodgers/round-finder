import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { useAppSelector } from "../../hooks/redux";
import Header from "../Header";
import Footer from "../Footer";
import { getDate } from "../../hooks/selectors";

const TeeTimesView: React.FC = () => {
  const date = useAppSelector(getDate);
  const navigate = useNavigate();

  useEffect(() => {
    if (!date) {
      navigate("/");
    }
  }, [date]);

  return (
    <Box sx={{ height: "100%" }}>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  );
};

export default TeeTimesView;
