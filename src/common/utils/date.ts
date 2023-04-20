export function datestring(date: Date) {
  const content = date.toISOString().split("T");

  return `${content[0]} 00:00:00`;
}
