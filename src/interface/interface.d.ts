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
  Goal,
};
