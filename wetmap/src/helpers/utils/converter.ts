export const meterToFeet = (meter: number): number => {
  return Math.round((meter * 3.28084) * 100) / 100;
};

export const feetToMeter = (feet: number): number => {
  return Math.round((feet / 3.28084) * 100) / 100;
};


export const convertDistance = (value: number, unit: string): number => {
  if (unit === 'feet' || unit === 'ft') {
    return feetToMeter(value);
  } else if (unit === 'meter' || unit === 'm') {
    return meterToFeet(value);
  }
  throw new Error(`Unknown unit: ${unit}`);
};
