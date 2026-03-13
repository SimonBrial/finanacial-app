import { TouchableOpacity, StyleSheet, Animated, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TabItem } from "../interface/interface";
import Typography from "./ui/typography";
import useTheme from "../hook/useTheme";
import Icon from "./ui/icon";

export default function CustomTabBar({
  descriptors,
  navigation,
  state,
  color,
  width,
  arr,
}: any) {
  const { sizes, theme, globalStyles } = useTheme();

  // ⚡ Bolt: Passed array of styles instead of StyleSheet.flatten to avoid CPU overhead during renders.
  const tabStyles = [stylesTabs.tabItemContainer];

  const tabsItem: TabItem[] = [
    { name: "home", icon: "home", label: "Home" },
    { name: "goals", icon: "emoji-events", label: "Goals" },
    { name: "transactions", icon: "autorenew", label: "Transactions" },
    // CORRECCIÓN: Cambié "exchange" por "exchanges" para que coincida con tu TabLayout
    { name: "exchanges", icon: "attach-money", label: "Exchange" },
    { name: "settings", icon: "settings", label: "Settings" },
  ];

  return (
    <View style={stylesTabs.tabBar}>
      {state.routes.map((route: any, index: number) => {
        // 1. Buscamos la información del tab basándonos en el nombre de la ruta, no en el índice
        const tabInfo = tabsItem.find((item) => item.name === route.name);

        // 2. Si Expo Router coló una ruta extra que no está en nuestra lista, no la renderizamos
        if (!tabInfo) return null;

        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : tabInfo.label; // Usamos nuestro label personalizado como última opción

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
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={tabStyles}
            key={route.name}
          >
            <View
              style={[
                {
                  width: isFocused ? "90%" : "60%",
                  height: "60%",
                  display: "flex",
                  flexDirection: "row",
                  gap: sizes.xxs,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: isFocused ? 1 : 0,
                  borderBottomColor: isFocused ? theme.t100 : "transparent",
                },
              ]}
            >
              <MaterialIcons
                size={28}
                // Usamos directamente el icono que encontramos en nuestro buscador
                name={tabInfo.icon as any}
                color={isFocused ? "white" : globalStyles.subtitle}
                style={{ marginLeft: isFocused ? -sizes.xs : 0 }}
              />

              {isFocused ? (
                <Animated.View>
                  <Typography
                    fontSize={sizes.sm}
                    customStyles={{
                      color: isFocused ? "white" : globalStyles.subtitle,
                      textAlign: "auto",
                    }}
                  >
                    {label}
                  </Typography>
                </Animated.View>
              ) : null}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
/* {route.name === "transactions" ? (
  <Icon
    name="add"
    library="MaterialIcons"
    size={50}
    rounded
    bgStyle={stylesTabs.tabAdd}
  />
) : (
  
)} */

const stylesTabs = StyleSheet.create({
  tabBar: {
    //position: "absolute",
    display: "flex",
    flexDirection: "row",
    backgroundColor: "black",
    paddingHorizontal: 10,
  },
  tabItemContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 5,
    flexShrink: 1,
    height: 90,
    //width: "100%",
  },
  tabAdd: {
    width: 50,
    height: 50,
    backgroundColor: "red",
    position: "absolute",
  },
});
