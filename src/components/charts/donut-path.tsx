import React from "react";
import { Path, Skia, Group } from "@shopify/react-native-skia";
import { useDerivedValue, withTiming } from "react-native-reanimated";
import { DonutPathProps } from "../../types/interface";

export default function DonutPath({
  outerStrokeWidth,
  strokeWidth,
  decimals,
  radius,
  color,
  index,
  gap,
  selectedIndex = null,
  segmentData,
}: DonutPathProps) {
  const innerRadius = radius - outerStrokeWidth / 2;
  const path = Skia.Path.Circle(radius, radius, innerRadius);

  const isSelected = selectedIndex === index;

  // Prevención matemática: nos aseguramos de que los valores nunca sean negativos o generen división por cero
  const safeAmount = Math.max(segmentData.amount, 0);
  const safeLimit = Math.max(segmentData.limit, 0.001);
  const isOverBudget = safeAmount > safeLimit;

  // 1. Matemáticas de la proporción del "encogimiento"
  // Si hay exceso: la capa superior sólida representa el límite (limit / amount).
  // Si falta por gastar: la capa superior sólida representa lo gastado (amount / limit).
  const targetRatio = isOverBudget
    ? safeLimit / safeAmount
    : safeAmount / safeLimit;

  // Animación del recorte
  const animatedSplitRatio = useDerivedValue(() => {
    return isSelected
      ? withTiming(targetRatio, { duration: 450 })
      : withTiming(1, { duration: 400 }); // Si no está seleccionado, cubre el 100%
  }, [isSelected, targetRatio]);

  // Opacidad Global (Claridad al 20% para los segmentos no seleccionados)
  const groupOpacity = useDerivedValue(() => {
    if (selectedIndex === null) return withTiming(1, { duration: 250 });
    return isSelected
      ? withTiming(1, { duration: 250 })
      : withTiming(0.2, { duration: 250 });
  }, [selectedIndex, isSelected]);

  // Cálculos de inicio y fin del arco completo
  const start = useDerivedValue(() => {
    if (index === 0) return gap;
    const decimal = decimals.value.slice(0, index);
    const sum = decimal.reduce((acc, curr) => acc + curr, 0);
    return withTiming(sum + gap, { duration: 1000 });
  }, []);

  const end = useDerivedValue(() => {
    if (index === decimals.value.length - 1)
      return withTiming(1, { duration: 1000 });
    const decimal = decimals.value.slice(0, index + 1);
    const sum = decimal.reduce((acc, curr) => acc + curr, 0);
    return withTiming(sum, { duration: 1000 });
  }, []);

  // El punto final animado de la capa sólida superior
  const solidEnd = useDerivedValue(() => {
    const totalLength = end.value - start.value;
    return start.value + totalLength * animatedSplitRatio.value;
  }, [start, end, animatedSplitRatio]);

  // NUEVO: Opacidad de la capa de fondo (Revelado)
  // Si está seleccionado, el fondo toma opacidad 1 (si es rojo/exceso) o 0.8 (si es ahorro).
  const bgOpacity = useDerivedValue(() => {
    if (!isSelected) return withTiming(0, { duration: 300 });
    return isOverBudget
      ? withTiming(1, { duration: 400 })
      : withTiming(0.5, { duration: 400 });
  }, [isSelected, isOverBudget]);

  return (
    <Group opacity={groupOpacity}>
      {/* CAPA INFERIOR (Fondo): Lo que falta por gastar (0.8) o el Exceso (Rojo) */}
      <Path
        path={path}
        color={isOverBudget ? "#ef4444" : color}
        style="stroke"
        strokeJoin="round"
        strokeWidth={strokeWidth} // Fijo: no aumenta de tamaño
        strokeCap="round"
        start={start}
        end={end} // Ocupa todo el arco
        opacity={bgOpacity}
      />

      {/* CAPA SUPERIOR (Frente): Lo gastado o el Límite */}
      <Path
        path={path}
        color={color} // Siempre es el color sólido asignado
        style="stroke"
        strokeJoin="round"
        strokeWidth={strokeWidth} // Fijo: no aumenta de tamaño
        strokeCap="round"
        start={start}
        end={solidEnd} // Se encoge para revelar el fondo
      />
    </Group>
  );
}
