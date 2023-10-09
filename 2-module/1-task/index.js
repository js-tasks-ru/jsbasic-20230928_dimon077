function sumSalary(salaries) {
  let sum = 0;

  for (key in salaries) {
    if (isFinite(salaries[key])) {
      sum += salaries[key];
    }
  }

  return sum;
}
