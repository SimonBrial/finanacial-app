import { View, StyleSheet } from "react-native";
import { GridProps } from "../../interface/interface";
import { sizes } from "../../context/styles/styles-base";

export default function Container({
  customStyles,
  children,
  wrap,
  gap = sizes.xxs,
  width = "95%",
}: GridProps) {
  const styles = StyleSheet.flatten([
    defaultStyles.container,
    customStyles,
    { gap: gap ? gap : sizes.xxs },
    { width: width ? width : sizes.xxs },
    { flexWrap: wrap ? "wrap" : "nowrap" },
  ]);
  return <View style={styles}>{children}</View>;
}

const defaultStyles = StyleSheet.create({
  container: {
    // width: "95%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    //gap: 4,
  },
});
