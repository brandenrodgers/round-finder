"use client";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";

type RangePickerProps = {
  value: boolean;
  onChange: (newValue: boolean) => void;
};

const RangePicker: React.FC<RangePickerProps> = ({ value, onChange }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          color="primary"
        />
      }
      label={
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ letterSpacing: "0.12em" }}
        >
          Has Driving Range
        </Typography>
      }
    />
  );
};

export default RangePicker;
