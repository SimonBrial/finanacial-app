import React from "react";
import { View } from "react-native";
import {
  Svg,
  Circle,
  Text as SVGText,
  //RadialGradient,
} from "react-native-svg";
import useTheme from "../../hook/useTheme";
import { CircularProgressProps } from "../../interface/interface";

export default function CircularProgress(props: CircularProgressProps) {
  const { theme } = useTheme();
  const { size, strokeWidth, text } = props;
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = 100 - props.progressPercent;

  return (
    <View>
      <Svg width={size + 5} height={size + 5} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          stroke={theme.t20}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          {...{ strokeWidth }}
        />

        {/* Progress Circle */}
        <Circle
          stroke={theme.t100}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${circum} ${circum}`}
          strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
          strokeLinecap="round"
          transform={`rotate(0, ${size / 2}, ${size / 2})`}
          {...{ strokeWidth: strokeWidth - 6 }}
        />

        {/* Text */}
        <SVGText
          fontSize={props.textSize ? props.textSize : "10"}
          x={size / 2}
          y={size / 2 + (props.textSize ? Number(props.textSize) / 2 - 1 : 5)}
          textAnchor="middle"
          fill={"white"}
        >
          {text}
        </SVGText>
      </Svg>
    </View>
  );
}
