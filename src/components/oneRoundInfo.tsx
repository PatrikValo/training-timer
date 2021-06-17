import React, { FunctionComponent } from "react";
import ClockTypography from "./clockTypography";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import { msToTime } from "../utils/util";

export interface OneRoundInfoProps {
  tick: number;
  start: number;
  ms: number;
  recording: boolean;
}

const OneRoundInfo: FunctionComponent<OneRoundInfoProps> = ({
  recording,
  tick,
  start,
  ms,
}) => {
  const time = recording ? msToTime(tick - start) : msToTime(ms);

  return (
    <ClockTypography time={time} variant="h5">
      <AccessAlarmIcon color="inherit" style={{ margin: "0 5px -2px 0" }} />
    </ClockTypography>
  );
};

export default OneRoundInfo;
