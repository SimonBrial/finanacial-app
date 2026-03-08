import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { GridProps } from "../../interface/interface";
import useTheme from "../../hook/useTheme";

export default function Stack({
  justifyContent,
  customStyles,
  alignItem,
  children,
  width,
  wrap,
  gap,
}: GridProps) {
  const { sizes } = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.flatten([
        customStyles,
        {
          display: "flex",
          flexDirection: "column",
          width: "100%",
        },
        { gap: gap ? gap : sizes.xxs },
        { width: width ? width : "100%" },
        { alignItems: alignItem ? alignItem : "flex-start" },
        { justifyContent: justifyContent ? justifyContent : "flex-start" },
        { flexWrap: wrap ? "wrap" : "nowrap" },
      ]),
    [customStyles, gap, sizes.xxs, width, alignItem, justifyContent, wrap],
  );

  return <View style={styles}>{children}</View>;
}
