export const getFontSize = (height: number, width: number): number => {
  const min = Math.min(height, width);
  console.debug({ min });
  if (min < 480) {
    return 32;
  } else if (min < 960) {
    return 48;
  } else if (min < 1440) {
    return 64;
  }
  return 80;
};
