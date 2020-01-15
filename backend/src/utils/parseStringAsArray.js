module.exports = function parseStringAsArray(arrayAsString) {
  return arrayAsString.split(',').map(skills => skills.trim());
}