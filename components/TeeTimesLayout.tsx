"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Header from "./Header";
import { getDate, getLocationStatus } from "@/store/selectors";
import { requestLocation } from "@/store/locationSlice";

const TeeTimesLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const date = useAppSelector(getDate);
  const locationStatus = useAppSelector(getLocationStatus);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!date) {
      router.push("/");
    }
  }, [date]);

  useEffect(() => {
    if (locationStatus === "idle") {
      dispatch(requestLocation());
    }
  }, []);

  return (
    <Box sx={{ height: "100%" }}>
      <Header />
      {children}
    </Box>
  );
};

export default TeeTimesLayout;
