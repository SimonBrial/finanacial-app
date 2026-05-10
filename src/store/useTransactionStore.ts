import { create } from "zustand";
import { TransactionState } from "../interface/interface";
import { mockTransactions } from "../data/mockData";

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: mockTransactions,
  updateTransactionLocation: (id, latitude, longitude) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, locationSave: true, latitude, longitude } : t
      ),
    })),
  removeTransactionLocation: (id) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id
          ? { ...t, locationSave: false, latitude: undefined, longitude: undefined }
          : t
      ),
    })),
}));
