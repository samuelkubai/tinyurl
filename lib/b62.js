const MAX_INT_PRECISION = Math.pow(2, 52);  // http://www.w3schools.com/js/js_numbers.asp

const charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const base = charset.length;

export const encode = (input) => {
  if (!input) return ''

  let binary = input
  let dividend = binary
  let result = ''

  if (binary === 0) return '0'

  while (binary > MAX_INT_PRECISION) {
    binary = dividend / base;
    result = charset[dividend % base] + result;
    dividend = binary;
  }

  while (binary > 0) {
    result = charset[binary % base] + result;
    binary = Math.floor(binary / base);
  }

  return result;
}
