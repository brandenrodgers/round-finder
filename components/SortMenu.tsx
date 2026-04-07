"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoodOutlinedIcon from "@mui/icons-material/MoodOutlined";
import SortByAlphaIcon from "@mui/icons-material/SortByAlpha";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { getSort } from "@/store/selectors";
import { updateSort } from "@/store/sortSlice";
import { requestLocation } from "@/store/locationSlice";
import { SORT_VALUES } from "@/lib/constants";
import { SortBy } from "@/lib/types";

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
    if (value === SORT_VALUES.distance) {
      dispatch(requestLocation());
    }
    handleClose();
  };

  const renderIcon = (sortValue: SortBy, pr?: number) => {
    if (sortValue === SORT_VALUES.forMe) {
      return <AutoAwesomeIcon sx={{ pr }} />;
    }
    if (sortValue === SORT_VALUES.alphabetical) {
      return <SortByAlphaIcon sx={{ pr }} />;
    }
    if (sortValue === SORT_VALUES.quality) {
      return <MoodOutlinedIcon sx={{ pr }} />;
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
          selected={sort === SORT_VALUES.forMe}
          onClick={() => handleMenuItemClick(SORT_VALUES.forMe)}
        >
          {renderIcon(SORT_VALUES.forMe, 1)}
          {SORT_VALUES.forMe}
        </MenuItem>
        <MenuItem
          selected={sort === SORT_VALUES.alphabetical}
          onClick={() => handleMenuItemClick(SORT_VALUES.alphabetical)}
        >
          {renderIcon(SORT_VALUES.alphabetical, 1)}
          {SORT_VALUES.alphabetical}
        </MenuItem>
        <MenuItem
          selected={sort === SORT_VALUES.quality}
          onClick={() => handleMenuItemClick(SORT_VALUES.quality)}
        >
          {renderIcon(SORT_VALUES.quality, 1)}
          {SORT_VALUES.quality}
        </MenuItem>
        <MenuItem
          selected={sort === SORT_VALUES.distance}
          onClick={() => handleMenuItemClick(SORT_VALUES.distance)}
        >
          {renderIcon(SORT_VALUES.distance, 1)}
          {SORT_VALUES.distance}
        </MenuItem>
      </Menu>
    </>
  );
};

export default SortMenu;
