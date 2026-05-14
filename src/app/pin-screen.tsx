import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  Text,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import { useRouter } from "expo-router";

export default function PinScreen() {
  // 2. Lógica del PIN -> Al completar, viaja a /home

  const router = useRouter(); // Inicializamos el hook

  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const pinRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handlePinChange = (text: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = text;
    setPin(newPin);

    if (text.length === 1 && index < 3) {
      pinRefs[index + 1].current?.focus();
    }

    // Si llenó el último cuadro numérico, navegamos al Home
    if (text.length === 1 && index === 3) {
      // Limpiamos el PIN por si el usuario regresa
      setPin(["", "", "", ""]);
      // Navegación con Expo Router
      router.push("/home");
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (e.nativeEvent.key === "Backspace" && pin[index] === "" && index > 0) {
      pinRefs[index - 1].current?.focus();
    }
  }; // <-- Add this closing brace to properly end the function

  return (
    <View style={styles.formContainer}>
      <View style={styles.pinContainer}>
        {pin.map((digit, index) => (
          <View key={index} style={styles.pinBox}>
            <TextInput
              ref={pinRefs[index]}
              style={styles.pinInputText}
              maxLength={1}
              keyboardType="numeric"
              value={digit}
              onChangeText={(text) => handlePinChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          </View>
        ))}
      </View>

      <Text style={styles.fingerprintText}>Use the finger if you want</Text>

      <TouchableOpacity>
        <View style={styles.fingerprintIconContainer}>
          <Ionicons name="finger-print-outline" size={32} color="#00bcd4" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d1117", // Color de fondo oscuro sólido
    justifyContent: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: "center",
    zIndex: 10,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  logoWrapper: {
    flexDirection: "row",
    alignItems: "baseline",
    position: "relative",
  },
  logoText: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#ffffff",
    fontFamily: "Inter",
  },
  logoTextE: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#ffffff",
    marginLeft: -5,
    fontFamily: "Inter",
  },
  logoDot: {
    width: 8,
    height: 8,
    backgroundColor: "#ffffff",
    position: "absolute",
    top: 15,
    right: -10,
  },
  logoUnderline: {
    width: 100,
    height: 4,
    backgroundColor: "#ffffff",
    marginTop: 5,
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
    width: "100%",
    marginBottom: 30,
    paddingHorizontal: 10,
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
