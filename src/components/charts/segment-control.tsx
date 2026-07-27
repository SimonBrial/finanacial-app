/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import useTheme from "../../hooks/useTheme";
import { View, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { SegmentedControlProps } from "../../types/interface";
import { Text } from "../ui/text";

const SegmentedControl = React.memo(function SegmentedControl({
  selectedTextClassName,
  containerClassName,
  indicatorClassName,
  selectedTextStyle,
  duration = 150,
  containerStyle,
  indicatorStyle,
  textClassName,
  selectedIndex,
  className,
  textStyle,
  onChange,
  options,
}: SegmentedControlProps) {
  const { isDark } = useTheme();
  const [containerWidth, setContainerWidth] = useState(0);
  const widthShared = useSharedValue(0);
  const thumbPosition = useSharedValue(0);

  const numOptions = Math.max(1, options.length);

  // Animación del indicador al cambiar la opción seleccionada o el ancho
  useEffect(() => {
    if (containerWidth > 0) {
      widthShared.value = containerWidth;
      const availableWidth = Math.max(0, containerWidth - 15);
      const segmentWidth = availableWidth / numOptions;
      const targetX = selectedIndex * segmentWidth;

      thumbPosition.value = withTiming(targetX, {
        duration,
        easing: Easing.out(Easing.quad),
      });
    }
  }, [selectedIndex, containerWidth, numOptions, duration]);

  // Estilo animado para ancho y posición (translateX) del indicador
  const animatedThumbStyle = useAnimatedStyle(() => {
    const availableWidth = Math.max(0, widthShared.value - 10);
    const segmentWidth = availableWidth / numOptions;

    return {
      width: segmentWidth,
      transform: [{ translateX: thumbPosition.value }],
    };
  }, [numOptions]);

  // Estilos del contenedor (Track)
  const defaultContainerBg = isDark ? "bg-slate-800/20" : "bg-slate-200";
  const baseContainerClass = `flex-row w-full h-12 relative overflow-hidden px-2 py-1 border border-transparent rounded-full ${defaultContainerBg}`;
  const finalContainerClass = `${baseContainerClass} ${containerClassName || className || ""}`;

  // Estilos del indicador animado (Thumb)
  const defaultIndicatorBg = isDark
    ? "bg-slate-700 border border-slate-600"
    : "bg-white border border-slate-200";
  const baseIndicatorClass = "absolute h-full top-1 left-2 rounded-full";
  const finalIndicatorClass = `${baseIndicatorClass} ${indicatorClassName ? indicatorClassName : defaultIndicatorBg}`;

  return (
    <View
      className={finalContainerClass}
      style={containerStyle}
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        if (w !== containerWidth) {
          setContainerWidth(w);
        }
      }}
    >
      {/* Indicador animado (Fondo de la opción seleccionada) */}
      <Animated.View
        className={finalIndicatorClass}
        style={[animatedThumbStyle, indicatorStyle]}
      />

      {/* Opciones clickables */}
      {options.map((option: string, index: number) => {
        const isSelected = selectedIndex === index;

        return (
          <Pressable
            key={option}
            className="flex-1 justify-center items-center z-10"
            onPress={() => onChange(index)}
          >
            <Text
              variant="p"
              className={`my-0 ${
                isSelected
                  ? selectedTextClassName ||
                    (isDark
                      ? "text-white font-semibold"
                      : "text-slate-900 font-semibold")
                  : textClassName || "text-slate-400 font-normal"
              }`}
              style={isSelected ? selectedTextStyle : textStyle}
            >
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
});

export default SegmentedControl;
