import { Text, StyleSheet } from "react-native";

type vairantType =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";

interface TypographyProps {
  children: React.ReactNode;
  style?: object;
  variant: vairantType;
  bold: boolean;
}

export default function Typography({
  variant = "base",
  children,
  style,
  bold,
}: TypographyProps) {
  const boldStyle = bold ? { fontWeight: "bold" } : {};
  const variantStyle = size[variant];
  const styles = StyleSheet.flatten([
    defaultStyles.defaultStyles,
    style,
    boldStyle,
    variantStyle,
  ]);

  return <Text style={[styles]}>{children}</Text>;
}

const size = StyleSheet.create({
  xs: {
    fontSize: 12,
  },
  sm: {
    fontSize: 14,
  },
  base: {
    fontSize: 16,
  },
  lg: {
    fontSize: 18,
  },
  xl: {
    fontSize: 20,
  },
  "2xl": {
    fontSize: 24,
  },
  "3xl": {
    fontSize: 30,
  },
  "4xl": {
    fontSize: 36,
  },
  "5xl": {
    fontSize: 48,
  },
  "6xl": {
    fontSize: 60,
  },
  "7xl": {
    fontSize: 72,
  },
  "8xl": {
    fontSize: 96,
  },
  "9xl": {
    fontSize: 128,
  },
});

const defaultStyles = StyleSheet.create({
  defaultStyles: {
    fontFamily: "monospace",
    color: "#000000",
    fontSize: 16,
  },
});
