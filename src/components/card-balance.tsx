import { StyleSheet, View } from "react-native";
import Typography from "./ui/typography";
import Feather from "@expo/vector-icons/Feather";
import { BalanceCardProps } from "../interface/interface";
import Badge from "./ui/badge";
import useTheme from "../hook/useTheme";

export default function CardCoin({
  lastEntry,
  currency,
  started,
  amount,
  spent,
  title,
  id,
}: BalanceCardProps) {
  const { sizes, globalStyles, complete, danger, isDark } = useTheme();

  const dynamicStyles = StyleSheet.create({
    container: {
      width: "95%",
      height: 180,
      borderColor: globalStyles.border,
      borderWidth: 1,
      borderRadius: 10,
      padding: 15,
      backgroundColor: globalStyles.backgroundSecondary,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    title: {
      color: globalStyles.text,
      fontSize: 20,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    amount: {
      color: globalStyles.text,
      fontSize: 24,
    }
  });

  return (
    <View style={dynamicStyles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          paddingBottom: 10,
        }}
      >
        <Typography bold fontSize={sizes.md} customStyles={dynamicStyles.title}>
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
            fontSize={sizes.xl}
            customStyles={dynamicStyles.amount}
          >
            <Feather name="dollar-sign" size={24} color={globalStyles.text} />
            {amount}
          </Typography>
          <Typography
            bold={false}
            fontSize={sizes.xl}
            customStyles={{ color: globalStyles.text, fontSize: 20 }}
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
              fontSize={sizes.md}
              customStyles={{ color: complete.c100 }}
            >
              IN: {started}
            </Typography>
            <Typography
              bold={false}
              fontSize={sizes.md}
              customStyles={{ color: danger.d100 }}
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
            fontSize={sizes.sm}
            customStyles={{ color: globalStyles.textSecondary }}
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
