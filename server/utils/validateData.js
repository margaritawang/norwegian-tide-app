function validateData(key, value) {
  // if the value can't be converted to a number, it's invalid
  if (isNaN(Number(value))) return false;

  const numValue = Number(value);
  // if the year is not within 2000-3000, it's invalid
  if (
    key === "AAR" &&
    (!Number.isInteger(numValue) || numValue < 2000 || numValue > 3000)
  )
    return false;

  // if the month is outside of 1-12, it's invalid
  if (
    key === "MND" &&
    (!Number.isInteger(numValue) || numValue < 1 || numValue > 12)
  )
    return false;

  // if the day is outside of 1-31, it's invalid
  if (
    key === "DAG" &&
    (!Number.isInteger(numValue) || numValue < 1 || numValue > 31)
  )
    return false;

  return true;
}

module.exports = validateData;
