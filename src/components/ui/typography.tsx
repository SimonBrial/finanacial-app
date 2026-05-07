import { Text, StyleSheet, StyleProp, TextStyle } from "react-native";
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
  // ⚡ Bolt Optimization: Removed StyleSheet.flatten() from render path.
  // Passing an array of styles directly prevents CPU overhead from deep object merging
  // on every render cycle. React Native handles array styles natively.
  // Expected Impact: Reduces CPU time per render for foundational UI components.
  const combinedStyles: StyleProp<TextStyle> = [
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
