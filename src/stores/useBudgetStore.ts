// store/useBudgetStore.ts
import { create } from "zustand";
import { BudgetState } from "../types/interface";
import { mockInsights } from "../constants/mockData";

export const useBudgetStore = create<BudgetState>((set) => ({
  insights: mockInsights,
  selectedIndex: null,
  setSelectedIndex: (index) => set({ selectedIndex: index }),
}));
