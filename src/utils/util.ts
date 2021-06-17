import { Time } from "../core";

export function msToTime(ms: number, ceil: boolean = false): Time {
  const hours = Math.floor(ms / 1000 / 60 / 60);
  const minutes = Math.floor(ms / 1000 / 60) % 60;
  const seconds = (ceil ? Math.ceil(ms / 1000) : Math.floor(ms / 1000)) % 60;
  return { hours, minutes, seconds };
}

export function timeToMs(time: Time): number {
  const { hours, minutes, seconds } = time;
  return hours * 3_600_000 + minutes * 60_000 + seconds * 1_000;
}
