import React from "react";
import { View, ViewStyle } from "react-native";
import * as LucideIcons from "lucide-react-native";
import useTheme from "../../hooks/useTheme";
import { IconProps } from "../../types/interface";
import { IconVariant } from "../../types/type";

// Convierte nombres en formato kebab-case o lowercase ("check-circle", "home") a PascalCase ("CheckCircle", "Home")
function formatIconName(name: string): string {
  if (!name) return "HelpCircle";
  return name.replace(/(^\w|-\w)/g, (m) => m.replace("-", "").toUpperCase());
}

export default function Icon({
  color,
  rounded = false,
  variant = "solid",
  name = "Home",
  size = 24,
  padding = 8,
  bgStyle,
  style,
}: IconProps) {
  const { sizes, theme } = useTheme();

  const pascalName = formatIconName(name);

  // Obtenemos el ícono de lucide-react-native
  const IconComponent =
    (LucideIcons as Record<string, any>)[pascalName] ||
    (LucideIcons as Record<string, any>)[name] ||
    LucideIcons.HelpCircle;

  const variantStyles: Record<IconVariant, ViewStyle> = {
    light: {
      backgroundColor: "transparent",
      borderWidth: 0,
      padding: 0,
    },
    solid: {
      backgroundColor: theme.t20,
      borderWidth: 0,
    },
    bordered: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: theme.t100,
    },
    ghost: {
      backgroundColor: color ? `${color}33` : theme.t20,
      borderWidth: 0,
    },
  };

  const iconColor =
    variant === "light"
      ? color || "white"
      : variant === "ghost"
        ? color || theme.t100
        : theme.t100;

  const containerStyles = [
    {
      display: "flex" as const,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      padding: variant === "light" ? 0 : padding,
      borderRadius: rounded ? 999 : sizes.xxs,
    },
    variantStyles[variant],
    bgStyle,
  ];

  return (
    <View style={containerStyles}>
      <IconComponent
        size={size}
        color={iconColor}
        style={style}
        strokeWidth={2}
      />
    </View>
  );
}
