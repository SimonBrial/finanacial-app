import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";

const FONT_SIZES = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
  "3xl": 30,
  "4xl": 36,
  "5xl": 48,
  "6xl": 60,
  "7xl": 72,
  "8xl": 96,
  "9xl": 128,
} as const;

type TypographyVariant2 = keyof typeof FONT_SIZES;

interface TypographyProps {
  children: React.ReactNode;
  /** Estilos adicionales opcionales */
  customStyles?: StyleProp<TextStyle>;
  /** Tamaño de la fuente. Por defecto 'base' (16px) */
  variant?: TypographyVariant2;
  /** Si es true, aplica negrita */
  bold?: boolean;
}

export default function Typography({
  variant = "base",
  children,
  customStyles,
  bold = false,
}: TypographyProps) {
  // Obtenemos el número directamente del objeto constante
  const fontSize = FONT_SIZES[variant];

  const combinedStyles = StyleSheet.flatten([
    baseStyles.text,
    { fontSize }, // Aplicamos el tamaño dinámicamente
    bold ? { fontWeight: "bold" as const } : {},
    customStyles,
  ]);

  return <Text style={combinedStyles}>{children}</Text>;
}

const baseStyles = StyleSheet.create({
  text: {
    fontFamily: "monospace",
    color: "#000000",
  },
});
