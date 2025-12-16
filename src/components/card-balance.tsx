import { StyleSheet, View } from "react-native";
import Typography from "./general/typography";
import Feather from "@expo/vector-icons/Feather";
import { BalanceCardProps } from "../interface/interface";
import Badge from "./general/badge";

export default function CardCoin({
  lastEntry,
  currency,
  started,
  amount,
  spent,
  title,
  id,
}: BalanceCardProps) {
  return (
    <View style={cardBalanceStyles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          paddingBottom: 10,
        }}
      >
        <Typography bold variant="base" customStyles={cardBalanceStyles.title}>
          {title}
        </Typography>
      </View>
      <View>
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
            customStyles={{ color: "#FFFFFF", fontSize: 24 }}
          >
            <Feather name="dollar-sign" size={24} color="#FFFFFF" />
            {amount}
          </Typography>
          <Typography
            bold={false}
            variant="xl"
            customStyles={{ color: "#FFFFFF", fontSize: 20 }}
          >
            {currency}
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
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              bold={false}
              variant="base"
              customStyles={{ color: "#2bf35d" }}
            >
              IN: {started}
            </Typography>
            <Typography
              bold={false}
              variant="base"
              customStyles={{ color: "#f32b35" }}
            >
              OUT: {spent}
            </Typography>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Typography
            bold={false}
            variant="sm"
            customStyles={{ color: "#AAAAAA" }}
          >
            Last entry:
          </Typography>
          <View style={{ width: 120 }}>
            {lastEntry ? (
              <Badge text={lastEntry} type="filled" />
            ) : (
              <Badge text={"No entries yet"} type="bordered" />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const cardBalanceStyles = StyleSheet.create({
  container: {
    width: "95%",
    height: 180,
    borderColor: "#1a1a1a",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#2A2A2A",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
