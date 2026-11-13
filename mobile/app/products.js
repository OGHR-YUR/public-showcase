import { Text, View } from "react-native";
import { Body, Header, PrimaryButton, Screen } from "../src/blocks";
import { config, dollars, shopHref } from "../src/booking-logic";
import { openExternal } from "../src/open-link";
import { useTheme } from "../src/theme";

export default function ProductsScreen() {
  const { styles } = useTheme();
  const tee = shopHref(config.shopify.racingTeeUrl);
  const hoodie = shopHref(config.shopify.hoodieUrl);
  const bags = shopHref(config.shopify.shoulderBagsUrl);
  const catalog = config.catalog.url;
  return (
    <Screen>
      <Header back />
      <Body testID="screen-products">
        <Text style={styles.kicker}>O.G.Products</Text>
        <Text style={styles.title}>Merch</Text>
        <Text style={styles.lede}>
          Merch checks out on Shopify. This app does not have a cart and does not take payment for shirts, hoodies, or bags.
        </Text>
        {config.shopify.passwordProtected ? (
          <View style={styles.banner}>
            <Text style={styles.bannerText}>
              The Shopify store password stays on until Oscar fully releases it. These links open that store, which shows the password page until then.
            </Text>
          </View>
        ) : null}
        <Text style={styles.cardTitle}>Racing tee</Text>
        <PrimaryButton label="View on Shopify" testID="shop-tee" onPress={() => openExternal(tee)} />
        <Text style={styles.cardTitle}>Hoodie</Text>
        <PrimaryButton label="View on Shopify" testID="shop-hoodie" onPress={() => openExternal(hoodie)} />
        <Text style={styles.cardTitle}>Shoulder bags</Text>
        <Text style={styles.lede}>{dollars(config.prices.shoulderBag.amount)} each. Checkout stays on Shopify.</Text>
        {config.bags.map(function (bag) {
          return <Text key={bag.name} style={styles.fine}>{bag.name}</Text>;
        })}
        <PrimaryButton label="View the bags on Shopify" testID="shop-bags" onPress={() => openExternal(bags)} />
        <Text style={styles.label}>Affiliate catalog</Text>
        <Text style={styles.lede}>
          The catalog of {config.catalog.pickCount} picks lives on the existing O.G.Products site. You leave this app to view them on Amazon. Prices and checkout are on Amazon.
        </Text>
        <PrimaryButton label={"Browse the " + config.catalog.pickCount + " picks"} testID="shop-catalog" onPress={() => openExternal(catalog)} />
      </Body>
    </Screen>
  );
}
