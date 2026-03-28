import { Text, StyleSheet } from "react-native";
import { TypographyProps } from "../../interface/interface";


export default function Typography({
  fontSize = 16,
  children,
  customStyles,
  bold = false,
  txtWhite = false,
  variant,
  ...rest
}: TypographyProps) {
  // ⚡ Bolt: Removed StyleSheet.flatten to avoid CPU overhead from deep object merging on every render
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
    <Text style={combinedStyles as any} {...rest}>
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
