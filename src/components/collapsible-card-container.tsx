import { useState } from "react";
import useTheme from "../hooks/useTheme";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Collapsible from "react-native-collapsible";
import Icon from "./ui/icon";
import Row from "./ui/row";
import Typography from "./ui/typography";
import Stack from "./ui/stack";
import { IconBase } from "../types/interface";

interface CollapsibleCardContainerProps extends IconBase {
  children: React.ReactNode;
  title: string;
}

export default function CollapsibleCardContainer({
  children,
  title,
  library = "MaterialCommunityIcons",
  name,
}: CollapsibleCardContainerProps) {
  const { sizes, globalStyles, theme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapsible = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <LinearGradient
      colors={[globalStyles.bgContainerStart, globalStyles.bgContainerEnd]} // DINÁMICO
      style={[
        {
          borderRadius: sizes.lg,
          borderWidth: 1,
          borderColor: globalStyles.borderContainer,
          marginTop: sizes.xl,
        },
      ]}
      locations={[0.1, 1.0]}
      start={{ x: 0, y: 0.0 }}
      end={{ x: 1, y: 0 }}
    >
      <Stack
        gap={sizes.lg}
        justifyContent="flex-start"
        customStyles={{
          flex: 1,
          paddingHorizontal: sizes.lg,
          paddingBottom: !isCollapsed ? sizes.lg : 0,
          paddingTop: sizes.lg,
        }}
      >
        <TouchableOpacity onPress={toggleCollapsible}>
          <Row gap={sizes.xs} alignItem="center" justifyContent="start">
            <Icon
              bgStyle={{
                padding: sizes.xxs,
                borderRadius: sizes.xs,
                backgroundColor: `${theme.t20}`,
                //width: 44,
                //height: 44,
              }}
              color={theme.t100}
              size={sizes.xl}
              library={library}
              name={name}
            />
            <Typography
              fontSize={sizes.xl}
              bold={false}
              customStyles={{ color: "white", width: "85%" }}
            >
              {title}
            </Typography>
          </Row>
        </TouchableOpacity>
        <Collapsible collapsed={isCollapsed} align="center" duration={300}>
          {children}
        </Collapsible>
      </Stack>
    </LinearGradient>
  );
}
