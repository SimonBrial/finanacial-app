import {
  TouchableOpacity,
  StyleSheet,
  View,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Typography from "./ui/typography";
import useTheme from "../hooks/useTheme";
import { useSettingsStore } from "../stores/useSettingsStore";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Route } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import {
  LayoutDashboard,
  AlarmClock,
  CirclePlus,
  FolderPlus,
  Settings2,
  HandMetal,
  Lightbulb,
  Trophy,
  Repeat,
  Camera,
  Coins,
  Home,
  Mic,
} from "lucide-react-native";

// ==========================================
// TYPES & INTERFACES
// ==========================================

interface TabItemProps {
  isFocused: boolean;
  label: string;
  IconComponent: any;
  onPress: () => void;
  onLongPress: () => void;
  isDark: boolean;
}

interface BackdropProps {
  menuVisible: boolean;
  closeMenu: () => void;
}

interface TabCapsuleProps {
  capsuleRoutes: Route<string>[];
  state: any;
  navigation: any;
  isDark: boolean;
  closeMenu: () => void;
}

interface BlueButtonProps {
  toggleMenu: () => void;
  animatedButtonStyle: any;
  isLeftHanded: boolean;
}

interface PopupMenuProps {
  menuVisible: boolean;
  isDark: boolean;
  animatedMenuProps: any;
  handleMenuAction: (action: string) => void;
  insetsBottom: number;
}

// ==========================================
// SUB-COMPONENTS
// ==========================================

/**
 * TabItemComponent
 * Renders an individual navigation tab inside the capsule.
 * Animates the icon size (scaling down on focus) and reveals the text label smoothly.
 */
function TabItemComponent({
  IconComponent,
  onLongPress,
  isFocused,
  onPress,
  isDark,
  label,
}: TabItemProps) {
  // 1 = active, 0 = inactive
  const active = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    active.value = withTiming(isFocused ? 1 : 0, { duration: 250 });
  }, [isFocused, active]);

  // Scale: 1.3 (unselected, larger icon) to 0.95 (selected, slightly smaller to fit text)
  const animatedIconStyle = useAnimatedStyle(() => {
    const scale = interpolate(active.value, [0, 1], [1.3, 0.95]);
    return {
      transform: [{ scale }],
    };
  });

  // Fade-in, slide-up, and expanding height for the selected item's label
  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: active.value,
      height: interpolate(active.value, [0, 1], [0, 15]),
      marginTop: interpolate(active.value, [0, 1], [0, 2]),
      transform: [{ translateY: interpolate(active.value, [0, 1], [5, 0]) }],
    };
  });

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const activeColor = isDark ? "#FFFFFF" : "#0F172B";
  const inactiveColor = isDark ? "#4E4D4D" : "#90A1B9";

  return (
    <TouchableOpacity
      onPress={handlePress}
      onLongPress={onLongPress}
      className="flex-1 items-center justify-center py-2"
      activeOpacity={0.8}
    >
      <Animated.View
        style={animatedIconStyle}
        className="items-center justify-center"
      >
        <IconComponent
          size={20}
          color={isFocused ? activeColor : inactiveColor}
          strokeWidth={isFocused ? 2.5 : 2.0}
        />
      </Animated.View>

      <Animated.View
        style={[animatedTextStyle, { overflow: "hidden" }]}
        className="items-center"
      >
        <Typography
          fontSize={11}
          customStyles={{
            color: activeColor,
            fontWeight: "600",
          }}
        >
          {label}
        </Typography>
      </Animated.View>
    </TouchableOpacity>
  );
}

/**
 * Backdrop
 * Full-screen transparent overlay that captures taps outside the menu to dismiss it.
 */
function Backdrop({ menuVisible, closeMenu }: BackdropProps) {
  if (!menuVisible) return null;

  return (
    <Pressable
      style={StyleSheet.absoluteFill}
      onPress={closeMenu}
      className="bg-transparent"
    />
  );
}

/**
 * TabCapsule
 * Renders the primary navigation container (capsule shape) with the 4 default tabs.
 */
function TabCapsule({
  capsuleRoutes,
  state,
  navigation,
  isDark,
  closeMenu,
}: TabCapsuleProps) {
  // Lucide Icons mapped to routes
  const routeIcons: Record<string, any> = {
    home: Home,
    goals: Trophy,
    transactions: Repeat,
    settings: Settings2,
  };

  const routeLabels: Record<string, string> = {
    home: "Home",
    goals: "Goals",
    transactions: "Transactions",
    settings: "Settings",
  };

  return (
    <View
      className="flex-1 flex-row items-center justify-between h-16 rounded-full border px-3"
      style={[
        {
          backgroundColor: isDark ? "#18181B" : "#FFFFFF",
          borderColor: isDark ? "#2E2E34" : "#E2E8F0",
        },
        !isDark ? stylesTabs.capsuleShadowLight : stylesTabs.capsuleShadowDark,
      ]}
    >
      {capsuleRoutes.map((route: Route<string>) => {
        const IconComponent = routeIcons[route.name];
        if (!IconComponent) return null;

        const actualIndex = state.routes.findIndex(
          (r: any) => r.name === route.name,
        );
        const isFocused = state.index === actualIndex;

        const onPress = () => {
          closeMenu();

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TabItemComponent
            key={route.name}
            isFocused={isFocused}
            label={routeLabels[route.name]}
            IconComponent={IconComponent}
            onPress={onPress}
            onLongPress={onLongPress}
            isDark={isDark}
          />
        );
      })}
    </View>
  );
}

/**
 * BlueButton
 * Floating circular button triggering the menu. Features Linear Gradient and rotation animations.
 */
function BlueButton({
  animatedButtonStyle,
  isLeftHanded,
  toggleMenu,
}: BlueButtonProps) {
  return (
    <TouchableOpacity
      onPress={toggleMenu}
      activeOpacity={0.85}
      style={[
        stylesTabs.blueButtonShadow,
        isLeftHanded ? { marginRight: 15 } : { marginLeft: 15 },
      ]}
    >
      <Animated.View
        style={animatedButtonStyle}
        className="w-16 h-16 rounded-full overflow-hidden"
      >
        <LinearGradient
          colors={["#006DFF", "#004199"]}
          style={stylesTabs.blueButtonGradient}
        >
          <LayoutDashboard size={24} color="#FFFFFF" strokeWidth={2.2} />
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
}

/**
 * PopupMenu
 * Slides up/down displaying the transaction action short-cuts ("New register" & "Others").
 */
function PopupMenu({
  menuVisible,
  isDark,
  animatedMenuProps,
  handleMenuAction,
  insetsBottom,
}: PopupMenuProps) {
  if (!menuVisible) return null;

  return (
    <Animated.View
      style={[
        animatedMenuProps,
        stylesTabs.popupMenuContainer,
        {
          backgroundColor: isDark ? "#18181B" : "#FFFFFF",
          borderColor: isDark ? "#2E2E34" : "#E2E8F0",
          bottom: 86 + Math.max(insetsBottom, 16),
        },
        !isDark ? stylesTabs.capsuleShadowLight : stylesTabs.capsuleShadowDark,
      ]}
      className="absolute left-5 right-5 p-5 rounded-[32px] border shadow-xl"
    >
      {/* New Register Section */}
      <View className="mb-4">
        <View className="flex-row items-center mb-3 ml-1">
          <CirclePlus
            size={18}
            color={isDark ? "#A1A1AA" : "#64748B"}
            strokeWidth={2.2}
          />
          <Typography
            fontSize={13}
            customStyles={{
              color: isDark ? "#E4E4E7" : "#1E293B",
              fontWeight: "600",
              marginLeft: 8,
            }}
          >
            New register
          </Typography>
        </View>
        <View className="flex-row gap-3">
          {/* Manual register option */}
          <TouchableOpacity
            onPress={() => handleMenuAction("Manual")}
            className="flex-1 items-center justify-center py-4 rounded-2xl"
            style={{
              backgroundColor: isDark ? "#252528" : "#F1F5F9",
            }}
            activeOpacity={0.7}
          >
            <HandMetal
              size={24}
              color={isDark ? "#FFFFFF" : "#0F172A"}
              strokeWidth={2.0}
            />
            <Typography
              fontSize={12}
              customStyles={{
                color: isDark ? "#FFFFFF" : "#0F172A",
                fontWeight: "500",
                marginTop: 6,
              }}
            >
              Manual
            </Typography>
          </TouchableOpacity>

          {/* Voice register option */}
          <TouchableOpacity
            onPress={() => handleMenuAction("Voice")}
            className="flex-1 items-center justify-center py-4 rounded-2xl"
            style={{
              backgroundColor: isDark ? "#252528" : "#F1F5F9",
            }}
            activeOpacity={0.7}
          >
            <Mic
              size={24}
              color={isDark ? "#FFFFFF" : "#0F172A"}
              strokeWidth={2.0}
            />
            <Typography
              fontSize={12}
              customStyles={{
                color: isDark ? "#FFFFFF" : "#0F172A",
                fontWeight: "500",
                marginTop: 6,
              }}
            >
              Voice
            </Typography>
          </TouchableOpacity>

          {/* Photo register option */}
          <TouchableOpacity
            onPress={() => handleMenuAction("Photo")}
            className="flex-1 items-center justify-center py-4 rounded-2xl"
            style={{
              backgroundColor: isDark ? "#252528" : "#F1F5F9",
            }}
            activeOpacity={0.7}
          >
            <Camera
              size={24}
              color={isDark ? "#FFFFFF" : "#0F172A"}
              strokeWidth={2.0}
            />
            <Typography
              fontSize={12}
              customStyles={{
                color: isDark ? "#FFFFFF" : "#0F172A",
                fontWeight: "500",
                marginTop: 6,
              }}
            >
              Photo
            </Typography>
          </TouchableOpacity>
        </View>
      </View>

      {/* Others Section */}
      <View>
        <View className="flex-row items-center mb-3 ml-1">
          <Lightbulb
            size={18}
            color={isDark ? "#A1A1AA" : "#64748B"}
            strokeWidth={2.2}
          />
          <Typography
            fontSize={13}
            customStyles={{
              color: isDark ? "#E4E4E7" : "#1E293B",
              fontWeight: "600",
              marginLeft: 8,
            }}
          >
            Others
          </Typography>
        </View>
        <View className="flex-row gap-3">
          {/* Create Category option */}
          <TouchableOpacity
            onPress={() => handleMenuAction("Category")}
            className="flex-1 items-center justify-center py-4 rounded-2xl"
            style={{
              backgroundColor: isDark ? "#252528" : "#F1F5F9",
            }}
            activeOpacity={0.7}
          >
            <FolderPlus
              size={24}
              color={isDark ? "#FFFFFF" : "#0F172A"}
              strokeWidth={2.0}
            />
            <Typography
              fontSize={11}
              customStyles={{
                color: isDark ? "#FFFFFF" : "#0F172A",
                fontWeight: "500",
                marginTop: 6,
                textAlign: "center",
              }}
            >
              Create Category
            </Typography>
          </TouchableOpacity>

          {/* Create Insight option */}
          <TouchableOpacity
            onPress={() => handleMenuAction("Insight")}
            className="flex-1 items-center justify-center py-4 rounded-2xl"
            style={{
              backgroundColor: isDark ? "#252528" : "#F1F5F9",
            }}
            activeOpacity={0.7}
          >
            <Coins
              size={24}
              color={isDark ? "#FFFFFF" : "#0F172A"}
              strokeWidth={2.0}
            />
            <Typography
              fontSize={11}
              customStyles={{
                color: isDark ? "#FFFFFF" : "#0F172A",
                fontWeight: "500",
                marginTop: 6,
                textAlign: "center",
              }}
            >
              Create insight
            </Typography>
          </TouchableOpacity>

          {/* Create Reminder option */}
          <TouchableOpacity
            onPress={() => handleMenuAction("Reminder")}
            className="flex-1 items-center justify-center py-4 rounded-2xl"
            style={{
              backgroundColor: isDark ? "#252528" : "#F1F5F9",
            }}
            activeOpacity={0.7}
          >
            <AlarmClock
              size={24}
              color={isDark ? "#FFFFFF" : "#0F172A"}
              strokeWidth={2.0}
            />
            <Typography
              fontSize={11}
              customStyles={{
                color: isDark ? "#FFFFFF" : "#0F172A",
                fontWeight: "500",
                marginTop: 6,
                textAlign: "center",
              }}
            >
              Create reminder
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

// ==========================================
// MAIN TAB BAR COMPONENT
// ==========================================

export default function CustomTabBar({
  descriptors,
  navigation,
  state,
}: BottomTabBarProps) {
  const { isDark } = useTheme();
  const { isLeftHanded } = useSettingsStore();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Menu Visibility State
  const [menuVisible, setMenuVisible] = useState(false);
  const menuProgress = useSharedValue(0);

  // Toggle open/close of the menu with haptics
  const toggleMenu = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (menuVisible) {
      menuProgress.value = withTiming(
        0,
        { duration: 200, easing: Easing.in(Easing.ease) },
        (finished) => {
          if (finished) {
            runOnJS(setMenuVisible)(false);
          }
        },
      );
    } else {
      setMenuVisible(true);
      menuProgress.value = withTiming(1, {
        duration: 250,
        easing: Easing.out(Easing.ease),
      });
    }
  };

  // Force close the menu
  const closeMenu = () => {
    if (menuVisible) {
      menuProgress.value = withTiming(
        0,
        { duration: 200, easing: Easing.in(Easing.ease) },
        (finished) => {
          if (finished) {
            runOnJS(setMenuVisible)(false);
          }
        },
      );
    }
  };

  // Animated popup styling
  const animatedMenuProps = useAnimatedStyle(() => {
    return {
      opacity: menuProgress.value,
      transform: [
        { translateY: interpolate(menuProgress.value, [0, 1], [30, 0]) },
        { scale: interpolate(menuProgress.value, [0, 1], [0.96, 1]) },
      ],
    };
  });

  // Action Button Rotate / Press animation
  const buttonProgress = useSharedValue(0);
  useEffect(() => {
    buttonProgress.value = withTiming(menuVisible ? 1 : 0, {
      duration: 250,
      easing: Easing.out(Easing.ease),
    });
  }, [menuVisible, buttonProgress]);

  const animatedButtonStyle = useAnimatedStyle(() => {
    const rotate = interpolate(buttonProgress.value, [0, 1], [0, 90]);
    const scale = interpolate(buttonProgress.value, [0, 1], [1, 0.95]);
    return {
      transform: [{ rotate: `${rotate}deg` }, { scale }],
    };
  });

  // Exclude exchanges route from the main navigation capsule
  const capsuleRoutes = state.routes.filter((r) => r.name !== "exchanges");

  // Handle actions for buttons inside the pop-up menu
  const handleMenuAction = (action: string) => {
    closeMenu();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    switch (action) {
      case "Manual":
        router.push("/transaction/form");
        break;
      case "Category":
        navigation.navigate("transactions", { screen: "Categories" });
        break;
      case "Insight":
        navigation.navigate("transactions", { screen: "Insight" });
        break;
      case "Voice":
      case "Photo":
      case "Reminder":
      default:
        console.log(`Action: ${action} triggered`);
        break;
    }
  };

  return (
    <View
      style={[stylesTabs.tabBarContainer, menuVisible && { top: 0 }]}
      pointerEvents="box-none"
    >
      {/* Full-screen backdrop to handle touch outside to close */}
      <Backdrop menuVisible={menuVisible} closeMenu={closeMenu} />

      {/* Slide up floating action shortcut menu */}
      <PopupMenu
        menuVisible={menuVisible}
        isDark={isDark}
        animatedMenuProps={animatedMenuProps}
        handleMenuAction={handleMenuAction}
        insetsBottom={insets.bottom}
      />

      {/* Row containing navigation capsule and floating action button */}
      {/* Support left-handed users: uses row-reverse to swap positions */}
      <View
        style={[
          stylesTabs.tabBar,
          { paddingBottom: Math.max(insets.bottom + 8, 16) },
          isLeftHanded && { flexDirection: "row-reverse" },
        ]}
        pointerEvents="box-none"
      >
        {/* Navigation capsule */}
        <TabCapsule
          capsuleRoutes={capsuleRoutes}
          state={state}
          navigation={navigation}
          isDark={isDark}
          closeMenu={closeMenu}
        />

        {/* Floating gradient trigger button */}
        <BlueButton
          toggleMenu={toggleMenu}
          animatedButtonStyle={animatedButtonStyle}
          isLeftHanded={isLeftHanded}
        />
      </View>
    </View>
  );
}

// ==========================================
// STYLES
// ==========================================

const stylesTabs = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    elevation: 0,
    shadowOpacity: 0,
    borderTopWidth: 0,
    zIndex: 99,
    justifyContent: "flex-end", // Anchors menu and navigation to the bottom of the screen
  },
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  capsuleShadowLight: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  capsuleShadowDark: {
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  blueButtonShadow: {
    shadowColor: "#0066FF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  blueButtonGradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  popupMenuContainer: {
    zIndex: 100,
  },
});
