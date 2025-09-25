import { ErrorMessage } from "@/components/ErrorMessage";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  clearError,
  clearProductDetail,
  fetchProductDetail,
} from "@/store/slices/productsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { productDetail, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetail(parseInt(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearProductDetail());
    };
  }, [dispatch]);

  const handleRetry = () => {
    if (id) {
      dispatch(clearError());
      dispatch(fetchProductDetail(parseInt(id)));
    }
  };

  const handleShare = async () => {
    if (productDetail) {
      try {
        await Share.share({
          message: `Check out this amazing product: ${
            productDetail.title
          } for $${productDetail.price.toFixed(2)}!`,
          url: `tokoku://product-detail/${productDetail.id}`,
          title: productDetail.title,
        });
      } catch {
        Alert.alert("Error", "Unable to share this product");
      }
    }
  };

  const handleAddToCart = () => {
    Alert.alert(
      "Added to Cart",
      `${quantity} x ${productDetail?.title} added to cart!`,
      [{ text: "OK", style: "default" }]
    );
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} />;
  }

  if (!productDetail) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Product not found</ThemedText>
      </ThemedView>
    );
  }

  const totalPrice = (productDetail.price * quantity).toFixed(2);

  return (
    <ThemedView style={styles.container}>
      <AnimatedScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: productDetail.image }}
            style={styles.mainImage}
            resizeMode="contain"
          />
          <View style={styles.imageOverlay}>
            <View style={styles.ratingBadge}>
              <ThemedText style={styles.overlayRatingText}>
                ⭐ {productDetail.rating.rate}
              </ThemedText>
            </View>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <ThemedText style={styles.shareText}>📤</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.headerSection}>
            <ThemedText type="title" style={styles.title}>
              {productDetail.title}
            </ThemedText>
            <View style={styles.priceRow}>
              <ThemedText type="title" style={styles.price}>
                ${totalPrice}
              </ThemedText>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <ThemedText style={styles.quantityButtonText}>−</ThemedText>
                </TouchableOpacity>
                <ThemedText style={styles.quantity}>{quantity}</ThemedText>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => setQuantity(quantity + 1)}
                >
                  <ThemedText style={styles.quantityButtonText}>+</ThemedText>
                </TouchableOpacity>
              </View>
            </View>
            <ThemedText style={styles.unitPrice}>
              ${productDetail.price.toFixed(2)} each
            </ThemedText>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <ThemedText style={styles.infoLabel}>Category</ThemedText>
                <ThemedText style={styles.infoValue}>
                  {productDetail.category}
                </ThemedText>
              </View>
              <View style={styles.infoItem}>
                <ThemedText style={styles.infoLabel}>Reviews</ThemedText>
                <ThemedText style={styles.infoValue}>
                  {productDetail.rating.count}
                </ThemedText>
              </View>
            </View>

            <View style={styles.ratingSection}>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <ThemedText
                    key={star}
                    style={[
                      styles.star,
                      star <= Math.floor(productDetail.rating.rate) &&
                        styles.starFilled,
                    ]}
                  >
                    {star <= Math.floor(productDetail.rating.rate) ? "⭐" : "☆"}
                  </ThemedText>
                ))}
              </View>
              <ThemedText style={styles.ratingText}>
                {productDetail.rating.rate} out of 5
              </ThemedText>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Description
            </ThemedText>
            <ThemedText style={styles.description}>
              {productDetail.description}
            </ThemedText>
          </View>

          <View style={styles.featuresSection}>
            <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
              Features
            </ThemedText>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <ThemedText style={styles.featureIcon}>✓</ThemedText>
                <ThemedText style={styles.featureText}>High Quality</ThemedText>
              </View>
              <View style={styles.featureItem}>
                <ThemedText style={styles.featureIcon}>✓</ThemedText>
                <ThemedText style={styles.featureText}>
                  Fast Shipping
                </ThemedText>
              </View>
              <View style={styles.featureItem}>
                <ThemedText style={styles.featureIcon}>✓</ThemedText>
                <ThemedText style={styles.featureText}>
                  30-Day Return
                </ThemedText>
              </View>
            </View>
          </View>
        </View>
      </AnimatedScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <ThemedText style={styles.addToCartText}>Add to Cart</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyNowButton}>
          <ThemedText style={styles.buyNowText}>Buy Now</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3f1ac5",
  },
  imageContainer: {
    position: "relative",
    backgroundColor: "#140841",
    padding: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  mainImage: {
    width: "100%",
    height: 250,
    borderRadius: 20,
  },
  imageOverlay: {
    position: "absolute",
    top: 30,
    right: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  ratingBadge: {
    backgroundColor: "#f39c12",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 10,
  },
  overlayRatingText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  shareButton: {
    backgroundColor: "#140841",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  shareText: {
    fontSize: 18,
  },
  contentContainer: {
    padding: 20,
  },
  headerSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    lineHeight: 30,
    color: "white",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 28,
    color: "#e6d21d",
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#140841",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  quantityButton: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: "center",
    color: "white",
  },
  unitPrice: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  infoSection: {
    backgroundColor: "#140841",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  ratingSection: {
    paddingTop: 8,
    alignItems: "center",
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  star: {
    fontSize: 20,
    color: "#bdc3c7",
    marginHorizontal: 2,
  },
  starFilled: {
    color: "#f39c12",
  },
  ratingText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "white",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "rgba(255, 255, 255, 0.9)",
  },
  featuresSection: {
    marginBottom: 100,
  },
  featureList: {
    backgroundColor: "#140841",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 16,
    color: "#1ac523",
    fontWeight: "bold",
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#140841",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    padding: 16,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: "#3498db",
    borderRadius: 12,
    paddingVertical: 16,
    marginRight: 8,
    alignItems: "center",
  },
  addToCartText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: "#1ac523",
    borderRadius: 12,
    paddingVertical: 16,
    marginLeft: 8,
    alignItems: "center",
  },
  buyNowText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
