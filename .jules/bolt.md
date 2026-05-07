
## 2023-11-20 - [Avoid StyleSheet.flatten in render phase]
**Learning:** `StyleSheet.flatten` performs deep object merging which creates noticeable CPU overhead when called frequently on the render path, especially in highly reused UI primitive components like `stack`, `row`, `container`, and `typography`. React Native actually natively handles and resolves arrays of styles passed directly to the `style` prop correctly, making the manual `flatten` redundant and slower.
**Action:** Always prefer standard arrays of styles (`style={[styles.base, customStyles]}`) passed directly to React Native components instead of using `StyleSheet.flatten(...)` during the render phase.
