import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PeopleIcon from "@mui/icons-material/People";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

type PlayersIconPropTypes = {
  players: number;
  outlined?: boolean;
};

const PlayersIcon: React.FC<PlayersIconPropTypes> = ({ players, outlined }) => {
  if (players === 1) {
    return outlined ? <PersonOutlineOutlinedIcon /> : <PersonIcon />;
  }
  if (players === 2) {
    return outlined ? <PeopleAltOutlinedIcon /> : <PeopleIcon />;
  }
  return outlined ? <GroupsOutlinedIcon /> : <GroupsIcon />;
};

export default PlayersIcon;
