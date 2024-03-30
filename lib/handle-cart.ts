import { Cart } from "@/app/_actions";

export function sortCart(arr: Cart[]): Cart[] {
  if (arr.length > 0) {
    const combinedObjects: { [key: string]: Cart } = {};

    arr.forEach((obj) => {
      const key = `${obj.id}_${obj.option}`;
      if (!(key in combinedObjects)) {
        combinedObjects[key] = { ...obj };
      } else {
        combinedObjects[key].amount += obj.amount;
      }
    });
    return Object.values(combinedObjects).sort((a, b) => a.id - b.id);
  }
  
  return [];
}
