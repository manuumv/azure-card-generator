export const isNumber = (value: any) => (
  !isNaN(parseFloat(value)) && isFinite(value)
);
