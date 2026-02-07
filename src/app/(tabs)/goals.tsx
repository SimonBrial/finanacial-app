import GlobalContainer from "../../components/general/global-container";
import Typography from "../../components/general/typography";
import { Link } from "expo-router";
import { theme } from "../../context/styles/styles-base";
import { View } from "react-native";

export default function Goals() {
  return (
    <GlobalContainer>
      <View
        style={{
          flex: 1,
          gap: 20,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        <Link href="/home">
          <Typography customStyles={{ color: theme.t100, marginTop: 20 }}>
            Go to Home
          </Typography>
        </Link>
        <Link href="/">
          <Typography customStyles={{ color: theme.t100, marginTop: 20 }}>
            Go to Login
          </Typography>
        </Link>
      </View>
    </GlobalContainer>
  );
}
