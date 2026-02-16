import React from "react";
import Row from "./general/row";
import { View } from "react-native";
import Typography from "./general/typography";
import useTheme from "../hook/useTheme";
import Stack from "./general/stack";
import Badge from "./general/badge";

export default function DolarPriceItem({ title, color }: any) {
  const { sizes, globalStyles, danger, theme } = useTheme();
  return (
    <Row justifyContent="flex-start" width={"100%"}>
      <View
        style={{
          height: 50,
          width: 6,
          backgroundColor: color || theme.t100,
          marginRight: sizes.sm,
          borderRadius: 1000
        }}
      />
      <Stack width={"60%"}>
        <Row gap={sizes.sm} alignItem="flex-end" justifyContent="flex-start">
          <Typography fontSize={sizes.lg} customStyles={{ color: "white" }}>
            {title}
          </Typography>
          <Typography fontSize={sizes.sm} customStyles={{ color: "white" }}>
            (VES)
          </Typography>
        </Row>
        <Typography
          fontSize={sizes.sm}
          customStyles={{ color: globalStyles.subtitle }}
        >
          15/02/2026
        </Typography>
      </Stack>
      <Stack
        width={"32%"}
        alignItem="center"
        //customStyles={{ borderWidth: 1, borderColor: "red" }}
      >
        <Typography fontSize={sizes.lg} customStyles={{ color: color }}>
          238.84
        </Typography>
        <Row
          width={"100%"}
          gap={0}
          alignItem="flex-end"
          justifyContent="space-around"
        >
          <Typography
            fontSize={sizes.sm}
            customStyles={{ color: globalStyles.subtitle, marginRight: -20 }}
          >
            -10.55{" "}
          </Typography>
          <Badge
            text="5%"
            iconLeft={"trending-down"}
            type="light"
            color={danger.d100}
          />
        </Row>
      </Stack>
    </Row>
  );
}
