## 2024-05-24 - Avoid StyleSheet.flatten inside render functions
**Learning:** `StyleSheet.flatten` causes significant CPU overhead when used directly inside React Native render functions due to deep object merging. This leads to slower renders, especially for heavily-used core components like `Typography`, `Row`, `Stack`, and buttons.
**Action:** Always pass an array of style objects directly to the `style` prop (e.g., `style={[style1, style2]}`) instead of using `StyleSheet.flatten`. Let React Native handle the merging internally.
