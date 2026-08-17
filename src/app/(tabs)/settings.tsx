import { TouchableOpacity, View, ScrollView, StyleSheet } from "react-native";
import GlobalContainer from "../../components/ui/global-container";
import Typography from "../../components/ui/typography";
import useTheme from "../../hooks/useTheme";
import TitleCustom from "../../components/title-custom";
import Avatar from "../../components/ui/avatar";
import Badge from "../../components/ui/badge";
import Icon from "../../components/ui/icon";
import { useRouter } from "expo-router";
import CustomSwitch from "../../components/ui/custom-switch";
import React from "react";
import * as Haptics from "expo-haptics";
import { Settings as SettingsIcon } from "lucide-react-native";
import {
  ChevronRight,
  User,
  PenLine,
  Bell,
  Moon,
  Info,
  HelpCircle,
  Trash2,
  LogOut,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

interface SettingsItem {
  label: string;
  icon: React.ElementType;
  type: "navigate" | "switch" | "danger";
  action?: string;
}

export default function Settings() {
  const { inProgress, sizes, theme, isDark, toggleTheme, globalStyles, danger } =
    useTheme();
  const router = useRouter();

  const handlePress = (label: string) => {
    if (label === "Log Out") {
      router.push("/login");
    } else if (label === "Deactivate my account") {
      // Handle deactivation
    } else {
      router.push("/404");
    }
  };

  function onCheckedChange(checked: boolean) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    requestAnimationFrame(() => {
      toggleTheme();
    });
  }

  // Card styling
  const cardBg = isDark ? "#1B1A1F" : "#F3F4F6";
  const cardBorder = isDark ? "#2A292E" : "#E5E7EB";
  const separatorColor = isDark ? "#2A292E" : "#E5E7EB";
  const subtitleColor = isDark ? "#9CA3AF" : "#6B7280";
  const iconColor = isDark ? "#FFFFFF" : "#1F2937";
  const chevronColor = isDark ? "#6B7280" : "#9CA3AF";
  const dangerColor = danger.d100;
  const logoutGradientStart = "#F31260";
  const logoutGradientEnd = "#FF2D78";

  const mainOptions: SettingsItem[] = [
    { label: "Profile details", icon: User, type: "navigate" },
    { label: "Edit Profile", icon: PenLine, type: "navigate" },
    { label: "Edit Profile", icon: Bell, type: "navigate" },
    { label: "Dark mode", icon: Moon, type: "switch" },
  ];

  const otherOptions: SettingsItem[] = [
    { label: "Abaout app", icon: User, type: "navigate" },
    { label: "Help/FAQ", icon: HelpCircle, type: "navigate" },
    { label: "Deactivate my account", icon: Trash2, type: "danger" },
  ];

  const renderSettingsRow = (
    item: SettingsItem,
    index: number,
    isLast: boolean
  ) => {
    const isDanger = item.type === "danger";
    const isSwitch = item.type === "switch";
    const rowIconColor = isDanger ? dangerColor : iconColor;
    const rowTextColor = isDanger ? dangerColor : globalStyles.text;

    const content = (
      <View
        style={[
          styles.settingsRow,
          !isLast && { borderBottomWidth: 1, borderBottomColor: separatorColor },
        ]}
      >
        <View style={styles.rowLeft}>
          <View
            style={[
              styles.iconContainer,
              {
                backgroundColor: isDanger
                  ? isDark
                    ? "rgba(243, 18, 96, 0.15)"
                    : "rgba(243, 18, 96, 0.1)"
                  : "transparent",
                borderRadius: 8,
              },
            ]}
          >
            <item.icon
              size={20}
              color={rowIconColor}
              strokeWidth={1.8}
            />
          </View>
          <Typography
            fontSize={15}
            customStyles={{ color: rowTextColor }}
          >
            {item.label}
          </Typography>
        </View>
        <View style={styles.rowRight}>
          {isSwitch ? (
            <CustomSwitch checked={isDark} onCheckedChange={onCheckedChange} />
          ) : (
            <ChevronRight size={20} color={chevronColor} strokeWidth={1.8} />
          )}
        </View>
      </View>
    );

    if (isSwitch) {
      return (
        <View key={`${item.label}-${index}`}>
          {content}
        </View>
      );
    }

    return (
      <TouchableOpacity
        key={`${item.label}-${index}`}
        onPress={() => handlePress(item.label)}
        activeOpacity={0.6}
      >
        {content}
      </TouchableOpacity>
    );
  };

  return (
    <GlobalContainer
      header={
        <TitleCustom
          title="Settings"
          withNotificationIcon={false}
          as={SettingsIcon}
        />
      }
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: sizes.xl }}
      >
        {/* Profile Card */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handlePress("Profile")}
          style={[
            styles.profileCard,
            {
              backgroundColor: cardBg,
              borderColor: cardBorder,
            },
          ]}
        >
          <View style={styles.profileInfo}>
            <View style={styles.avatarWrapper}>
              <Avatar
                hasNotification={false}
                size={60}
                borderWidth={2}
                borderColor={inProgress.p100}
              />
            </View>
            <View style={styles.profileText}>
              <Typography
                fontSize={17}
                variant="SemiBold"
              >
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
          <ChevronRight size={20} color={chevronColor} strokeWidth={1.8} />
        </TouchableOpacity>

        {/* "Other Settings" Label */}
        <Typography
          fontSize={14}
          customStyles={{
            color: subtitleColor,
            marginTop: sizes.lg,
            marginBottom: sizes.sm,
            marginLeft: sizes.xxs,
          }}
        >
          Other Settings
        </Typography>

        {/* Main Settings Group */}
        <View
          style={[
            styles.settingsCard,
            {
              backgroundColor: cardBg,
              borderColor: cardBorder,
            },
          ]}
        >
          {mainOptions.map((item, index) =>
            renderSettingsRow(item, index, index === mainOptions.length - 1)
          )}
        </View>

        {/* Secondary Settings Group */}
        <View
          style={[
            styles.settingsCard,
            {
              backgroundColor: cardBg,
              borderColor: cardBorder,
              marginTop: sizes.md,
            },
          ]}
        >
          {otherOptions.map((item, index) =>
            renderSettingsRow(item, index, index === otherOptions.length - 1)
          )}
        </View>

        {/* Log Out Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handlePress("Log Out")}
          style={{ marginTop: sizes.xxxl }}
        >
          <LinearGradient
            colors={[logoutGradientStart, logoutGradientEnd]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.logoutButton}
          >
            <LogOut size={18} color="#FFFFFF" strokeWidth={2} />
            <Typography
              fontSize={15}
              variant="SemiBold"
              txtWhite
              customStyles={{ marginLeft: 8 }}
            >
              Log out
            </Typography>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </GlobalContainer>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 16,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarWrapper: {
    borderRadius: 1000,
    overflow: "hidden",
  },
  profileText: {
    gap: 6,
  },
  settingsCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  rowRight: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 16,
  },
});
