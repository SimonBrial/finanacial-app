import { View } from "react-native";
import Badge from "../ui/badge";
import PercentIndicator from "../ui/percent-indicator";
import Typography from "../ui/typography";
import useTheme from "../../hook/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import CustomBadge from "../ui/custom-badge";
import PayoneerIcon from "../icons/payoneer-icon";

export default function RecordCard() {
  const { sizes, globalStyles } = useTheme();
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
      {/* <PaypalIcon /> */}
      <PayoneerIcon />
      {/* <Icon rounded size={24} bgStyle={{ height: 50, width: 50 }} /> */}
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
            Starbuck
          </Typography>
          <View style={{ flexDirection: "column", gap: sizes.xxs }}>
            <View style={{ flexDirection: "row", gap: sizes.xs }}>
              <Badge
                text="Category"
                type="filled"
                color={globalStyles.subtitle}
              />
              <CustomBadge bankName="payoneer" />
            </View>
            <Badge text="04:24 PM" type="flat" color={globalStyles.subtitle} />
          </View>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Typography txtWhite>$ 238.84</Typography>
          <PercentIndicator percentage="4.23%" trend="down" />
        </View>
      </View>
    </View>
  );
}
