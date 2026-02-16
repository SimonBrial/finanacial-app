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

type typeBadge = "filled" | "bordered" | "ghost";

export type { typeBadge, IconLibrary };
