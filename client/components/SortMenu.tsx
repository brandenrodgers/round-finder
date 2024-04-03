import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SortIcon from "@mui/icons-material/Sort";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { getSort } from "../hooks/selectors";
import { updateSort } from "../redux/sortSlice";
import { SORT_VALUES } from "../constants";
import { SortBy } from "../types/Sort";

const SortMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const sort = useAppSelector(getSort);
  const dispatch = useAppDispatch();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value: SortBy) => {
    dispatch(updateSort(value));
    handleClose();
  };

  const renderIcon = (sortValue: SortBy, pr?: number) => {
    if (sortValue === SORT_VALUES.alphabetical) {
      return <SortByAlphaIcon sx={{ pr }} />;
    }
    if (sortValue === SORT_VALUES.favorites) {
      return <FavoriteIcon sx={{ pr }} />;
    }
    if (sortValue === SORT_VALUES.distance) {
      return <DirectionsCarIcon sx={{ pr }} />;
    }
    return null;
  };

  return (
    <>
      <Button variant="text" endIcon={renderIcon(sort)} onClick={handleClick}>
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
        <MenuItem
          selected={sort === SORT_VALUES.alphabetical}
          onClick={() => handleMenuItemClick(SORT_VALUES.alphabetical)}
        >
          {renderIcon(SORT_VALUES.alphabetical, 1)}
          {SORT_VALUES.alphabetical}
        </MenuItem>
        <MenuItem
          selected={sort === SORT_VALUES.favorites}
          onClick={() => handleMenuItemClick(SORT_VALUES.favorites)}
        >
          {renderIcon(SORT_VALUES.favorites, 1)}
          {SORT_VALUES.favorites}
        </MenuItem>
        <MenuItem
          selected={sort === SORT_VALUES.distance}
          onClick={() => handleMenuItemClick(SORT_VALUES.distance)}
          disabled={true}
        >
          {renderIcon(SORT_VALUES.distance, 1)}
          {SORT_VALUES.distance}
        </MenuItem>
      </Menu>
    </>
  );
};

export default SortMenu;
