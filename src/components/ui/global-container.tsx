import { StatusBar, View, StyleSheet, LayoutChangeEvent } from "react-native";
import {
  useSafeAreaInsets,
  SafeAreaView,
} from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";
import useTheme from "../../hooks/useTheme";
import { useState, useCallback } from "react";
import { BlurView } from "expo-blur";

cssInterop(SafeAreaView, {
  className: "style",
});

interface GlobalContainerProps {
  children: React.ReactNode;
  /** Elemento header (e.g. TitleCustom) que se renderiza flotante con efecto fade */
  header?: React.ReactNode;
}

/**
 * GlobalContainer
 *
 * Contenedor raíz de cada pantalla. Cuando se pasa un `header`, este se renderiza
 * flotante en la parte superior con un degradado de desvanecimiento (efecto niebla) debajo.
 * El contenido scrolleable que pasa por debajo se desvanece suavemente antes de llegar al título.
 */
export default function GlobalContainer({
  children,
  header,
}: GlobalContainerProps) {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [headerHeight, setHeaderHeight] = useState(0);

  const bgColor = isDark ? "#09090b" : "#E5E8EF";

  // Degradado de desvanecimiento: sólido arriba -> semitransparente -> transparente abajo
  const fadeColors = isDark
    ? [
        "#09090b",
        "#09090b",
        "rgba(9, 9, 11, 0.85)",
        "rgba(9, 9, 11, 0.4)",
        "rgba(9, 9, 11, 0)",
      ]
    : [
        "#E5E8EF",
        "#E5E8EF",
        "rgba(229, 232, 239, 0.85)",
        "rgba(229, 232, 239, 0.4)",
        "rgba(229, 232, 239, 0)",
      ];

  const onHeaderLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { height } = event.nativeEvent.layout;
      if (height > 0 && height !== headerHeight) {
        setHeaderHeight(height);
      }
    },
    [headerHeight],
  );

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className={`flex-1 ${isDark ? "bg-zinc-950" : "bg-bgAppLight"}`}
    >
      <View
        className={`flex-1 items-stretch justify-start px-5 `}
        style={{
          paddingBottom: insets.bottom + 48,
          paddingTop: insets.top - 10,
        }}
      >
        {header ? (
          <>
            {/* Espaciador para que el contenido comience justo debajo del header */}
            <View
              style={{
                height: headerHeight + 15,
                backgroundColor: "transparent",
              }}
            />

            {/* Contenido scrolleable */}
            {children}

            {/* Header flotante con fondo degradado para desvanecer el scroll */}
            <View
              // className="bg-red-500"
              style={[
                styles.headerOverlay,
                { top: 15, paddingTop: Math.max(insets.top - 25, 0) },
              ]}
              pointerEvents="box-none"
            >
              {/* Fondo del header con color sólido */}
              {/* <BlurView
                blurMethod="dimezisBlurView"
                intensity={100}
                tint={
                  isDark
                    ? "systemThickMaterialDark"
                    : "systemThickMaterialLight"
                }
                style={{
                  width: "100%",
                  height: "50%",
                  position: "absolute",
                  zIndex: 999,
                }}
              /> */}
              <View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    backgroundColor: bgColor,
                    bottom: 0,
                  },
                ]}
              />

              {/* El contenido real del header */}
              <View
                onLayout={onHeaderLayout}
                pointerEvents="auto"
                //className="bg-red-500"
              >
                {header}
              </View>
              {/* Gradiente de desvanecimiento suave (efecto niebla) debajo del header */}
              {/* <LinearGradient
                colors={fadeColors as [string, string, ...string[]]}
                locations={[0, 0.25, 0.5, 0.75, 1]}
                style={styles.fadeGradient}
                pointerEvents="none"
              /> */}
            </View>
          </>
        ) : (
          /* Modo legacy: sin header flotante */
          children
        )}
      </View>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={bgColor}
        translucent={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
  },
  fadeGradient: {
    height: 32, // Altura del área de desvanecimiento suave
    position: "absolute",
    bottom: -32,
    left: 0,
    right: 0,
  },
});
