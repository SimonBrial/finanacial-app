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
  // ⚡ Bolt Performance: Pass array of style objects directly instead of using StyleSheet.flatten() to avoid deep object merging overhead on every render
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

  return <View style={styles}>{children}</View>;
}
