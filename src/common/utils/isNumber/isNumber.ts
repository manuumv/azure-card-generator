export const isNumber = (num) => {
  return !isNaN(parseFloat(num)) && isFinite(num);
}
