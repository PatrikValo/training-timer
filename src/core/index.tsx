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
  const [tick, setTick] = useState<number>(0);

  useInterval(
    () => {
      setTick(Date.now());
    },
    run ? ms : null
  );

  return {
    tick,
    running: run,
    start,
    setRunning: (running: boolean) => {
      const now = Date.now();
      setRun(running);
      setStart(now);
      setTick(now);
    },
  };
}
