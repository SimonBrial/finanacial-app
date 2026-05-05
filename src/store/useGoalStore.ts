import { create } from "zustand";
import { GoalState } from "../interface/interface";
import { mockGoals } from "../data/mockData";

export const useGoalStore = create<GoalState>((set) => ({
  goals: mockGoals,
}));
