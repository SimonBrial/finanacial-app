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

  // ⚡ Bolt: Removed StyleSheet.flatten to prevent expensive deep merges on every render
  // Arrays are handled efficiently by React Native internals.
  const styles = [
    {
      display: "flex" as const,
      flexDirection: "column" as const,
      width: width ? width : "100%",
      gap: gap ? gap : sizes.xxs,
      alignItems: alignItem ? alignItem : "flex-start",
      justifyContent: justifyContent ? justifyContent : "flex-start",
      flexWrap: wrap ? "wrap" as const : "nowrap" as const,
    },
    customStyles,
  ];

  return <View style={styles}>{children}</View>;
}
