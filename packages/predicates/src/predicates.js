export function lengthMoreThan(length) {
  return (input) => input.length > length;
}

export function lengthLessThan(length) {
  return (input) => input.length < length;
}

export function isPositiveIntegerString(input) {
  return input !== '' && (input.match(/[^0-9]/g) || []).length === 0;
}

export function isPositiveNumericString(input) {
  return input !== '' && (input.match(/[^0-9.,]/g) || []).length === 0;
}

export function isNumericString(input) {
  return input !== '' && (input.match(/[^0-9.,-]/g) || []).length === 0;
}

export function isEmpty(input) {
  return input === null || input === undefined || input.length === 0;
}

export function isEmptyString(input) {
  return input === null || input === undefined || input.trim().length < 1;
}

export function notEmpty(input) {
  return not(isEmpty)(input);
}

export function notEmptyString(input) {
  return not(isEmptyString)(input);
}

export function notNumericString(input) {
  return not(isNumericString)(input);
}

function not(fn) {
  return (...args) => !fn(...args);
}