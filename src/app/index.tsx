import { View, Text } from "react-native";
import { Link } from "expo-router";
// import 'expo-router/entry';


export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the Financial App!</Text>
      <Link href="/profile">
        <Text style={{ color: "blue", marginTop: 20 }}>Go to Profile</Text>
      </Link>
    </View>
  );
}
