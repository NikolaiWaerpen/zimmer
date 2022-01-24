export default function range(to: number) {
  // @ts-ignore TODO: fix this
  const array = [...Array(to + 1).keys()];
  array.shift();
  return array;
}
