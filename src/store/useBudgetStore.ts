// store/useBudgetStore.ts
import { create } from "zustand";
import { BudgetState } from "../interface/interface";
import { mockInsights } from "../data/mockData";

export const useBudgetStore = create<BudgetState>((set) => ({
  insights: mockInsights,
  selectedIndex: null,
  setSelectedIndex: (index) => set({ selectedIndex: index }),
}));
