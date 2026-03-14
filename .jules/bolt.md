## 2024-03-14 - [StyleSheet.flatten Overhead in Render]
**Learning:** Using `StyleSheet.flatten` inside React Native render functions creates unnecessary CPU overhead due to deep object merging on every frame or re-render.
**Action:** Pass arrays of style objects directly to components instead. React Native handles arrays of styles natively and efficiently without the need to flatten them beforehand.
