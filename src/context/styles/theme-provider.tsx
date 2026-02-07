import ThemeContext from "./theme-context";
import {
  globalStyles,
  inProgress,
  complete,
  danger,
  theme,
  sizes,
} from "./styles-base";

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
