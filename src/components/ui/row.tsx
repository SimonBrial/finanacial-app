import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { RowProps } from "../../types/interface";
import useTheme from "../../hooks/useTheme";

export default function Row({
  justifyContent = "center",
  alignItem = "center",
  width = "100%",
  customStyles,
  children,
  wrap = false,
  gap,
}: RowProps) {
  const { sizes } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.flatten([
        customStyles,
        {
          display: "flex",
          flexDirection: "row",
        },
        { flexWrap: wrap ? "wrap" : "nowrap" },
        { gap: gap ? gap : sizes.xxs },
        { width: width ? width : sizes.xxs },
        { alignItems: alignItem ? alignItem : "start" },
        { justifyContent: justifyContent ? justifyContent : "start" },
      ]),
    [customStyles, gap, sizes.xxs, width, alignItem, justifyContent, wrap],
  );
  return <View style={styles}>{children}</View>;
}
