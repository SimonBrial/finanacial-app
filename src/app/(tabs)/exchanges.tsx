import { Link } from "expo-router";
import { View } from "react-native";
import GlobalContainer from "../../components/general/global-container";
import Typography from "../../components/general/typography";
import { theme } from "../../context/styles/styles-base";

export default function Exchange() {
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
