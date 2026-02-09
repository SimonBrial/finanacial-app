import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomTabBar from "../../components/custom-tab-bar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} color={"red"} />}
      screenOptions={{
        headerShown: false,
        /*-------- */
        tabBarActiveTintColor: "blue", // Active icon/label color
        tabBarInactiveTintColor: "#ccc", // Inactive icon/label color
        tabBarStyle: {
          backgroundColor: "#333", // Tab bar background color
          borderTopColor: "transparent", // Tab bar border color
          height: 80,
          paddingTop: 6,
        },
        tabBarItemStyle: {
          display: "flex",
          flexDirection: "row",
          //width: "100%",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "#ccc",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="home" color={color} />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="goals"
        options={{
          title: "Goals",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="workspace-premium" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="autorenew" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="exchanges"
        options={{
          title: "Exchanges",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="attach-money" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="person" color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
