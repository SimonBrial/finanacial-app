
## 2024-05-28 - StyleSheet.flatten Performance Overhead in Render
**Learning:** `StyleSheet.flatten` performs a deep merge of objects in JavaScript. Using it directly inside the render cycle of highly reused layout primitives (like Stack, Row, Container, Typography) causes significant CPU overhead because the merging happens every time the component renders. React Native's `View` and `Text` components can accept an array of style objects directly, which is handled far more efficiently by the internal C++/Java bridge.
**Action:** Avoid using `StyleSheet.flatten` during rendering. Always pass an array `[style1, style2, customStyle]` instead, or pre-compute flat styles outside the render loop using `StyleSheet.create`.
