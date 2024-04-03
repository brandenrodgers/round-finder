import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SortIcon from "@mui/icons-material/Sort";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

const SortMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button variant="text" endIcon={<SortIcon />} onClick={handleClick}>
        Sort
      </Button>
      <Menu
        id="sort-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <SortByAlphaIcon sx={{ pr: 1 }} />
          Alphabetical
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <FavoriteIcon sx={{ pr: 1 }} />
          Favorites
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <DirectionsCarIcon sx={{ pr: 1 }} />
          Distance
        </MenuItem>
      </Menu>
    </>
  );
};

export default SortMenu;
