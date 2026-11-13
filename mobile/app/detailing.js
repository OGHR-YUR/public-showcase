import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Body, Header, Screen, ServiceCard, offerNote, serviceLines } from "../src/blocks";
import { detailingMenu } from "../src/catalog";
import { config, dollars } from "../src/booking-logic";
import { useTheme } from "../src/theme";

function pad(n) {
  return String(n).padStart(2, "0");
}

export default function DetailingScreen() {
  const { styles } = useTheme();
  const router = useRouter();
  return (
    <Screen>
      <Header back />
      <Body testID="screen-detailing">
        <Text style={styles.kicker}>O.G.AutoSpa</Text>
        <Text style={styles.title}>Detailing</Text>
        <Text style={styles.lede}>
          Starting prices. They can increase depending on the condition of the vehicle. Sedans and coupes share a price. Regular-cab and extended-cab trucks use the midsize or small truck price, or the large truck price.
        </Text>
        <ViewNote>
          This list is the starting price only. There is no tax line here. Card tax is added at checkout. Cash has no tax.
        </ViewNote>
        <Text style={styles.fine}>
          No travel fee within {config.serviceArea.freeRadiusMiles} miles of {config.serviceArea.base}. Appointments that start after {config.fees.detailingAfterHoursAfter} add a flat {dollars(config.fees.detailingAfterHours)} after-hours fee to the balance.
        </Text>
        <Text style={styles.fine}>{offerNote()}</Text>
        {detailingMenu.map(function (item, index) {
          if (item.type === "addon") {
            return (
              <ServiceCard
                key={item.priceKey}
                number={pad(index + 1)}
                title={item.name}
                blurb={item.blurb}
                lines={serviceLines(item.priceKey)}
                priceTestID={"menu-" + item.priceKey}
              />
            );
          }
          const service = config.services[item.id];
          return (
            <ServiceCard
              key={item.id}
              number={pad(index + 1)}
              title={service.name}
              blurb={item.blurb}
              lines={serviceLines(service.priceKey)}
              priceTestID={"menu-" + item.id}
              bookTestID={"book-" + item.id}
              action={service.quoteForm ? "Request a quote" : "Book"}
              onAction={() => router.push({ pathname: "/summary", params: { service: item.id } })}
            />
          );
        })}
        <Text style={styles.fine}>
          The deposit is {config.policies.depositPercent}% of the price after tax. You cannot cancel. You can reschedule, and the deposit rolls over. It is non-refundable, with no exceptions. The same rule applies to filming and editing.
        </Text>
      </Body>
    </Screen>
  );
}

function ViewNote({ children }) {
  const { styles } = useTheme();
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>{children}</Text>
    </View>
  );
}
