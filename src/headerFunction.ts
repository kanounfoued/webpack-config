export const add = (a: number, b: number): number | string => {
  if (isNaN(a) || isNaN(b)) return 'please! pass a valid number';
  return a + b;
};
