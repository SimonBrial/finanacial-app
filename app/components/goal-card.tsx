import { View, StyleSheet } from "react-native";
import Typography from "./general/typography";

interface GoalCardProps {
  title: string;
  description: string;
}

export default function GoalCard({ title, description }: GoalCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Typography variant="lg" bold style={styles.text}>
          {title}
        </Typography>
      </View>
      <View style={styles.description}>
        <Typography variant="sm" bold={false} style={styles.text}>
          {description}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: "100%",
    borderColor: "#1a1a1a",
    backgroundColor: "#2A2A2A",
  },
  title: {
    marginBottom: 8,
    color: "#ffffff",
  },
  description: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: "#ffffff",
  },
});
