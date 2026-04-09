## 2024-05-24 - React Native Style Array Optimization
**Learning:** `StyleSheet.flatten` causes unnecessary CPU overhead in React Native when executed during renders, as it deep-merges objects synchronously on the main JS thread.
**Action:** Always pass arrays of style objects directly to React Native components instead of flattening them manually; the framework natively and efficiently handles array-based styles.
