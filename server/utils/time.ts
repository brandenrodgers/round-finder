export const padDatePart = (datePart: number) =>
  datePart.toString().padStart(2, "0");

export const getHoursFromDate = (date: string): number =>
  new Date(date).getHours();

export const getMinutesFromDate = (date: string): number =>
  new Date(date).getMinutes();

export const getDateParts = (
  date: string
): { month: number; day: number; year: number } => {
  const formattedDate = new Date(date);
  const month = formattedDate.getUTCMonth() + 1; // months from 1-12
  const day = formattedDate.getUTCDate();
  const year = formattedDate.getUTCFullYear();
  return { month, day, year };
};
