export default function randomElementsFromArray<T>(
  array: T[],
  numberOfRandEl: number
): T[] {
  if (array.length <= numberOfRandEl) {
    return array;
  } else {
    let duplicateArray = [...array];

    let randArray: T[] = [];

    for (let i = 0; i < numberOfRandEl; i++) {
      let randIndex = Math.floor(Math.random() * duplicateArray.length);

      duplicateArray.splice(randIndex, 1);
      randArray.push(duplicateArray[randIndex]);
    }

    return randArray;
  }
}
