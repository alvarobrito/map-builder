function toInt(string) {
  return parseInt(string, 10);
}

function getColor(range, colors) {
  return range > 0 ? colors.find(e => range >= e.count).color : 'gray';
}

export default { getColor, toInt };
