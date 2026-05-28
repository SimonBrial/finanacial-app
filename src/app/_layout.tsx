import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { ThemeProvider } from "../context/styles/theme-provider";
import useTheme from "../hook/useTheme";

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

function RootApp() {
  const { globalStyles } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "black" }}>
      <BottomSheetModalProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: globalStyles.background },
          }}
        >
          <Stack.Screen
            name="index"
            options={{ title: "Home", headerShown: false }}
          />
          <Stack.Screen
            name="settings"
            options={{ title: "Settings", headerShown: false }}
          />
          <Stack.Screen
            name="transactions"
            options={{ title: "Transactions", headerShown: false }}
          />
          <Stack.Screen
            name="goals"
            options={{ title: "Goals", headerShown: false }}
          />
        </Stack>
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

