export default function dateToUnix(date: string | Date) {
  return new Date(date).getTime();
}
