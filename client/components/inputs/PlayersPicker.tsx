import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { Players } from "../../types/Filter";

type PlayersPickerProps = {
  value: Players;
  onChange: (newPlayers: Players) => void;
};

const PlayersPicker: React.FC<PlayersPickerProps> = ({ value, onChange }) => {
  const handlePlayersChange = (
    event: React.MouseEvent<HTMLElement>,
    newPlayers: Players
  ) => {
    onChange(newPlayers);
  };
  return (
    <ToggleButtonGroup
      color="primary"
      size="medium"
      value={value}
      exclusive
      onChange={handlePlayersChange}
      aria-label="players-input"
    >
      <ToggleButton value={1}>
        <Typography variant="h5">1</Typography>
      </ToggleButton>
      <ToggleButton value={2}>
        <Typography variant="h5">2</Typography>
      </ToggleButton>
      <ToggleButton value={3}>
        <Typography variant="h5">3</Typography>
      </ToggleButton>
      <ToggleButton value={4}>
        <Typography variant="h5">4</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default PlayersPicker;
