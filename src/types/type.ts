import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  Ionicons,
  Feather,
} from "@expo/vector-icons";

export const IconLibraries = {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
  Ionicons,
  Feather,
};

type IconLibrary = keyof typeof IconLibraries;

type PrimitiveVariants = "filled" | "bordered" | "ghost" | "light" | "flat";

type BasesSize = "sm" | "md" | "lg";

type FilterKey = "Week" | "Month" | "Year";

export type { PrimitiveVariants, IconLibrary, BasesSize, FilterKey };
