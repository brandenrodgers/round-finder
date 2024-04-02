import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import SportsGolfIcon from "@mui/icons-material/SportsGolf";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { styled } from "@mui/material/styles";
import { TeeTime } from "../../server/types/TeeTime";

dayjs.extend(customParseFormat);

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 8px;
  }
`);

type TeeTimeCardPropTypes = {
  bookLink?: string;
  teeTime: TeeTime;
};

const TeeTimeCard: React.FC<TeeTimeCardPropTypes> = ({ bookLink, teeTime }) => {
  return (
    <Card
      sx={{ width: 325 }}
      elevation={5}
      onClick={() => {
        if (bookLink) {
          window.open(bookLink, "_blank");
        }
      }}
    >
      <CardContent
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 1,
          py: 1,
          backgroundColor: (theme) => theme.palette.primary.dark,
        }}
      >
        <AccessTimeIcon
          fontSize="medium"
          sx={{ color: "primary.contrastText" }}
        />
        <Typography variant="h5" component="div" color="primary.contrastText">
          {dayjs(`${teeTime.time.hours}:${teeTime.time.minutes}`, "H:m").format(
            "h:mm a"
          )}
        </Typography>
        <OpenInNewIcon
          sx={{ right: 5, position: "absolute", color: "primary.contrastText" }}
        />
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <CardContentNoPadding
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            py: 1,
          }}
        >
          <SportsGolfIcon />
          <Typography variant="h6" color="text.secondary">
            {teeTime.holes} Holes
          </Typography>
        </CardContentNoPadding>

        <Divider orientation="vertical" flexItem />

        <CardContentNoPadding
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
            py: 1,
          }}
        >
          <PersonOutlineOutlinedIcon />
          <Typography variant="h6" color="text.secondary">
            {teeTime.availablePlayers} Players
          </Typography>
        </CardContentNoPadding>
      </Box>
      <Divider />
      <CardContentNoPadding
        sx={{ display: "flex", justifyContent: "center", py: 1 }}
      >
        <Typography variant="body1" color="text.secondary">
          Teeing off from the {teeTime.startSide}
        </Typography>
      </CardContentNoPadding>
    </Card>
  );
};

export default TeeTimeCard;
