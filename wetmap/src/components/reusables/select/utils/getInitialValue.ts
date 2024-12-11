import { InitialValue, Values } from '..';

/**
 * Prepare value passed from outside
 * @param value
 * @param options
 * @returns
 */
export default function getInitialValue(value: InitialValue, options: Values): Values {
  const result = new Map();
  if (value === null || value === undefined) {
    return result;
  }

  const valueArray = Array.isArray(value) ? value : [value];
  for (const item of valueArray) {
    if (typeof item === 'string') {
      const option = options.get(item);
      if (option) {
        result.set(item, option);
      }
    } else if ('key' in item && 'label' in item) {
      result.set(item.key, item);
    }
  }

  return result;
}
