import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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

  return (
    <SafeAreaView
      className={` ${isDark ? "bg-zinc-900" : "bg-slate-100"} pt-6 flex-1`}
    >
      <View
        className={` flex-1 items-stretch justify-start px-5 ${isDark ? "bg-zinc-900" : "bg-slate-100"}`}
      >
        {children}
      </View>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#09090B" : "#F1F5F9"}
        translucent={false}
      />
    </SafeAreaView>
  );
}
