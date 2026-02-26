import React, { useMemo } from "react";
import { StyleSheet, ViewStyle, TextStyle, View } from "react-native";
import Typography from "./typography";
import useTheme from "../../hook/useTheme";
import Icon from "./icon";
import { BadgeProps } from "../../interface/interface";
import { BasesSize, PrimitiveVariants } from "../../types/type";

const DEFAULT_COLOR = "#006dff";

export default function Badge({
  text,
  color = DEFAULT_COLOR,
  type = "bordered",
  size = "sm",
  iconLeft,
  iconRight,
  library = "MaterialCommunityIcons",
  fullWidth = false,
  containerStyle,
}: BadgeProps) {
  const { sizes } = useTheme();

  const themedStyles = useMemo(() => {
    const isFilled = type === "filled";
    const contentColor = isFilled ? "#FFFFFF" : color;

    const variantStyles: Record<PrimitiveVariants, ViewStyle> = {
      filled: { backgroundColor: color, borderWidth: 0 },
      light: { backgroundColor: "transparent", borderWidth: 0 },
      bordered: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: color,
      },
      ghost: {
        backgroundColor: `${color}25`,
        borderWidth: 1,
        borderColor: color,
      },
      flat: {
        backgroundColor: `${color}25`,
        //borderWidth: 1,
        //borderColor: color,
      },
    };

    const sizeStyles: Record<BasesSize, ViewStyle> = {
      sm: { height: 16, paddingHorizontal: 10 },
      md: { height: 20, paddingHorizontal: 12 },
      lg: { height: 22, paddingHorizontal: 14 },
    };
    const sizeText: Record<BasesSize, TextStyle> = {
      sm: { fontSize: sizes.xs },
      md: { fontSize: sizes.sm },
      lg: { fontSize: sizes.md },
    };
    const sizeIcon: Record<BasesSize, TextStyle> = {
      sm: { fontSize: sizes.sm },
      md: { fontSize: sizes.md },
      lg: { fontSize: sizes.lg },
    };

    // 1. Calculamos el estilo del contenedor
    const containerStyleObj: ViewStyle = StyleSheet.flatten([
      styles.defaultStyles,
      variantStyles[type as PrimitiveVariants],
      sizeStyles[size as BasesSize],
      sizeText[size as BasesSize],
      sizeIcon[size as BasesSize],
      fullWidth && { width: "100%", alignSelf: "auto" as const },
      containerStyle,
    ]) as ViewStyle;

    // 2. Retornamos el objeto con sus propiedades bien definidas
    return {
      container: containerStyleObj,
      textStyle: {
        color: contentColor,
        textAlign: "center",
        fontSize: sizeText[size as BasesSize]?.fontSize,
      } as TextStyle,
      iconColor: contentColor,
      sizeText: sizeText[size as BasesSize],
      sizeIcon: sizeIcon[size as BasesSize],
    };
  }, [type, size, color, fullWidth, containerStyle, sizes]);

  return (
    <View style={themedStyles.container}>
      {iconLeft && (
        <Icon
          variant="light"
          name={iconLeft}
          library={library}
          color={themedStyles.iconColor}
          size={themedStyles.sizeIcon.fontSize}
        />
      )}

      <Typography
        bold
        fontSize={themedStyles.sizeText.fontSize}
        customStyles={themedStyles.textStyle}
      >
        {text}
      </Typography>

      {iconRight && (
        <Icon
          variant="light"
          name={iconRight}
          library={library}
          color={themedStyles.iconColor}
          size={themedStyles.sizeIcon.fontSize}
        />
      )}
    </View>
  );
}

// 3. Estilos base estáticos
const styles = StyleSheet.create({
  defaultStyles: {
    //width: 20,
    flexDirection: "row", // Asegura alineación horizontal de iconos y texto
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1000,
    gap: 6, // Espaciado automático entre iconos y texto (RN 0.71+)
    alignSelf: "flex-start",
  },
});
