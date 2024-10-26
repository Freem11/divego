export default function filterCreatures(newGPSBoundaries, animalList) {
  let newArr = [];

  animalList && animalList.forEach((animal) => {
    if ((animal.Animal.toLowerCase()).includes(newGPSBoundaries)) {
      newArr.push(animal);
    }
  });
  return newArr;
}
