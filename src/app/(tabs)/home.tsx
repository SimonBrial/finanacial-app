import Typography from "../../components/general/typography";
import GlobalContainer from "../../components/general/global-container";
import { Link } from "expo-router";
import useTheme from "../../hook/useTheme";
import { View } from "react-native";

export default function Home() {
  const { theme } = useTheme();
  return (
    <GlobalContainer>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        <Link href="/">
          <Typography customStyles={{ color: theme.t100, marginTop: 20 }}>
            Go to Login
          </Typography>
        </Link>
      </View>
    </GlobalContainer>
  );
}

// TODO: https://dolarapi.com/docs/venezuela/operations/get-dolares.html
