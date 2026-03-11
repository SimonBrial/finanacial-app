## 2024-03-07 - Missing React.memo for pure display components
**Learning:** React Native applications often suffer from unnecessary re-renders in pure presentational components, particularly when those components are used in parent containers that can re-render.
**Action:** Use React.memo() for pure presentational components like `GoalCard` and `GoalCardLg` to avoid costly re-evaluations of Skia canvas rendering inside them.
