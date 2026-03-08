## 2024-03-08 - [Optimize Stack and Row components]
**Learning:** Foundational components like Stack and Row in this application recalculate their style objects using `StyleSheet.flatten` on every render by default.
**Action:** Wrapped the dynamic style calculation using `StyleSheet.flatten` in `useMemo` within the `Stack` and `Row` components to prevent unnecessary style re-computations on each render cycle when their prop sizes and theme variables don't change.
