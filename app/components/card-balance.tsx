import { StyleSheet, View } from "react-native";
import Typography from "./general/typography";

export default function CardCoin() {
  return (
    <View style={cardBalanceStyles.container}>
      <Typography bold variant="xl" style={cardBalanceStyles.title}>
        Month Balance (VES)
      </Typography>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          bold={false}
          variant="xl"
          style={{ color: "#FFFFFF", fontSize: 24 }}
        >
          Currently: 12.345
        </Typography>
        <Typography
          bold={false}
          variant="xl"
          style={{ color: "#FFFFFF", fontSize: 20 }}
        >
          VES
        </Typography>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 15,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <Typography bold={false} variant="base" style={{ color: "#2bf35d" }}>
            Started: 15.600
          </Typography>
          <Typography bold={false} variant="lg" style={{ color: "#2bf35d" }}>
            VES
          </Typography>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <Typography bold={false} variant="base" style={{ color: "#f32b35" }}>
            Spent: 3.255
          </Typography>
          <Typography bold={false} variant="lg" style={{ color: "#f32b35" }}>
            VES
          </Typography>
        </View>
      </View>
    </View>
  );
}

const cardBalanceStyles = StyleSheet.create({
  container: {
    width: "100%",
    borderColor: "#1a1a1a",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#2A2A2A",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    marginBottom: 10,
  },
});
