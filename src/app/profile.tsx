import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the Financial App!</Text>
      <Link href="/">
        <Text style={{ color: "blue", marginTop: 20 }}>Go to Home</Text>
      </Link>
    </View>
  );
}
