import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { TeeTime } from "../../server/types/TeeTime";

type TeeTimeCardPropTypes = {
  teeTime: TeeTime;
};

const TeeTimeCard: React.FC<TeeTimeCardPropTypes> = ({ teeTime }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {teeTime.time}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {teeTime.availablePlayers} Players
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TeeTimeCard;
