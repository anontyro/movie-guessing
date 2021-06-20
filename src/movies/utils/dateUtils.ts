export const getDateOrNull = (expectedDate: string) => {
  const date = new Date(expectedDate);
  const invalidDate = isNaN(date.getDate());

  return invalidDate ? null : date;
};
