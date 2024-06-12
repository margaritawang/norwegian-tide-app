function parseTextResults(textString) {
  // if unable to extract the dotted line, return false
  if (!textString.match(/-{30}/)) return false;

  // trim dashed line and whitespace from the human-readable string
  const data = textString
    .split(/-{30}/)[1]
    .trim()
    .split(/[\r\n]+/);

  const keyArray = data[0].trim().split(/\s+/);

  const valueChunk = data.slice(1);

  const result = [];

  for (const line of valueChunk) {
    const valueArray = line.trim().split(/\s+/);

    const obj = {};
    for (const i in keyArray) {
      obj[keyArray[i]] = Number(valueArray[i]) || 0;
    }

    result.push(obj);
  }

  return result;
}

module.exports = parseTextResults;