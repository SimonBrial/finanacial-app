import { createContext } from "react";
import {
  globalStyles,
  inProgress,
  complete,
  danger,
  theme,
  sizes,
} from "./styles-base";
import { ThemeContextProps } from "../../interface/interface";

const ThemeContext = createContext<ThemeContextProps>({
  globalStyles,
  inProgress,
  complete,
  danger,
  theme,
  sizes,
});

export default ThemeContext;
