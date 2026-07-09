import { create } from "zustand";
import { CategoriesState } from "../types/interface";
import { mockCategories } from "../constants/mockData";

export const useCategoriesStore = create<CategoriesState>((set) => ({
  categories: mockCategories,
  addCategory: (category) =>
    set((state) => ({
      categories: [
        ...state.categories,
        {
          ...category,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  editCategory: (id, updatedCategory) =>
    set((state) => ({
      categories: state.categories.map((c) =>
        c.id === id ? { ...c, ...updatedCategory } : c
      ),
    })),
  deleteCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
    })),
}));
