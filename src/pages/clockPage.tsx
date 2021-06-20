import React, { FunctionComponent, Fragment, useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { useTick } from "../core";
import notification from "../assets/notification.mp3";
import ringbell from "../assets/ringbell.mp3";
import { useSound } from "use-sound";
import MainTitle from "../components/mainTitle";
import Timer from "../components/timer";
import OneRoundInfo from "../components/oneRoundInfo";
import TotalTimer from "../components/totalTimer";
import RoundsInfo from "../components/roundsInfo";

export interface ClockPageProps {
  totalTime: number;
}

const ClockPage: FunctionComponent<ClockPageProps> = ({ totalTime }) => {
  const {
    tick,
    running,
    setRunning,
    totalStart,
    currentStart,
    updateCurrentStart,
  } = useTick();
  const [recording, setRecording] = useState<boolean>(false);
  const [oneRound, setOneRound] = useState<number>(0);
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
      setOneRound(Math.floor((tick - currentStart) / 1000) * 1000);
      setRecording(false);
      setRound(round + 1);
    }
  };

  const handleReset = () => {
    setRunning(false);
    setRecording(false);
    setOneRound(0);
    setRound(0);
  };

  const handleNextRound = () => {
    setRound(round + 1);
    updateCurrentStart();
    setRecording(true);
    playNotification();
  };

  const handleEnd = () => {
    playRingbell();
    handleReset();
  };

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
            <MainTitle round={round} />
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={3}
          >
            <Timer
              tick={tick}
              start={currentStart}
              round={round}
              oneRound={oneRound}
              recording={recording}
              running={running}
              onNextRound={handleNextRound}
            />
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <TotalTimer
              tick={tick}
              start={totalStart}
              totalTime={totalTime}
              running={running}
              onEnd={handleEnd}
            />
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
                  disabled={recording && tick - currentStart <= 1_000}
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
          <RoundsInfo round={round} />
        </Grid>
        <Grid item>
          <Typography variant="body1" color="textSecondary">
            Current round
          </Typography>
          <OneRoundInfo
            tick={tick}
            start={currentStart}
            recording={recording}
            ms={oneRound}
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ClockPage;
