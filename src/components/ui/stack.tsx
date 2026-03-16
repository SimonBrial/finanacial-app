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
  const styles = [
    customStyles,
    {
      display: "flex" as const,
      flexDirection: "column" as const,
      width: "100%" as const,
    },
    { gap: gap ? gap : sizes.xxs },
    { width: width ? width : "100%" as const },
    { alignItems: alignItem ? alignItem : "flex-start" as const },
    { justifyContent: justifyContent ? justifyContent : "flex-start" as const },
    { flexWrap: wrap ? "wrap" as const : "nowrap" as const },
  ];

  return <View style={styles}>{children}</View>;
}
