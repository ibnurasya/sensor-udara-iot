import { sub } from "date-fns";

export const getListOfDatesFromToday = (daysCount: number = 7): Date[] => {
  const result = [];

  const today = new Date();

  for (let index = 0; index < daysCount; index++) {
    const date = sub(today, { days: index });
    result.push(date)
  }

  return result;
}
