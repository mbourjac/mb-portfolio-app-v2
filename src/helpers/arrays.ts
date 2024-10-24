export const shuffleArray = <T>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j]!, array[i]!];
  }

  return array;
};

export const getRandomArrayIndex = <T>(array: T[]) => {
  return Math.floor(Math.random() * array.length);
};

export const replaceArrayItemAtIndex = <T>(
  array: T[],
  index: number,
  newValue: T,
): T[] => {
  return [...array.slice(0, index), newValue, ...array.slice(index + 1)];
};
