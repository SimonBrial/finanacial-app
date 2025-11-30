import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <SafeAreaView>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="profile" options={{ title: "Profile" }} />
      </Stack>
    </SafeAreaView>
  );
}
