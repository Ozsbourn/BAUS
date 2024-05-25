export const getFormatDate = (date: Date) => {
  const day: Date = new Date(date);
  return `${day.getDay()}-${day.getMonth()}-${day.getFullYear()}`;
};
