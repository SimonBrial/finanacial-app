import { create } from "zustand";
import { TransactionState } from "../interface/interface";
import { mockTransactions } from "../data/mockData";

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: mockTransactions,
}));
