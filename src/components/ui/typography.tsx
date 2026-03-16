import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";

interface TypographyProps {
  children: React.ReactNode;
  /** Estilos adicionales opcionales */
  customStyles?: StyleProp<TextStyle>;
  /** Tamaño de la fuente. Por defecto 'base' (16px) */
  fontSize?: number;
  variant?: "Regular" | "Medium" | "Bold" | "SemiBold";
  /** Si es true, aplica negrita */
  bold?: boolean;
  txtWhite?: boolean;
}

export default function Typography({
  fontSize = 16,
  children,
  customStyles,
  bold = false,
  txtWhite = false,
  variant,
  ...rest
}: TypographyProps) {
  const combinedStyles = [
    baseStyles.text,
    { fontSize },
    // Mapeamos la variante al nombre de la fuente que cargaste en el Root
    { fontFamily: `Inter-${variant}` },
    bold ? { fontWeight: "bold" as const } : {},
    txtWhite ? { color: "white" as const } : {},
    customStyles,
  ];

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
