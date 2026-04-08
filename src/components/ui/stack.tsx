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

  // ⚡ Bolt Optimization: Using style arrays instead of StyleSheet.flatten
  // to avoid recursive deep-merging overhead on every render.
  const styles: StyleProp<ViewStyle> = [
    customStyles as StyleProp<ViewStyle>,
    {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },
    { gap: gap ? gap : sizes.xxs },
    { width: width ? width : "100%" } as ViewStyle,
    { alignItems: alignItem ? alignItem : "flex-start" } as ViewStyle,
    { justifyContent: justifyContent ? justifyContent : "flex-start" } as ViewStyle,
    { flexWrap: wrap ? "wrap" : "nowrap" },
  ];

  return <View style={styles}>{children}</View>;
}
