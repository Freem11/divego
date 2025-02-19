export default function abbreviateNumber(number: number) {
  if (number < 1000) return number.toString(); // If the number is less than 1000, no abbreviation needed

  const abbreviations = ['K', 'M', 'B', 'T']; // Array of abbreviations
  let abbreviationIndex = 0; // Start with the first abbreviation (K)

  while (number >= 1000 && abbreviationIndex < abbreviations.length - 1) {
    number /= 1000; // Divide the number by 1000
    abbreviationIndex++; // Move to the next abbreviation
  }

  return Math.floor(number * 10) / 10 + abbreviations[abbreviationIndex - 1]; // Return the abbreviated number with the appropriate suffix, with a maximum of three number characters
}
