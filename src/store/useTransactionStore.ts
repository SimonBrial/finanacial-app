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
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [
        { ...transaction, id: Date.now().toString() },
        ...state.transactions,
      ],
    })),
  editTransaction: (id, updatedTransaction) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...updatedTransaction } : t
      ),
    })),
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
}));
