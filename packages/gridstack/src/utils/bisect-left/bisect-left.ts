export const bisectLeft = (value: number, array: number[]) => {
  let low = 0;
  let high = array.length - 1;

  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);

    if (array[mid] < value) low = mid + 1;
    else high = mid;
  }

  return low;
};
