export const getRandomIntFromInterval = (
  min: number,
  max: number,
  factor = 1,
) => {
  return Math.floor(Math.random() * (max - min + 1) + min) * factor;
};
