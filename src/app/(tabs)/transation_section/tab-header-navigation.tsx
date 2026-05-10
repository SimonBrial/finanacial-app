import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Categories from "./categories";
import Records from "./records";
import Insight from "./insight";
import useTheme from "../../../hook/useTheme";

const Tab = createMaterialTopTabNavigator();

export default function TabHeaderNavigation() {
  const { sizes } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: sizes.sm + 2, color: "white" },
        tabBarItemStyle: { flex: 1 },
        tabBarIndicatorStyle: { height: 3 },
        tabBarStyle: {
          backgroundColor: "transparent",
          width: "100%",
          paddingTop: sizes.md,
          borderColor: "transparent",
          borderWidth: 1,
          marginBottom: sizes.sm,
        },
      }}
    >
      <Tab.Screen name="Insight" component={Insight} />
      <Tab.Screen name="Records" component={Records} />
      <Tab.Screen name="Categories" component={Categories} />
    </Tab.Navigator>
  );
}
