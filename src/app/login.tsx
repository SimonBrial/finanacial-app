
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import Typography from "../components/ui/typography";
import useTheme from "../hook/useTheme";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useState, useRef } from "react";
import { useRouter } from "expo-router";

export default function Login() {
  //const { theme, sizes } = useTheme();

  const router = useRouter(); // Inicializamos el hook
  const [currentScreen, setCurrentScreen] = useState('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [pin, setPin] = useState(['', '', '', '']);
  const pinRefs = [
    useRef<TextInput>(null), 
    useRef<TextInput>(null), 
    useRef<TextInput>(null), 
    useRef<TextInput>(null)
  ];

  // 1. Lógica del Botón Login -> Pasa a la pantalla del PIN
  const handleLogin = () => {
    if (email !== '' && password !== '') {
      setCurrentScreen('pin');
    }
  };

  // 2. Lógica del PIN -> Al completar, viaja a /home
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
      setPin(['', '', '', '']); 
      // Navegación con Expo Router
      router.push('/home'); 
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && pin[index] === '' && index > 0) {
      pinRefs[index - 1].current?.focus();
    }
  };

  // Cabecera reutilizable para ambas pantallas
  const LogoHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.logoWrapper}>
        <Text style={styles.logoText}>C</Text>
        <Text style={styles.logoTextE}>e</Text>
        <View style={styles.logoDot} />
      </View>
      <View style={styles.logoUnderline} />
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Welcome back we missed you</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      
      {/* Fondo base oscuro tipo Glassmorphism */}
      <View style={[styles.glowOrb, styles.orbTop]} />

      <View style={styles.content}>
        <LogoHeader />

        {currentScreen === 'login' ? (
          // --- PANTALLA 1: LOGIN EXACTO ---
          <View style={styles.formContainer}>
            <View style={styles.inputRow}>
              <Feather name="user" size={22} color="#ffffff" style={styles.icon} />
              <TextInput
                style={styles.inputClean}
                placeholder="User"
                placeholderTextColor="#ffffff"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputRow}>
              <Feather name="user" size={22} color="#ffffff" style={styles.icon} />
              <TextInput
                style={styles.inputClean}
                placeholder="Password"
                placeholderTextColor="#ffffff"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
              <Feather name="arrow-right" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        ) : (
          // --- PANTALLA 2: PIN EXACTO ---
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

            <TouchableOpacity>
              <Text style={styles.fingerprintText}>Use the finger if you want</Text>
            </TouchableOpacity>

            <View style={styles.fingerprintIconContainer}>
              <Ionicons name="finger-print-outline" size={32} color="#00bcd4" />
            </View>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117', // Color de fondo oscuro sólido
    justifyContent: 'center',
  },
  glowOrb: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: 'rgba(0, 109, 255, 0.15)', // Resplandor azul superior
    borderBottomLeftRadius: 400,
    borderBottomRightRadius: 400,
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
    zIndex: 10,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    position: 'relative',
  },
  logoText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#ffffff',
    fontFamily: 'Inter',
  },
  logoTextE: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: -5,
    fontFamily: 'Inter',
  },
  logoDot: {
    width: 8,
    height: 8,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 15,
    right: -10,
  },
  logoUnderline: {
    width: 100,
    height: 4,
    backgroundColor: '#ffffff',
    marginTop: 5,
    marginBottom: 50,
  },
  title: {
    fontSize: 26,
    color: '#ffffff',
    marginBottom: 10,
    fontFamily: 'Inter',
  },
  subtitle: {
    fontSize: 14,
    color: '#00bcd4', // Cyan exacto de la imagen
    fontFamily: 'Inter',
  },
  formContainer: {
    //flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  // --- Estilos Inputs Login ---
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 20,
  },
  inputClean: {
    flex: 1,
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter',
  },
  loginButton: {
    backgroundColor: '#006DFF', // Tu color base
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 55,
    borderRadius: 8,
    marginTop: 10,
    gap: 10,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter',
  },
  // --- Estilos Inputs PIN ---
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 40,
  },
  pinBox: {
    width: 60,
    height: 80,
    backgroundColor: '#161b22', // Gris muy oscuro
    borderWidth: 1,
    borderColor: '#30363d', // Borde sutil
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinInputText: {
    color: '#ffffff',
    fontSize: 32,
    textAlign: 'center',
    width: '100%',
    height: '100%',
    fontFamily: 'Inter',
  },
  fingerprintText: {
    color: '#00bcd4',
    fontSize: 14,
    marginBottom: 30,
    fontFamily: 'Inter',
  },
  fingerprintIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }, orbTop: {
    top: -100,
    left: -100,
    width: 350,
    height: 350,
    backgroundColor: "#006DFF",
  }
});

