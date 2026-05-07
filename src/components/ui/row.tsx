import { View, StyleProp, ViewStyle } from "react-native";
import { RowProps } from "../../interface/interface";
import useTheme from "../../hook/useTheme";

export default function Row({
  justifyContent = "center",
  alignItem = "center",
  width = "100%",
  customStyles,
  children,
  wrap = false,
  gap,
}: RowProps) {
  const { sizes } = useTheme();

  // ⚡ Bolt Optimization: Removed StyleSheet.flatten to avoid CPU-intensive deep object merging on every render.
  // React Native efficiently processes arrays of style objects directly in C++.
  const styles: StyleProp<ViewStyle> = [
    customStyles,
    {
      display: "flex",
      flexDirection: "row",
    },
    { flexWrap: wrap ? "wrap" : "nowrap" },
    { gap: gap ? gap : sizes.xxs },
    { width: width ? width : sizes.xxs },
    { alignItems: alignItem ? alignItem : "flex-start" },
    { justifyContent: justifyContent ? justifyContent : "flex-start" },
  ];
  return <View style={styles}>{children}</View>;
}
