import {
  KeyboardAvoidingView,
  StyleSheet,
  StatusBar,
  TextInput,
  Platform,
  View,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import PinScreen from "./pin-screen";
import Logo from "../components/logo";
import BackgroundShapeLayout from "../components/background-shape-layout";
import Button from "../components/ui/button";
import Icon from "../components/ui/icon";
import useTheme from "../hook/useTheme";
import Typography from "../components/ui/typography";

export default function Login() {
  const { globalStyles, theme, isDark, toggleTheme } = useTheme();
  const [currentScreen, setCurrentScreen] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email !== "" && password !== "") {
      setCurrentScreen("pin");
    }
  };

  const LogoHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={toggleTheme}
        style={{ position: "absolute", top: -40, right: -20, padding: 10 }}
      >
        <Icon
          name={isDark ? "sunny" : "moon"}
          library="Ionicons"
          size={24}
          color={isDark ? "#FFBF00" : "#6d0dd3"}
        />
      </TouchableOpacity>
      <Logo />
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Typography fontSize={26} bold>
          Welcome Back!
        </Typography>
        <Typography fontSize={14} customStyles={{ color: "#00bcd4" }}>
          Welcome back we missed you
        </Typography>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      style={[styles.container, { backgroundColor: globalStyles.background }]}
      keyboardVerticalOffset={0}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <View style={styles.content}>
        <LogoHeader />

        <BackgroundShapeLayout />

        {currentScreen === "login" ? (
          <View style={styles.formContainer}>
            <View
              style={[
                styles.inputRow,
                { borderBottomColor: globalStyles.borderInput },
              ]}
            >
              <Icon
                name={"at-sign"}
                variant="light"
                library="Feather"
                size={22}
                color={globalStyles.text}
              />
              <TextInput
                style={[styles.inputClean, { color: globalStyles.text }]}
                placeholder="Email"
                placeholderTextColor={globalStyles.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View
              style={[
                styles.inputRow,
                { borderBottomColor: globalStyles.borderInput },
              ]}
            >
              <Icon
                name={"lock-outline"}
                variant="light"
                library="MaterialCommunityIcons"
                size={22}
                color={globalStyles.text}
              />
              <TextInput
                style={[styles.inputClean, { color: globalStyles.text }]}
                placeholder="Password"
                placeholderTextColor={globalStyles.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            <Button
              text="Login"
              fullWidth
              color={theme.t100}
              iconRight={"arrow-right"}
              onPress={handleLogin}
            />
          </View>
        ) : (
          <PinScreen />
        )}
      </View>
    </KeyboardAvoidingView>
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
