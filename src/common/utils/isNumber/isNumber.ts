export const isNumber = (value: unknown) => (
  !isNaN(parseFloat(value as string)) && isFinite(value as number)
);
