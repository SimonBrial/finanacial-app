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

  // ⚡ Bolt: Removed StyleSheet.flatten to prevent expensive deep merges on every render
  // Arrays are handled efficiently by React Native internals.
  const styles = [
    {
      display: "flex" as const,
      flexDirection: "row" as const,
      flexWrap: wrap ? "wrap" as const : "nowrap" as const,
      gap: gap ? gap : sizes.xxs,
      width: width ? width : sizes.xxs,
      alignItems: alignItem ? alignItem : "flex-start",
      justifyContent: justifyContent ? justifyContent : "flex-start",
    },
    customStyles,
  ];
  return <View style={styles}>{children}</View>;
}
