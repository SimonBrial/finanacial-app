import { useContext } from "react";
import ThemeContext from "../context/styles/theme-context";

export default function useTheme() {
  const context = useContext(ThemeContext);

  return {
    globalStyles: context.globalStyles,
    inProgress: context.inProgress,
    complete: context.complete,
    danger: context.danger,
    theme: context.theme,
    sizes: context.sizes,
  };
}
