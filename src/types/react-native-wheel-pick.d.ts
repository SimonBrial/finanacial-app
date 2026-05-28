import { Component } from "react";
import { ViewStyle, TextStyle, StyleProp } from "react-native";

declare module "react-native-wheel-pick" {
  export interface PickerProps {
    pickerData: any[];
    selectedValue: any;
    onValueChange: (value: any) => void;
    style?: StyleProp<ViewStyle>;
    textColor?: string;
    selectTextColor?: string;
    textSize?: number;
    itemStyle?: StyleProp<TextStyle>;
    isCyclic?: boolean;
    isShowSelectBackground?: boolean;
    selectLineColor?: string;
    selectLineSize?: number;
  }

  export class Picker extends Component<PickerProps> {}
}
