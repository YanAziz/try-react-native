import { ActivityIndicator, StyleSheet } from "react-native";
import { ThemedView } from "./themed-view";

interface LoadingIndicatorProps {
  size?: "small" | "large";
  color?: string;
}

export function LoadingIndicator({
  size = "large",
  color,
}: LoadingIndicatorProps) {
  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
