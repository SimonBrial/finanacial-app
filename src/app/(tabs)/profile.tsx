import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Profile() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1A1A1A",
      }}
    >
      <Text style={{ color: "white" }}>PROFILE page</Text>
      <Link href="/">
        <Text style={{ color: "cyan", marginTop: 20 }}>Go to LOGIN</Text>
      </Link>
    </View>
  );
}
