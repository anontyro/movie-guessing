export const randomIntFromInterval = (max: number, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getMostRecentDecades = () => {
  const currentYear = new Date().getFullYear();
  const decades = [];
  for (let i = currentYear; i >= 1960; i -= 10) {
    const replaceLast = `${i.toString().substr(0, 3)}0`;
    decades.push(parseInt(replaceLast));
  }
  return decades;
};
