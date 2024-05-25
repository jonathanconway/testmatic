import { ZOD_REGEX_DATE_TIME_STRING } from "./zod.utils";

export function parseDateTimeString(dateTimeString: string) {
  const [date, time] = dateTimeString.split("_");
  const dateTime = new Date(`${date} ${time.replaceAll("-", ":")}`);

  return dateTime;
}

export function formatDateTimeString(dateTimeString: string) {
  return formatDateTime(parseDateTimeString(dateTimeString));
}

export function formatDateTime(dateTime: Date) {
  return `${dateTime.getDate()}/${dateTime.getMonth()}/${dateTime.getFullYear()} ${dateTime.getHours()}:${dateTime.getMinutes()}`;
}

export function stringifyDateTime(dateTime: Date) {
  return [
    [
      dateTime.getFullYear(),
      dateTime.getMonth().toString().padStart(2, "0"),
      dateTime.getDate().toString().padStart(2, "0"),
    ].join("-"),
    [
      dateTime.getHours().toString().padStart(2, "0"),
      dateTime.getMinutes().toString().padStart(2, "0"),
    ].join("-"),
  ].join("_");
}

export function nowDateTimeString() {
  return stringifyDateTime(new Date());
}

export function isDateTimeString(input: string) {
  return ZOD_REGEX_DATE_TIME_STRING.regex.test(input);
}
