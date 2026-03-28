import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../../components/ui/typography";
import useTheme from "../../hook/useTheme";
import Icon from "../ui/icon";
import { LinearGradient } from "expo-linear-gradient";
import Badge from "../ui/badge";
import { IconLibrary } from "../../types/type";
import { Dropdown } from "react-native-element-dropdown";

interface CategoryCardProps {
  id?: number;
  title: string;
  icon: string;
  library: IconLibrary;
  share: boolean;
  color: string;
}

const actionData = [
  { label: 'Edit', value: 'edit', icon: 'edit', iconLibrary: 'Feather', color: "#ff6004" },
  { label: 'Delete', value: 'deactivate', icon: 'trash-2', iconLibrary: 'Feather', color: "#ff0101" },
];

export default function CategoryCard({
  library,
  color,
  share,
  title,
  icon,
}: CategoryCardProps) {
  const { sizes, globalStyles } = useTheme();

  const renderDropdownItem = (item: any) => {
    return (
      <View style={[
        styles.dropdownItem,
        { backgroundColor: `${item.color}22` }
      ]}>
        <Icon
          name={item.icon}
          library={item.iconLibrary}
          color={item.color} // Un color neutro de tu tema
          size={sizes.md}
          variant="light"
        />
        <Typography
          fontSize={sizes.md}
          customStyles={{ color: item.color, marginLeft: 12 }}

        >
          {item.label}
        </Typography>

      </View>
    );
  };
  return (
    <LinearGradient
      colors={[globalStyles.bgContainerStart, globalStyles.bgContainerEnd]}
      style={[
        styles.backgroundContainer,
        {
          borderWidth: 1,
          borderColor: globalStyles.borderContainer,
        },
      ]}
      locations={[0.1, 1.0]}
      start={{ x: 0, y: 0.0 }}
      end={{ x: 1, y: 0 }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Icon
          name={icon}
          library={library}
          color={color}
          size={sizes.xl}
          variant="ghost"
          rounded
          padding={10}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <Typography txtWhite fontSize={sizes.lg}>
            {title}
          </Typography>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 4,
            }}
          >
            {share ? (
              <Badge
                text="Share"
                iconLeft="users"
                library="Feather"
                color={color}
              />) :
              (<Badge
                text="Personal"
                iconLeft="user"
                library="Feather"
                color={color}
              />
              )}
            <Badge
              text="27 MAR 2026"
              type="flat"
              color={globalStyles.subtitle}
            />
          </View>
        </View>
      </View>
      <View>
        <Dropdown
          style={styles.dropdownTrigger}
          // containerStyle aplica al menú flotante (el fondo blanco en tu foto)
          containerStyle={[
            styles.dropdownContainer,
            {
              backgroundColor: globalStyles.bgContainerStart,
              borderColor: globalStyles.borderContainer
            }
          ]}
          data={actionData}
          labelField="label" // Corregido: antes decía "test"
          valueField="value" // Corregido: antes decía "test"
          activeColor="rgba(0, 0, 0, 0.15)" // Oscurece la opción al tocarla en vez de ponerla blanca
          itemContainerStyle={{
            borderRadius: 20,
            marginBottom: 4 // Esto crea el gap de 4 entre los elementos
          }}
          onChange={item => null}
          placeholder="" // Dejamos vacío para que no ocupe espacio
          selectedTextStyle={{ display: "none" }} // Ocultamos el texto seleccionado para solo ver los 3 puntos
          renderLeftIcon={() => (
            <View style={styles.iconTriggerContainer}>
              <Icon
                name="ellipsis-vertical"
                library="Ionicons"
                color={globalStyles.subtitle}
                variant="light"
              />
            </View>
          )}
          renderRightIcon={() => null} // Ocultamos la flecha desplegable por defecto
          renderItem={renderDropdownItem} // Usamos nuestra vista personalizada
        />
        {/*  */}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    width: "100%",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  // Estilo para el contenedor del ícono de 3 puntos
  dropdownTrigger: {
    width: 32,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  iconTriggerContainer: {
    padding: 8,
    borderRadius: 12, // o 8 si prefieres
    // La librería Dropdown maneja la opacidad al toque automáticamente,
    // pero si quisieras un fondo fijo suave siempre, descomentarías la línea de abajo:
    //backgroundColor: 'rgba(255,255,255,0.05)',
  },
  // Estilo para la caja flotante (el menú)
  dropdownContainer: {
    borderRadius: 20,
    display: "flex",
    flexDirection: "column",
    padding: 8,
    marginLeft: -150,
    top: -80,
    width: 140,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5, // Sombra para Android
  },
  // Estilo para cada ítem de la lista
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 20,
  },
});
