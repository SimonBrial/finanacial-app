import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";

interface TypographyProps {
  children: React.ReactNode;
  /** Estilos adicionales opcionales */
  customStyles?: StyleProp<TextStyle>;
  /** Tamaño de la fuente. Por defecto 'base' (16px) */
  fontSize?: number;
  /** Si es true, aplica negrita */
  bold?: boolean;
}

export default function Typography({
  fontSize = 16,
  children,
  customStyles,
  bold = false,
  ...rest
}: TypographyProps) {
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
