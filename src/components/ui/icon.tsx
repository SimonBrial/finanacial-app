import { View, ViewStyle } from "react-native";
import useTheme from "../../hook/useTheme";
import { IconBase } from "../../interface/interface";
import { IconLibraries } from "../../types/type";

type IconVariant = "solid" | "bordered" | "ghost" | "light";

interface IconProps extends IconBase {
  size?: number;
  color?: string;
  style?: object;
  bgStyle?: object;
  withBg?: boolean;
  rounded?: boolean;
  variant?: IconVariant; // <-- Agregamos la prop variant
  padding?: number; // <-- Útil para darle respiro al ícono dentro del View
}

export default function Icon({
  library = "MaterialCommunityIcons",
  color, // Lo dejamos dinámico según la variante si no se pasa uno explícito
  rounded = false,
  variant = "solid", // 'ghost' suele ser un buen por defecto para íconos sueltos
  name = "home",
  size = 24,
  padding = 8,
  bgStyle,
  style,
}: IconProps) {
  const { sizes, theme } = useTheme();
  const SelectedIcon: any = IconLibraries[library];

  if (!SelectedIcon) {
    return null;
  }

  const variantStyles: Record<IconVariant, ViewStyle> = {
    light: {
      backgroundColor: "transparent",
      borderWidth: 0,
      padding: 0,
    },
    solid: {
      backgroundColor: theme.t20,
      borderWidth: 0,
    },
    bordered: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: theme.t100,
    },
    ghost: {
      backgroundColor: color ? `${color}33` : theme.t20,
      borderWidth: 0,
    },
  };

  const variantTextStyle: Record<IconVariant, string> = {
    light: color ? (color as string) : "white",
    solid: theme.t100,
    bordered: theme.t100,
    ghost: color ? color : theme.t100,
  };

  // ⚡ Bolt Performance: Pass array of style objects directly instead of using StyleSheet.flatten() to avoid deep object merging overhead on every render
  const containerStyles = [
    {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: padding,
      borderRadius: rounded ? 999 : sizes.xxs,
    },
    variantStyles[variant], // <-- Magia aquí: busca directo el estilo que le pases
    bgStyle,
  ];

  return (
    <View style={containerStyles}>
      <SelectedIcon
        name={name as any}
        size={size}
        color={variantTextStyle[variant]}
        style={style}
      />
    </View>
  );
}
