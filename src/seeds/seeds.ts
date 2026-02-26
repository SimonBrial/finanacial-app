import { ExchangeRate, Expense, Goal } from "../interface/interface";
import { FilterKey } from "../types/type";

const dt = new Date();

export const balanceCards: any = [
  {
    id: "1",
    bankName: "BNC",
    gradientColors: ["#487CF3", "#011B4C"],
    balance: "1.456,65",
    currency: "VES",
    lastEntry: "01/01/2024",
    percentage: "5%",
    trendIcon: "trending-up",
  },
  {
    id: "2",
    bankName: "BANESCO",
    gradientColors: ["#00a650", "#005a2b"],
    balance: "3.120,00",
    currency: "VES",
    lastEntry: "12/02/2026",
    percentage: "12%",
    trendIcon: "trending-up",
  },
  {
    id: "3",
    bankName: "MERCANTIL",
    gradientColors: ["#1d428a", "#0d1f42"],
    balance: "850,20",
    currency: "USD",
    lastEntry: "14/02/2026",
    percentage: "2%",
    trendIcon: "trending-down",
  },
];

export const exchangeRates: ExchangeRate[] = [
  {
    exchangeName: "official",
    value: 238.84,
    todayDate: dt.toLocaleDateString(),
  },
  {
    exchangeName: "average",
    value: 286.26,
    todayDate: dt.toLocaleDateString(),
  },
  {
    exchangeName: "parallel",
    value: 333.67,
    todayDate: dt.toLocaleDateString(),
  },
];

export const goals: Goal[] = [
  {
    id: 1,
    icon: "laptop",
    title: "New Laptop",
    description: "Save money to buy a new laptop for work.",
    color: "#4CAF50",
    goalValue: 1200,
    currentValue: 1164,
    period: 6,
    periodUnit: "month",
    completed: false,
  },
  {
    id: 2,
    icon: "airplane-ticket",
    title: "Vacation Trip",
    description: "Plan and save for a vacation trip next summer.",
    color: "#2196F3",
    goalValue: 3000,
    currentValue: 3000,
    period: 12,
    periodUnit: "month",
    completed: true,
  },
  {
    id: 3,
    icon: "home",
    title: "Home Renovation",
    description: "Renovate the kitchen and living room area.",
    color: "#FF9800",
    goalValue: 5000,
    currentValue: 1000,
    period: 12,
    periodUnit: "month",
    completed: false,
  },
  {
    id: 4,
    icon: "directions-car",
    title: "New Car",
    description: "Save for a down payment on a new car.",
    color: "#9C27B0",
    goalValue: 10000,
    currentValue: 100,
    period: 12,
    periodUnit: "month",
    completed: false,
  },
  {
    id: 5,
    icon: "book",
    title: "Education Fund",
    description: "Set aside money for further education and courses.",
    color: "#E91E63",
    goalValue: 4000,
    currentValue: 2000,
    period: 12,
    periodUnit: "month",
    completed: false,
  },
];

export const constExpense: Expense[] = [
  {
    id: 1,
    icon: "laptop",
    title: "Internet",
    description: "Save money to buy a new laptop for work.",
    color: "#4CAF50",
    expenseValue: 1200,
    completed: false,
  },
  {
    id: 2,
    icon: "coffee",
    title: "Coffee",
    description: "Save money to buy a new laptop for work.",
    color: "#4CAF50",
    expenseValue: 1200,
    completed: false,
  },
  {
    id: 3,
    icon: "fast-food",
    title: "Food",
    description: "Save money to buy a new laptop for work.",
    color: "#4CAF50",
    expenseValue: 1200,
    completed: false,
  },
  {
    id: 4,
    icon: "directions-car",
    title: "New Car",
    description: "Save money to buy a new laptop for work.",
    color: "#4CAF50",
    expenseValue: 1200,
    completed: false,
  },
  {
    id: 5,
    icon: "book",
    title: "Education Fund",
    description: "Set aside money for further education and courses.",
    color: "#E91E63",
    expenseValue: 1200,
    completed: false,
  },
];
export const MOCK_DB: Record<FilterKey, any> = {
  Week: {
    periodLabel: "Esta Semana", // Comparado con la semana anterior
    Income: {
      data: [
        { value: 120, label: "Mon" },
        { value: 400, label: "Tue" },
        { value: 200, label: "Wed" },
        { value: 600, label: "Thu" },
        { value: 100, label: "Fri" },
        { value: 500, label: "Sat" },
        { value: 250, label: "Sun" },
      ],
      currentTotal: 2170,
      previousTotal: 1850,
    },
    Expense: {
      data: [
        { value: 50, label: "Mon" },
        { value: 80, label: "Tue" },
        { value: 30, label: "Wed" },
        { value: 100, label: "Thu" },
        { value: 150, label: "Fri" },
        { value: 90, label: "Sat" },
        { value: 120, label: "Sun" },
      ],
      currentTotal: 620,
      previousTotal: 700,
    },
  },
  Month: {
    periodLabel: "Febrero 2026", // Comparado con el mes anterior
    Income: {
      // 28 días generados como ejemplo para un mes
      data: Array.from({ length: 28 }, (_, i) => ({
        value: Math.floor(Math.random() * 500) + 50,
        label: `${i + 1}`,
      })),
      currentTotal: 8500,
      previousTotal: 7200,
    },
    Expense: {
      data: Array.from({ length: 28 }, (_, i) => ({
        value: Math.floor(Math.random() * 300) + 20,
        label: `${i + 1}`,
      })),
      currentTotal: 4200,
      previousTotal: 3800,
    },
  },
  Year: {
    periodLabel: "Año 2026", // Comparado con el año anterior (2025)
    Income: {
      // 12 meses del año
      data: [
        { value: 3500, label: "Jan" },
        { value: 4500, label: "Feb" },
        { value: 4200, label: "Mar" },
        { value: 5000, label: "Apr" },
        { value: 6100, label: "May" },
        { value: 5800, label: "Jun" },
        { value: 6500, label: "Jul" },
        { value: 7000, label: "Aug" },
        { value: 6800, label: "Sep" },
        { value: 7200, label: "Oct" },
        { value: 8000, label: "Nov" },
        { value: 9500, label: "Dec" },
      ],
      currentTotal: 74100,
      previousTotal: 65000,
    },
    Expense: {
      data: [
        { value: 1500, label: "Jan" },
        { value: 2100, label: "Feb" },
        { value: 1800, label: "Mar" },
        { value: 2500, label: "Apr" },
        { value: 3000, label: "May" },
        { value: 2800, label: "Jun" },
        { value: 3200, label: "Jul" },
        { value: 3500, label: "Aug" },
        { value: 3100, label: "Sep" },
        { value: 3400, label: "Oct" },
        { value: 4000, label: "Nov" },
        { value: 5000, label: "Dec" },
      ],
      currentTotal: 35900,
      previousTotal: 30000,
    },
  },
};