export function getDaysDifference(date1: Date, date2: Date): number {
  const startOfDay1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const startOfDay2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

  const differenceInMs = Math.abs(startOfDay2.getTime() - startOfDay1.getTime());
  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

  return differenceInDays;
}