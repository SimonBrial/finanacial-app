import { createContext } from "react";
import { ThemeContextProps } from "../../interface/interface";

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

const theme: Record<string, string> = {
  t100: "rgba(0, 109, 255, 1)",
  t80: "rgba(0, 109, 255, 0.8)",
  t60: "rgba(0, 109, 255, 0.6)",
  t40: "rgba(0, 109, 255, 0.4)",
  t20: "rgba(0, 109, 255, 0.2)",
};

const inProgress: Record<string, string> = {
  p100: "rgba(255, 191, 0, 1)",
  p80: "rgba(255, 191, 0, 0.8)",
  p60: "rgba(255, 191, 0, 0.6)",
  p40: "rgba(255, 191, 0, 0.4)",
  p20: "rgba(255, 191, 0, 0.2)",
};
const complete: Record<string, string> = {
  c100: "rgba(23, 201, 100, 1)",
  c80: "rgba(23, 201, 100, 0.8)",
  c60: "rgba(23, 201, 100, 0.6)",
  c40: "rgba(23, 201, 100, 0.4)",
  c20: "rgba(23, 201, 100, 0.2)",
};
const danger: Record<string, string> = {
  d100: "rgba(243, 18, 96, 1)",
  d80: "rgba(243, 18, 96, 0.8)",
  d60: "rgba(243, 18, 96, 0.6)",
  d40: "rgba(243, 18, 96, 0.4)",
  d20: "rgba(243, 18, 96, 0.2)",
};

const globalStyles: Record<string, string> = {
  borderContainer: "#313035",
  subtitle: "#4E4D4D",
  bgContainerStart: "#1B1A1F",
  bgContainerEnd: "#100F14",
};

// Creacion del contexto
export const ThemeContext = createContext<ThemeContextProps>({
  globalStyles,
  inProgress,
  complete,
  danger,
  theme,
  sizes,
});

// Para consumir el contexto en la app
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const themeContextValue = {
    globalStyles,
    inProgress,
    complete,
    danger,
    theme,
    sizes,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
