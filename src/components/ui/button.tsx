/* eslint-disable react-hooks/exhaustive-deps */
import {
  TouchableOpacity,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { ButtonProps } from "../../interface/interface";
import { useMemo } from "react";
import { PrimitiveVariants } from "../../types/type";
import useTheme from "../../hook/useTheme";
import Icon from "./icon";
import Typography from "./typography";

export default function Button({
  text,
  color = "#006dff",
  type = "filled",
  size = "md",
  iconLeft,
  iconRight,
  fullWidth = false,
  library = "MaterialCommunityIcons",
  containerStyle,
  customColorText,
  onPress,
  disabled = false,
  isActive = false,
  padding,
}: ButtonProps) {
  const { sizes, globalStyles } = useTheme();

  const themedStyles = useMemo(() => {
    const currentType = isActive ? "filled" : type;
    const isFilled = currentType === "filled";

    const activeColor = disabled ? globalStyles.buttonDisabled : color;
    const contentColor = isFilled
      ? disabled
        ? globalStyles.buttonDisabledText
        : "#FFFFFF"
      : disabled
      ? globalStyles.buttonDisabledText
      : activeColor;

    // Ajuste de las variantes según el diseño
    const variantStyles: Record<PrimitiveVariants, ViewStyle> = {
      filled: {
        backgroundColor: disabled ? globalStyles.buttonDisabled : color,
        borderWidth: 0,
      },
      light: { backgroundColor: "transparent", borderWidth: 0 },
      bordered: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: activeColor,
      },
      ghost: {
        backgroundColor: disabled ? globalStyles.buttonDisabled : `${color}25`,
        borderWidth: 0,
      },
      flat: {},
    };

    // Añadido tamaño 'xs' para casos muy pequeños
    const sizeStyles: Record<string, ViewStyle> = {
      xs: { height: 28, paddingHorizontal: 12, borderRadius: 6 },
      sm: { height: 36, paddingHorizontal: 16, borderRadius: 8 },
      md: { height: 44, paddingHorizontal: 24, borderRadius: 8 },
      lg: { height: 52, paddingHorizontal: 32, borderRadius: 10 },
    };

    const sizeText: Record<string, TextStyle> = {
      xs: { fontSize: sizes.sm }, // Ligeramente más pequeño que sm
      sm: { fontSize: sizes.sm },
      md: { fontSize: sizes.md },
      lg: { fontSize: sizes.lg },
    };

    // 1. Calculamos el estilo del contenedor
    const containerStyleObj = StyleSheet.flatten([
      styles.defaultStyles,
      variantStyles[currentType as PrimitiveVariants], // Usamos currentType aquí
      sizeStyles[size as string],
      fullWidth && { width: "100%", alignSelf: "auto" as const },
      // Solo aplicamos sombra a la variante 'filled' (o 'ghost' si se desea elevación)
      // Los botones 'light', 'bordered' y 'flat' suelen ser planos por diseño
      isFilled && {
        shadowColor: color,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
      },
      padding !== undefined && { paddingHorizontal: padding }, // Control manual del padding
      containerStyle,
    ]) as ViewStyle;

    // 2. Retornamos el objeto con sus propiedades bien definidas
    return {
      container: containerStyleObj,
      textStyle: {
        color: customColorText?.color || contentColor,
        textAlign: "center",
        fontSize: sizeText[size as string]?.fontSize,
      } as TextStyle,
      iconColor: customColorText?.color || contentColor,
      sizeIcon: sizeText[size as string],
    };
  }, [
    customColorText,
    containerStyle,
    fullWidth,
    disabled,
    color,
    sizes,
    size,
    type,
    isActive,
    library,
    padding,
  ]);

  // HitSlop aumenta el área táctil sin cambiar el tamaño visual (ideal para el tamaño xs)
  const hitSlop =
    size === "xs" ? { top: 10, bottom: 10, left: 10, right: 10 } : undefined;

  return (
    <TouchableOpacity
      style={themedStyles.container}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7} // Da ese efecto de "click" de las librerías web
      hitSlop={hitSlop}
    >
      {iconLeft && (
        <Icon
          variant="light"
          name={iconLeft}
          library={library}
          color={
            typeof themedStyles.iconColor === "string"
              ? themedStyles.iconColor
              : "#FFFFFF"
          }
          size={themedStyles.sizeIcon.fontSize}
        />
      )}

      {/* Asumiendo que Typography usa la fuente Inter que configuraste */}
      {text && (
        <Typography
          fontSize={themedStyles.sizeIcon.fontSize}
          customStyles={themedStyles.textStyle}
        >
          {text}
        </Typography>
      )}

      {iconRight && (
        <Icon
          variant="light"
          name={iconRight}
          library={library}
          color={
            typeof themedStyles.iconColor === "string"
              ? themedStyles.iconColor
              : "#FFFFFF"
          }
          size={themedStyles.sizeIcon.fontSize}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  defaultStyles: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    alignSelf: "flex-start",
  },
});
