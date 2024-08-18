/**
 * Calculates the difference in days between two dates.
 * 
 * @param date1 - The first date.
 * @param date2 - The second date.
 * @returns The difference in days between the two dates.
 */
export function getDaysDifference(date1: Date, date2: Date): number {
  // Calculate the difference in milliseconds
  const differenceInMs = Math.abs(date2.getTime() - date1.getTime());

  // Convert milliseconds to days
  const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));

  return differenceInDays;
}