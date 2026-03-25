import { SectionList, View } from "react-native";
import Typography from "../../../components/ui/typography";
import useTheme from "../../../hook/useTheme";
import RecordCard from "../../../components/transactions/record-card";

const TRANSACTIONS_DATA = [
  {
    title: "TODAY",
    data: [{ id: "1" }, { id: "2" }],
  },
  {
    title: "YESTERDAY",
    data: [{ id: "3" }, { id: "4" }],
  },
  {
    title: "TUESDAY 29 FEB - 2026",
    data: [{ id: "5" }, { id: "6" }],
  },
];

export default function Records() {
  const { globalStyles, sizes } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <SectionList
        sections={TRANSACTIONS_DATA}
        keyExtractor={(item) => item.id}
        // 2. Renderizamos cada transacción
        renderItem={({ item }) => (
          // Aquí le pasarías los datos reales al RecordCard, ej: <RecordCard data={item} />
          <RecordCard />
        )}
        ItemSeparatorComponent={() => <View style={{ height: sizes.sm }} />}
        // 3. Renderizamos los encabezados de cada sección (Las fechas)
        renderSectionHeader={({ section: { title } }) => (
          <Typography
            customStyles={{
              color: globalStyles.subtitle,
              paddingLeft: sizes.sm,
              paddingTop: sizes.md,
              paddingBottom: sizes.xs,
              backgroundColor: "black", // Importante para que no se superponga raro al hacer scroll
            }}
          >
            {title}
          </Typography>
        )}
        // 4. LA SOLUCIÓN AL CORTE: Espacio extra al final de la lista
        contentContainerStyle={{
          paddingBottom: 10, // Ajusta este valor (80, 100, 120) según el alto de tu menú inferior
        }}
        // Opcional: Hace que las fechas se queden pegadas arriba mientras haces scroll
        stickySectionHeadersEnabled={true}
      />
    </View>
  );
}
