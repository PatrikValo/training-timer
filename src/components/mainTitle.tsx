import { Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";

export interface MainTitleProps {
  round: number;
}

const MainTitle: FunctionComponent<MainTitleProps> = ({ round }) => {
  return (
    <Typography variant="h2">
      {round % 2 === 0 ? "Pause" : "Training"}
    </Typography>
  );
};

export default MainTitle;
