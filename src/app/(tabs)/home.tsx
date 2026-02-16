import Typography from "../../components/general/typography";
import GlobalContainer from "../../components/general/global-container";
import { Link } from "expo-router";
import useTheme from "../../hook/useTheme";
import { View } from "react-native";
import Icon from "../../components/general/icon";
import Row from "../../components/general/row";
import NotificationIcon from "../../components/notification-icon";
import BankCard from "../../components/bank-card";
import CarouselCardBank from "../../components/carousel-card-bank";

export default function Home() {
  const { theme, sizes } = useTheme();

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
          />
          <Typography
            fontSize={sizes.xl}
            bold={false}
            customStyles={{ color: "white" }}
          >
            Hi Simon!!!
          </Typography>
        </Row>
        <NotificationIcon />
      </Row>
      <View
        style={{
          flex: 1,
          gap: 20,
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "black",
          width: "100%",
          height: 500,
        }}
      >
        <CarouselCardBank />
      </View>
    </GlobalContainer>
  );
}

// TODO: https://dolarapi.com/docs/venezuela/operations/get-dolares.html
