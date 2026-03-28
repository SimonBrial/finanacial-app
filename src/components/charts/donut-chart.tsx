import { Canvas, Path, Skia } from "@shopify/react-native-skia";
import { View, StyleSheet } from "react-native";
import { SharedValue } from "react-native-reanimated";
import DonutPath from "./donut-path";

import { DonutChartData } from "../../interface/interface";

interface DonutChartProps {
  gap: number;
  radius: number;
  strokeWidth: number;
  outerStrokeWidth: number;
  decimals: SharedValue<number[]>;
  colors: string[];
  data: DonutChartData[];
  selectedIndex?: number | null;
}

export default function DonutChart({
  outerStrokeWidth,
  strokeWidth,
  decimals,
  radius,
  colors,
  data,
  gap,
  selectedIndex = null,
}: DonutChartProps) {
  const innerRadius = radius - outerStrokeWidth / 2;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        <Path
          path={path}
          color="#313035"
          style="stroke"
          strokeJoin="round"
          strokeWidth={outerStrokeWidth}
          strokeCap="round"
          start={0}
          end={1}
        />
        {data.map((d, index) => {
          return (
            <DonutPath
              outerStrokeWidth={outerStrokeWidth}
              strokeWidth={strokeWidth}
              color={colors[index]}
              decimals={decimals}
              radius={radius}
              index={index}
              key={index}
              gap={gap}
              selectedIndex={selectedIndex}
            />
          );
        })}
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
