import { StyleSheet, View } from "react-native";
import { RowProps } from "../../types/interface";
import useTheme from "../../hooks/useTheme";

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

  // ⚡ Bolt: Avoid StyleSheet.flatten in render to prevent unnecessary object deep merges on every render
  const styles = [
    customStyles,
    {
      display: "flex",
      flexDirection: "row",
    } as const,
    { flexWrap: wrap ? "wrap" : "nowrap" } as const,
    { gap: gap ? gap : sizes.xxs },
    { width: width ? width : sizes.xxs },
    { alignItems: alignItem ? alignItem : "start" } as const,
    { justifyContent: justifyContent ? justifyContent : "start" } as const,
  ];
  return <View style={styles}>{children}</View>;
}
