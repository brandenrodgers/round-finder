import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { Holes } from "../../types/filter";

type HolesPickerProps = {
  value: Holes;
  onChange: (newHoles: Holes) => void;
};

const HolesPicker: React.FC<HolesPickerProps> = ({ value, onChange }) => {
  const handleHolesChange = (
    event: React.MouseEvent<HTMLElement>,
    newHoles: Holes
  ) => {
    onChange(newHoles);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      size="large"
      value={value}
      exclusive
      onChange={handleHolesChange}
      aria-label="holes-input"
    >
      <ToggleButton value={9}>
        <Typography variant="h5" sx={{ px: 1 }}>
          9
        </Typography>
      </ToggleButton>
      <ToggleButton value={18}>
        <Typography variant="h5">18</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default HolesPicker;
