import { create } from "zustand";
import { GoalState } from "../types/interface";
import { mockGoals } from "../constants/mockData";

export const useGoalStore = create<GoalState>((set) => ({
  goals: mockGoals,
}));
