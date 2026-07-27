import React, { useMemo } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import useTheme from "../../hooks/useTheme";
import { GenerateScaleParams, ColorScaleItem } from "../../types/interface";
import CollapsibleCardContainer from "../collapsible-card-container";
import { BanknoteArrowDown } from "lucide-react-native";
import { Text } from "../ui/text";
import generateScale from "@/utils/generateScale";

// Simulamos los datos del mes actual
// Ordenamos de mayor a menor porcentaje para que el anillo más grande quede afuera
const CURRENT_MONTH_EXPENSES = [
  {
    id: "1",
    category: "Ahorros",
    percentage: 85,
    color: "rgba(0, 110, 255, 1)",
  }, // Color Base
  {
    id: "2",
    category: "Fijos",
    percentage: 65,
    color: "rgba(0, 85, 204, 0.8)",
  }, // Tono más oscuro
  {
    id: "3",
    category: "Variables",
    percentage: 45,
    color: " rgba(0, 85, 204, 0.6)",
  }, // Tono más oscuro
  {
    id: "4",
    category: "Dulces",
    percentage: 25,
    color: "rgba(0, 42, 102, 0.4)",
  }, // Tono más oscuro
  {
    id: "5",
    category: "Otros",
    percentage: 25,
    color: "rgba(0, 42, 102, 0.4)",
  }, // Tono más oscuro
];

const colorArray = generateScale({
  hex: "#006DFF",
  steps: CURRENT_MONTH_EXPENSES.length,
  categoryId: CURRENT_MONTH_EXPENSES.map((item) => item.id),
});

export default function ConcentricProgressRings() {
  const { isDark } = useTheme();

  // --- CONFIGURACIÓN RESPONSIVE ---
  const screenWidth = Dimensions.get("window").width;
  // El tamaño del gráfico será el 45% del ancho de la pantalla
  const size = screenWidth * 0.55;
  const center = size / 2;
  const strokeWidth = 10; // Grosor de cada anillo
  const ringGap = 6; // Espacio entre cada anillo
  const trackColor = "rgba(28, 33, 51, 0.1)"; // Color de fondo del anillo

  // Calculamos el porcentaje general (promedio) para mostrar en el centro
  const totalPercentage = useMemo(() => {
    const sum = CURRENT_MONTH_EXPENSES.reduce(
      (acc, curr) => acc + curr.percentage,
      0,
    );
    return Math.round(sum / CURRENT_MONTH_EXPENSES.length);
  }, []);

  return (
    <CollapsibleCardContainer title="Monthly Expenses" as={BanknoteArrowDown}>
      {/* BODY: Gráfico y Leyenda */}
      <View className="w-full flex-row gap-5 items-center justify-between px-2.5 py-1">
        {/* LADO IZQUIERDO: SVG */}
        <View className="relative" style={{ width: size, height: size }}>
          <Svg width={size} height={size}>
            {CURRENT_MONTH_EXPENSES.map((item, index) => {
              const radius =
                center - strokeWidth / 2 - index * (strokeWidth + ringGap);
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset =
                circumference - (item.percentage / 100) * circumference;

              return (
                <G key={item.id} origin={`${center}, ${center}`}>
                  {/* Anillo de Fondo */}
                  <Circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={trackColor}
                    strokeWidth={strokeWidth}
                    fill="none"
                  />
                  {/* Anillo de Progreso */}
                  <Circle
                    cx={center}
                    cy={center}
                    r={radius}
                    stroke={
                      colorArray.find((c) => c.categoryId === item.id)?.color ||
                      item.color
                    }
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="none"
                  />
                </G>
              );
            })}
          </Svg>

          {/* TEXTO CENTRAL (Porcentaje Global) */}
          <View className="absolute inset-0 justify-center items-center">
            <Text
              className={`text-lg font-bold my-0 ${isDark ? "text-white" : "text-slate-900"}`}
              variant="h3"
            >
              {totalPercentage}%
            </Text>
          </View>
        </View>

        {/* LADO DERECHO: LEYENDA */}
        <View className="flex-1 ml-0.5 justify-center gap-2">
          {CURRENT_MONTH_EXPENSES.map((item) => (
            <View key={item.id} className="flex-row items-center gap-2.5">
              {/* Puntito de color con brillo simulado */}
              <View
                className="w-[14px] h-[14px] rounded-full"
                style={{
                  backgroundColor:
                    colorArray.find((c) => c.categoryId === item.id)?.color ||
                    item.color,
                  shadowColor: "#006DFF",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.5,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              />
              <Text
                className={`text-sm my-0 ${isDark ? "text-slate-200" : "text-slate-700"}`}
                variant="p"
              >
                {item.category}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </CollapsibleCardContainer>
  );
}
