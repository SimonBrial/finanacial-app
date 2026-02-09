import { TouchableOpacity, StyleSheet, Animated, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TabItem } from "../interface/interface";
import Typography from "./general/typography";
import useTheme from "../hook/useTheme";

export default function CustomTabBar({
  descriptors,
  navigation,
  state,
  color,
  width,
  arr,
}: any) {
  const { sizes, theme, globalStyles } = useTheme();

  const tabStyles = StyleSheet.flatten([
    /*{
      borderWidth: 1,
      borderColor: "transparent",
      borderTopColor: theme.t100,
      },*/
    stylesTabs.tabItemContainer,
  ]);
  /*const tabStylesSmall = StyleSheet.create([
    {
      width: "100%",
      height: "60%",
      display: "flex",
      flexDirection: "row",
      gap: sizes.xxs,
      justifyContent: "center",
      alignItems: "center",
      //borderWidth: 1,
      //borderColor: theme.t100,
    },
    /*{
      transform: [{ scaleX: 1 }],
    },
  ]);*/
  const tabsItem: TabItem[] = [
    {
      name: "home",
      icon: "home",
      label: "Home",
    },
    {
      name: "goals",
      icon: "emoji-events",
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
      name: "settings",
      icon: "settings",
      label: "Settings",
    },
  ];

  return (
    <View style={stylesTabs.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          // startAnimation();
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
                name={
                  route.name === tabsItem[index].name
                    ? tabsItem[index].icon
                    : "attach-money"
                }
                color={isFocused ? "white" : globalStyles.subtitle}
                style={{ marginLeft: isFocused ? -sizes.xs : 0 }}
              />
              {/*{icons[route.name]({
              color: isFocused ? colors.primary : colors.text,
              size: 28,
              })}*/}
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
            {/*{isFocused ? (
              <View
                style={{
                  backgroundColor: theme.t100,
                  width: "90%",
                  height: 1,
                  display: "flex",
                  //flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              ></View>
            ) : null}*/}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

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
});
