## 2024-03-27 - Remove StyleSheet.flatten from primitive UI components
**Learning:** `StyleSheet.flatten` inside React Native render functions creates significant CPU performance overhead from deep object merging on every render.
**Action:** Pass arrays of style objects directly to components instead. When using array styles, you can type cast the style array to `as any` if needed to avoid TypeScript conflicts.
