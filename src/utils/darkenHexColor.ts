export function darkenHexColor(
  hex: string,
  percentDecrease: number = 15,
): string {
  // Limpiamos el string por si viene con el '#' al principio
  const cleanHex = hex.replace(/^#/, "");

  // 1. Convertir Hex a RGB
  const r: number = parseInt(cleanHex.slice(0, 2), 16) / 255;
  const g: number = parseInt(cleanHex.slice(2, 4), 16) / 255;
  const b: number = parseInt(cleanHex.slice(4, 6), 16) / 255;

  // 2. Convertir RGB a HSL
  const max: number = Math.max(r, g, b);
  const min: number = Math.min(r, g, b);
  let h: number = 0;
  let s: number = 0;
  let l: number = (max + min) / 2;

  if (max !== min) {
    const d: number = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  // 3. Reducir Luminosidad (L) de forma absoluta, sin bajar de 0
  l = Math.max(0, l - percentDecrease / 100);

  // 4. Convertir HSL de vuelta a RGB
  let rOut: number, gOut: number, bOut: number;

  if (s === 0) {
    // Si la saturación es 0, es un tono de gris
    rOut = gOut = bOut = l;
  } else {
    // Función auxiliar tipada para convertir de vuelta el matiz (Hue)
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q: number = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p: number = 2 * l - q;

    rOut = hue2rgb(p, q, h + 1 / 3);
    gOut = hue2rgb(p, q, h);
    bOut = hue2rgb(p, q, h - 1 / 3);
  }

  // 5. Convertir RGB de vuelta a Hex
  const toHex = (x: number): string => {
    const hexStr = Math.round(x * 255).toString(16);
    return hexStr.length === 1 ? "0" + hexStr : hexStr;
  };

  return `#${toHex(rOut)}${toHex(gOut)}${toHex(bOut)}`.toUpperCase();
}
