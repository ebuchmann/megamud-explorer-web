export const getNumberString = (value: number): string => {
  if (value > 0) return ` +${value}`;
  if (value < 0) return ` ${value}`;
  return '';
};
