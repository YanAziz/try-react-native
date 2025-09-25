import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ProductCard } from "@/components/ProductCard";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Product } from "@/services/api";
import { clearError, fetchProducts } from "@/store/slices/productsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const [searchQuery] = useState("");
  const [scrollY] = useState(new Animated.Value(0));

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(clearError());
    dispatch(fetchProducts());
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0.8],
    extrapolate: "clamp",
  });

  if (loading && products.length === 0) {
    return <LoadingIndicator />;
  }

  if (error && products.length === 0) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  return (
    <ThemedView style={styles.container}>
      <Animated.View
        style={[
          styles.headerContainer,
          {
            opacity: headerOpacity,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, -20],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <ThemedText type="title" style={styles.header}>
          🛍️ XYZ Store
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Discover Amazing Products
        </ThemedText>
        <View style={styles.searchContainer}>
          <TouchableOpacity style={styles.searchBox}>
            <ThemedText style={styles.searchPlaceholder}>
              🔍 Search products...
            </ThemedText>
          </TouchableOpacity>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <ThemedText type="title" style={styles.statNumber}>
              {filteredProducts.length}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Products</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText type="title" style={styles.statNumber}>
              24/7
            </ThemedText>
            <ThemedText style={styles.statLabel}>Support</ThemedText>
          </View>
          <View style={styles.statItem}>
            <ThemedText type="title" style={styles.statNumber}>
              🚚
            </ThemedText>
            <ThemedText style={styles.statLabel}>Fast Delivery</ThemedText>
          </View>
        </View>
      </Animated.View>

      <AnimatedFlatList
        data={filteredProducts}
        keyExtractor={(item: unknown) => (item as Product).id.toString()}
        renderItem={({ item }: { item: unknown }) => (
          <ProductCard product={item as Product} />
        )}
        contentContainerStyle={styles.list}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        refreshing={loading}
        onRefresh={handleRetry}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <ThemedText type="title" style={styles.emptyTitle}>
              No products found
            </ThemedText>
            <ThemedText style={styles.emptySubtitle}>
              Try adjusting your search criteria
            </ThemedText>
          </View>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3f1ac5",
  },
  headerContainer: {
    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    marginBottom: 20,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchBox: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  searchPlaceholder: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 2,
  },
  list: {
    padding: 16,
    paddingTop: 20,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    color: "#7f8c8d",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#95a5a6",
    textAlign: "center",
  },
});
