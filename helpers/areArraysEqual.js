const areObjectsEqual = (obj1, obj2) => {
  if (obj1 === obj2) return true;

  if (
    obj1 == null ||
    obj2 == null ||
    typeof obj1 !== "object" ||
    typeof obj2 !== "object"
  )
    return false;

  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key) || !areObjectsEqual(obj1[key], obj2[key]))
      return false;
  }

  return true;
};

const areArraysEqual = (arr1, arr2) => {
  if (arr1 === arr2) return true;

  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (!areObjectsEqual(arr1[i], arr2[i])) return false;
  }

  return true;
};

module.exports = { areArraysEqual, areObjectsEqual };
