import { create } from "zustand";
import { BankState } from "../interface/interface";
import { mockBankCards } from "../data/mockData";

export const useBankStore = create<BankState>((set) => ({
  banks: mockBankCards,
  selectedBankIndex: 0,
  setSelectedBankIndex: (index) => set({ selectedBankIndex: index }),
}));
