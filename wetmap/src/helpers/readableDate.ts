export default function readableDate(date: string) {
  const dateObject = new Date(date);
  dateObject.setHours(24, 0, 0, 0);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day:   'numeric',
    year:  'numeric',
  }).format(new Date(dateObject));
  return formattedDate;
}
