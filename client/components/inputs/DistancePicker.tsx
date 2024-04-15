import React from "react";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { isIOS } from "../../utils/isIOS";

const distanceSliderMarks = [
  {
    value: 5,
    label: "5 Miles",
  },
  {
    value: 20,
    label: "20 Miles",
  },
  {
    value: 35,
    label: "35 Miles",
  },

  {
    value: 50,
    label: "50 Miles",
  },
];

type DistancePickerProps = {
  value: number;
  onChange: (event: Event, value: number | number[]) => void;
};

const DistancePicker: React.FC<DistancePickerProps> = ({ value, onChange }) => {
  return (
    <Slider
      id="distance"
      min={5}
      max={50}
      marks={distanceSliderMarks}
      value={value}
      onChange={onChange}
      valueLabelDisplay="auto"
      style={{ width: "80%" }}
    />
  );
};

export default DistancePicker;
