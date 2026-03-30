import React from "react";
import { Canvas, Path, SweepGradient, vec } from "@shopify/react-native-skia";

export default function PayoneerIcon({ size = 55 }: { size?: number }) {
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  return (
    <Canvas style={{ width: size, height: size }}>
      <Path
        // Dibuja un círculo usando SVG path data estándar o la primitiva Circle de Skia
        path={`M ${center} ${strokeWidth / 2} A ${radius} ${radius} 0 1 1 ${center - 0.1} ${strokeWidth / 2}`}
        style="stroke"
        strokeWidth={strokeWidth}
      >
        <SweepGradient
          c={vec(center, center)}
          colors={[
            "#FE4800",
            "#FBD600",
            "#2CD87B",
            "#2490E1",
            "#E248CF",
            "#FE4800",
          ]}
        />
      </Path>
    </Canvas>
  );
}
