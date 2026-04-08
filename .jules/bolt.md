## 2025-03-29 - Avoid StyleSheet.flatten in render functions
**Learning:** `StyleSheet.flatten` causes CPU overhead and memory allocations because it recursively deep-merges objects on every render.
**Action:** Pass arrays of style objects directly to React Native components instead of using `StyleSheet.flatten`. The React Native bridge natively handles array styles efficiently without the need for manual deep merging in JS. Use `as any` type casting if necessary to satisfy TypeScript when passing arrays.
