## 2026-03-11 - [StyleSheet.flatten Overhead in React Native]
**Learning:** `StyleSheet.flatten()` inside a render function forces JavaScript to recursively allocate memory and merge style objects on every single render, causing unnecessary CPU and garbage collection overhead.
**Action:** When composing dynamic styles in React Native, pass arrays of style objects directly to the `style` prop. React Native inherently and natively optimizes this array processing without the JS-side performance penalty.
