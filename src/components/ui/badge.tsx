import React, { useMemo } from "react";
import { View, Text, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "./icon";
import { BadgeProps } from "../../types/interface";

const DEFAULT_COLOR = "#00E676"; // Verde Esmeralda Vibrante

function hexToRgba(hex: string, alpha: number): string {
  if (!hex) return `rgba(0, 230, 118, ${alpha})`;
  let cleanHex = hex.replace("#", "");
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return hex;
}

export default function Badge({
  library = "MaterialCommunityIcons",
  color = DEFAULT_COLOR,
  fullWidth = false,
  type = "glow",
  containerStyle,
  iconRight,
  iconLeft,
  text,
}: BadgeProps) {
  // Detectamos si es sólo icono (sin texto)
  const isIconOnly = !text && (Boolean(iconLeft) || Boolean(iconRight));
  const isFilled = type === "filled";
  const contentColor = isFilled ? "#FFFFFF" : color;

  // Estilos strictly necesarios que dependen de valores Hex dinámicos por prop
  const dynamicStyles = useMemo(() => {
    const dynamicBorder: ViewStyle =
      type === "bordered" ||
      type === "ghost" ||
      type === "glow" ||
      type === "gradient"
        ? { borderColor: type === "bordered" ? color : hexToRgba(color, 0.8) }
        : {};

    const dynamicBg: ViewStyle =
      type === "filled"
        ? { backgroundColor: color }
        : type === "ghost" || type === "flat"
          ? { backgroundColor: hexToRgba(color, 0.15) }
          : {};

    const dynamicShadow: ViewStyle =
      type === "glow" || type === "gradient"
        ? {
            shadowColor: color,
            borderRadius: 1000,
          }
        : {};

    return {
      container: [dynamicBg, dynamicBorder, dynamicShadow, containerStyle],
      gradientColors: [
        hexToRgba(color, 0.25), // 20% traslúcido arriba
        hexToRgba(color, 0.0), // Transparente abajo
      ] as [string, string],
    };
  }, [type, color, containerStyle]);

  // Clases NativeWind para estructura fija (Altura única de 26px)
  const baseClassName = isIconOnly
    ? "p-1 rounded-full items-center justify-center self-start flex-row"
    : ` rounded-full p-1 pr-1.5 flex-row items-center justify-center gap-1.5 self-start ${
        fullWidth ? "w-full self-auto" : ""
      }`;

  const borderClassName =
    type === "bordered" ||
    type === "ghost" ||
    type === "glow" ||
    type === "gradient"
      ? "border"
      : "";

  const containerClassName = `${baseClassName} ${borderClassName}`.trim();

  const isGradientType = type === "glow" || type === "gradient";

  const renderContent = () => (
    <>
      {iconLeft && (
        <Icon
          variant="light"
          name={iconLeft}
          library={library}
          color={contentColor}
          size={12}
        />
      )}
      {text !== undefined && text !== "" ? (
        <Text
          className="text-xs font-semibold text-center"
          style={{ color: contentColor }}
        >
          {text}
        </Text>
      ) : null}
      {iconRight && (
        <Icon
          variant="light"
          name={iconRight}
          library={library}
          color={contentColor}
          size={12}
        />
      )}
    </>
  );

  if (isGradientType) {
    return (
      <LinearGradient
        colors={dynamicStyles.gradientColors}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className={containerClassName}
        style={dynamicStyles.container}
      >
        {renderContent()}
      </LinearGradient>
    );
  }

  return (
    <View className={containerClassName} style={dynamicStyles.container}>
      {renderContent()}
    </View>
  );
}
