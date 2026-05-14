import React from "react";
import { useWindowDimensions } from "react-native";
import {
  Canvas,
  Circle,
  Group,
  RadialGradient,
  vec,
  Blur,
  Fill,
} from "@shopify/react-native-skia";

/**
 * BackgroundShapeLayout
 *
 * Optimized background using a single Skia Canvas.
 * Uses large radial gradients with a group blur to achieve the smooth "mesh" look
 * from the reference image without the "banding" or performance issues of multiple canvases.
 */
export default function BackgroundShapeLayout() {
  const { width, height } = useWindowDimensions();

  // Color Palette from reference image
  const COLORS = {
    base: "#050505", // Very dark background
    purple: "#6d0dd3", // Primary purple glow
    blue: "#006DFF", // Primary blue glow
    darkBlue: "#0a1128", // Subtle deep blue transition
  };

  return (
    <Canvas style={{ position: "absolute", width, height, zIndex: -1 }}>
      {/* 1. Base Background Color */}
      <Fill color={COLORS.base} />

      {/* 2. Glow Layer with Group Blur for smoother transitions */}
      <Group>
        {/* 1. Large Purple Glow - Top Left/Center */}
        <Circle cx={width * 0.3} cy={height * 0.2} r={width * 0.9}>
          <RadialGradient
            c={vec(width * 0.3, height * 0.2)}
            r={width * 0.6}
            colors={[COLORS.purple, "transparent"]}
          />
        </Circle>

        {/* 3. Middle Magenta/Purple Glow - Left Side */}
        <Circle cx={width * -0.1} cy={height * 0.5} r={width * 0.7}>
          <RadialGradient
            c={vec(width * -0.1, height * 0.5)}
            r={width * 0.7}
            colors={[COLORS.purple, "transparent"]}
          />
        </Circle>

        <Circle cx={width * 0.9} cy={height * 0.15} r={width * 0.5}>
          <RadialGradient
            c={vec(width * 0.8, height * 0.15)}
            r={width * 0.5}
            colors={[COLORS.purple, "transparent"]}
          />
        </Circle>

        {/* 6. Subtle Cyan Accent - Bottom Right */}
        <Circle cx={width * 0.7} cy={height * 0.6} r={width * 0.5}>
          <RadialGradient
            c={vec(width * 0.8, height * 0.9)}
            r={width * 0.5}
            colors={[COLORS.purple, "transparent"]}
          />
        </Circle>

        <Circle cx={width * 0.7} cy={height * 0.6} r={width * 0.5}>
          <RadialGradient
            c={vec(width * 0.8, height * 0.7)}
            r={width * 0.5}
            colors={[COLORS.purple, "transparent"]}
          />
        </Circle>

        {/* 2. Vibrant Blue Glow - Bottom Left */}
        <Circle cx={width * 0.2} cy={height * 0.9} r={width * 0.8}>
          <RadialGradient
            c={vec(width * 0.2, height * 0.9)}
            r={width * 0.5}
            colors={[COLORS.blue, "transparent"]}
          />
        </Circle>

        {/* 4. Deep Blue Glow - Bottom Right/Center */}
        <Circle cx={width * 0.7} cy={height * 0.8} r={width * 0.7}>
          <RadialGradient
            c={vec(width * 0.7, height * 0.99)}
            r={width * 0.4}
            colors={[COLORS.blue, "transparent"]}
          />
        </Circle>

        {/* 5. Subtle Cyan Accent - Top Right */}
        <Circle cx={width * 0.9} cy={height * 0.15} r={width * 0.5}>
          <RadialGradient
            c={vec(width * 0.9, height * 0.15)}
            r={width * 0.5}
            colors={[COLORS.blue, "transparent"]}
          />
        </Circle>
        {/* 6. Subtle Cyan Accent - Top Right */}

        {/* Apply a heavy blur to the entire group to blend them perfectly */}
        {/* Reducimos un poco el blur para que los colores no se "pierdan" tanto */}
        <Blur blur={70} />
      </Group>
    </Canvas>
  );
}
