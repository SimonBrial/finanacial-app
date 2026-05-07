## 2026-03-19 - Remove StyleSheet.flatten in render
**Learning:** Using StyleSheet.flatten inside render functions forces CPU-intensive deep object merging on every re-render. React Native handles array styles natively.
**Action:** Pass arrays of style objects directly to components instead.
