import React, { FunctionComponent, Fragment, useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import Clock from "../components/clock";
import { useTick } from "../core";
import { msToTime } from "../utils/util";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import notification from "../assets/notification.mp3";
import ringbell from "../assets/ringbell.mp3";
import { useSound } from "use-sound";

export interface ClockPageProps {
  totalTime: number;
}

const ClockPage: FunctionComponent<ClockPageProps> = ({ totalTime }) => {
  const { timeInterval, running, setRunning, start } = useTick();
  const [recording, setRecording] = useState<boolean>(false);
  const [oneRoundFreeze, setOneRoundFreeze] = useState<number>(0);
  const [round, setRound] = useState<number>(0);
  const [playNotification] = useSound(notification);
  const [playRingbell] = useSound(ringbell);

  const handleStart = () => {
    if (!running && !recording) {
      setRunning(true);
      setRecording(true);
      setRound(1);
      return;
    }

    if (running && recording) {
      playNotification();
      setOneRoundFreeze(Math.floor((timeInterval - start) / 1000) * 1000);
      setRecording(false);
      setRound(round + 1);
    }
  };

  const handleReset = () => {
    setRunning(false);
    setRecording(false);
    setOneRoundFreeze(0);
    setRound(0);
  };

  const countDownMs = start + totalTime - timeInterval;
  const countUpMs = recording
    ? timeInterval - start
    : start + round * oneRoundFreeze - timeInterval;
  const warning = !recording && running ? countUpMs <= 5_000 : false;

  const countDown =
    countDownMs <= 0 ? msToTime(0) : msToTime(countDownMs, true);
  const countUp = msToTime(countUpMs);
  const rounds =
    oneRoundFreeze === 0 ? 0 : Math.ceil(totalTime / oneRoundFreeze);

  const oneRound = recording
    ? msToTime(timeInterval - start)
    : msToTime(oneRoundFreeze);

  if (countUpMs <= 0 && running && !recording) {
    setRound(round + 1);
    playNotification();
  }

  if (countDownMs <= 0 && running) {
    playRingbell();
    handleReset();
  }
  return (
    <Fragment>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ marginBottom: "25px" }}
          >
            <Typography variant="h2">
              {round % 2 === 0 ? "Pause" : "Training"}
            </Typography>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Clock
              time={countUp}
              variant="h3"
              color={warning ? "secondary" : "textPrimary"}
            />
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <Clock time={countDown} variant="h6" color="textSecondary" />
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
            style={{ marginTop: "25px" }}
          >
            {(!running || recording) && (
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  disableElevation
                  onClick={handleStart}
                >
                  {recording ? "Stop" : "Start"}
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button
                color="secondary"
                variant="outlined"
                size="large"
                disableElevation
                onClick={handleReset}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        style={{ marginBottom: "0" }}
      >
        <Grid item>
          <Typography variant="body1" color="textSecondary">
            Round
          </Typography>
          <Typography variant="h5">
            {Math.ceil(round / 2)}/{Math.ceil(rounds / 2)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" color="textSecondary">
            One round
          </Typography>
          <Clock time={oneRound} variant="h5">
            <AccessAlarmIcon
              color="inherit"
              style={{ margin: "0 5px -2px 0" }}
            />
          </Clock>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ClockPage;
