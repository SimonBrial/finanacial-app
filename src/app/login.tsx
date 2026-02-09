import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import Typography from "../components/general/typography";
import useTheme from "../hook/useTheme";

export default function Login() {
  const { theme, sizes } = useTheme();

  return (
    <View style={styles.container}>
      <Typography customStyles={{ color: "white" }}>
        Welcome to the Financial App!
      </Typography>

      <Link
        href="/home"
        style={{
          paddingVertical: sizes.sm,
          paddingHorizontal: sizes.xl,
          backgroundColor: theme.t20,
          borderRadius: sizes.xs,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography customStyles={{ color: theme.t100, marginTop: 20 }}>
          Go to Home
        </Typography>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    gap: 20,
  },
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 200,
    width: 350,
  },
});
