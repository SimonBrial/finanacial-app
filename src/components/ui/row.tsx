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

  // ⚡ Bolt Optimization: Using style arrays instead of StyleSheet.flatten
  // to avoid recursive deep-merging overhead on every render.
  const styles: StyleProp<ViewStyle> = [
    customStyles as StyleProp<ViewStyle>,
    {
      display: "flex",
      flexDirection: "row",
    },
    { flexWrap: wrap ? "wrap" : "nowrap" },
    { gap: gap ? gap : sizes.xxs },
    { width: width ? width : sizes.xxs } as ViewStyle,
    { alignItems: alignItem ? alignItem : "start" } as ViewStyle,
    { justifyContent: justifyContent ? justifyContent : "start" } as ViewStyle,
  ];
  return <View style={styles}>{children}</View>;
}
