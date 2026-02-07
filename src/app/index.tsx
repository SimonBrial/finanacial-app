import { ThemeProvider } from "../context/styles/theme-provider";
import Login from "./login";

export default function App() {
  return (
    <ThemeProvider>
      <Login />
    </ThemeProvider>
  );
}
