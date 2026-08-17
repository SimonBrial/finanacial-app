import React, { useMemo } from "react";
import { View, Text, ViewStyle, TextStyle, StyleProp } from "react-native";
import Icon from "./icon";
import { BadgeProps } from "../../types/interface";
import { BasesSize } from "../../types/type";

const DEFAULT_COLOR = "#00E676";

function hexToRgba(color: string, alpha: number): string {
  if (!color) return `rgba(0, 230, 118, ${alpha})`;

  if (color.startsWith("rgba")) {
    return color.replace(/[\d\.]+\)$/g, `${alpha})`);
  }
  if (color.startsWith("rgb")) {
    return color.replace("rgb", "rgba").replace(")", `, ${alpha})`);
  }

  const namedColors: Record<string, string> = {
    gray: "#6b7280",
    grey: "#6b7280",
    red: "#ef4444",
    blue: "#3b82f6",
    green: "#22c55e",
    yellow: "#eab308",
    purple: "#a855f7",
    pink: "#ec4899",
    orange: "#f97316",
    white: "#ffffff",
    black: "#000000",
  };

  let hex = namedColors[color.toLowerCase()] || color;
  if (!hex.startsWith("#")) return `rgba(0, 230, 118, ${alpha})`;

  let cleanHex = hex.replace("#", "");
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (cleanHex.length >= 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return hex;
}

const SIZE_CONFIG: Record<
  BasesSize,
  {
    height: number;
    paddingHorizontal: number;
    paddingVertical: number;
    fontSize: number;
    iconSize: number;
    gap: number;
  }
> = {
  sm: {
    height: 22,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 10,
    iconSize: 11,
    gap: 2,
  },
  md: {
    height: 26,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 12,
    iconSize: 13,
    gap: 4,
  },
  lg: {
    height: 32,
    paddingHorizontal: 14,
    paddingVertical: 6,
    fontSize: 14,
    iconSize: 16,
    gap: 6,
  },
};

export default function Badge({
  library = "MaterialCommunityIcons",
  color = DEFAULT_COLOR,
  fullWidth = false,
  type = "subtle",
  size = "md",
  iconSize: customIconSize,
  containerStyle,
  textStyle,
  iconRight,
  iconLeft,
  text,
}: BadgeProps) {
  const hasText = text !== undefined && text !== null && text.trim() !== "";
  const isIconOnly = !hasText && (Boolean(iconLeft) || Boolean(iconRight));
  const singleIconName = iconLeft || iconRight;

  const currentSize = SIZE_CONFIG[size as BasesSize] || SIZE_CONFIG.md;
  const iconSize = customIconSize ?? currentSize.iconSize;

  // 3 Tipos principales:
  // 1. filled (sólido - columna izquierda)
  // 2. bordered (borde con fondo transparente - segunda columna)
  // 3. subtle (fondo suave translúcido - última columna)
  const isFilled = type === "filled" || type === "solid";
  const isBordered = type === "bordered" || type === "outline";

  const contentColor = isFilled ? "#FFFFFF" : color;

  const computedContainerStyle = useMemo<ViewStyle>(() => {
    const base: ViewStyle = {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 9999,
    };

    if (isFilled) {
      base.backgroundColor = color;
      base.borderWidth = 0;
    } else if (isBordered) {
      base.backgroundColor = "transparent";
      base.borderWidth = 1;
      base.borderColor = color;
    } else {
      // Subtle (última columna / soft / flat / ghost / light)
      base.backgroundColor = hexToRgba(color, 0.16);
      base.borderWidth = 0;
    }

    if (isIconOnly) {
      base.width = currentSize.height;
      base.height = currentSize.height;
      base.paddingHorizontal = 0;
      base.paddingVertical = 0;
    } else {
      base.minHeight = currentSize.height;
      base.paddingHorizontal = currentSize.paddingHorizontal;
      base.paddingVertical = currentSize.paddingVertical;
      base.columnGap = currentSize.gap;
      if (fullWidth) {
        base.width = "100%";
      } else {
        base.alignSelf = "flex-start";
      }
    }

    return base;
  }, [isFilled, isBordered, color, isIconOnly, currentSize, fullWidth]);

  if (isIconOnly && singleIconName) {
    return (
      <View style={[computedContainerStyle, containerStyle]}>
        <Icon
          variant="light"
          name={singleIconName}
          library={library}
          color={contentColor}
          size={iconSize}
        />
      </View>
    );
  }

  return (
    <View style={[computedContainerStyle, containerStyle]}>
      {iconLeft && (
        <Icon
          variant="light"
          name={iconLeft}
          library={library}
          color={contentColor}
          size={iconSize}
        />
      )}
      {hasText && (
        <Text
          style={[
            {
              color: contentColor,
              fontSize: currentSize.fontSize,
              fontWeight: "600",
              textAlign: "center",
              includeFontPadding: false,
            },
            textStyle,
          ]}
        >
          {text}
        </Text>
      )}
      {iconRight && (
        <Icon
          variant="light"
          name={iconRight}
          library={library}
          color={contentColor}
          size={iconSize}
        />
      )}
    </View>
  );
}
