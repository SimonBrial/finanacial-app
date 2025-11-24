import { View, StyleSheet } from "react-native";
import Typography from "./general/typography";

interface ExchangeCardProps {
  dolarRate: number;
  exchangeName: string;
}

export default function ExchangeCard({
  dolarRate,
  exchangeName,
}: ExchangeCardProps) {
  return (
    <View style={styles.container}>
      <Typography bold={false} variant="lg" style={styles.text}>
        {exchangeName}
      </Typography>

      <Typography
        bold={false}
        variant="lg"
        style={
          exchangeName.toLowerCase() === "Paralelo".toLowerCase()
            ? styles.parallel
            : exchangeName.toLowerCase() === "promedio".toLowerCase()
              ? styles.average
              : styles.official
        }
      >
        238.84
      </Typography>
      <Typography bold={false} variant="lg" style={styles.text}>
        {new Date().toLocaleDateString()}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    borderColor: "#1a1a1a",
    backgroundColor: "#2A2A2A",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  average: {
    color: "#0f9fff",
  },
  parallel: {
    color: "#ff0f3f",
  },
  official: {
    color: "#0fff3b",
  },
});
