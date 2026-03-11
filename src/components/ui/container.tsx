import { View, StyleSheet } from "react-native";
import { GridProps } from "../../interface/interface";
import { useContext } from "react";
import { ThemeContext } from "../../context/styles/theme-provider";

export default function Container({
  width = "95%",
  customStyles,
  children,
  gap = 4,
  wrap,
}: GridProps) {
  const { sizes } = useContext(ThemeContext);

  // ⚡ Bolt: Removed StyleSheet.flatten to prevent unnecessary object merging on each render.
  // React Native efficiently handles arrays of styles natively.
  const styles = [
    defaultStyles.container,
    customStyles,
    { gap: gap ? gap : sizes.xxs },
    { width: width ? width : "100%" },
    { flexWrap: wrap ? "wrap" : "nowrap" as const },
  ];
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
