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

  // ⚡ Bolt Performance: Pass array of style objects directly instead of using StyleSheet.flatten() to avoid deep object merging overhead on every render
  const styles = [
    defaultStyles.container,
    customStyles,
    { gap: gap ? gap : sizes.xxs },
    { width: width ? width : "100%" },
    { flexWrap: wrap ? "wrap" : "nowrap" },
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
