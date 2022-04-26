export default function stringToFloatString(stringValue: string, decimals = 3) {
  return "" + parseFloat(stringValue).toFixed(decimals);
}
