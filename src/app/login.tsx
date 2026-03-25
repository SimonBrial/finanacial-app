import {
  KeyboardAvoidingView,

  StyleSheet,
  StatusBar,
  TextInput,
  Platform,
  View,
  Text,
} from "react-native";

import { useState } from "react";
import PinScreen from "./pin-screen";
import Logo from "../components/logo";
import BackgroundShapeLayout from "../components/backgroung-shape-layout";
import Button from "../components/ui/button";
import Icon from "../components/ui/icon";

export default function Login() {

  const [currentScreen, setCurrentScreen] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 1. Lógica del Botón Login -> Pasa a la pantalla del PIN
  const handleLogin = () => {
    if (email !== "" && password !== "") {
      setCurrentScreen("pin");
    }
  };

  // Cabecera reutilizable para ambas pantallas
  const LogoHeader = () => (
    <View style={styles.headerContainer}>
      <Logo />
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Welcome back we missed you</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      style={styles.container}
      keyboardVerticalOffset={0}
    >
      <StatusBar barStyle="light-content" />

      <View style={styles.content}>
        <LogoHeader />

        <BackgroundShapeLayout />

        {currentScreen === "login" ? (
          // --- PANTALLA 1: LOGIN EXACTO ---
          <View style={styles.formContainer}>
            <View style={styles.inputRow}>
              
              <Icon name={"at-sign"} variant="light" library="Feather" size={22}/>
              <TextInput
                style={styles.inputClean}
                placeholder="Email"
                placeholderTextColor="#ffffff"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputRow}>
              <Icon name={"lock-outline"} variant="light" library="MaterialCommunityIcons" size={22}/>
              <TextInput
                style={styles.inputClean}
                placeholder="Password"
                placeholderTextColor="#ffffff"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            <Button text="Login" fullWidth iconRight={"arrow-right"} onPress={handleLogin}/>

            {/* <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
              <Feather name="arrow-right" size={20} color="#ffffff" />
            </TouchableOpacity> */}
          </View>
        ) : (
          // --- PANTALLA 2: PIN EXACTO ---
          <PinScreen />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000", // Color de fondo oscuro sólido
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
  title: {
    fontSize: 26,
    color: "#ffffff",
    marginBottom: 10,
    fontFamily: "Inter",
  },
  subtitle: {
    fontSize: 14,
    color: "#00bcd4", // Cyan exacto de la imagen
    fontFamily: "Inter",
  },
  formContainer: {
    //flex: 1,
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
    borderBottomColor: "#ffffff",
    borderBottomWidth: 1,
  },
  icon: {
    marginRight: 20,
  },
  inputClean: {
    flex: 1,
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Inter",
  },
  loginButton: {
    backgroundColor: "#006DFF", // Tu color base
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 55,
    borderRadius: 8,
    marginTop: 10,
    gap: 10,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "Inter",
  },
  // --- Estilos Inputs PIN ---
  pinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 40,
  },
  pinBox: {
    width: 60,
    height: 80,
    backgroundColor: "#161b22", // Gris muy oscuro
    borderWidth: 1,
    borderColor: "#30363d", // Borde sutil
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  pinInputText: {
    color: "#ffffff",
    fontSize: 32,
    textAlign: "center",
    width: "100%",
    height: "100%",
    fontFamily: "Inter",
  },
  fingerprintText: {
    color: "#00bcd4",
    fontSize: 14,
    marginBottom: 30,
    fontFamily: "Inter",
  },
  fingerprintIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
