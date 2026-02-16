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
  t100: "#006DFF",
  t80: "#006DFFCC",
  t60: "#006DFF99",
  t40: "#006DFF66",
  t20: "#006DFF33",
};

const inProgress: Record<string, string> = {
  p100: "#FFBF00",
  p80: "#FFBF00CC",
  p60: "#FFBF0099",
  p40: "#FFBF0066",
  p20: "#FFBF0033",
};
const complete: Record<string, string> = {
  c100: "#17C964",
  c80: "#17C964CC",
  c60: "#17C96499",
  c40: "#17C96466",
  c20: "#17C96433",
};
const danger: Record<string, string> = {
  d100: "#F31260",
  d80: "#F31260CC",
  d60: "#F3126099",
  d40: "#F3126066",
  d20: "#F3126033",
};

const globalStyles: Record<string, string> = {
  borderContainer: "#313035",
  subtitle: "#747474",
  bgContainerStart: "#100F14",
  bgContainerEnd: "#1B1A1F",
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
