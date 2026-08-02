import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  FontAwesome6,
  FontAwesome,
  AntDesign,
  Ionicons,
  Feather,
} from "@expo/vector-icons";

export const IconLibraries = {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  FontAwesome6,
  FontAwesome,
  AntDesign,
  Ionicons,
  Feather,
};

type IconLibrary = keyof typeof IconLibraries;

type PrimitiveVariants =
  | "filled"
  | "bordered"
  | "ghost"
  | "light"
  | "flat"
  | "glow"
  | "gradient";

type BasesSize = "sm" | "md" | "lg";

type FilterKey = "Week" | "Month" | "Year";

type IconVariant = "solid" | "bordered" | "ghost" | "light";

type BankNameTypes =
  | "payoneer"
  | "banesco"
  | "mercantil"
  | "bdv"
  | "provincial"
  | "paypal";

type GoalStatus = "Completed" | "In Progress" | "New";

export type {
  PrimitiveVariants,
  BankNameTypes,
  IconLibrary,
  IconVariant,
  GoalStatus,
  BasesSize,
  FilterKey,
};
