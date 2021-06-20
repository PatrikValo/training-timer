import React, { FunctionComponent } from "react";
import { Typography } from "@material-ui/core";
import HistoryIcon from "@material-ui/icons/History";

export interface RoundsInfoProps {
  round: number;
}

const RoundsInfo: FunctionComponent<RoundsInfoProps> = ({ round }) => {
  return (
    <Typography variant="h5">
      <HistoryIcon color="inherit" style={{ margin: "0 5px -3px 0" }} />
      {Math.ceil(round / 2)}
    </Typography>
  );
};

export default RoundsInfo;
