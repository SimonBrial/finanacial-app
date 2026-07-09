import { MaterialIcons } from "@expo/vector-icons";
import { Expense } from "../../types/interface";
import Container from "../ui/container";
import Typography from "../ui/typography";
import { StyleSheet } from "react-native";
import Stack from "../ui/stack";
import Badge from "../ui/badge";
import useTheme from "../../hooks/useTheme";

export default function ExpanseCard({
  description,
  expenseValue,
  completed,
  color,
  title,
  icon,
  id,
}: Expense) {
  const {sizes} = useTheme();
  const containerStyles = StyleSheet.flatten([
    styles.containerCard,
    { borderColor: color, borderWidth: 1 },
  ]);
  const iconStyles = StyleSheet.flatten([
    styles.icon,
    { backgroundColor: `${color}4c` },
  ]);
  return (
    <Container customStyles={containerStyles} gap={6} wrap={false}>
      <Stack
        customStyles={{
          width: "30%",
        }}
        gap={8}
      >
        <MaterialIcons name={icon} size={24} color={color} style={iconStyles} />
        <Badge
          text={completed ? "Done" : "Active"}
          type="bordered"
          color={color}
        />
      </Stack>
      <Stack
        customStyles={{
          width: "70%",
        }}
      >
        <Typography bold fontSize={sizes.xl} customStyles={styles.text}>
          {title}
        </Typography>
        <Typography bold={false} fontSize={sizes.sm} customStyles={styles.text}>
          {description}
        </Typography>
      </Stack>
    </Container>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 8,
  },
  text: {
    color: "#fff",
    textAlign: "left",
    width: "100%",
  },
  icon: {
    width: 48,
    height: 48,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 25,
  },
});
