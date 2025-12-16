import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import DonutChart from "./donut-chart";

interface Data {
  value: number;
  percentage: number;
  color: string;
}

const RADIUS = 160;
const STROKE_WIDTH = 10;
const OUTER_STROKE_WIDTH = 16;
const GAP = 0.015;

const donutData: Data[] = [
  { value: 45, color: "#009FFF", percentage: 45 },
  { value: 30, color: "#93FCF8", percentage: 30 },
  { value: 250, color: "#BDB2FA", percentage: 25 },
];

export default function DonutChartContainer() {
  const [isLoading, setIsLoading] = useState(true);

  // 1. Inicializamos vacíos o en 0
  const decimals = useSharedValue<number[]>([]);
  const totalValue = useSharedValue(0);

  const colors = donutData.map((d) => d.color);

  useEffect(() => {
    // Aseguramos estado inicial de carga
    setIsLoading(true);
    decimals.value = [];
    totalValue.value = 0;

    const timer = setTimeout(() => {
      // --- PASO 1: Calcular datos ---
      const total = donutData.reduce((acc, curr) => acc + curr.value, 0);
      const generateDecimals = donutData.map((item) => item.value / total);

      // --- PASO 2: Mostrar el componente (Aún con valores en 0) ---
      setIsLoading(false);

      // --- PASO 3: Disparar animación un instante DESPUÉS ---
      // Damos 100ms para asegurar que el componente <DonutChart> se montó en el DOM
      setTimeout(() => {
        decimals.value = generateDecimals; // Esto dispara el useDerivedValue en los hijos
        totalValue.value = withTiming(total, { duration: 1000 });
      }, 100);
    }, 1500); // Tiempo del spinner

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <ActivityIndicator size={50} />
        ) : (
          <View style={styles.chartContainer}>
            <DonutChart
              outerStrokeWidth={OUTER_STROKE_WIDTH}
              strokeWidth={STROKE_WIDTH}
              decimals={decimals}
              colors={colors}
              radius={RADIUS}
              data={donutData}
              gap={GAP}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartContainer: {
    width: RADIUS * 2,
    height: RADIUS * 2,
    marginTop: 10,
    marginBottom: 20, // Agregué un margen inferior ya que quitamos el botón
  },
});

function calculatePercentage(numbers: number[], total: number): number[] {
  const percentageArray: number[] = [];

  numbers.forEach((number) => {
    const percentage = Math.round((number / total) * 100);

    percentageArray.push(percentage);
  });

  return percentageArray;
}
