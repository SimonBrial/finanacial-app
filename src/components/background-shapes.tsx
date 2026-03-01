import {
  RadialGradient,
  Canvas,
  Blur,
  Rect,
  vec,
} from "@shopify/react-native-skia";
import { View } from "react-native";
import useTheme from "../hook/useTheme";

interface BackgroundShapesProps {
  height?: number;
  width?: number;
  customStyles?: object;
  color?: string;
  cX: number;
  cY: number;
  r: number;
  blur?: number;
}

export default function BackgroundShapes({
  customStyles,
  height = 200,
  width = 200,
  blur = 20,
  color,
  cX,
  cY,
  r,
}: BackgroundShapesProps) {
  const { theme } = useTheme();
  return (
    <View
      style={[
        customStyles,
        { height, width },
        { position: "absolute", zIndex: -1 },
      ]}
    >
      <Canvas
        style={{
          flex: 1,
          width: width || 200,
          height: height || 200,
          position: "absolute",
        }}
        //id="sdlajksdasdhasdhjhj2"
      >
        <Rect x={0} y={0} width={width / 2 || 100} height={height / 2 || 100}>
          <RadialGradient
            c={vec(cX, cY)}
            r={r}
            colors={[color || theme.t100, "transparent"]}
          />
          <Blur blur={blur} />
        </Rect>
      </Canvas>
    </View>
  );
}
