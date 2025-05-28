export const generateIsbn = (): string => {
  const min = 1000000000;
  const max = 9999999999;
  const res = Math.floor(Math.random() * (max - min + 1)) + min;
  return res.toString();
};
