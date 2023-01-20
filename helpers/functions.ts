export const moveToStart = (
  array: any[],
  conditionCallback: (value: any, index: number, obj: any[]) => unknown
) => {
  const index = array.findIndex(conditionCallback);
  array.unshift(array.splice(index !== -1 ? index : 0, 1)[0]);
  return array;
};

export const compareObjects = (a: any, b: any) => {
  if (a === b) return true;

  if (typeof a != "object" || typeof b != "object" || a == null || b == null)
    return false;

  let keysA = Object.keys(a),
    keysB = Object.keys(b);

  if (keysA.length != keysB.length) return false;

  for (let key of keysA) {
    if (!keysB.includes(key)) return false;

    if (typeof a[key] === "function" || typeof b[key] === "function") {
      if (a[key].toString() != b[key].toString()) return false;
    } else {
      if (!compareObjects(a[key], b[key])) return false;
    }
  }

  return true;
};
