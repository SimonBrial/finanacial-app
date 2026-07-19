import { create } from "zustand";

interface SettingsState {
  isLeftHanded: boolean;
  setIsLeftHanded: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  isLeftHanded: false,
  setIsLeftHanded: (value) => set({ isLeftHanded: value }),
}));
