import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { People } from "../../types/filter";

type PeoplePickerProps = {
  value: People;
  onChange: (newPeople: People) => void;
};

const PeoplePicker: React.FC<PeoplePickerProps> = ({ value, onChange }) => {
  const handlePeopleChange = (
    event: React.MouseEvent<HTMLElement>,
    newPeople: People
  ) => {
    onChange(newPeople);
  };
  return (
    <ToggleButtonGroup
      color="primary"
      size="large"
      value={value}
      exclusive
      onChange={handlePeopleChange}
      aria-label="people-input"
    >
      <ToggleButton value={1}>
        <Typography variant="h4">1</Typography>
      </ToggleButton>
      <ToggleButton value={2}>
        <Typography variant="h4">2</Typography>
      </ToggleButton>
      <ToggleButton value={3}>
        <Typography variant="h4">3</Typography>
      </ToggleButton>
      <ToggleButton value={4}>
        <Typography variant="h4">4</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default PeoplePicker;
