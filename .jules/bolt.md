## 2024-05-24 - Avoid StyleSheet.flatten in render functions
**Learning:** `StyleSheet.flatten` causes CPU overhead from deep object merging. Calling it inside React Native render functions creates unnecessary performance bottlenecks, especially in components that render frequently like UI primitives.
**Action:** Always pass arrays of style objects directly to components (e.g., `style={[styles.container, customStyles]}`) instead of flattening them beforehand.
