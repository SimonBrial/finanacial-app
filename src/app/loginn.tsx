import {
  KeyboardAvoidingView,
  StyleSheet,
  StatusBar,
  Platform,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import Logo from "../components/logo";
import BackgroundShapeLayout from "../components/background-shape-layout";
import Button from "../components/ui/button-own";
import useTheme from "../hooks/useTheme";
import Typography from "../components/ui/typography";

export default function Loginn() {
  const { globalStyles, theme, isDark, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogin = () => router.push("/home");

  const LogoHeader = () => (
    <View style={styles.headerContainer}>
      <Logo />
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Typography fontSize={26} bold>
          Welcome Back!
        </Typography>
        <Typography
          fontSize={14}
          customStyles={{ color: isDark ? "#00bcd4" : theme.t100 }}
        >
          Welcome back we missed you
        </Typography>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: globalStyles.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        style={styles.container}
        keyboardVerticalOffset={0}
      >
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

        <View style={styles.content}>
          <LogoHeader />

          <BackgroundShapeLayout />

          <View style={styles.formContainer}>
            <Button
              text="Login"
              fullWidth
              color={theme.t100}
              iconRight={"arrow-right"}
              onPress={handleLogin}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: "center",
    zIndex: 10,
    position: "relative",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  formContainer: {
    width: "100%",
    alignItems: "center",
  },
  // --- Estilos Inputs Login ---
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    width: "100%",
    marginBottom: 30,
    padding: 5,
    borderBottomWidth: 1,
  },
  inputClean: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
});
