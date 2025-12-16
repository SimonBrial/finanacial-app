import { Link } from "expo-router";
import { View } from "react-native";
import Typography from "../components/general/typography";
// import Home from "./home";

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Typography>Welcome to the Financial App!</Typography>
      <Link href="/home">
        <Typography customStyles={{ color: "blue", marginTop: 20 }}>
          Go to Home
        </Typography>
      </Link>
    </View>
  );
}
