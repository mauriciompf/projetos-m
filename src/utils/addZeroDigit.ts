const addZeroDigit = (digit: number | string) => {
  if (typeof digit === "number" && digit < 10) digit = "0" + digit; // Add 0 when below 10
  return digit;
};

export default addZeroDigit;
