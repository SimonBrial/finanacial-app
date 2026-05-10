import React from "react";
import Icon from "./ui/icon";
import Row from "./ui/row";
import Typography from "./ui/typography";
import NotificationIcon from "./notification-icon";
import useTheme from "../hook/useTheme";
import { TitleCustomProps } from "../interface/interface";
import ShowString from "./show-string";
import { useBankStore } from "../store/useBankStore";

export default function TitleCustom({
  withNotificationIcon,
  showIconBalance = false,
  library,
  title,
  name,
}: TitleCustomProps) {
  const { theme, sizes } = useTheme();
  const showBalance = useBankStore().showBalance;
  const fnShowBalance = useBankStore().setShowBalance;
  return (
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
          library={library}
          name={name}
        />
        <Typography
          fontSize={sizes.xl}
          bold={false}
          customStyles={{ color: "white" }}
        >
          {title}
        </Typography>
      </Row>
      {showIconBalance && (
        <ShowString
          show={showBalance}
          fnShow={() => fnShowBalance(!showBalance)}
        />
      )}
      {withNotificationIcon && <NotificationIcon hasNotification={true} />}
    </Row>
  );
}
