import { Product } from "@/services/api";
import { Link } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product-detail/${product.id}`} asChild>
      <TouchableOpacity style={styles.card} activeOpacity={0.9}>
        <ThemedView style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.ratingBadge}>
              <ThemedText style={styles.ratingText}>
                ⭐ {product.rating.rate}
              </ThemedText>
            </View>
          </View>
          <ThemedView style={styles.info}>
            <ThemedText numberOfLines={2} style={styles.title}>
              {product.title}
            </ThemedText>
            <View style={styles.priceContainer}>
              <ThemedText type="title" style={styles.price}>
                ${product.price.toFixed(2)}
              </ThemedText>
              <ThemedText style={styles.category}>
                {product.category}
              </ThemedText>
            </View>
            <View style={styles.footer}>
              <ThemedText style={styles.reviews}>
                {product.rating.count} reviews
              </ThemedText>
              <View style={styles.shopButton}>
                <ThemedText style={styles.shopButtonText}>Shop Now</ThemedText>
              </View>
            </View>
          </ThemedView>
        </ThemedView>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  container: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#140841",
    borderRadius: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
  },
  imageContainer: {
    position: "relative",
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  ratingBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#f39c12",
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 32,
    alignItems: "center",
  },
  ratingText: {
    fontSize: 10,
    color: "white",
    fontWeight: "bold",
  },
  info: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
    marginBottom: 8,
    flex: 1,
  },
  priceContainer: {
    marginBottom: 12,
  },
  price: {
    fontSize: 20,
    color: "#e6d21d",
    fontWeight: "bold",
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: "white",
    textTransform: "capitalize",
    backgroundColor: "#2f158b",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reviews: {
    fontSize: 11,
    color: "#95a5a6",
  },
  shopButton: {
    backgroundColor: "#1ac523",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  shopButtonText: {
    fontSize: 11,
    color: "white",
    fontWeight: "600",
  },
});
