import { GenerateScaleParams, ColorScaleItem } from "@/types/interface";
import hexToHSL from "./hexToHSL";

export default function generateScale({
  categoryId,
  steps,
  hex,
}: GenerateScaleParams): ColorScaleItem[] {
  let { h, s, l } = hexToHSL(hex);
  let scale = [];

  for (let i = 0; i < steps; i++) {
    let pct = i / (steps - 1);
    let newL;
    if (pct < 0.5) {
      newL = 70 - pct * 2 * (70 - l);
    } else {
      newL = l - (pct - 0.5) * 2 * (l - 15);
    }
    scale.push(`hsl(${h}, ${s}%, ${newL}%)`);
  }

  return scale.map((color, index) => ({
    categoryId: categoryId[index],
    color,
  }));
}
