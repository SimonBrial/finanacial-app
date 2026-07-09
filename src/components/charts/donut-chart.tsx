import { Canvas, Path, Skia } from "@shopify/react-native-skia";
import { View, StyleSheet } from "react-native";

import DonutPath from "./donut-path";
import { DonutChartProps } from "../../types/interface";

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
        {/* Fondo gris de los anillos no completados */}
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
              segmentData={d} // NUEVO: Pasamos la data del segmento para evaluar excesos
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
