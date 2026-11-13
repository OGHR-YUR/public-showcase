import { useState } from "react";
import { Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Body, CheckoutMath, Choice, Header, PrimaryButton, Screen } from "../src/blocks";
import { checkoutFor, config, dollars, policySentences, selectionFromParams } from "../src/booking-logic";
import { useTheme } from "../src/theme";

export default function SummaryScreen() {
  const params = useLocalSearchParams();
  const serviceId = Array.isArray(params.service) ? params.service[0] : params.service;
  const [selection, setSelection] = useState(function () { return selectionFromParams(params); });
  const { styles } = useTheme();
  const router = useRouter();
  const quote = checkoutFor(serviceId, selection);

  function patch(next) {
    setSelection(function (current) { return Object.assign({}, current, next); });
  }

  if (!quote) {
    return (
      <Screen>
        <Header back />
        <Body>
          <Text style={styles.title}>Service not found</Text>
          <Text style={styles.lede}>Go back and pick a service from the menu.</Text>
        </Body>
      </Screen>
    );
  }

  const price = quote.price;
  const acidPreview = quote.showAcid && quote.tier && !quote.acidNeedsSize && quote.tier.id !== "sedan-or-mid-small"
    ? acidAmountForTier(quote.tier.id)
    : null;

  return (
    <Screen>
      <Header back />
      <Body testID="screen-summary">
        <Text style={styles.kicker}>Price and deposit</Text>
        <Text style={styles.title}>{quote.service.name}</Text>
        <Text style={styles.fine}>Detailing, filming, and editing book onto one shared calendar so they don't overlap.</Text>

        {price && price.tiers ? (
          <>
            <Text style={styles.label}>Vehicle</Text>
            {price.tiers.map(function (tier) {
              return (
                <Choice
                  key={tier.id}
                  testID={"tier-" + tier.id}
                  label={tier.label + " — " + dollars(tier.amount)}
                  selected={selection.tierId === tier.id}
                  onPress={() => patch({ tierId: tier.id, acidSize: "" })}
                />
              );
            })}
            <Text style={styles.fine}>Starting price for that vehicle. It can increase depending on the condition. Tax is not included in these prices.</Text>
          </>
        ) : null}

        {price && price.kind === "quote" ? (
          <Text style={styles.lede}>Contact for quote. Starting price on request. It can increase depending on the condition of the vehicle.</Text>
        ) : null}

        {!price?.tiers && quote.amount != null ? (
          <Text style={styles.lede}>
            Starting price {dollars(quote.amount)}{price && price.qualifier ? " " + price.qualifier : ""}. Tax is not included here.
          </Text>
        ) : null}

        {quote.showAcid || quote.showPet ? (
          <>
            <Text style={styles.label}>Add-ons</Text>
            <Text style={styles.fine}>Add-on prices are before tax. Acid wash does not change the Acuity link.</Text>
            {quote.showAcid ? (
              <Choice
                role="checkbox"
                testID="addon-acid"
                label={"Add acid wash" + (acidPreview != null ? " — " + dollars(acidPreview) : "")}
                selected={selection.acidWash}
                onPress={() => patch({ acidWash: !selection.acidWash })}
              />
            ) : null}
            {quote.acidNeedsSize ? (
              <>
                <Choice testID="acid-sedan" label={"Sedan — " + dollars(acidAmountForTier("sedan"))} selected={selection.acidSize === "sedan"} onPress={() => patch({ acidSize: "sedan" })} />
                <Choice testID="acid-mid" label={"Midsize/small truck — " + dollars(acidAmountForTier("mid-small"))} selected={selection.acidSize === "mid-small"} onPress={() => patch({ acidSize: "mid-small" })} />
              </>
            ) : null}
            {quote.showPet ? (
              <Choice
                role="checkbox"
                testID="addon-pet"
                label={"Add pet hair removal — " + dollars(config.prices.petHair.amount) + " starting"}
                selected={selection.petHair}
                onPress={() => patch({ petHair: !selection.petHair })}
              />
            ) : null}
          </>
        ) : null}

        {quote.showPay ? (
          <>
            <Text style={styles.label}>How you'll pay the balance</Text>
            <Text style={styles.fine}>This chooses the tax. The app does not collect a card number.</Text>
            <Choice testID="pay-card" label="Card" selected={selection.pay === "card"} onPress={() => patch({ pay: "card" })} />
            <Choice testID="pay-cash" label="Cash" selected={selection.pay === "cash"} onPress={() => patch({ pay: "cash" })} />
          </>
        ) : (
          <Text style={styles.fine}>This opens a quote request. There is no deposit until Oscar sets a price.</Text>
        )}

        <CheckoutMath quote={quote} pay={selection.pay} />

        {quote.service.quoteForm ? null : quote.parts ? null : (
          <Text style={styles.fine}>Choose the options above to see the total and the deposit. The starting price on the menu has no tax line.</Text>
        )}

        {!quote.service.quoteForm && quote.optionsReady && price && price.kind === "quote" ? (
          <Text style={styles.fine}>
            Once Oscar sets the price, a card payment adds tax at {config.policies.taxPercent}% as its own line. Cash has no tax. The deposit is {config.policies.depositPercent}% of that total.
          </Text>
        ) : null}

        {quote.service.needsUtility ? (
          <Text style={styles.fine}>
            Appointments that start after {config.fees.detailingAfterHoursAfter} add a flat {dollars(config.fees.detailingAfterHours)} after-hours fee to the balance. That fee is not in the total above.
          </Text>
        ) : null}

        {policySentences().map(function (sentence) {
          return <Text key={sentence} style={styles.fine}>{sentence}</Text>;
        })}

        <PrimaryButton
          testID="continue-booking"
          label={quote.optionsReady ? "Continue to booking" : "Choose the options above"}
          disabled={!quote.optionsReady}
          onPress={() => {
            if (!quote.optionsReady) return;
            router.push({
              pathname: "/handoff",
              params: {
                service: serviceId,
                tier: selection.tierId,
                pay: selection.pay,
                acid: selection.acidWash ? "1" : "0",
                pet: selection.petHair ? "1" : "0",
                acidSize: selection.acidSize,
              },
            });
          }}
        />
      </Body>
    </Screen>
  );
}

function acidAmountForTier(id) {
  const tiers = config.prices.acidWash.tiers;
  const match = tiers.find(function (tier) { return tier.id === id; });
  return match ? match.amount : null;
}
