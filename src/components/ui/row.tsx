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

  // ⚡ Bolt Optimization: Removed StyleSheet.flatten() from render path.
  // Passing an array of styles directly prevents CPU overhead from deep object merging
  // on every render cycle. React Native handles array styles natively.
  // Expected Impact: Reduces CPU time per render for foundational UI components.
  const styles: StyleProp<ViewStyle> = [
    customStyles,
    {
      display: "flex",
      flexDirection: "row",
    },
    { flexWrap: wrap ? "wrap" : "nowrap" },
    { gap: gap ? gap : sizes.xxs },
    { width: width ? width : sizes.xxs },
    { alignItems: alignItem ? alignItem : "start" },
    { justifyContent: justifyContent ? justifyContent : "start" },
  ];

  return <View style={styles}>{children}</View>;
}
