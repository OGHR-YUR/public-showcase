import { Pressable, Text } from "react-native";
import { useRouter } from "expo-router";
import { Body, Header, Screen } from "../src/blocks";
import { storeNote } from "../src/catalog";
import { config } from "../src/booking-logic";
import { openExternal } from "../src/open-link";
import { useTheme } from "../src/theme";

const brands = [
  {
    href: "/detailing",
    testID: "brand-autospa",
    name: "O.G.AutoSpa",
    body: "Mobile detailing around Kearns. Exterior, standard, and premium packages are starting prices and can increase with the condition of the vehicle.",
  },
  {
    href: "/filming",
    testID: "brand-productions",
    name: "O.G.Productions",
    body: "Live shows and events, filmed by Oscar G. Filming uses the same deposit rule as detailing.",
  },
  {
    href: "/edits",
    testID: "brand-edits",
    name: "O.G.Edits",
    body: "Podcast video editing and event editing. You send the footage. A deposit holds the start.",
  },
  {
    href: "/products",
    testID: "brand-products",
    name: "O.G.Products",
    body: "Merch stays a link to the Shopify store. The Amazon catalog stays affiliate-only. There is no cart in this app.",
  },
];

export default function HomeScreen() {
  const { styles } = useTheme();
  const router = useRouter();
  return (
    <Screen>
      <Header />
      <Body testID="screen-home">
        <Text style={styles.kicker}>Salt Lake City area · Utah</Text>
        <Text style={styles.title}>Four brands</Text>
        <Text style={styles.lede}>
          {config.publicName} runs O.G.AutoSpa, O.G.Productions, O.G.Edits, and O.G.Products. Detailing, filming, and editing share one calendar, so those bookings don't overlap. Acuity takes the appointment and the deposit.
        </Text>
        {brands.map(function (brand) {
          return (
            <Pressable
              key={brand.href}
              accessibilityRole="button"
              accessibilityLabel={brand.name}
              testID={brand.testID}
              onPress={() => router.push(brand.href)}
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            >
              <Text style={styles.cardTitle}>{brand.name}</Text>
              <Text style={styles.fine}>{brand.body}</Text>
              <Text style={styles.link}>Open</Text>
            </Pressable>
          );
        })}
        <Pressable accessibilityRole="button" testID="store-note" onPress={() => router.push("/stores")} style={styles.banner}>
          <Text style={styles.kicker}>App Store and Google Play</Text>
          <Text style={styles.bannerText}>{storeNote}</Text>
        </Pressable>
        <Text style={styles.fine}>
          Detailing: {config.emails.detailing}
        </Text>
        <Text
          style={styles.link}
          onPress={() => openExternal("mailto:" + config.emails.detailing)}
        >
          Email detailing
        </Text>
        <Text style={styles.fine}>Filming and edits: {config.emails.filmingAndEdits}</Text>
        <Text style={styles.fine}>
          No travel fee within {config.serviceArea.freeRadiusMiles} miles of {config.serviceArea.base}. Outside that, a travel fee applies and is quoted when you book.
        </Text>
      </Body>
    </Screen>
  );
}
