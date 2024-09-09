export default function randomElementsFromArray<T>(
  array: T[],
  numberOfRandEl: number
): T[] {
  if (array.length <= numberOfRandEl) {
    return array;
  } else {
    let duplicateArray = [...array];
    let randIndex: number;
    let randElement: T;
    let randArray: T[] = [];

    for (let i = 0; i < numberOfRandEl; i++) {
      randIndex = Math.floor(Math.random() * duplicateArray.length);
      randElement = duplicateArray[randIndex];
      duplicateArray.splice(randIndex, 1);
      randArray.push(randElement);
    }

    return randArray;
  }
}
