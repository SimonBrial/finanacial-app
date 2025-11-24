import { View, StyleSheet } from "react-native";

export default function Stack({ children }: { children: React.ReactNode }) {
  return <View style={styles.stackContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  stackContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
});
