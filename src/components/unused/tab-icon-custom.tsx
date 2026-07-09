import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Animated } from "react-native";

export default function TabIconCustom({
  focused,
  color,
  name,
  label,
}: {
  focused: boolean;
  color: string;
  name: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
}) {
  return (
    <Animated.View
      // onLayout={LinearTransition.spring().duration(300)} // Ánima el cambio de ancho
      style={[styles.container, focused && styles.activeContainer]}
    >
      <Ionicons name={name} size={22} color={color} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  activeContainer: {
    backgroundColor: "#1A1A1A", // Un gris muy oscuro para resaltar
  },
  label: {
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 14,
  },
});
