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
  // ⚡ Bolt: Removed StyleSheet.flatten to avoid deep merging on every render frame
  const styles = [
    customStyles,
    {
      display: "flex" as const,
      flexDirection: "column" as const,
      gap: gap ? gap : sizes.xxs,
      width: width ? width : "100%",
      alignItems: alignItem ? alignItem : ("flex-start" as const),
      justifyContent: justifyContent ? justifyContent : ("flex-start" as const),
      flexWrap: wrap ? ("wrap" as const) : ("nowrap" as const),
    },
  ];

  return <View style={styles as any}>{children}</View>;
}
