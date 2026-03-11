import { View } from "react-native";
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
  // ⚡ Bolt: Removed StyleSheet.flatten to prevent unnecessary object merging on each render.
  // React Native efficiently handles arrays of styles natively.
  const styles = [
    customStyles,
    {
      display: "flex" as const,
      flexDirection: "column" as const,
      width: "100%" as const,
    },
    { gap: gap ? gap : sizes.xxs },
    { width: width ? width : "100%" },
    { alignItems: alignItem ? alignItem : "flex-start" },
    { justifyContent: justifyContent ? justifyContent : "flex-start" },
    { flexWrap: wrap ? "wrap" : "nowrap" as const },
  ];

  return <View style={styles}>{children}</View>;
}
