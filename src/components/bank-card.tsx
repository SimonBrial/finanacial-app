import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, {
  FeGaussianBlur,
  RadialGradient,
  Filter,
  Defs,
  Rect,
  Stop,
  G,
} from "react-native-svg";
import useTheme from "../hooks/useTheme";
import Badge from "./ui/badge";
import { BankCardProps } from "../types/interface";
import { useBankStore } from "../stores/useBankStore";
import { Text } from "./ui/text";

export default function BankCard({
  gradientColors = ["#0D5CE5", "#22C55E", "#C87533", "#0B1E48"],
  percentage,
  lastEntry,
  trendIcon,
  bankName,
  currency,
  balance,
}: BankCardProps) {
  const { sizes } = useTheme();
  const showBalance = useBankStore().showBalance;

  // 4 Colores exactos para cada esquina (TL, TR, BR, BL)
  const c1 = gradientColors[0] || "#0D5CE5"; // Top-Left (Azul Rey)
  const c2 = gradientColors[1] || "#22C55E"; // Top-Right (Verde Vivo)
  const c3 = gradientColors[2] || "#C87533"; // Bottom-Right (Cobre / Naranja Ámbar)
  const c4 = gradientColors[3] || "#0B1E48"; // Bottom-Left (Azul Noche Oscuro)

  const cardId = bankName.replace(/\s+/g, "").toLowerCase();

  return (
    <View
      style={[
        stylesDefault.containerCard,
        {
          padding: sizes.lg,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "91%",
          overflow: "hidden",
        },
      ]}
    >
      {/* --- FONDO EXACTO BASADO EN LA IMAGEN (4 ESQUINAS SUAVES) --- */}
      <View style={StyleSheet.absoluteFill}>
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 400 240"
          preserveAspectRatio="none"
        >
          <Defs>
            {/* Filtro de desenfoque suave para fusionar esquinas */}
            <Filter
              id={`blur-${cardId}`}
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <FeGaussianBlur stdDeviation="24" />
            </Filter>

            {/* Esquina Superior Izquierda (Azul) */}
            <RadialGradient
              id={`gradTL-${cardId}`}
              cx="0%"
              cy="0%"
              r="100%"
              fx="0%"
              fy="0%"
            >
              <Stop offset="0%" stopColor={c1} stopOpacity="1" />
              <Stop offset="45%" stopColor={c1} stopOpacity="0.8" />
              <Stop offset="100%" stopColor={c1} stopOpacity="0" />
            </RadialGradient>

            {/* Esquina Superior Derecha (Verde) */}
            <RadialGradient
              id={`gradTR-${cardId}`}
              cx="100%"
              cy="0%"
              r="100%"
              fx="100%"
              fy="0%"
            >
              <Stop offset="0%" stopColor={c2} stopOpacity="1" />
              <Stop offset="45%" stopColor={c2} stopOpacity="0.8" />
              <Stop offset="100%" stopColor={c2} stopOpacity="0" />
            </RadialGradient>

            {/* Esquina Inferior Derecha (Naranja / Cobre) */}
            <RadialGradient
              id={`gradBR-${cardId}`}
              cx="100%"
              cy="100%"
              r="100%"
              fx="100%"
              fy="100%"
            >
              <Stop offset="0%" stopColor={c3} stopOpacity="1" />
              <Stop offset="45%" stopColor={c3} stopOpacity="0.8" />
              <Stop offset="100%" stopColor={c3} stopOpacity="0" />
            </RadialGradient>

            {/* Esquina Inferior Izquierda (Azul Noche Oscuro) */}
            <RadialGradient
              id={`gradBL-${cardId}`}
              cx="0%"
              cy="100%"
              r="100%"
              fx="0%"
              fy="100%"
            >
              <Stop offset="0%" stopColor={c4} stopOpacity="1" />
              <Stop offset="50%" stopColor={c4} stopOpacity="0.85" />
              <Stop offset="100%" stopColor={c4} stopOpacity="0" />
            </RadialGradient>
          </Defs>

          {/* Renderizado limpio en 4 capas de esquina difuminadas */}
          <G filter={`url(#blur-${cardId})`}>
            {/* Fondo base oscuro */}
            <Rect x="0" y="0" width="400" height="240" fill={c4} />

            {/* Capa Esquina Superior Izquierda */}
            <Rect
              x="0"
              y="0"
              width="400"
              height="240"
              fill={`url(#gradTL-${cardId})`}
            />

            {/* Capa Esquina Superior Derecha */}
            <Rect
              x="0"
              y="0"
              width="400"
              height="240"
              fill={`url(#gradTR-${cardId})`}
            />

            {/* Capa Esquina Inferior Derecha */}
            <Rect
              x="0"
              y="0"
              width="400"
              height="240"
              fill={`url(#gradBR-${cardId})`}
            />

            {/* Capa Esquina Inferior Izquierda */}
            <Rect
              x="0"
              y="0"
              width="400"
              height="240"
              fill={`url(#gradBL-${cardId})`}
            />
          </G>
        </Svg>

        {/* Brillo fino glassmorphism y borde sutil */}
        <LinearGradient
          colors={["rgba(255, 255, 255, 0.12)", "rgba(0, 0, 0, 0.2)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            StyleSheet.absoluteFill,
            {
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.15)",
              borderRadius: 20,
            },
          ]}
        />
      </View>

      {/* --- CONTENIDO DE LA TARJETA (INTACTO) --- */}
      <Text className="font-bold text-right text-3xl text-white">
        {bankName}
      </Text>

      <View style={{ display: "flex", flexDirection: "column", gap: sizes.xs }}>
        <View className="flex-row justify-start gap-3">
          <Text className="text-white text-xl">Balance</Text>
          <Text className="text-white text-base">({currency})</Text>
        </View>

        <View
          className="justify-start gap-3 border border-transparent pb-2"
          style={{
            borderBottomColor: "rgba(255, 255, 255, 0.3)",
          }}
        >
          {showBalance ? (
            <Text className="text-white text-3xl">{balance}</Text>
          ) : (
            <Text className="text-white text-3xl">
              {balance.replace(/./g, "*")}
            </Text>
          )}
        </View>

        <View className="flex-row justify-star gap-3">
          <Text className="text-white text-xs">Last Entry:</Text>

          {showBalance ? (
            <View className="flex-row justify-start gap-3">
              <Badge text={lastEntry} type="bordered" color="white" />

              <Badge
                text={percentage}
                type="bordered"
                color="#ffffff"
                iconLeft={trendIcon}
              />
            </View>
          ) : (
            <Badge text={"**/**/**"} type="bordered" color="#ffffff" />
          )}
        </View>
      </View>
    </View>
  );
}

const stylesDefault = StyleSheet.create({
  containerCard: {
    width: "100%",
    height: 200,
    borderRadius: 20,
  },
});
