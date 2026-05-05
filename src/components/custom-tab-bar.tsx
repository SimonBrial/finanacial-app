import { TouchableOpacity, StyleSheet, Animated, View, Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { TabItem } from "../interface/interface";
import Typography from "./ui/typography";
import useTheme from "../hook/useTheme";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Route } from "@react-navigation/native";
import { useCallback, useRef } from "react";

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import ModalItems from "./modal-items";

export default function CustomTabBar({
  descriptors,
  navigation,
  state,
}: BottomTabBarProps) {
  const { sizes, theme, globalStyles } = useTheme();

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.6} // Ajusta el nivel de oscuridad (0.0 a 1.0)
      />
    ),
    []
  );

  const tabsItem: TabItem[] = [
    { name: "home", icon: "home", label: "Home" },
    { name: "goals", icon: "emoji-events", label: "Goals" },
    { name: "transactions", icon: "autorenew", label: "Transactions" },
    { name: "exchanges", icon: "add", label: "Add" },
    { name: "settings", icon: "person-outline", label: "Profile" },
  ];

  return (
    <View style={stylesTabs.tabBarContainer}>
      <View style={stylesTabs.tabBar}>
        {state.routes.map((route: Route<string>, index: number) => {
          const tabInfo = tabsItem.find((item) => item.name === route.name);
          if (!tabInfo) return null;

          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : tabInfo.label;

          const isFocused = state.index === index;
          const isCenterButton = route.name === "exchanges";

          const onPress = () => {
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

          if (isCenterButton) {
            return (
              <TouchableOpacity
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={handlePresentModalPress} // <-- Open Modal Instead of Navigating
                onLongPress={onLongPress}
                style={stylesTabs.centerButtonWrapper}
                key={route.name}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#006DFF", "#004199"]}
                  style={stylesTabs.centerButton}
                >
                  <MaterialIcons name="add" size={32} color="#FFFFFF" />
                </LinearGradient>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={stylesTabs.tabItemContainer}
              key={route.name}
              activeOpacity={0.7}
            >
              <MaterialIcons
                size={28}
                name={tabInfo.icon as any}
                color={isFocused ? "#FFFFFF" : "#888888"}
              />
              <Typography
                fontSize={12}
                customStyles={{
                  color: isFocused ? "#FFFFFF" : "#888888",
                  marginTop: 4,
                  fontWeight: isFocused ? "500" : "400",
                }}
              >
                {typeof label === "string" ? label : tabInfo.label}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={['50%', '75%']}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: "#1c1c1c" }}
        handleIndicatorStyle={{ backgroundColor: "rgba(255,255,255,0.5)" }}
      >
        <BottomSheetView style={stylesTabs.contentContainer}>
          <ModalItems icon="attach-money" label="Income" onPress={() => { bottomSheetModalRef.current?.dismiss(); }} />
          <ModalItems icon="money-off" label="Expense" onPress={() => { bottomSheetModalRef.current?.dismiss(); }} />
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

const stylesTabs = StyleSheet.create({
  tabBarContainer: {
    marginTop: -20,
    backgroundColor: "#000000ff",
    //borderTopWidth: 1,
    //borderTopColor: "rgba(255, 255, 255, 1)", // Subtle blue top border
  },
  tabBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    paddingHorizontal: 10,
    paddingBottom: Platform.OS === "ios" ? 20 : 5, // Safe area padding
  },
  tabItemContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%",
  },
  centerButtonWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centerButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -40, // Float above the tab bar
    shadowColor: "#0066FF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 15,
  },
});
