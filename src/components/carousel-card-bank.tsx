import * as React from "react";
import { useWindowDimensions, View } from "react-native";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel, { Pagination } from "react-native-reanimated-carousel";
import BankCard from "./bank-card";
import { balanceCards } from "../seeds/seeds";
import {
  interpolate,
  Extrapolation,
  useSharedValue,
} from "react-native-reanimated";

export default function CarouselCardBank() {
  const progress = useSharedValue<number>(0);

  const { width: windowWidth } = useWindowDimensions();

  // 2. Calculamos el 80% del ancho
  const DYNAMIC_WIDTH = windowWidth * 0.9;
  // Mantenemos la proporción de la tarjeta (ejemplo 1.6:1)
  const DYNAMIC_HEIGHT = DYNAMIC_WIDTH * 0.65;

  const ref = React.useRef<ICarouselInstance>(null);
  return (
    <View id="carousel-component">
      <Carousel
        ref={ref}
        autoPlayInterval={2000}
        data={balanceCards}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        style={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
        width={DYNAMIC_WIDTH}
        height={DYNAMIC_HEIGHT}
        mode={"horizontal-stack"}
        modeConfig={{
          snapDirection: "left",
          stackInterval: 18,
        }}
        customConfig={() => ({ type: "positive", viewCount: 5 })}
        onProgressChange={(_, absoluteProgress) => {
          progress.value = absoluteProgress;
        }}
        renderItem={({ item }: any) => (
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
      <Pagination.Custom<{ color: string }>
        progress={progress}
        data={balanceCards}
        size={6} // Aumentamos un poco el tamaño base de la celda
        containerStyle={{
          gap: 8, // Espaciado entre los puntos
          marginTop: 20,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "transparent",
          }}
        renderItem={() => (
          <View
            style={{
              backgroundColor: "#fffff", // Color base inactivo (un poco transparente)
              height: 6, // Grosor de la línea/punto
              width: 6, // Ancho base (se sobreescribe por customReanimatedStyle)
              borderRadius: 1000, // Para que sea redondo
            }}
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
            backgroundColor: "#ffffff",
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
