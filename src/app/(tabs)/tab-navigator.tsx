import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomTabBar from "../../components/custom-tab-bar";

export default function TabNavigator() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
    /*screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: "white", // Active icon/label color
      tabBarInactiveTintColor: "#ccc", // Inactive icon/label color
      tabBarStyle: {
        backgroundColor: "#000000ff", // Tab bar background color
        //borderTopColor: "white", // Tab bar border color
        height: 80,
      },
      tabBarItemStyle: {
        marginTop: -10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        //borderWidth: 1,
        //borderColor: "#ccc",
      },
    }}*/
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
        name="exchanges"
        options={{
          title: "Add",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="add" color={color} />
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
        name="settings"
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