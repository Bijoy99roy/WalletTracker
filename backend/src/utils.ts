export function getCurrentTimeUnix() {
  const date = new Date();
  const unixTimestamp = Math.floor(date.getTime() / 1000);
  return unixTimestamp;
}

export function getPriorTimeStampHour(hour: number) {
  const HoursAgoUnix = Math.floor((Date.now() - hour * 60 * 60 * 1000) / 1000);
  return HoursAgoUnix;
}
