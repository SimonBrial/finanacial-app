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
  // ⚡ Bolt: Removed StyleSheet.flatten to avoid CPU overhead from deep merging during render. React Native handles style arrays natively.
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
    { flexWrap: wrap ? "wrap" as const : "nowrap" as const },
  ];

  return <View style={styles}>{children}</View>;
}
