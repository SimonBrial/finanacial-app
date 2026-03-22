import { View, StyleSheet } from "react-native";
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

  // ⚡ Bolt: Avoid StyleSheet.flatten in render to prevent unnecessary object deep merges on every render
  const styles = [
    customStyles,
    {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    } as const,
    { gap: gap ? gap : sizes.xxs },
    { width: width ? width : "100%" },
    { alignItems: alignItem ? alignItem : "flex-start" } as const,
    { justifyContent: justifyContent ? justifyContent : "flex-start" } as const,
    { flexWrap: wrap ? "wrap" : "nowrap" } as const,
  ];

  return <View style={styles}>{children}</View>;
}
