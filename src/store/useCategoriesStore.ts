import { create } from "zustand";
import { CategoriesState } from "../interface/interface";
import { mockCategories } from "../data/mockData";

export const useCategoriesStore = create<CategoriesState>((set) => ({
  categories: mockCategories,
}));
