## 2024-05-24 - Init

## 2024-05-24 - [Avoid StyleSheet.flatten in render functions]
**Learning:** Using `StyleSheet.flatten` directly inside React render functions creates unnecessary CPU overhead because it performs deep object merging on every render cycle.
**Action:** Always pass arrays of style objects directly to the `style` prop of components instead of flattening them first. For TypeScript errors with array styles in ViewStyle, you can use `as any`.
