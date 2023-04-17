import is_number from 'is-number';

export function isDigits(str) {
  return /^\d+$/.test(str);
}

export function isNumber(str) {
  return is_number(str);
}
