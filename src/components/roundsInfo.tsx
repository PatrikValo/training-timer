import React, { FunctionComponent } from "react";
import { Typography } from "@material-ui/core";

export interface RoundsInfoProps {
  round: number;
  oneRound: number;
  totalTime: number;
}

const RoundsInfo: FunctionComponent<RoundsInfoProps> = ({
  round,
  oneRound,
  totalTime,
}) => {
  const rounds = oneRound === 0 ? 0 : Math.ceil(totalTime / oneRound);

  return (
    <Typography variant="h5">
      {Math.ceil(round / 2)}/{Math.ceil(rounds / 2)}
    </Typography>
  );
};

export default RoundsInfo;
