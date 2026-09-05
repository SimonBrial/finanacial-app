import { useRef } from "react";
import { useWindowDimensions, View } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import BankCard from "./bank-card";
import { useBankStore } from "../stores/useBankStore";
import {
  useSharedValue,
  Extrapolation,
  interpolate,
} from "react-native-reanimated";
import useTheme from "../hooks/useTheme";
import { BankCardData } from "../types/interface";

export default function CarouselCardBank() {
  const progress = useSharedValue<number>(0);
  const { isDark } = useTheme();
  const { banks } = useBankStore();

  const { width: windowWidth } = useWindowDimensions();

  // --- 1. MATEMÁTICA DEL LEFT-ALIGN ---
  const MARGIN_LEFT = 0; // Margen inicial desde el borde de la pantalla
  const GAP = 12; // Espaciado entre tarjetas
  // Usamos el 85% de la pantalla para que la tarjeta siguiente se "asome" un 15%
  const ITEM_WIDTH = windowWidth * 0.94;
  // La distancia que debe saltar el carrusel en cada swipe (Tarjeta + Espacio)
  const SNAP_DISTANCE = ITEM_WIDTH + GAP;
  // Mantenemos tu proporción original
  const DYNAMIC_HEIGHT = ITEM_WIDTH * 0.65;

  const ref = useRef<ICarouselInstance>(null);
  return (
    <View testID="carousel-component" className="mb-5 flex-1">
      <Carousel
        ref={ref}
        autoPlayInterval={2000}
        data={banks}
        // loop={false} // Opcional: El 'left-align' suele sentirse más natural en false, pero true también funciona.
        loop={true}
        pagingEnabled={true} // Desactivamos el paging estándar
        snapEnabled={true}
        // 2. El contenedor ocupa toda la pantalla, pero el "salto" usa nuestro SNAP_DISTANCE
        style={{ width: windowWidth, height: DYNAMIC_HEIGHT }}
        width={SNAP_DISTANCE}
        height={DYNAMIC_HEIGHT}
        // 3. Eliminamos el mode="horizontal-stack" y usamos customAnimation
        customAnimation={(value: number) => {
          "worklet";
          // value: 0 es la tarjeta actual, 1 es la siguiente, -1 es la anterior.
          // Traducimos cada tarjeta a su posición en X exacta.
          return {
            transform: [
              {
                translateX: value * SNAP_DISTANCE + MARGIN_LEFT,
              },
            ],
          };
        }}
        onProgressChange={(_, absoluteProgress) => {
          progress.value = absoluteProgress;
        }}
        renderItem={({ item }: { item: BankCardData }) => (
          <BankCard
            bankName={item.bankName}
            gradientColors={item.gradientColors}
            balance={item.balance}
            currency={item.currency}
            lastEntry={item.lastEntry}
            percentage={item.percentage}
            trendIcon={item.trendIcon}
          />
        )}
      />
      <Pagination.Custom<BankCardData>
        progress={progress}
        data={banks}
        size={6} // Aumentamos un poco el tamaño base de la celda
        containerStyle={{
          gap: 8, // Espaciado entre los puntos
          marginTop: -10,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
        }}
        renderItem={() => (
          <View
            className={`h-2 w-2 rounded-full ${isDark ? "bg-white" : "bg-slate-400"}`}
          />
        )}
        horizontal
        customReanimatedStyle={(progress, index, length) => {
          let val = Math.abs(progress - index);
          if (index === 0 && progress > length - 1) {
            val = Math.abs(progress - length);
          }

          // El ancho activo es mucho mayor para crear el efecto de "píldora"
          const width = interpolate(
            val,
            [0, 1],
            [45, 6], // 45px cuando está activo (línea), 8px cuando no (punto)
            Extrapolation.CLAMP,
          );

          // Opacidad: 1 cuando está activo, 0.4 cuando no
          const opacity = interpolate(
            val,
            [0, 1],
            [1, 0.4],
            Extrapolation.CLAMP,
          );

          return {
            width,
            opacity,
            backgroundColor: isDark ? "#ffffff" : "#94a3b8",
            borderRadius: 1000,
            shadowColor: "#ffffff",
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: val < 0.1 ? 0.5 : 0,
            shadowRadius: 5,
            elevation: val < 0.1 ? 5 : 0,
          };
        }}
      />
    </View>
  );
}
