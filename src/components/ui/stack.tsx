import { View, StyleProp, ViewStyle } from "react-native";
import { GridProps } from "../../interface/interface";
import useTheme from "../../hook/useTheme";

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

  // ⚡ Bolt Optimization: Removed StyleSheet.flatten() from render path.
  // Passing an array of styles directly prevents CPU overhead from deep object merging
  // on every render cycle. React Native handles array styles natively.
  // Expected Impact: Reduces CPU time per render for foundational UI components.
  const styles: StyleProp<ViewStyle> = [
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
  ];

  return <View style={styles}>{children}</View>;
}
