import { SectionList, View } from "react-native";
import CategoryCard from "../../../components/transactions/category-card";
import useTheme from "../../../hook/useTheme";
import { IconLibrary } from "../../../types/type";

export default function Categories() {
  const { sizes } = useTheme();

  const CATEGORIES_DATA: {
    title: string;
    data: {
      id: number;
      title: string;
      icon: string;
      library: IconLibrary;
      share: boolean;
      color: string;
    }[];
  }[] = [
      {
        title: "test",
        data: [
          {
            id: 1,
            title: "food",
            icon: "fast-food-outline",
            library: "Ionicons",
            share: true,
            color: "#ddd013",
          },
          {
            id: 2,
            title: "food",
            icon: "fast-food-outline",
            library: "Ionicons",
            share: false,
            color: "#dd1390",
          },
          {
            id: 3,
            title: "food",
            icon: "fast-food-outline",
            library: "Ionicons",
            share: true,
            color: "#13dd67",
          },
          {
            id: 4,
            title: "food",
            icon: "fast-food-outline",
            library: "Ionicons",
            share: false,
            color: "#dd6413",
          },
          {
            id: 5,
            title: "food",
            icon: "fast-food-outline",
            library: "Ionicons",
            share: true,
            color: "#dd132e",
          },
          {
            id: 6,
            title: "food",
            icon: "fast-food-outline",
            library: "Ionicons",
            share: true,
            color: "#dd13cc",
          },
          {
            id: 7,
            title: "food",
            icon: "fast-food-outline",
            library: "Ionicons",
            share: true,
            color: "#3f13dd",
          },
          {
            id: 8,
            title: "food",
            icon: "fast-food-outline",
            library: "Ionicons",
            share: true,
            color: "#1add13",
          },
          {
            id: 9,
            title: "food",
            icon: "fast-food-outline",
            library: "Ionicons",
            share: true,
            color: "#13a4dd",
          },
        ],
      },
    ];
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "black",
        gap: 8,
      }}
    >
      <SectionList
        sections={CATEGORIES_DATA}
        keyExtractor={(item) => item.id.toString()}
        // 2. Renderizamos cada transacción
        renderItem={({ item }) => (
          // Aquí le pasarías los datos reales al RecordCard, ej: <RecordCard data={item} />
          <CategoryCard
            color={item.color}
            icon={item.icon}
            library={item.library}
            share={item.share}
            title={item.title}
            key={item.id}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: sizes.sm }} />}
        // 4. LA SOLUCIÓN AL CORTE: Espacio extra al final de la lista
        contentContainerStyle={{
          paddingBottom: 10, // Ajusta este valor (80, 100, 120) según el alto de tu menú inferior
        }}
      // Opcional: Hace que las fechas se queden pegadas arriba mientras haces scroll
      //stickySectionHeadersEnabled={true}
      />
    </View>
  );
}
