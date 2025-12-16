import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function GlobalContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();
  const globalStyles = StyleSheet.flatten({
    paddingTop: insets.top,
    //paddingBottom: insets.bottom,
    ...styles.containerGlobal,
  });
  return (
    <ScrollView style={{ backgroundColor: "#1A1A1A" }}>
      <SafeAreaView>
        <View style={globalStyles}>{children}</View>
        <StatusBar
          barStyle={"light-content"}
          backgroundColor={"#1a1a1a"}
          translucent={false}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerGlobal: {
    flex: 1,
    backgroundColor: "#1A1A1A",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 8,
    paddingBottom: 80,
  },
});
