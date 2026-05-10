import { create } from "zustand";
import { BankState } from "../interface/interface";
import { mockBankCards } from "../data/mockData";

export const useBankStore = create<BankState>((set) => ({
  // state
  banks: mockBankCards,
  showBalance: false,
  selectedBankIndex: 0,

  // Fn
  setSelectedBankIndex: (index) => set({ selectedBankIndex: index }),
  setShowBalance: (show) => set({ showBalance: show }),
}));
