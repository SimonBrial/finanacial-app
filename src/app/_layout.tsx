import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from "../context/styles/theme-provider";
import useTheme from "../hook/useTheme";

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
