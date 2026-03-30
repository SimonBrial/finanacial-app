// store/useBudgetStore.ts
import { create } from "zustand";
import { Budget, BudgetState } from "../interface/interface";

const mockInsights: Budget[] = [
  {
    id: "food1",
    title: "Food",
    amount: 250,
    limit: 300,
    color: "#13dd67",
    icon: "fast-food-outline",
    library: "Ionicons",
  },
  {
    id: "groceries1",
    title: "Groceries",
    amount: 150,
    limit: 400,
    color: "#13ace9",
    icon: "cart",
    library: "Ionicons",
  },
  {
    id: "car1",
    title: "Car",
    amount: 350,
    limit: 300,
    color: "#8a2be2",
    icon: "car",
    library: "Ionicons",
  },
  {
    id: "fun1",
    title: "Entertainment",
    amount: 50,
    limit: 200,
    color: "#f472b6",
    icon: "game-controller",
    library: "Ionicons",
  },
  {
    id: "bills1",
    title: "Bills",
    amount: 120,
    limit: 120,
    color: "#fbbf24",
    icon: "receipt",
    library: "Ionicons",
  },
  {
    id: "health1",
    title: "Health",
    amount: 20,
    limit: 100,
    color: "#ef4444",
    icon: "medkit",
    library: "Ionicons",
  },
];

export const useBudgetStore = create<BudgetState>((set) => ({
  insights: mockInsights,
  selectedIndex: null,
  setSelectedIndex: (index) => set({ selectedIndex: index }),
}));
