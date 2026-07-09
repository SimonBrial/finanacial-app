import { View, Pressable } from "react-native";
import GlobalContainer from "../../components/ui/global-container";
import useTheme from "../../hooks/useTheme";
import TitleCustom from "../../components/title-custom";
import Icon from "../../components/ui/icon";
import TabHeaderNavigation from "./transaction_section/tab-header-navigation";
import Typography from "../../components/ui/typography";
import { useState } from "react";

export default function Transactions() {
  const { sizes, theme } = useTheme();
  const [reportPressed, setReportPressed] = useState(false);
  return (
    <GlobalContainer>
      <TitleCustom
        title="Transactions"
        withNotificationIcon
        name={"autorenew"}
        library="MaterialIcons"
        showIconBalance
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
        <Pressable
          onPressIn={() => setReportPressed(true)}
          onPressOut={() => setReportPressed(false)}
          onPress={() => console.log("Report Generated")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 8,
            gap: sizes.sm,
            backgroundColor: reportPressed ? theme.t20 : "transparent",
          }}
        >
          <View
            style={{
              backgroundColor: `${theme.t20}80`,
              padding: 4,
              borderRadius: 6,
            }}
          >
            <Icon
              name="calendar"
              variant="light"
              color={theme.t100}
              size={sizes.xxl}
            />
          </View>
          <Typography
            fontSize={sizes.sm}
            customStyles={{ color: "white", marginRight: 6 }}
          >
            {"january".toUpperCase()}
          </Typography>
        </Pressable>

        <View
          style={{
            gap: sizes.sm,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/*<Icon
            bgStyle={{
              borderRadius: sizes.xs,
              backgroundColor: `${theme.t20}`,
            }}
            color={theme.t100}
            size={sizes.xxl}
            name={"eye"}
          />*/}
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
