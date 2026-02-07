import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";
import { sizes as FONT_SIZES } from "../../context/styles/styles-base";

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
  ...rest
}: TypographyProps) {
  // se obtiene el número directamente del objeto constante
  const fontSize = FONT_SIZES[variant];

  const combinedStyles = StyleSheet.flatten([
    baseStyles.text,
    { fontSize },
    bold ? { fontWeight: "bold" as const } : {},
    customStyles,
  ]);

  return (
    <Text style={combinedStyles} {...rest}>
      {children}
    </Text>
  );
}

const baseStyles = StyleSheet.create({
  text: {
    fontFamily: "monospace",
    color: "#000000",
  },
});
