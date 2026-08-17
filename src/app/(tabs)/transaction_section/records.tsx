import { SectionList, View } from "react-native";
import Typography from "../../../components/ui/typography";
import useTheme from "../../../hooks/useTheme";
import RecordCard from "../../../components/features/transactions/record-card";
import { useTransactionStore } from "../../../stores/useTransactionStore";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import "dayjs/locale/en";

// Esta configuración se hace una sola vez en el archivo principal de tu app
dayjs.extend(calendar);
dayjs.locale("en");

export const getFriendlyDate = (dateString: string): string => {
  return dayjs(dateString).calendar(null, {
    sameDay: "[Hoy]", // Si es hoy
    lastDay: "[Ayer]", // Si es ayer
    nextDay: "dddd YYYY / MM / DD", // (Opcional) Mañana
    lastWeek: "dddd YYYY / MM / DD", // Cualquier día de la semana pasada
    sameElse: "dddd YYYY / MM / DD", // Cualquier otra fecha más antigua
  });
};
// Opcional: import 'dayjs/locale/es' si quisieras que diga "LUNES 23 MAR 2026"

export const getCustomFormat = (dateString: string): string => {
  // El formato 'dddd DD MMM YYYY' genera la estructura base
  const formattedDate = dayjs(dateString).format("dddd DD MMM YYYY");

  // Convertimos todo a mayúsculas para cumplir con tu requisito
  return formattedDate.toUpperCase();
};

// Uso con uno de tus datos de prueba:
// getCustomFormat("2026-03-23T20:00:00Z")
// Retorna: "MONDAY 23 MAR 2026"

export default function Records() {
  const { globalStyles, sizes } = useTheme();
  const { transactions } = useTransactionStore();

  const grouped = transactions.reduce(
    (acc, tx) => {
      const dateStr = tx.date.split("T")[0];
      if (!acc[dateStr]) {
        acc[dateStr] = [];
      }
      acc[dateStr].push(tx);
      return acc;
    },
    {} as Record<string, typeof transactions>,
  );

  const TRANSACTIONS_DATA = Object.keys(grouped).map((dateStr) => ({
    title: dateStr,
    data: grouped[dateStr],
  }));

  return (
    <View style={{ flex: 1, backgroundColor: "transparent", opacity: 0.9 }}>
      <SectionList
        sections={TRANSACTIONS_DATA}
        keyExtractor={(item) => item.id}
        // 2. Renderizamos cada transacción
        renderItem={({ item }) => (
          // Aquí le pasarías los datos reales al RecordCard, ej: <RecordCard data={item} />
          <RecordCard
            locationSave={item.locationSave}
            category={item.category}
            library={item.library}
            amount={item.amount}
            title={item.title}
            color={item.color}
            date={item.date}
            icon={item.icon}
            bank={item.bank}
            type={item.type}
            id={item.id}
          />
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
              backgroundColor: "transparent", // Importante para que no se superponga raro al hacer scroll
            }}
          >
            {getFriendlyDate(title)}
          </Typography>
        )}
        // 4. LA SOLUCIÓN AL CORTE: Espacio extra al final de la lista
        contentContainerStyle={{
          paddingBottom: 10, // Ajusta este valor (80, 100, 120) según el alto de tu menú inferior
          backgroundColor: "transparent",
        }}
        // Opcional: Hace que las fechas se queden pegadas arriba mientras haces scroll
        stickySectionHeadersEnabled={true}
      />
    </View>
  );
}
