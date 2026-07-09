import { create } from "zustand";
import { ExchangeState } from "../types/interface";
import { mockExchangeRates } from "../constants/mockData";

export const useExchangeStore = create<ExchangeState>((set) => ({
  rates: mockExchangeRates,
}));
