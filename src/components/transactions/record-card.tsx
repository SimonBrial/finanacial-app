import { View } from "react-native";
import Badge from "../ui/badge";
import PercentIndicator from "../ui/percent-indicator";
import Typography from "../ui/typography";
import useTheme from "../../hook/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import CustomBadge from "../ui/custom-badge";
import PayoneerIcon from "../icons/payoneer-icon";
import { Transaction } from "../../interface/interface";
import PaypalIcon from "../icons/paypal-icon";
import Icon from "../ui/icon";
import dayjs from "dayjs";

export default function RecordCard({
  locationSave,
  category,
  library,
  amount,
  title,
  color,
  date,
  icon,
  bank,
  type,
  id,
}: Transaction) {
  const { sizes, globalStyles, theme } = useTheme();
  const transactionDate = dayjs(date).format("DD/MM/YYYY");

  const selectBankIcon = () => {
    switch (bank) {
      case "payoneer":
        return <PayoneerIcon />;
      case "paypal":
        return <PaypalIcon />;
      default:
        return (
          <Icon
            name={icon}
            library={library}
            color={color}
            rounded
            size={24}
            bgStyle={{ height: 50, width: 50 }}
            variant="ghost"
          />
        );
    }
  };
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        gap: sizes.sm,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: sizes.xs,
      }}
    >
      <LinearGradient
        colors={[globalStyles.bgContainerStart, globalStyles.bgContainerEnd]} // DINÁMICO
        style={[
          {
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            borderRadius: sizes.lg,
            borderWidth: 1,
            borderColor: globalStyles.borderContainer,
          },
        ]}
        locations={[0.1, 1.0]}
        start={{ x: 0, y: 0.0 }}
        end={{ x: 1, y: 0 }}
      />
      {selectBankIcon()}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            //flex: 1,
          }}
        >
          <Typography txtWhite fontSize={sizes.lg}>
            {title}
          </Typography>
          <View style={{ flexDirection: "column", gap: sizes.xxs }}>
            <View style={{ flexDirection: "row", gap: sizes.xs }}>
              <Badge
                text={category}
                type="filled"
                color={globalStyles.subtitle}
              />
              <CustomBadge bankName={bank} />
            </View>
            <View style={{ flexDirection: "row", gap: sizes.xxs }}>
              <Badge
                text={transactionDate}
                type="flat"
                color={globalStyles.subtitle}
              />
              <Icon
                name={locationSave ? "location-on" : "location-off"}
                library="MaterialIcons"
                variant="light"
                color={theme.t100}
                size={sizes.md}
              />
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Typography txtWhite>$ {amount}</Typography>
          <PercentIndicator percentage="4.23%" trend="down" />
        </View>
      </View>
    </View>
  );
}
