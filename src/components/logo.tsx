import { View, Text, StyleSheet } from "react-native";
import useTheme from "../hook/useTheme";

export default function Logo() {
  const { globalStyles } = useTheme();
  return (
    <View style={styles.logoWrapper}>
      <Text style={[styles.logoText, { color: globalStyles.text }]}>Ce</Text>
      <View style={[styles.logoDot, { backgroundColor: globalStyles.text }]} />
      <View style={[styles.logoLine, { backgroundColor: globalStyles.text }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  logoWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    borderRadius: 8,
    width: 120, // Para depuración
    height: 120, // Para depuración
  },
  logoText: {
    fontSize: 80,
    fontWeight: "bold",
    fontFamily: "Inter",
  },
  logoLine: {
    width: "80%",
    height: 5,
    position: "absolute",
    bottom: 10,
  },
  logoDot: {
    width: 8,
    height: 8,
    position: "absolute",
    top: 15,
    right: 10,
  },
});
