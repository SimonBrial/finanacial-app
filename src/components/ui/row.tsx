import { View } from "react-native";
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

  // ⚡ Bolt: Removed StyleSheet.flatten to prevent unnecessary object merging on each render.
  // React Native efficiently handles arrays of styles natively.
  const styles = [
    customStyles,
    {
      display: "flex" as const,
      flexDirection: "row" as const,
    },
    { flexWrap: wrap ? "wrap" : "nowrap" as const },
    { gap: gap ? gap : sizes.xxs },
    { width: width ? width : sizes.xxs },
    { alignItems: alignItem ? alignItem : "flex-start" },
    { justifyContent: justifyContent ? justifyContent : "flex-start" },
  ];
  return <View style={styles}>{children}</View>;
}
