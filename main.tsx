import App from "./app/App";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Main() {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
}
