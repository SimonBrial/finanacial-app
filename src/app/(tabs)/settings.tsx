import { TouchableOpacity, View, ScrollView } from "react-native";
import GlobalContainer from "../../components/ui/global-container";
import Typography from "../../components/ui/typography";
import useTheme from "../../hook/useTheme";
import TitleCustom from "../../components/title-custom";
import Avatar from "../../components/ui/avatar";
import Badge from "../../components/ui/badge";
import Icon from "../../components/ui/icon";
import { useRouter } from "expo-router";
import { SettingsOption } from "../../interface/interface";

export default function Settings() {
  const { inProgress, sizes, theme } = useTheme();
  const router = useRouter();

  const hanleLogout = (exception: string) => {
    router.push(exception === "Log Out" ? "/login" : "/404");
  };

  const settingsOptions: SettingsOption[] = [
    {
      label: "Edit Profile",
      icon: "user-alt",
      library: "FontAwesome5",
    },
    { label: "Notifications", icon: "notifications", library: "Ionicons" },
    { label: "Language", icon: "translate", library: "MaterialIcons" },
    {
      label: "Help & Support",
      icon: "support-agent",
      library: "MaterialIcons",
    },
    { label: "Log Out", icon: "logout", library: "MaterialIcons" },
  ];
  return (
    <GlobalContainer>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <TitleCustom
          title="Settings"
          withNotificationIcon={false}
          library="MaterialIcons"
          name={"settings"}
        />
        <View
          style={{
            gap: sizes.sm,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
            paddingHorizontal: sizes.md,
            paddingTop: sizes.lg,
          }}
        >
          <Avatar />
          <View
            style={{ gap: sizes.xs, display: "flex", flexDirection: "column" }}
          >
            <Typography txtWhite fontSize={sizes.lg}>
              Simon Briceño
            </Typography>
            <Badge
              iconLeft={"crown"}
              library="MaterialCommunityIcons"
              color={inProgress.p100}
              text="Premium"
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: sizes.md,
            gap: sizes.sm,
            marginTop: sizes.lg,
          }}
        >
          {settingsOptions.map((item) => (
            <TouchableOpacity
              key={item.label}
              onPress={() => hanleLogout(item.label)}
              style={{
                paddingHorizontal: sizes.md,
                paddingVertical: sizes.sm,
                borderColor: theme.t100,
                borderBottomWidth: 1,
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: sizes.sm,
              }}
            >
              <Icon
                name={item.icon}
                library={item.library}
                bgStyle={{ borderRadius: sizes.sm }}
                size={sizes.lg}
              />
              <Typography txtWhite>{item.label}</Typography>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </GlobalContainer>
  );
}
