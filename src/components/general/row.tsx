import { StyleSheet, View } from "react-native";
import { RowProps } from "../../interface/interface";
import useTheme from "../../hook/useTheme";

export default function Row({
  justifyContent = "center",
  alignItem = "center",
  width = "100%",
  customStyles,
  children,
  gap,
}: RowProps) {
  const { sizes } = useTheme();

  const styles = StyleSheet.flatten([
    customStyles,
    {
      display: "flex",
      flexDirection: "row",
    },
    { gap: gap ? gap : sizes.xxs },
    { width: width ? width : sizes.xxs },
    { alignItems: alignItem ? alignItem : "start" },
    { justifyContent: justifyContent ? justifyContent : "start" },
  ]);
  return <View style={styles}>{children}</View>;
}
