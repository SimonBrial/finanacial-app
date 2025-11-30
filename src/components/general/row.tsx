import { StyleSheet, View } from "react-native";
import { RowProps } from "../../interface/interface";

export default function Row({ children }: RowProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
});
