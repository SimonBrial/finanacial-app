import { StatusBar, StyleSheet, View } from "react-native";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import useTheme from "../../hooks/useTheme";

export default function GlobalContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();
  const { globalStyles, isDark } = useTheme();

  const containerStyles = StyleSheet.flatten({
    paddingTop: insets.top,
    ...styles.containerGlobal,
    backgroundColor: globalStyles.background,
  });

  return (
    <View style={{ flex: 1, backgroundColor: globalStyles.background }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={containerStyles}>{children}</View>
        <StatusBar
          barStyle={isDark ? "light-content" : "dark-content"}
          backgroundColor={globalStyles.background}
          translucent={false}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerGlobal: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
  },
});
