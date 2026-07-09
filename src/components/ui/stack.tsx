import { View, StyleSheet } from "react-native";
import { GridProps } from "../../types/interface";
import useTheme from "../../hooks/useTheme";

export default function Stack({
  justifyContent,
  customStyles,
  alignItem,
  children,
  width,
  wrap,
  gap,
}: GridProps) {
  const { sizes } = useTheme();
  const styles = StyleSheet.flatten([
    customStyles,
    {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    { gap: gap ? gap : sizes.xxs },
    { width: width ? width : "100%" },
    { alignItems: alignItem ? alignItem : "flex-start" },
    { justifyContent: justifyContent ? justifyContent : "flex-start" },
    { flexWrap: wrap ? "wrap" : "nowrap" },
  ]);

  return <View style={styles}>{children}</View>;
}
