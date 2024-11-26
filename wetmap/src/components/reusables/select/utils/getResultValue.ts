import { Option, Values } from '..';

/**
 * Prepare select value to be passed outside
 * @param value
 * @param labelInValue
 * @param isMulti
 * @returns
 */
export default function getResultValue(value: Values, labelInValue: boolean, isMulti: boolean) {
  const result: (string | Option)[] = [];
  if (!value) {
    return null;
  }
  value.forEach((option) => {
    if (labelInValue) {
      result.push(option);
    } else {
      result.push(option.key);
    }
  });

  return isMulti ? result : result[0];
}
