import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

export default function ExploreScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        About XYZ Store
      </ThemedText>

      <ThemedText style={styles.description}>
        Welcome to XYZ Store, your favorite e-commerce app built with React
        Native and Expo Router.
      </ThemedText>

      <ThemedText type="subtitle" style={styles.subtitle}>
        Features:
      </ThemedText>

      <ThemedText style={styles.feature}>
        • Browse products from our catalog
      </ThemedText>

      <ThemedText style={styles.feature}>
        • View detailed product information
      </ThemedText>

      <ThemedText style={styles.feature}>
        • Deep linking support for direct product access
      </ThemedText>

      <ThemedText style={styles.feature}>
        • Real-time data with Redux Thunk
      </ThemedText>

      <ThemedText type="subtitle" style={styles.subtitle}>
        Try Deep Linking:
      </ThemedText>

      <Link href="/product-detail/1" style={styles.link}>
        <ThemedText type="link">View Product 1</ThemedText>
      </Link>

      <Link href="/product-detail/2" style={styles.link}>
        <ThemedText type="link">View Product 2</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginTop: 44,
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    marginBottom: 24,
    lineHeight: 24,
  },
  subtitle: {
    marginTop: 24,
    marginBottom: 8,
  },
  feature: {
    marginBottom: 8,
    lineHeight: 20,
  },
  link: {
    marginBottom: 12,
  },
});
