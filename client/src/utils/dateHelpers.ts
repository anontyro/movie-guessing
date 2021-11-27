export const getNextMonday = (nextDate: Date): Date => {
  const date = new Date();
  const day = date.getDay();
  const diff = day === 0 ? 6 : day - 1;
  const lastMonday = new Date(nextDate.setDate(nextDate.getDate() - diff));
  return new Date(lastMonday.setDate(lastMonday.getDate() + 7));
};
