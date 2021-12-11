/**
 * Generates a random 6-digit hex code,
 * between `#000000` and `#777777` (inclusive).
 */
export default function generateDarkColor() {
  let color = '#';
  for (let i = 0; i < 6; i++) color += Math.floor(Math.random() * 8);
  return color;
}
