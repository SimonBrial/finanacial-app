import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  Ionicons,
  Feather,
} from "@expo/vector-icons";
import { OpaqueColorValue, StyleSheet, View } from "react-native";
import { sizes } from "../../context/styles/styles-base";

const IconLibraries = {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  Ionicons,
  Feather,
};

export type IconLibrary = keyof typeof IconLibraries;

interface IconProps {
  library?: IconLibrary;
  name?: any; //  Flexibilidad de nombres entre familias
  size?: number;
  color?: string | OpaqueColorValue;
  style?: object;
  bgStyle?: object;
}

export default function Icon({
  library = "MaterialCommunityIcons",
  color = "#ffffff",
  size = sizes.base,
  name = "home",
  bgStyle,
  style,
}: IconProps) {
  const SelectedIcon = IconLibraries[library];

  if (!SelectedIcon) {
    return null;
  }

  const iconStyles = StyleSheet.flatten([
    bgStyle,
    {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  ]);

  return (
    <View style={iconStyles}>
      <SelectedIcon
        name={name as any}
        size={size}
        color={color}
        style={style}
      />
    </View>
  );
}
