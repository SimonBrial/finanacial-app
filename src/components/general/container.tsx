import { View, StyleSheet } from "react-native";
import { GridProps } from "../../interface/interface";

export default function Container({
  children,
  customStyles,
  gap,
  wrap,
}: GridProps) {
  const styles = StyleSheet.flatten([
    defaultStyles.container,
    customStyles,
    { gap: gap ?? 4 },
    { flexWrap: wrap ? "wrap" : "nowrap" },
  ]);
  return <View style={styles}>{children}</View>;
}

const defaultStyles = StyleSheet.create({
  container: {
    width: "95%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 4,
  },
});
