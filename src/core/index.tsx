import { useEffect, useRef, useState } from "react";

export interface Time {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TimeResult {
  pause: boolean;
  remaining: Time;
  countDown: Time;
  reset: () => void;
}

/*
function useTime(
  start: number | undefined,
  recording: boolean,
  total: number
): TimeResult {
  const interval = 1000;
  const totalTime = msToTime(total);
  const [timer, setTimer] = useState<number>(0);
  const [remaining, setRemaining] = useState<Time>(totalTime);
  const [countDown, setCountDown] = useState<Time>(msToTime(0));
  const [pause, setPause] = useState<boolean>(false);

  let expected = Date.now() + interval;
  setTimeout(step, interval);
  function step() {
    if (start !== undefined) {
      const now = Date.now();
      const dt = now - expected;

      const diffRemaining =
        start +
        totalTime.seconds * 1_000 +
        totalTime.minutes * 60_000 +
        totalTime.hours * 3_600_000 -
        now;

      if (diffRemaining <= 0) {
        return reset();
      }

      if (recording) {
        const diffCountDown = now - start;
        setCountDown(msToTime(diffCountDown));
      } else {
        const diffCountDown = now - timer;
        if (diffCountDown <= 0) {
          setCountDown(msToTime(timer));
          setPause(!pause);
        }

        setRemaining(msToTime(diffRemaining, true));

        expected += interval;
        setTimeout(step, Math.max(0, interval - dt));
      }
    }
  }

  function reset() {
    setRemaining(totalTime);
    setTimer(0);
    setCountDown(msToTime(0));
    setPause(false);
  }

  return {
    pause,
    remaining,
    countDown,
    reset,
  };
}
*/

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>(() => {});

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function useTick(ms: number = 250) {
  const [run, setRun] = useState<boolean>(false);
  const [start, setStart] = useState<number>(0);
  const [timeInterval, setTimeInterval] = useState<number>(0);

  useInterval(
    () => {
      setTimeInterval(Date.now());
    },
    run ? ms : null
  );

  return {
    timeInterval,
    running: run,
    start,
    setRunning: (running: boolean) => {
      const now = Date.now();
      setRun(running);
      setStart(now);
      setTimeInterval(now);
    },
  };
}
