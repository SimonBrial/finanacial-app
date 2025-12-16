import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomTabBar from "../../components/custom-tab-bar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} color={"#2bf35d"} />}
      screenOptions={{
        headerShown: false,
        /*-------- */
        tabBarActiveTintColor: "#2bf35d", // Active icon/label color
        tabBarInactiveTintColor: "#ccc", // Inactive icon/label color
        tabBarStyle: {
          backgroundColor: "#333", // Tab bar background color
          borderTopColor: "transparent", // Tab bar border color
          height: 70,
          paddingTop: 6,
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          width: "98%",
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
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
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="person" color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
