export const padDatePart = (datePart: number) =>
  datePart.toString().padStart(2, "0");

export const getTimeFromDate = (date: string): string =>
  new Date(date).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

export const getDateParts = (
  date: string
): { month: number; day: number; year: number } => {
  const formattedDate = new Date(date);
  const month = formattedDate.getUTCMonth() + 1; // months from 1-12
  const day = formattedDate.getUTCDate();
  const year = formattedDate.getUTCFullYear();
  return { month, day, year };
};
