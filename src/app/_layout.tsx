import "../../global.css";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { ThemeProvider } from "../context/styles/theme-provider";
import useTheme from "../hooks/useTheme";
import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#00E676",
        backgroundColor: "#16161a",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.08)",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
      }}
      text2Style={{
        fontSize: 13,
        color: "rgba(255, 255, 255, 0.7)",
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "#FF1744",
        backgroundColor: "#16161a",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.08)",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
      }}
      text2Style={{
        fontSize: 13,
        color: "rgba(255, 255, 255, 0.7)",
      }}
    />
  ),
  warning: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#FFB300",
        backgroundColor: "#16161a",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.08)",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
      }}
      text2Style={{
        fontSize: 13,
        color: "rgba(255, 255, 255, 0.7)",
      }}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "#0070f3",
        backgroundColor: "#16161a",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.08)",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "bold",
        color: "white",
      }}
      text2Style={{
        fontSize: 13,
        color: "rgba(255, 255, 255, 0.7)",
      }}
    />
  ),
};

/**
 * RootApp
 *
 * Componente raíz de la app que configura la navegación principal.
 * Usa un Stack navigator de expo-router como contenedor principal.
 * Incluye GestureHandlerRootView para soporte de gestos y
 * BottomSheetModalProvider para bottom sheets globales.
 */
function RootApp() {
  const { globalStyles } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        {/* Stack principal — controla la navegación entre pantallas */}
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: globalStyles.background },
          }}
        >
          {/* Pantalla de inicio — redirige a las tabs */}
          <Stack.Screen
            name="index"
            options={{ title: "Home", headerShown: false }}
          />

          {/* Grupo de tabs — contiene la navegación inferior principal */}
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />

          {/*
           * Pantalla de notificaciones — presentada como modal.
           * Se abre desde NotificationIcon y se desliza desde abajo.
           * Anteriormente era un drawer lateral; ahora es un modal
           * para mayor simplicidad y compatibilidad con SDK 57.
           */}
          <Stack.Screen
            name="notification"
            options={{
              presentation: "modal",
              headerShown: false,
              animation: "slide_from_bottom",
            }}
          />
        </Stack>
        {/* Toast global — muestra notificaciones tipo snackbar */}
        <Toast config={toastConfig} />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <RootApp />
    </ThemeProvider>
  );
}
