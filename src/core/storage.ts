const keyTotalTime = "totalTime";

export function getTotalTime(): number {
  const result = localStorage.getItem(keyTotalTime);
  return result ? +result : 7 * 60_000 + 30_000;
}

export function storeTotalTime(totalTime: number): void {
  localStorage.setItem(keyTotalTime, totalTime + "");
}

const keyTheme = "theme";
const light = "light";
const dark = "dark";

export function getIsLight(): boolean {
  const result = localStorage.getItem(keyTheme);
  if (result) {
    return result === light ? true : false;
  }
  return true;
}

export function storeIsLight(isLight: boolean): void {
  localStorage.setItem(keyTheme, isLight ? light : dark);
}
