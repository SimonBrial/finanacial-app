import React, { createContext, useMemo, useState } from "react";
import { ThemeContextProps } from "../../types/interface";

const sizes: Record<string, number> = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 28,
  xxxl: 32,
};

const commonColors = {
  inProgress: {
    p100: "#FFBF00",
    p80: "#FFBF00CC",
    p60: "#FFBF0099",
    p40: "#FFBF0066",
    p20: "#FFBF0033",
  },
  complete: {
    c100: "#17C964",
    c80: "#17C964CC",
    c60: "#17C96499",
    c40: "#17C96466",
    c20: "#17C96433",
  },
  danger: {
    d100: "#F31260",
    d80: "#F31260CC",
    d60: "#F3126099",
    d40: "#F3126066",
    d20: "#F3126033",
  },
};

const darkPalette = {
  ...commonColors,
  theme: {
    t100: "#006DFF",
    t80: "#006DFFCC",
    t60: "#006DFF99",
    t40: "#006DFF66",
    t20: "#006DFF33",
  },
  globalStyles: {
    background: "#000000ff",
    backgroundSecondary: "#1B1A1F",
    text: "#FFFFFF",
    textSecondary: "#d4d4d4ff",
    border: "#313035",
    borderInput: "#f2f2f2",
    // Compatibility
    borderContainer: "#313035",
    subtitle: "#747474",
    bgContainerStart: "#100F14",
    bgContainerEnd: "#1B1A1F",
    buttonDisabled: "#333333",
    buttonDisabledText: "#A0A0A0",
    ButtonCustomDisabled: "#333333",
    ButtonCustomDisabledText: "#A0A0A0",
  },
};

const lightPalette = {
  ...commonColors,
  theme: {
    t100: "#0056D2",
    t80: "#0056D2CC",
    t60: "#0056D299",
    t40: "#0056D266",
    t20: "#0056D233",
  },
  globalStyles: {
    background: "#FFFFFF",
    backgroundSecondary: "#F8F9FA",
    text: "#1A1A1E",
    textSecondary: "#4B5563",
    border: "#D1D5DB",
    borderInput: "#1A1A1E",
    // Compatibility
    borderContainer: "#D1D5DB",
    subtitle: "#4B5563",
    bgContainerStart: "#FFFFFF",
    bgContainerEnd: "#F8F9FA",
    buttonDisabled: "#E0E0E0",
    buttonDisabledText: "#9CA3AF",
    ButtonCustomDisabled: "#E0E0E0",
    ButtonCustomDisabledText: "#9CA3AF",
  },
};

// Creacion del contexto
export const ThemeContext = createContext<ThemeContextProps>({
  ...darkPalette,
  sizes,
  isDark: true,
  toggleTheme: () => {},
});

// Para consumir el contexto en la app
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const themeContextValue = useMemo(
    () => ({
      ...(isDark ? darkPalette : lightPalette),
      sizes,
      isDark,
      toggleTheme,
    }),
    [isDark],
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
