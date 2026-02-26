import { createDrawerNavigator } from "@react-navigation/drawer";
import Notification from "../notification";
import TabNavigator from "./tab-navigator";

const Drawer = createDrawerNavigator();

export default function TabLayout() {
  return (
    <Drawer.Navigator // Le pasamos tu componente personalizado
      drawerContent={(props) => <Notification {...props} />}
      screenOptions={{
        swipeEnabled: false, // Deshabilitamos el swipe para abrir el drawer
        drawerPosition: "right", // Se abre desde la derecha
        headerShown: false, // Ocultamos el header del drawer para usar los de tus pantallas
        drawerType: "front", // El drawer se superpone a la pantalla actual
        drawerStyle: {
          backgroundColor: "transparent",
          opacity: 0.9,
        },
      }}
    >
      <Drawer.Screen name="tabs" component={TabNavigator} />
    </Drawer.Navigator>
  );
}
