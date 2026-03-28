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
  // ⚡ Bolt: Removed StyleSheet.flatten to avoid CPU overhead from deep object merging on every render
  const styles = [
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

  return <View style={styles as any}>{children}</View>;
}
