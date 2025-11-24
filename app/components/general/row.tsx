import { StyleSheet, View } from "react-native";

interface RowProps {
  children: React.ReactNode;
}

export default function Row({ children }: RowProps) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 4,
  },
});
