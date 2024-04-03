import React from "react";
import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { isIOS } from "../../utils/isIOS";

type TimesPickerProps = {
  value: number[];
  onChange: (newTimes: number[]) => void;
};

const timeSliderMarks = [
  {
    value: 6,
    label: "6 am",
  },
  {
    value: 9,
    label: "9 am",
  },
  {
    value: 12,
    label: "12 pm",
  },
  {
    value: 15,
    label: "3 pm",
  },
  {
    value: 18,
    label: "6 pm",
  },
];

const TimesPicker: React.FC<TimesPickerProps> = ({ value, onChange }) => {
  const handleTimesChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    // Fix for bug: https://github.com/mui/material-ui/issues/31869
    if (isIOS && event.type === "mousedown") {
      return;
    }

    if (newValue[1] - newValue[0] < 1) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 18 - 1);
        onChange([clamped, clamped + 1]);
      } else {
        const clamped = Math.max(newValue[1], 1);
        onChange([clamped - 1, clamped]);
      }
    } else {
      onChange(newValue as number[]);
    }
  };

  return (
    <Box sx={{ width: "80%" }}>
      <Slider
        color="primary"
        value={value}
        min={6}
        max={18}
        onChange={handleTimesChange}
        valueLabelDisplay="auto"
        marks={timeSliderMarks}
        valueLabelFormat={(value) => dayjs().hour(value).format("h a")}
        disableSwap
      />
    </Box>
  );
};

export default TimesPicker;
