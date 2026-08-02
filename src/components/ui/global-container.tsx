import { StatusBar, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { cssInterop } from "nativewind";
import useTheme from "../../hooks/useTheme";

cssInterop(SafeAreaView, {
  className: "style",
});

export default function GlobalContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      // Solo aplicamos safe area arriba y a los lados desde el contenedor raíz.
      // Dejamos la parte inferior libre para que el TabBar flotante se acomode adecuadamente.
      edges={["top", "left", "right"]}
      className={`flex-1 ${isDark ? "bg-zinc-950" : "bg-bgAppLight"}`}
    >
      <View
        className={`flex-1 items-stretch justify-start px-5 ${isDark ? "bg-zinc-950" : "bg-bgAppLight"}`}
        style={{
          // Sumamos la altura del sistema (3 botones o gestos) + un margen cómodo base (ej. 16px)
          paddingBottom: insets.bottom + 48,
          paddingTop: insets.top - 10,
        }}
      >
        {children}
      </View>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#09090b" : "#E5E8EF"}
        translucent={false}
      />
    </SafeAreaView>
  );
}
