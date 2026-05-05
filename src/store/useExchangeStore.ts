import { create } from "zustand";
import { ExchangeState } from "../interface/interface";
import { mockExchangeRates } from "../data/mockData";

export const useExchangeStore = create<ExchangeState>((set) => ({
  rates: mockExchangeRates,
}));
