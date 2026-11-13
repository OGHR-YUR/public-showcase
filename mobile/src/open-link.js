import { Linking, Platform } from "react-native";

export function openExternal(url) {
  if (!url) return;
  if (Platform.OS === "web" && typeof window !== "undefined" && window.open && /^https?:\/\//i.test(url)) {
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }
  Linking.openURL(url);
}
