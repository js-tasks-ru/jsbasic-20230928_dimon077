function getMinMax(str) {
  let numbers = str.split(' ').filter(item => isFinite(item));
  return { min: Math.min(...numbers), max: Math.max(...numbers) };
}
