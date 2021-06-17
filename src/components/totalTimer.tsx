import React, { FunctionComponent } from "react";
import { msToTime } from "../utils/util";
import ClockTypography from "./clockTypography";

export interface TotalTimerProps {
  tick: number;
  start: number;
  totalTime: number;
  running: boolean;
  onEnd: () => void;
}

const TotalTimer: FunctionComponent<TotalTimerProps> = ({
  tick,
  start,
  totalTime,
  running,
  onEnd,
}) => {
  const ms = start + totalTime - tick;
  const time = ms <= 0 ? msToTime(0) : msToTime(ms, true);

  if (ms <= 0 && running) {
    onEnd();
  }
  return <ClockTypography time={time} variant="h6" color="textSecondary" />;
};

export default TotalTimer;
