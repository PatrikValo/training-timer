const key = "totalTime";

export function getTotalTime(): number {
  const result = localStorage.getItem(key);
  return result ? +result : 7 * 60_000 + 30_000;
}

export function storeTotalTime(totalTime: number): void {
  localStorage.setItem(key, totalTime + "");
}
