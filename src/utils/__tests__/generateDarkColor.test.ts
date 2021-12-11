import generateDarkColor from '../generateDarkColor';

describe('Test ' + generateDarkColor.name, () => {
  const colorHex = generateDarkColor();

  test('It starts with a hash', () => {
    expect(colorHex[0]).toBe('#');
  });

  test('It returns 6-digit hex code', () => {
    const hex = colorHex.slice(1);
    expect(hex.length).toBe(6);
    for (const digit of hex.toUpperCase()) {
      expect(digit).toMatch(/\d|[A-F]/);
    }
  });
});
