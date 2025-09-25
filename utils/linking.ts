import { Linking } from "react-native";

export const deepLinkingConfig = {
  prefixes: ["tokoku://", "https://tokoku.app"],
  config: {
    screens: {
      "(tabs)": {
        screens: {
          index: "home",
          explore: "explore",
        },
      },
      "product-detail": "products/:id",
    },
  },
};

export function handleDeepLink(url: string) {
  try {
    const parsedUrl = new URL(url);
    const path = parsedUrl.pathname;
    const productIdMatch = path.match(/\/products\/(\d+)/);

    if (productIdMatch) {
      return {
        screen: "product-detail",
        params: { id: productIdMatch[1] },
      };
    }

    return null;
  } catch (error) {
    console.error("Error parsing deep link:", error);
    return null;
  }
}

export async function openDeepLink(url: string) {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    console.error("Cannot open URL:", url);
  }
}
