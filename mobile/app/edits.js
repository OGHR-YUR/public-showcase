import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Body, Header, Screen, ServiceCard, serviceLines } from "../src/blocks";
import { editAddonKeys, eventEdits, footageUrl, podcastGroups, podcastMonthly } from "../src/catalog";
import { config, policySentences } from "../src/booking-logic";
import { openExternal } from "../src/open-link";
import { useTheme } from "../src/theme";

export default function EditsScreen() {
  const { styles } = useTheme();
  const router = useRouter();
  let number = 0;
  function nextNumber() {
    number += 1;
    return String(number).padStart(2, "0");
  }
  return (
    <Screen>
      <Header back />
      <Body testID="screen-edits">
        <Text style={styles.kicker}>O.G.Edits</Text>
        <Text style={styles.title}>Editing</Text>
        <Text style={styles.lede}>
          Podcast and event edits. You provide the footage. Listed prices can still vary with footage quality and complexity. Questions: {config.emails.filmingAndEdits}.
        </Text>
        <Text style={styles.link} onPress={() => openExternal(footageUrl)}>Upload footage (Dropbox)</Text>
        <Text style={styles.label}>Podcast editing</Text>
        {podcastGroups.map(function (group) {
          return group.ids.map(function (id) {
            return <EditCard key={id} id={id} number={nextNumber()} onBook={() => router.push({ pathname: "/summary", params: { service: id } })} />;
          });
        })}
        <Text style={styles.label}>Monthly packages</Text>
        {podcastMonthly.map(function (id) {
          return <EditCard key={id} id={id} number={nextNumber()} onBook={() => router.push({ pathname: "/summary", params: { service: id } })} />;
        })}
        <Text style={styles.label}>Add-ons</Text>
        <Text style={styles.fine}>These are listed prices, not a cart. Mention them when you book an edit.</Text>
        {editAddonKeys.map(function (key) {
          const price = config.prices[key];
          return (
            <View key={key} style={styles.tierRow}>
              <Text style={styles.tierLabel}>{addonName(key)}</Text>
              <Text style={styles.tierPrice}>{price.label}</Text>
            </View>
          );
        })}
        <Text style={styles.label}>Event editing</Text>
        {eventEdits.map(function (id) {
          return <EditCard key={id} id={id} number={nextNumber()} onBook={() => router.push({ pathname: "/summary", params: { service: id } })} />;
        })}
        {policySentences().map(function (sentence) {
          return <Text key={sentence} style={styles.fine}>{sentence}</Text>;
        })}
      </Body>
    </Screen>
  );
}

function EditCard({ id, number, onBook }) {
  const service = config.services[id];
  return (
    <ServiceCard
      number={number}
      title={service.name}
      lines={serviceLines(service.priceKey)}
      bookTestID={"book-" + id}
      action="Book"
      onAction={onBook}
    />
  );
}

function addonName(key) {
  const names = {
    addon3Clips: "3 Short-Form Clips",
    addon5Clips: "5 Short-Form Clips",
    addon10Clips: "10 Short-Form Clips",
    addonThumbnail: "Thumbnail Design",
    addonCaptions: "Full-Episode Captions",
    addonIntro: "Custom Animated Intro/Outro",
    addonRush: "Rush Delivery",
    addonRevision: "Additional Revision Round",
  };
  return names[key] || key;
}
