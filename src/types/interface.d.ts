import { TextStyle, ViewStyle, StyleProp } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SharedValue } from "react-native-reanimated";
import { LucideIcon } from "lucide-react-native";
import {
  PrimitiveVariants,
  BankNameTypes,
  IconLibrary,
  IconVariant,
  BasesSize,
  GoalStatus,
} from "../types/type";

import React from "react";

interface CustomBadgeProps {
  bankName: import("../types/type").BankNameTypes;
  size?: import("../types/type").BasesSize;
  width?: number;
  height?: number;
}

interface PercentIndicatorProps {
  percentage: string;
  trend: "up" | "down" | "same" | "flat";
}

interface ExchangeCardProps {
  dolarRate: number;
  exchangeName: string;
  todayDate?: Date | string;
}

interface NotificationIconProps {
  active?: boolean;
  hasNotification: boolean;
}

interface AvatarProps {
  hasNotification: boolean;
  source?: string;
  size?: string | number;
  borderWidth?: number;
  borderColor?: string;
}

interface TypographyProps {
  children: React.ReactNode;
  customStyles?: import("react-native").StyleProp<
    import("react-native").TextStyle
  >;
  fontSize?: number;
  variant?: "Regular" | "Medium" | "Bold" | "SemiBold";
  bold?: boolean;
  txtWhite?: boolean;
}

interface IconProps extends IconBase {
  size?: number;
  color?: string;
  style?: object;
  bgStyle?: object;
  withBg?: boolean;
  rounded?: boolean;
  variant?: IconVariant;
  padding?: number;
}

interface DolarPriceItemProps {
  title: string;
  bgColorClass: string;
  textColorClass: string;
  price?: number | string;
  date?: string;
  change?: number | string;
  percentage?: string;
  trend?: "up" | "down" | "same" | "flat";
  currency?: string;
}

interface CircularProgressProps {
  progressPercent: number;
  size: number;
  strokeWidth: number;
  text?: string;
  textSize?: number;
}

interface DonutChartData {
  value: number;
  color: string;
  label?: string;
}

interface BankCardData {
  id: string;
  bankName: string;
  gradientColors: string[];
  balance: string;
  currency: string;
  lastEntry: string;
  percentage: string;
  trendIcon: string;
}

interface BalanceCardProps {
  id: number;
  title: string;
  amount: number;
  currency: string;
  started: number;
  spent: number;
  lastEntry?: string;
  theme?: "blue" | "green" | "red" | "yellow";
}

interface BadgeProps extends Partial<IconBase> {
  text?: string;
  color?: string;
  type?: PrimitiveVariants | "subtle" | "solid" | "outline";
  size?: BasesSize;
  iconLeft?: string;
  iconRight?: string;
  iconSize?: number;
  fullWidth?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
interface ButtonCustomProps extends Partial<IconBase> {
  text?: string;
  color?: string;
  type?: PrimitiveVariants;
  size?: BasesSize | "xs";
  iconLeft?: string;
  iconRight?: string;
  fullWidth?: boolean; // Nueva prop para controlar el ancho completo
  containerStyle?: ViewStyle;
  customColorText?: TextStyle;
  onPress?: () => void;
  disabled?: boolean;
  isActive?: boolean; // Nueva prop para controlar el estado activo
  padding?: number; // Nueva prop para controlar el padding manual
}
interface ButtonProps extends ButtonCustomProps {}

interface ColProps {
  children: React.ReactNode;
  numRows: number;
}

interface RowProps {
  children: React.ReactNode;
  customStyles?: object;
  gap?: number;
  width?: number | string;
  alignItem?: string;
  justifyContent?: string;
  wrap?: boolean;
}

interface GridProps {
  children: React.ReactNode;
  customStyles?: object;
  gap?: number;
  wrap?: boolean;
  width?: number | string;
  alignItem?: string;
  justifyContent?: string;
}

interface ExchangeRate {
  moneda?: string;
  fuente?: string;
  nombre: string;
  compra?: number | null;
  venta?: number | null;
  promedio: number;
  fechaActualizacion: string;
  exchangeName?: string;
  value?: number;
  todayDate?: string;
  change?: number;
  percentageChange?: string;
  trend?: "up" | "down" | "same" | "flat";
}

interface Goal {
  id: number;
  icon: MaterialCommunityIcons;
  title: string;
  description: string;
  color?: string;
  goalValue: number;
  currentValue: number;
  period: number;
  periodUnit: "year" | "month" | "week" | "day";
  completed: boolean;
}

interface TabItem {
  name: string;
  icon: MaterialCommunityIcons;
  label: string;
}

interface Expense {
  id: number;
  icon: MaterialCommunityIcons;
  title: string;
  description: string;
  color: string;
  expenseValue: number;
  completed: boolean;
}
interface ThemeContextProps {
  sizes: Record<string, number>;
  theme: Record<string, string>;
  inProgress: Record<string, string>;
  complete: Record<string, string>;
  danger: Record<string, string>;
  globalStyles: {
    background: string;
    backgroundSecondary: string;
    text: string;
    textSecondary: string;
    border: string;
    // Keep existing keys for backward compatibility if needed,
    // but mapping them to semantic ones.
    borderContainer: string;
    subtitle: string;
    bgContainerStart: string;
    bgContainerEnd: string;
    buttonDisabled: string;
    buttonDisabledText: string;
    ButtonCustomDisabled: string;
    ButtonCustomDisabledText: string;
    borderInput: string;
  };
  isDark: boolean;
  toggleTheme: () => void;
}

interface IconBase {
  library?: IconLibrary;
  name?: string;
}

interface SettingsOption {
  label: string;
  icon: string;
  library: IconLibrary;
}

interface BackgroundShapesProps {
  height?: number;
  width?: number;
  customStyles?: object;
  color?: string;
  cX: number;
  cY: number;
  r: number;
  blur?: number;
}

interface BankCardProps {
  bankName: string;
  gradientColors: string[];
  balance: string;
  currency: string;
  lastEntry: string;
  percentage: string;
  trendIcon: string;
}

interface GenerateScaleParams {
  categoryId: string[];
  steps: number;
  hex: string;
}

interface ColorScaleItem {
  categoryId: string;
  color: string;
}

interface Data {
  value: number;
  percentage: number;
  color: string;
}

export interface Budget {
  id: string;
  title: string;
  amount: number; // Lo gastado
  limit: number; // Lo asignado
  color: string;
  icon: string;
  library: string;
}

interface BudgetState {
  insights: Budget[];
  selectedIndex: number | null;
  setSelectedIndex: (index: number | null) => void;
}

interface SpendingCategoryCardProps {
  title: string;
  amount: number;
  limit: number;
  color: string;
  iconName: string;
  library?: any;
  index: number;
  onPress: (index: number) => void;
  approachingLimit?: boolean;
  selected: number | null;
}

interface DonutChartProps {
  gap: number;
  radius: number;
  strokeWidth: number;
  outerStrokeWidth: number;
  decimals: SharedValue<number[]>;
  colors: string[];

  // SOLUCIÓN: Quitar el '?' de amount y limit para que TypeScript
  // sepa que SIEMPRE vendrán como números, igual que en donut-path.tsx
  data: (DonutChartData & { amount: number; limit: number })[];

  selectedIndex?: number | null;
}

interface DonutPathProps {
  strokeWidth: number;
  outerStrokeWidth: number;
  gap: number;
  radius: number;
  color: string;
  decimals: SharedValue<number[]>;
  index: number;
  selectedIndex?: number | null;
  segmentData: DonutChartData & { amount: number; limit: number };
}

interface SegmentedControlProps {
  options: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  duration?: number;

  // Estilos del contenedor (Fondo del componente)
  containerStyle?: StyleProp<ViewStyle>;
  containerClassName?: string;
  className?: string; // Alias para containerClassName

  // Estilos del indicador (Botón / opción seleccionada)
  indicatorStyle?: StyleProp<ViewStyle>;
  indicatorClassName?: string;

  // Estilos opcionales del texto
  textStyle?: StyleProp<TextStyle>;
  textClassName?: string;
  selectedTextStyle?: StyleProp<TextStyle>;
  selectedTextClassName?: string;
}

interface GoalCardProps {
  title: string;
  description?: string;
  goalAmount: number; // Monto objetivo para la meta
  currentAmount: number; // Monto actual ahorrado
  progress: number; // Porcentaje de progreso (0-100)
  status: boolean; // true para completado, false para en progreso
  size: "sm" | "lg";
}
interface CategoryCardProps {
  id: number;
  title: string;
  icon: string;
  library: IconLibrary;
  share: boolean;
  color: string;
  createdAt: string;
}

interface GoalLgProps {
  title: string;
  status: GoalStatus;
}

interface TitleCustomProps extends IconBase {
  title: string;
  withNotificationIcon: boolean;
  showIconBalance?: boolean;
}

interface PaypalIconProps {
  size?: number; // Para controlar el tamaño proporcionalmente
  width?: number;
  height?: number;
}

interface ShowStringProps {
  show: boolean;
  fnShow: () => void;
}

interface BankState {
  banks: BankCardData[];
  selectedBankIndex: number | null;
  setSelectedBankIndex: (index: number | null) => void;
  showBalance: boolean;
  setShowBalance: (show: boolean) => void;
}

interface TransactionState {
  transactions: Transaction[];
  updateTransactionLocation: (
    id: string,
    latitude: number,
    longitude: number,
  ) => void;
  removeTransactionLocation: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  editTransaction: (
    id: string,
    updatedTransaction: Partial<Transaction>,
  ) => void;
  deleteTransaction: (id: string) => void;
}

interface GoalState {
  goals: Goal[];
}

interface ExchangeState {
  rates: ExchangeRate[];
  euroRates?: ExchangeRate[];
  previousRates?: Record<string, number>;
  loading: boolean;
  error: string | null;
  fetchRates: () => Promise<void>;
}
interface CategoriesState {
  categories: CategoryCardProps[];
  addCategory: (category: Omit<CategoryCardProps, "id" | "createdAt">) => void;
  editCategory: (
    id: number,
    updatedCategory: Partial<CategoryCardProps>,
  ) => void;
  deleteCategory: (id: number) => void;
}

interface CategoryIconData {
  id: number;
  Category: string[]; // Un array de strings para soportar múltiples subcategorías
  Icon: string;
  Library: IconLibrary; // Restringido a las librerías válidas de Expo
}

interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  icon: string;
  library: IconLibrary;
  bank: BankNameTypes;
  color: string;
  locationSave: boolean;
  latitude?: number;
  longitude?: number;
}

export interface Bank {
  code: string; // Código bancario de 4 dígitos (ej: "0178")
  name: string; // Nombre comercial o común del banco
  legalName: string; // Razón social o nombre legal completo
  shortName: string; // Nombre corto o acrónimo
  rif: string; // Registro de Información Fiscal (ej: "J503581107")
  url: string; // Dirección del sitio web oficial
}

export type {
  SpendingCategoryCardProps,
  SegmentedControlProps,
  BackgroundShapesProps,
  NotificationIconProps,
  CircularProgressProps,
  PercentIndicatorProps,
  DolarPriceItemProps,
  GenerateScaleParams,
  ThemeContextProps,
  ExchangeCardProps,
  CategoryCardProps,
  NotificationProps,
  CustomBadgeProps,
  CategoryIconData,
  TitleCustomProps,
  BalanceCardProps,
  CategoriesState,
  ShowStringProps,
  PaypalIconProps,
  DonutChartProps,
  TypographyProps,
  DonutPathProps,
  DonutChartData,
  ColorScaleItem,
  SettingsOption,
  GoalCardProps,
  BankCardProps,
  BankCardData,
  ExchangeRate,
  GoalLgProps,
  BudgetState,
  AvatarProps,
  ButtonCustomProps,
  ButtonProps,
  Transaction,
  BadgeProps,
  GridProps,
  IconProps,
  Bank,
  IconBase,
  ColProps,
  RowProps,
  Expense,
  TabItem,
  Budget,
  Data,
  Goal,
  BankState,
  TransactionState,
  GoalState,
  ExchangeState,
};
