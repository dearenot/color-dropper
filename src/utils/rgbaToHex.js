export function RGBToHex(rgbaColor) {
  let [r, g, b] = rgbaColor
    .slice(rgbaColor.indexOf("(") + 1, rgbaColor.indexOf(")"))
    .split(",")
    .map(Number);

  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  return `#${r}${g}${b}`;
}
