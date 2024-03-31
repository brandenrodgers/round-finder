import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TeeTime } from "../../server/types/TeeTime";

dayjs.extend(customParseFormat);

type TeeTimeCardPropTypes = {
  teeTime: TeeTime;
};

const TeeTimeCard: React.FC<TeeTimeCardPropTypes> = ({ teeTime }) => {
  return (
    <Card sx={{ maxWidth: 345, minWidth: 300 }} elevation={5}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {dayjs(`${teeTime.time.hours}:${teeTime.time.minutes}`, "H:m").format(
            "h:mm a"
          )}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {teeTime.availablePlayers} Players
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TeeTimeCard;
