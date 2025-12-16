import { StyleSheet, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TabItem } from "../interface/interface";

export default function CustomTabBar({
  descriptors,
  navigation,
  state,
  color,
  arr,
}: any) {
  const tabsItem: TabItem[] = [
    {
      name: "home",
      icon: "home",
      label: "Home",
    },
    {
      name: "goals",
      icon: "workspace-premium",
      label: "Goals",
    },
    {
      name: "transactions",
      icon: "autorenew",
      label: "Transactions",
    },
    {
      name: "exchange",
      icon: "attach-money",
      label: "Exchange",
    },
    {
      name: "profile",
      icon: "person",
      label: "Profile",
    },
  ];

  return (
    <View style={stylesTabs.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        /*const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;*/

        const isFocused = state.index === index;

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

        return (
          <TouchableOpacity
            // href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={stylesTabs.tabbarItem}
            key={route.name}
          >
            <MaterialIcons
              size={28}
              name={
                route.name === tabsItem[index].name
                  ? tabsItem[index].icon
                  : "attach-money"
              }
              color={color}
            />
            {/*{icons[route.name]({
              color: isFocused ? colors.primary : colors.text,
              size: 28,
              })}*/}

            {/*<Typography
              variant="xs"
              customStyles={{
                color: isFocused ? colors.primary : colors.text,
                textAlign: "auto",
              }}
            >
              {label}
            </Typography>*/}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const stylesTabs = StyleSheet.create({
  tabBar: {
    position: "absolute",
    display: "flex",
    flexDirection: "row",
    //alignItems: "center",
    //justifyContent: "space-between",
    //flexShrink: 1,
    backgroundColor: "#2e2e2e",
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    borderCurve: "continuous",
    bottom: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 5,
  },
  tabbarItem: {
    //backgroundColor: "#fff45835",
    //flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 1,
    // borderWidth: 1,
    // borderColor: "#000",
    height: 50,
    width: "100%",
  },
});
