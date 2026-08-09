/**
 * (tabs)/_layout.tsx
 *
 * Layout principal de la sección de tabs.
 * Define las pestañas de navegación inferior (Home, Goals, Transactions, etc.)
 * usando el componente Tabs de expo-router.
 *
 * Nota: Anteriormente se usaba un Drawer de @react-navigation para las
 * notificaciones. Ahora las notificaciones se manejan como pantalla modal
 * desde el root layout. Si en el futuro se desea volver al drawer,
 * se puede usar `Drawer` de `expo-router/drawer`.
 */
import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import CustomTabBar from "../../components/custom-tab-bar";

export default function TabLayout() {
  return (
    /**
     * Tabs: Componente de expo-router que genera navegación por pestañas.
     * tabBar: Renderiza nuestro CustomTabBar personalizado en lugar del default.
     */
    <Tabs
      tabBar={(props: any) => <CustomTabBar {...props} />}
    >
      {/* Pantalla principal — Dashboard del usuario */}
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

      {/* Pantalla de metas financieras */}
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

      {/* Pantalla de intercambios/conversiones */}
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

      {/* Pantalla de transacciones — contiene sub-tabs (Insight, Records, Categories) */}
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

      {/* Pantalla de configuración del usuario */}
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

      {/*
       * Ocultar las sub-pantallas de transaction_section del tab bar.
       * Estas son sub-pantallas usadas como componentes dentro de transactions,
       * no rutas de tab independientes.
       * expo-router genera una ruta por cada archivo en la carpeta,
       * así que cada una debe ocultarse individualmente.
       */}
      <Tabs.Screen
        name="transaction_section/categories"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="transaction_section/insight"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="transaction_section/records"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="transaction_section/tab-header-navigation"
        options={{ href: null }}
      />
    </Tabs>
  );
}
