import { Link } from "expo-router";
import { View } from "react-native";
import GlobalContainer from "../../components/general/global-container";
import Typography from "../../components/general/typography";
import Icon from "../../components/general/icon";
import Row from "../../components/general/row";
import useTheme from "../../hook/useTheme";

export default function Exchange() {
  const { sizes, theme } = useTheme();
  return (
    <GlobalContainer>
      <Row
        alignItem="center"
        justifyContent="space-between"
        width={"100%"}
        customStyles={{
          paddingBottom: sizes.sm,
        }}
      >
        <Row
          width={"70%"}
          gap={sizes.xs}
          //customStyles={{ paddingLeft: sizes.xs }}
          alignItem="center"
          justifyContent="start"
        >
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
            name={"attach-money"}
            library="MaterialIcons"
          />
          <Typography
            fontSize={sizes.xl}
            bold={false}
            customStyles={{ color: "white" }}
          >
            Exchanges
          </Typography>
        </Row>
        <Icon
          bgStyle={{
            padding: sizes.xxs,
            borderRadius: "100%",
            backgroundColor: `${theme.t20}`,
            width: 44,
            height: 44,
          }}
          color={theme.t100}
          size={sizes.xl}
          name={"bell-outline"}
        />
      </Row>
      <View
        style={{
          flex: 1,
          gap: 20,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
          width: "100%",
          height: 500,
        }}
      >
        <Link
          href="/"
          style={{
            paddingVertical: sizes.sm,
            paddingHorizontal: sizes.xl,
            backgroundColor: theme.t20,
            borderRadius: sizes.xs,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography customStyles={{ color: theme.t100, marginTop: 20 }}>
            Go to Login
          </Typography>
        </Link>
      </View>
    </GlobalContainer>
  );
}
