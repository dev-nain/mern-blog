import { formatDistanceToNow, isAfter, subDays, format } from "date-fns";

export function getDateDistance(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const oneWeekAgo = subDays(now, 7);

  if (isAfter(date, oneWeekAgo)) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else {
    const isPreviousYear = date.getFullYear() < now.getFullYear();
    const dateFormat = isPreviousYear ? "MMM d, yyyy" : "MMM d";
    return format(date, dateFormat);
  }
}
