import { View, StyleSheet } from "react-native";
import { GridProps } from "../../interface/interface";

export default function Stack({ customStyles, children, gap }: GridProps) {
  const styles = StyleSheet.flatten([
    defaultStyles.stackContainer,
    customStyles,
    { gap: gap ?? 4 },
  ]);

  return <View style={styles}>{children}</View>;
}

const defaultStyles = StyleSheet.create({
  stackContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
