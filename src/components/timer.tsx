import React, { FunctionComponent } from "react";
import { msToTime } from "../utils/util";
import ClockTypography from "./clockTypography";

export interface TimerProps {
  tick: number;
  start: number;
  round: number;
  oneRound: number;
  recording: boolean;
  running: boolean;
  onNextRound: () => void;
}

const Timer: FunctionComponent<TimerProps> = ({
  tick,
  start,
  round,
  oneRound,
  recording,
  running,
  onNextRound,
}) => {
  const countUpMs = measureTheMs(tick, start, round, oneRound, recording);
  const warning = warnEnding(countUpMs, recording, running);

  if (countUpMs <= 0 && running && !recording) {
    onNextRound();
  }

  return (
    <ClockTypography
      time={msToTime(countUpMs)}
      variant="h3"
      color={warning ? "secondary" : "textPrimary"}
    />
  );
};

function measureTheMs(
  tick: number,
  start: number,
  round: number,
  oneRound: number,
  recording: boolean
): number {
  if (recording) {
    return tick - start;
  }
  return start + round * oneRound - tick;
}

function warnEnding(
  ms: number,
  recording: boolean,
  running: boolean,
  timeBeforeEnd: number = 5_000
): boolean {
  if (!recording && running) {
    return ms <= timeBeforeEnd;
  }
  return false;
}

export default Timer;
