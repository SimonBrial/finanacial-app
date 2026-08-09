/**
 * TabHeaderNavigation
 *
 * Componente de navegación con pestañas superiores (top tabs) para la
 * sección de transacciones. Muestra 3 vistas: Insight, Records, Categories.
 *
 * Anteriormente usaba createMaterialTopTabNavigator de
 * @react-navigation/material-top-tabs. Ahora usa una implementación
 * personalizada con estado local y animaciones con Reanimated,
 * sin dependencias externas de navegación.
 *
 * Si en el futuro se necesita swipe entre tabs, se puede agregar
 * react-native-pager-view.
 */
import { useState, useCallback } from "react";
import { View, Pressable, StyleSheet, LayoutChangeEvent } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";
import Categories from "./categories";
import Records from "./records";
import Insight from "./insight";
import useTheme from "../../../hooks/useTheme";

/** Definición de cada tab: clave única, nombre visible, y componente a renderizar */
const TABS = [
  { key: "insight", title: "Insight", component: Insight },
  { key: "records", title: "Records", component: Records },
  { key: "categories", title: "Categories", component: Categories },
] as const;

/**
 * TabIndicator
 * Barra animada que se desliza bajo la pestaña activa.
 * Usa valores en píxeles (no porcentajes) para compatibilidad con Reanimated.
 */
function TabIndicator({
  activeIndex,
  tabCount,
  containerWidth,
}: {
  activeIndex: SharedValue<number>;
  tabCount: number;
  containerWidth: number;
}) {
  /** Ancho de cada tab en píxeles */
  const tabWidth = containerWidth / tabCount;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        /** Desplaza el indicador según la pestaña activa (en píxeles) */
        translateX: interpolate(
          activeIndex.value,
          TABS.map((_, i) => i),
          TABS.map((_, i) => i * tabWidth),
        ),
      },
    ],
    /** Ancho del indicador = ancho de una pestaña */
    width: tabWidth,
  }));

  return (
    <View style={styles.indicatorContainer}>
      <Animated.View style={[styles.indicator, animatedStyle]} />
    </View>
  );
}

export default function TabHeaderNavigation() {
  const { sizes } = useTheme();
  /** Índice de la pestaña actualmente seleccionada */
  const [selectedIndex, setSelectedIndex] = useState(0);
  /** Ancho del contenedor de tabs en píxeles (medido dinámicamente) */
  const [containerWidth, setContainerWidth] = useState(0);
  /** Valor animado para transiciones suaves del indicador */
  const animatedIndex = useSharedValue(0);

  /** Cambia la pestaña activa con animación */
  const handleTabPress = (index: number) => {
    setSelectedIndex(index);
    animatedIndex.value = withTiming(index, { duration: 250 });
  };

  /** Mide el ancho real del contenedor de tabs para calcular posiciones en px */
  const onTabBarLayout = useCallback((event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  }, []);

  /** Componente de la pestaña activa */
  const ActiveComponent = TABS[selectedIndex].component;

  return (
    <View style={{ flex: 1 }}>
      {/* Contenedor de la barra de tabs + indicador */}
      <View
        style={{ paddingTop: sizes.md, marginBottom: sizes.sm }}
        onLayout={onTabBarLayout}
      >
        {/* Fila horizontal con las pestañas */}
        <View style={styles.tabBar}>
          {TABS.map((tab, index) => (
            <Pressable
              key={tab.key}
              onPress={() => handleTabPress(index)}
              style={styles.tabItem}
            >
              <Animated.Text
                style={[
                  styles.tabLabel,
                  {
                    fontSize: sizes.sm + 2,
                    color: "white",
                    opacity: selectedIndex === index ? 1 : 0.6,
                    fontWeight: selectedIndex === index ? "600" : "400",
                  },
                ]}
              >
                {tab.title}
              </Animated.Text>
            </Pressable>
          ))}
        </View>

        {/* Indicador animado — separado de la fila de tabs para no afectar el layout */}
        {containerWidth > 0 && (
          <TabIndicator
            activeIndex={animatedIndex}
            tabCount={TABS.length}
            containerWidth={containerWidth}
          />
        )}
      </View>

      {/* Contenido de la pestaña seleccionada */}
      <View style={{ flex: 1 }}>
        <ActiveComponent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /** Fila horizontal de pestañas */
  tabBar: {
    flexDirection: "row",
    backgroundColor: "transparent",
    width: "100%",
  },
  /** Cada pestaña ocupa espacio igual en la fila */
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  /** Texto de la pestaña */
  tabLabel: {
    textAlign: "center",
  },
  /** Contenedor del indicador — se posiciona justo debajo de la fila de tabs */
  indicatorContainer: {
    height: 3,
    width: "100%",
  },
  /** Línea indicadora animada — blanca */
  indicator: {
    height: 3,
    backgroundColor: "white",
  },
});

