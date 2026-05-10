import { TouchableOpacity } from "react-native";
import Typography from "./ui/typography";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Icon from "./ui/icon";
import Stack from "./ui/stack";
import useTheme from "../hook/useTheme";
import { IconBase } from "../interface/interface";

interface ModalItemProps extends IconBase {
  title: string;
  description: string;
  onPress: () => void;
  variant?: "solid" | "ghost" | "light" | "bordered";
  color?: string;
  iconSize?: number;
}

export default function ModalItems({
  variant = "solid",
  color = "white",
  description,
  onPress,
  library,
  title,
  name,
  iconSize = 24,
}: ModalItemProps) {
  const { sizes } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: "#979797",
        borderRadius: 10,
        backgroundColor: "#1c1c1c",
        width: "90%",
        marginBottom: 10,
      }}
    >
      <Icon
        variant={variant}
        name={name}
        library={library || "MaterialIcons"}
        color={color}
        size={iconSize}
      />
      <Stack gap={2}>
        <Typography
          fontSize={sizes.md}
          customStyles={{ fontWeight: "bold", color: "white" }}
        >
          {title}
        </Typography>
        <Typography fontSize={sizes.sm} customStyles={{ color: "#979797" }}>
          {description}
        </Typography>
      </Stack>
    </TouchableOpacity>
  );
}
