/**
 * Notification Screen
 *
 * Pantalla de notificaciones presentada como modal.
 * Muestra las notificaciones del usuario y un botón para ir al login.
 *
 * Anteriormente era el contenido del drawer lateral usando
 * DrawerContentComponentProps de @react-navigation/drawer.
 * Ahora es una pantalla independiente que se presenta como modal
 * desde el root Stack layout.
 */
import { StyleSheet, TouchableOpacity, View, Pressable } from "react-native";
import Typography from "../components/ui/typography";
import Icon from "../components/ui/icon";
import Row from "../components/ui/row";
import useTheme from "../hooks/useTheme";
import { useRouter } from "expo-router";

export default function Notification() {
  const { theme, sizes, globalStyles } = useTheme();
  const router = useRouter();

  /** Navega a la pantalla indicada o cierra el modal */
  const handleAction = (action: string) => {
    if (action.toLowerCase() === "settings") {
      router.push("/settings");
    } else {
      router.push("/404");
    }
  };

  /** Cierra el modal de notificaciones y vuelve a la pantalla anterior */
  const closeModal = () => {
    router.back();
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderWidth: 2,
          borderColor: globalStyles.borderContainer,
          borderRadius: sizes.xs,
          zIndex: -999,
        },
      ]}
    >
      {/* Encabezado con título y botón de cerrar */}
      <Row alignItem="center" justifyContent="space-between" width={"100%"}>
        <Row
          width={"70%"}
          gap={sizes.xs}
          alignItem="center"
          justifyContent="start"
        >
          <Typography
            fontSize={sizes.xl}
            bold={false}
            customStyles={{ color: "white" }}
          >
            Notifications
          </Typography>
        </Row>

        {/* Botón para cerrar el modal */}
        <Pressable onPress={closeModal}>
          <Icon
            name={"close"}
            library="MaterialIcons"
            size={sizes.xl}
            color={"white"}
          />
        </Pressable>
      </Row>

      {/* Card de ejemplo de notificación */}
      <View
        style={{
          backgroundColor: theme.t20,
          padding: sizes.sm,
          borderRadius: sizes.xs,
          borderWidth: 1,
          borderColor: theme.t100,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: sizes.xs,
        }}
      >
        <Icon
          bgStyle={{
            padding: sizes.xs,
            borderRadius: "100%",
            backgroundColor: `${theme.t20}`,
          }}
          name={"emoji-events"}
          library="MaterialIcons"
          size={sizes.lg}
          color={theme.t100}
        />
        <Typography customStyles={{ color: theme.t100 }}>Test</Typography>
      </View>

      {/* Botón de acción — navega al login */}
      <TouchableOpacity
        onPress={() => handleAction("Log Out")}
        style={{
          flex: 1,
          gap: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Typography
          txtWhite
          customStyles={{
            paddingVertical: sizes.sm,
            paddingHorizontal: sizes.xl,
            backgroundColor: theme.t20,
            borderRadius: sizes.xs,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Go to login
        </Typography>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  /** Contenedor principal del modal — fondo oscuro semi-transparente */
  container: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "rgba(000, 000, 000, 0.99)",
    marginTop: 50,
    paddingVertical: 20,
    paddingHorizontal: 20,
    opacity: 0.9,
    height: "90%",
  },
});
