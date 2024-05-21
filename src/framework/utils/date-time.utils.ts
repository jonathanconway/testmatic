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
  return `${dateTime.getDate()}-${dateTime.getMonth()}-${dateTime.getFullYear()}_${dateTime.getHours()}:${dateTime.getMinutes()}`;
}

export function nowDateTimeString() {
  return stringifyDateTime(new Date());
}

export function isDateTimeString(input: string) {
  return /[0-9]{4}-[0-9]{2}-[0-9]{2}_[0-9]{2}-[0-9]{2}/.test(input);
}
