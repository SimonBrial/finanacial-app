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
  const { inProgress, sizes, theme, isDark, toggleTheme, globalStyles } = useTheme();
  const router = useRouter();

  const handlePress = (label: string) => {
    if (label === "Theme") {
      toggleTheme();
    } else if (label === "Log Out") {
      router.push("/login");
    } else {
      router.push("/404");
    }
  };

  const settingsOptions: SettingsOption[] = [
    {
      label: "Edit Profile",
      icon: "user-alt",
      library: "FontAwesome5",
    },
    { label: "Notifications", icon: "notifications", library: "Ionicons" },
    { label: "Theme", icon: isDark ? "moon-sharp" : "sunny-sharp", library: "Ionicons" },
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
        <Avatar hasNotification={false} size={70} />
        <View
          style={{ gap: sizes.xs, display: "flex", flexDirection: "column" }}
        >
          <Typography fontSize={sizes.lg}>
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
            onPress={() => handlePress(item.label)}
            style={{
              paddingHorizontal: sizes.md,
              paddingVertical: sizes.sm,
              borderColor: globalStyles.border,
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
            <Typography>{item.label}</Typography>
          </TouchableOpacity>
        ))}
      </View>
    </GlobalContainer>
  );
}
