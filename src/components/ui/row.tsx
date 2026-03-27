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

  // ⚡ Bolt: Removed StyleSheet.flatten() array wrapping to avoid CPU overhead from deep merging on every render.
  // React Native supports passing style arrays directly natively.
  const styles = [
    customStyles,
    {
      display: "flex" as const,
      flexDirection: "row" as const,
    },
    { flexWrap: wrap ? "wrap" as const : "nowrap" as const },
    { gap: gap ? gap : sizes.xxs },
    { width: width ? width : sizes.xxs },
    { alignItems: alignItem ? alignItem : "start" },
    { justifyContent: justifyContent ? justifyContent : "start" },
  ];
  return <View style={styles as any}>{children}</View>;
}
