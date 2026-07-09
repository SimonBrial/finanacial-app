import React, { useMemo } from "react";
import { View } from "react-native";
import Svg, {
  LinearGradient,
  Text as SvgText,
  Defs,
  Stop,
  Rect,
} from "react-native-svg";
import { capitalizeFirstLetter } from "../../utils/capitalizeFirstLetter";
import { CustomBadgeProps } from "../../types/interface";
import { BankNameTypes, BasesSize } from "../../types/type";
import useTheme from "../../hooks/useTheme";

// Definimos la estructura de los datos de cada banco
const BANK_CONFIGS: Record<BankNameTypes, string[]> = {
  payoneer: [
    "#FF4D00",
    "#FF00A8",
    "#9747FF",
    "#0075FF",
    "#00C2FF",
    "#00FF47",
    "#FFD600",
  ],
  paypal: ["#27346A", "#2790C3"],
  banesco: ["#147957", "#104374"],
  mercantil: ["#004A99", "#FFCC00"],
  bdv: ["#0041D3", "#FF0000"],
  provincial: ["#004481", "#043263"],
  // Puedes seguir agregando más bancos aquí...
};

const strokeWidth = 1;

export default function CustomBadge({
  bankName,
  size = "sm",
  width,
  height,
}: CustomBadgeProps) {
  const { sizes } = useTheme();

  const { finalWidth, finalHeight, finalFontSize } = useMemo(() => {
    const sizeConfig: Record<
      BasesSize,
      {
        height: number;
        width: number;
        fontSize: number;
        paddingHorizonta: number;
      }
    > = {
      sm: { height: 18, width: 54, fontSize: 10, paddingHorizonta: 2 },
      md: {
        height: 20,
        width: 60,
        fontSize: sizes.sm || 12,
        paddingHorizonta: sizes.xs,
      },
      lg: {
        height: 22,
        width: 66,
        fontSize: sizes.md || 16,
        paddingHorizonta: sizes.md,
      },
    };

    const currentConfig = sizeConfig[size as BasesSize] || sizeConfig.sm;

    const computedHeight = height ?? currentConfig.height;
    const computedWidth = width ?? currentConfig.width;

    // Adjust font size proportionally if height is overridden
    const computedFontSize = height
      ? computedHeight * (currentConfig.fontSize / currentConfig.height)
      : currentConfig.fontSize;

    return {
      finalWidth: computedWidth,
      finalHeight: computedHeight,
      finalFontSize: computedFontSize,
    };
  }, [size, sizes, width, height]);

  // Buscamos los colores. Si el banco no existe, usamos uno por defecto (gris).
  const colors = BANK_CONFIGS[bankName.toLowerCase() as BankNameTypes] || [
    "#888",
    "#444",
  ];
  const gradientId = `grad-${bankName.toLowerCase()}`;

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg
        height={finalHeight}
        width={finalWidth}
        viewBox={`0 0 ${finalWidth} ${finalHeight}`}
      >
        <Defs>
          <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            {colors.map((color, index) => (
              <Stop
                key={index}
                offset={`${(index * 100) / (colors.length - 1)}%`}
                stopColor={color}
              />
            ))}
          </LinearGradient>
        </Defs>

        {/* Borde de la Badge */}
        <Rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={finalWidth - strokeWidth}
          height={finalHeight - strokeWidth}
          rx={finalHeight / 2}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Texto con degradado */}
        <SvgText
          fill={`url(#${gradientId})`}
          fontSize={finalFontSize}
          fontWeight="bold"
          x="50%"
          y="58%" // Ajuste manual para centrado visual
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {capitalizeFirstLetter(bankName)}
        </SvgText>
      </Svg>
    </View>
  );
}
