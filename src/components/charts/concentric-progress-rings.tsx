import React, { useMemo } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import Typography from "../ui/typography"; // Asumiendo tu componente del ejemplo anterior
import Icon from "../ui/icon"; // Asumiendo tu componente del ejemplo anterior
import Row from "../ui/row";
import useTheme from "../../hook/useTheme";

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
  const { globalStyles, sizes } = useTheme();
  // --- CONFIGURACIÓN RESPONSIVE ---
  const screenWidth = Dimensions.get("window").width;
  // El tamaño del gráfico será el 50% del ancho de la pantalla (puedes ajustarlo)
  const size = screenWidth * 0.45;
  const center = size / 2;
  const strokeWidth = 10; // Grosor de cada anillo
  const ringGap = 6; // Espacio entre cada anillo
  const trackColor = "#131E32"; // Color de fondo del anillo (desactivado)

  // Calculamos el porcentaje general (promedio) para mostrar en el centro
  const totalPercentage = useMemo(() => {
    const sum = CURRENT_MONTH_EXPENSES.reduce(
      (acc, curr) => acc + curr.percentage,
      0,
    );
    return Math.round(sum / CURRENT_MONTH_EXPENSES.length);
  }, []);

  return (
    <View style={styles.cardContainer}>
      <LinearGradient
        colors={[globalStyles.bgContainerStart, globalStyles.bgContainerEnd]}
        style={[
          StyleSheet.absoluteFill,
          {
            borderRadius: sizes.lg,
            borderWidth: 1,
            borderColor: globalStyles.borderContainer,
          },
        ]}
        locations={[0.1, 1.0]}
        start={{ x: 0, y: 0.0 }}
        end={{ x: 1, y: 0 }}
      />
      {/* HEADER */}
      <Row
        width="100%"
        gap={12}
        alignItem="center"
        justifyContent="flex-start"
        customStyles={{ marginBottom: 24 }}
      >
        <Icon
          bgStyle={{
            padding: 8,
            borderRadius: 8,
            backgroundColor: "#001B3D", // Un fondo sutil azulado
          }}
          color="#006DFF"
          size={24}
          name="home" // Asumiendo que usas MaterialIcons u otro paquete
          library="MaterialIcons"
        />
        <Typography fontSize={22} customStyles={{ color: "white" }}>
          Monthly Expenses
        </Typography>
      </Row>

      {/* BODY: Gráfico y Leyenda */}
      <View style={styles.chartArea}>
        {/* LADO IZQUIERDO: SVG */}
        <View style={{ width: size, height: size, position: "relative" }}>
          <Svg width={size} height={size}>
            {CURRENT_MONTH_EXPENSES.map((item, index) => {
              // Calcular el radio de cada anillo. El primero es el más grande.
              // Restamos strokeWidth / 2 para que no se corte en los bordes.
              const radius =
                center - strokeWidth / 2 - index * (strokeWidth + ringGap);
              const circumference = 2 * Math.PI * radius;
              // Calculamos cuánto del anillo se debe pintar
              const strokeDashoffset =
                circumference - (item.percentage / 100) * circumference;

              return (
                <G key={item.id} origin={`${center}, ${center}`}>
                  {/* Anillo de Fondo (Pista oscura) */}
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
                    strokeLinecap="round" // Esto hace que las puntas sean redondeadas
                    fill="none"
                  />
                </G>
              );
            })}
          </Svg>

          {/* TEXTO CENTRAL (Porcentaje Global) */}
          <View
            style={[StyleSheet.absoluteFillObject, styles.centerTextContainer]}
          >
            <Typography fontSize={18} bold customStyles={{ color: "white" }}>
              {totalPercentage}%
            </Typography>
          </View>
        </View>

        {/* LADO DERECHO: LEYENDA */}
        <View style={styles.legendContainer}>
          {CURRENT_MONTH_EXPENSES.map((item) => (
            <View key={item.id} style={styles.legendItem}>
              {/* Puntito de color con brillo simulado */}
              <View
                style={[
                  styles.colorDot,
                  {
                    backgroundColor:
                      colorArray.find((c) => c.categoryId === item.id)?.color ||
                      item.color,
                  },
                ]}
              />
              <Typography fontSize={14} customStyles={{ color: "#E0E0E0" }}>
                {item.category}
              </Typography>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#161618", // Fondo oscuro similar al de tu imagen
    borderRadius: 20,
    padding: 24,
    width: "100%",
    marginTop: 24,
  },
  chartArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  centerTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  legendContainer: {
    flex: 1,
    marginLeft: 24,
    justifyContent: "center",
    gap: 16, // Espaciado entre elementos de la leyenda
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  colorDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    // Simular un efecto glow leve
    shadowColor: "#006DFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
});

// Convierte un color HEX a un objeto HSL { h, s, l }
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // Elimina el "#" si está presente
  hex = hex.replace(/^#/, "");
  // Convierte valores cortos (#abc) a largos (#aabbcc)
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((x) => x + x)
      .join("");
  }
  const num = parseInt(hex, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h = h * 60;
  }
  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

interface GenerateScaleParams {
  categoryId: string[];
  steps: number;
  hex: string;
}

interface ColorScaleItem {
  categoryId: string;
  color: string;
}
function generateScale({
  categoryId,
  steps,
  hex,
}: GenerateScaleParams): ColorScaleItem[] {
  // 1. Convertir HEX a HSL (Función simplificada)
  let { h, s, l } = hexToHSL(hex);

  let scale = [];

  for (let i = 0; i < steps; i++) {
    // Calculamos el porcentaje de distribución (0 a 1)
    let pct = i / (steps - 1);

    // Ajustamos la luminosidad de forma lineal
    // 90% (muy claro) -> l (base) -> 10% (muy oscuro)
    let newL;
    if (pct < 0.5) {
      // Interpolar entre 70% de luz y la luz del color base
      newL = 70 - pct * 2 * (70 - l);
    } else {
      // Interpolar entre la luz del color base y 15% de luz
      newL = l - (pct - 0.5) * 2 * (l - 15);
    }

    scale.push(`hsl(${h}, ${s}%, ${newL}%)`);
  }

  return scale.map((color, index) => ({
    categoryId: categoryId[index],
    color,
  }));
}
