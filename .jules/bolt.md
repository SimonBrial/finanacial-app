## 2024-03-28 - StyleSheet.flatten CPU overhead in React Native
**Learning:** `StyleSheet.flatten` causes CPU overhead in render paths due to deep object merging. Calling it inside components runs this heavy process on every render.
**Action:** Avoid `StyleSheet.flatten` inside React Native render functions. Pass arrays of style objects directly to components instead. When using array styles, you can type cast the style array to `as any` if needed to avoid TypeScript conflicts.
