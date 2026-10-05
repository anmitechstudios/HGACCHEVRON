const LAGOS_UTC_OFFSET_HOURS = 1; // Africa/Lagos is UTC+1, no DST.
const SERVICE_START_HOUR = 8;
const SERVICE_START_MINUTE = 30;
const ASSUMED_SERVICE_LENGTH_HOURS = 2;

function nowInLagos(): Date {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60_000;
  return new Date(utcMs + LAGOS_UTC_OFFSET_HOURS * 60 * 60_000);
}

/** Next Sunday 8:30 AM, in Lagos local time, expressed as a real Date instant. */
export function getNextServiceStart(reference: Date = nowInLagos()): Date {
  const result = new Date(reference);
  result.setHours(SERVICE_START_HOUR, SERVICE_START_MINUTE, 0, 0);

  const daysUntilSunday = (7 - result.getDay()) % 7;
  result.setDate(result.getDate() + daysUntilSunday);

  if (result.getTime() <= reference.getTime()) {
    result.setDate(result.getDate() + 7);
  }

  return result;
}

export function getServiceStatus(): {
  isLive: boolean;
  nextServiceStart: Date;
} {
  const lagosNow = nowInLagos();
  const isSunday = lagosNow.getDay() === 0;
  const minutesSinceMidnight = lagosNow.getHours() * 60 + lagosNow.getMinutes();
  const serviceStartMinutes = SERVICE_START_HOUR * 60 + SERVICE_START_MINUTE;
  const serviceEndMinutes = serviceStartMinutes + ASSUMED_SERVICE_LENGTH_HOURS * 60;

  const isLive =
    isSunday &&
    minutesSinceMidnight >= serviceStartMinutes &&
    minutesSinceMidnight < serviceEndMinutes;

  return { isLive, nextServiceStart: getNextServiceStart(lagosNow) };
}
