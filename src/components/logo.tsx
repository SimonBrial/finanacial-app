import { View, Text, StyleSheet } from "react-native";

export default function Logo() {
  return (
    <View style={styles.logoWrapper}>
      <Text style={styles.logoText}>Ce</Text>
      {/* <Text style={styles.logoText}>e</Text> */}
      <View style={styles.logoDot} />
      <View style={styles.logoLine} />
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
    //borderColor: "red", // Para depuración
    //borderWidth: 1, // Para depuración
  },
  logoText: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#ffffff",
    fontFamily: "Inter",
    
  },
  logoLine: {
    width: "80%",
    height: 5,
    position: "absolute",
    bottom: 10,
    backgroundColor: "#ffffff",
    //marginLeft: -5,
  },
  logoDot: {
    width: 8,
    height: 8,
    backgroundColor: "#ffffff",
    position: "absolute",
    top: 15,
    right: 10,
  },
});
