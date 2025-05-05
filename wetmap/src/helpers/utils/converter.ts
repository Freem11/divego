export const meterToFeet = (meter: number) => {
  return (meter * 3.28084).toFixed(2);
};

export const feetToMeter = (feet: number) => {
  return (feet / 3.28084).toFixed(2);
};


export const convertDistance = (value: number, unit: string) => {
  if (unit === 'feet' || unit === 'ft') {
    return feetToMeter(value);
  } else if (unit === 'meter' || unit === 'm') {
    return meterToFeet(value);
  }
};
