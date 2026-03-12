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

  const styles = [
    customStyles,
    {
      display: "flex",
      flexDirection: "row" as const,
    },
    { flexWrap: wrap ? "wrap" as const : "nowrap" as const },
    { gap: gap ? gap : sizes.xxs },
    { width: width ? width : sizes.xxs },
    { alignItems: alignItem ? alignItem : "flex-start" as const },
    { justifyContent: justifyContent ? justifyContent : "flex-start" as const },
  ];
  return <View style={styles}>{children}</View>;
}
