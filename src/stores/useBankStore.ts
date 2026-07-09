import { create } from "zustand";
import { BankState } from "../types/interface";
import { mockBankCards } from "../constants/mockData";

export const useBankStore = create<BankState>((set) => ({
  // state
  banks: mockBankCards,
  showBalance: false,
  selectedBankIndex: 0,

  // Fn
  setSelectedBankIndex: (index) => set({ selectedBankIndex: index }),
  setShowBalance: (show) => set({ showBalance: show }),
}));
