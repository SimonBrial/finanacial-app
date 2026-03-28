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

  // ⚡ Bolt: Removed StyleSheet.flatten to avoid CPU overhead from deep object merging on every render
  const styles = [
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
  return <View style={styles as any}>{children}</View>;
}
