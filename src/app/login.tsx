import { Link } from "expo-router";
import {
  View,
  StyleSheet,
  Animated,
  Button,
  useWindowDimensions,
} from "react-native";
import Typography from "../components/general/typography";
import useTheme from "../hook/useTheme";
import { useReducer } from "react";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";
// import { theme } from "../context/styles/styles-base";

export default function Login() {
  const { theme } = useTheme();
  const [isToggled, toggle] = useReducer((s) => !s, false);

  const { width } = useWindowDimensions();
  // Definimos el estilo animado
  const animatedStyle = useAnimatedStyle(() => {
    return {
      // Usamos withTiming para controlar la duración (500ms como tenías antes)
      width: withTiming(isToggled ? 240 : 120, { duration: 500 }),
      backgroundColor: withTiming(isToggled ? "#fa7f7c" : "#87cce8", {
        duration: 500,
      }),
    };
  });

  return (
    <View style={styles.container}>
      <Typography customStyles={{ color: "white" }}>
        Welcome to the Financial App!
      </Typography>

      <Link href="/home">
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
  },
  linearGradient: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 200,
    width: 350,
  },
});
