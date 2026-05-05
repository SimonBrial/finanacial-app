import { FlatList, View } from "react-native";
import CategoryCard from "../../../components/transactions/category-card";
import useTheme from "../../../hook/useTheme";
import { useCategoriesStore } from "../../../store/useCategoriesStore";

export default function Categories() {
  const { sizes } = useTheme();
  const { categories } = useCategoriesStore();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: "black",
        gap: 8,
        paddingTop: sizes.lg,
      }}
    >
      <FlatList
        data={categories} // FlatList usa 'data' en lugar de 'sections'
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CategoryCard
            color={item.color}
            icon={item.icon}
            library={item.library}
            share={item.share}
            title={item.title}
            createdAt={item.createdAt}
            id={item.id}
            // 'key' no es necesario aquí porque ya está el keyExtractor
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: sizes.sm }} />}
        contentContainerStyle={{
          paddingBottom: 10,
        }}
      />
    </View>
  );
}
