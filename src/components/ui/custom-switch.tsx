import React from "react";
import { Switch, Platform, StyleSheet } from "react-native";
import useTheme from "@/hooks/useTheme";

interface CustomSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

/**
 * CustomSwitch
 *
 * Componente Switch nativo de React Native optimizado para transiciones de tema.
 * Ejecuta la animación del botón directamente en el hilo nativo de la interfaz de usuario (UI Thread),
 * evitando tirones o congelamientos al cambiar temas globales.
 */
export function CustomSwitch({
  checked,
  onCheckedChange,
  disabled = false,
}: CustomSwitchProps) {
  const { theme, globalStyles, isDark } = useTheme();

  return (
    <Switch
      value={checked}
      onValueChange={onCheckedChange}
      disabled={disabled}
      trackColor={{
        false: isDark ? "#3F3F46" : "#E4E4E7",
        true: theme.t100,
      }}
      thumbColor="#FFFFFF"
      ios_backgroundColor={isDark ? "#3F3F46" : "#E4E4E7"}
      style={Platform.OS === "ios" ? styles.iosSwitch : styles.androidSwitch}
    />
  );
}

const styles = StyleSheet.create({
  iosSwitch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  androidSwitch: {},
});

export default CustomSwitch;
