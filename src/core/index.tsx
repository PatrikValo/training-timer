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
  const [totalStart, setTotalStart] = useState<number>(0);
  const [currentStart, setCurrentStart] = useState<number>(0);
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
    totalStart,
    currentStart,
    setRunning: (running: boolean): void => {
      const now = Date.now();
      setRun(running);
      setTotalStart(now);
      setCurrentStart(now);
      setTick(now);
    },
    updateCurrentStart: (): void => {
      const diff = totalStart % 1000;
      setCurrentStart(Math.floor(Date.now() / 1000) * 1000 + diff);
    },
  };
}
