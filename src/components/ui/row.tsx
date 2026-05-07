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

  // ⚡ Bolt: Removed StyleSheet.flatten to avoid CPU overhead from deep merging during render. React Native handles style arrays natively.
  const styles = [
    customStyles,
    {
      display: "flex" as const,
      flexDirection: "row" as const,
    },
    { flexWrap: wrap ? "wrap" as const : "nowrap" as const },
    { gap: gap ? gap : sizes.xxs },
    { width: width ? width : sizes.xxs },
    { alignItems: alignItem ? alignItem : "flex-start" },
    { justifyContent: justifyContent ? justifyContent : "flex-start" },
  ];
  return <View style={styles}>{children}</View>;
}
