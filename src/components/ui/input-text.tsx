import {
  TextInputProps,
  StyleSheet,
  TextInput,
  ViewStyle,
  TextStyle,
  Pressable,
  View,
} from "react-native";
import Typography from "./typography";
import Icon from "./icon";
import useTheme from "../../hook/useTheme";

interface InputProps extends Omit<TextInputProps, "size"> {
  label?: string;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  iconName?: string;
  iconLibrary?: any;
  containerStyle?: ViewStyle;
  onInfoPress?: () => void;
  onPress?: () => void;
}

export default function InputText({
  placeholderTextColor = "#666",
  iconLibrary = "Ionicons",
  multiline = false,
  required = false,
  containerStyle,
  onChangeText,
  size = "md",
  placeholder,
  onInfoPress,
  iconName,
  label,
  value,
  style,
  onPress,
  ...rest
}: InputProps) {
  const { sizes } = useTheme();

  // Style mappings based on sizes
  const heightStyles: Record<"sm" | "md" | "lg", ViewStyle> = {
    sm: { height: 38, borderRadius: 8, paddingHorizontal: 10 },
    md: { height: 48, borderRadius: 8, paddingHorizontal: 12 },
    lg: { height: 58, borderRadius: 10, paddingHorizontal: 14 },
  };

  const textStyles: Record<"sm" | "md" | "lg", TextStyle> = {
    sm: { fontSize: 14 },
    md: { fontSize: 16 },
    lg: { fontSize: 18 },
  };

  const iconSizes: Record<"sm" | "md" | "lg", number> = {
    sm: 18,
    md: 22,
    lg: 26,
  };

  const WrapperComponent = onPress ? Pressable : View;

  return (
    <View style={[styles.mainContainer, containerStyle]}>
      {/* Label section */}
      {label && (
        <View style={styles.labelContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Typography customStyles={styles.labelText}>{label}</Typography>
            {required && (
              <Typography customStyles={styles.requiredAsterisk}>*</Typography>
            )}
          </View>
          {onInfoPress && (
            <Pressable onPress={onInfoPress} style={styles.infoIcon}>
              <Icon
                name="information-circle-outline"
                library="Ionicons"
                size={16}
                color="#fff"
                variant="light"
              />
            </Pressable>
          )}
        </View>
      )}

      {/* Input wrapper */}
      <WrapperComponent
        style={[
          styles.inputWrapper,
          heightStyles[size],
          multiline && {
            height: "auto",
            minHeight: size === "sm" ? 80 : size === "md" ? 100 : 120,
            paddingVertical: 10,
          },
        ]}
        onPress={onPress}
      >
        {iconName && (
          <Icon
            name={iconName}
            library={iconLibrary}
            size={iconSizes[size]}
            color="white"
            variant="light"
            style={styles.iconStyle}
          />
        )}
        <TextInput
          style={[styles.textInput, textStyles[size], style]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          editable={onPress ? false : rest.editable}
          pointerEvents={onPress ? "none" : undefined}
          {...rest}
        />
      </WrapperComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
  },
  labelContainer: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  labelText: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  requiredAsterisk: {
    color: "#df1d31",
    marginLeft: 4,
  },
  infoIcon: {
    padding: 2,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  iconStyle: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: "white",
    height: "100%",
    textAlignVertical: "center",
  },
});
