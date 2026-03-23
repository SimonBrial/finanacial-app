## 2024-05-24 - StyleSheet.flatten causes CPU overhead
**Learning:** `StyleSheet.flatten` causes deep object merging on every render. In components that re-render frequently, this CPU overhead can cause performance drops and jitter, especially during animations.
**Action:** Use an array of style objects for the `style` prop instead of calling `StyleSheet.flatten`. React Native supports array styles out of the box and handles it natively on the JS-to-Native bridge with much less overhead.
