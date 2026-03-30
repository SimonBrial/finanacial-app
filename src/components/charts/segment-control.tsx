/* eslint-disable react-hooks/exhaustive-deps */
import useTheme from "../../hook/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Typography from "../ui/typography";
import { SegmentedControlProps } from "../../interface/interface";

export default function SegmentedControl({
  selectedIndex,
  onChange,
  options,
}: SegmentedControlProps) {
  const { sizes, globalStyles, theme } = useTheme();
  const width = useSharedValue(0);
  const thumbPosition = useSharedValue(0);

  // Animamos la posición cuando cambia el índice seleccionado o el ancho
  useEffect(() => {
    thumbPosition.value = withTiming(
      selectedIndex === 0 ? 0 : width.value / 2 - 8,
      { duration: 300 },
    );
  }, [selectedIndex, width.value]);

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: thumbPosition.value }],
  }));

  return (
    <View
      style={[switchStyles.track, { borderRadius: sizes.xs }]}
      onLayout={(e) => {
        width.value = e.nativeEvent.layout.width;
      }}
    >
      {/* Indicador animado (Fondo del botón seleccionado) */}
      <Animated.View style={[switchStyles.thumb, animatedThumbStyle]}>
        <LinearGradient
          colors={[globalStyles.bgContainerStart, globalStyles.bgContainerEnd]}
          style={[
            StyleSheet.absoluteFill,
            {
              borderRadius: sizes.xs,
              borderWidth: 1,
              borderColor: globalStyles.borderContainer,
            },
          ]}
          locations={[0.1, 1.0]}
          start={{ x: 0, y: 0.0 }}
          end={{ x: 1, y: 0 }}
        />
      </Animated.View>

      {/* Botones Clickables Individuales */}
      {options.map((option: string, index: number) => (
        <Pressable
          key={option}
          style={switchStyles.option}
          onPress={() => onChange(index)}
        >
          <Typography
            fontSize={sizes.md}
            bold={selectedIndex === index}
            customStyles={{
              color: selectedIndex === index ? theme.t100 : "white",
            }}
          >
            {option}
          </Typography>
        </Pressable>
      ))}
    </View>
  );
}

const switchStyles = StyleSheet.create({
  track: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    backgroundColor: "rgba(49, 48, 53, 0.2)",
    position: "relative",
    overflow: "hidden",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0)",
  },
  thumb: {
    position: "absolute",
    height: "100%",
    width: "50%",
    top: 4,
    left: 8,
  },
  option: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Asegura que el texto esté por encima del thumb animado
  },
});
