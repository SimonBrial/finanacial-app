import { TextStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PrimitiveVariants, IconLibrary, BasesSize } from "../types/type";
import { DrawerContentComponentProps } from "@react-navigation/drawer";

interface NotificationProps extends DrawerContentComponentProps {}

interface ExchangeCardProps {
  dolarRate: number;
  exchangeName: string;
  todayDate?: Date | string;
}

interface NotificationIconProps {
  active?: boolean;
}

interface DolarPriceItemProps {
  title: string;
  color?: string;
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
  gradientColors: [string, string];
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

/* interface GoalCardProps {
  title: string;
  description: string;
  color?: string;
} */

interface BadgeProps extends Partial<IconBase> {
  text: string;
  color?: string;
  type?: PrimitiveVariants;
  size?: BasesSize;
  iconLeft?: string;
  iconRight?: string;
  fullWidth?: boolean;
  containerStyle?: ViewStyle;
}
interface ButtonProps extends Partial<IconBase> {
  text: string;
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
}

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
  exchangeName: string;
  value: number;
  todayDate: string;
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
  globalStyles: Record<string, string>;
}

interface IconBase {
  library?: IconLibrary;
  name?: string;
}

export type {
  ThemeContextProps,
  ExchangeCardProps,
  BalanceCardProps,
  GoalCardProps,
  ExchangeRate,
  ButtonProps,
  BadgeProps,
  GridProps,
  IconBase,
  ColProps,
  RowProps,
  Expense,
  TabItem,
  Goal,
  NotificationProps,
  NotificationIconProps,
  DolarPriceItemProps,
  CircularProgressProps,
  DonutChartData,
  BankCardData,
};
