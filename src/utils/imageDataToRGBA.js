const PIXEL_SIZE = 4;

export function getRGBAfromImageData(arr) {
  const result = [];
  for (let i = 0; i < arr.length - PIXEL_SIZE + 1; i += PIXEL_SIZE) {
    result.push(`rgba(${arr[i]},${arr[i + 1]},${arr[i + 2]},${arr[i + 3]})`);
  }

  return result;
}
