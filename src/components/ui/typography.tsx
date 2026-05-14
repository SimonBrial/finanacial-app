import { Text, StyleSheet } from "react-native";
import { TypographyProps } from "../../interface/interface";
import useTheme from "../../hook/useTheme";

export default function Typography({
  fontSize = 16,
  children,
  customStyles,
  bold = false,
  txtWhite = false,
  variant = "Regular",
  ...rest
}: TypographyProps) {
  const { globalStyles } = useTheme();

  const combinedStyles = StyleSheet.flatten([
    baseStyles.text,
    { fontSize, color: globalStyles.text },
    // Mapeamos la variante al nombre de la fuente que cargaste en el Root
    { fontFamily: `Inter-${variant}` },
    bold ? { fontWeight: "bold" as const } : {},
    txtWhite ? { color: "#FFFFFF" as const } : {},
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
