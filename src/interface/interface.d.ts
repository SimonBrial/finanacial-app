import { MaterialIconsIconName } from "@react-native-vector-icons/material-icons";
import { typeBadge } from "../types/type";

interface ExchangeCardProps {
  dolarRate: number;
  exchangeName: string;
  todayDate?: Date | string;
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

interface BadgeProps {
  // Define any props if needed in the future
  text: string;
  color?: string;
  type: typeBadge;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

interface ColProps {
  children: React.ReactNode;
  numRows: number;
}

interface RowProps {
  children: React.ReactNode;
}

interface GridProps {
  children: React.ReactNode;
  customStyles?: object;
  gap?: number;
  wrap?: boolean;
}

interface ExchangeRate {
  exchangeName: string;
  value: number;
  todayDate: string;
}

interface Goal {
  id: number;
  icon: MaterialIconsIconName;
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
  icon: MaterialIconsIconName;
  label: string;
}

interface Expense {
  id: number;
  icon: MaterialIconsIconName;
  title: string;
  description: string;
  color: string;
  expenseValue: number;
  completed: boolean;
}

export type {
  ExchangeCardProps,
  BalanceCardProps,
  GoalCardProps,
  ExchangeRate,
  BadgeProps,
  GridProps,
  ColProps,
  RowProps,
  Expense,
  TabItem,
  Goal,
};
