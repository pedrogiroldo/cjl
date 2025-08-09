export function formatDate(date: string) {
  return new Date(date).toISOString().slice(0, 10);
}
