import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen
        name="profile"
        options={{ title: "Profile", headerShown: false }}
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
  );
}
