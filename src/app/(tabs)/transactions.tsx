import { View, ScrollView, Dimensions } from "react-native";
import GlobalContainer from "../../components/ui/global-container";
import useTheme from "../../hook/useTheme";
import TitleCustom from "../../components/title-custom";
import Icon from "../../components/ui/icon";
import TabHeaderNavigation from "./transation_section/tab-header-navigation";

export default function Transactions() {
  const { sizes, theme } = useTheme();
  const { height } = Dimensions.get("window");
  return (
    <GlobalContainer>
      <TitleCustom
        title="Transactions"
        withNotificationIcon
        name={"autorenew"}
        library="MaterialIcons"
      />

      <View
        style={{
          //flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: sizes.sm,
          }}
        >
          <Icon
            name="calendar"
            variant="light"
            color={theme.t100}
            size={sizes.xxl}
          />
        </View>
        <View
          style={{
            gap: sizes.sm,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Icon
            bgStyle={{
              borderRadius: sizes.xs,
              backgroundColor: `${theme.t20}`,
            }}
            color={theme.t100}
            size={sizes.xxl}
            name={"eye"}
          />
          <Icon
            bgStyle={{
              borderRadius: sizes.xs,
              backgroundColor: `${theme.t20}`,
            }}
            color={theme.t100}
            size={sizes.xxl}
            name={"filter"}
            library="Ionicons"
          />
        </View>
      </View>
      <View style={{ flex: 1, width: "100%" }}>
        <TabHeaderNavigation />
      </View>
    </GlobalContainer>
  );
}
