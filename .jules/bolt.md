## 2024-05-18 - Avoid StyleSheet.flatten in render functions
**Learning:** React Native render functions suffer performance penalty when using `StyleSheet.flatten` directly inside them due to deep object merging CPU overhead on every render cycle.
**Action:** Instead of `StyleSheet.flatten(...)`, use array syntax directly on the `style` prop (`style={[...]}`) which is natively optimized by React Native and avoids constant re-computations.
