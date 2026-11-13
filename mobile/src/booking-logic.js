/* Booking rules for the phone app.
   Prices, tax, deposit, and Acuity URLs come from site-config.js.
   Cents math comes from pricing-math.js, the same formula site.js calls. */

const config = require("../../site-config");
const { calcFromCents } = require("../../pricing-math");

const UTILITY = [
  { id: "supply", label: "I can provide water and electricity" },
  { id: "bring", label: "Oscar needs to bring his own." },
];

function dollars(amount) {
  const n = Number(amount);
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function money(cents) {
  const n = Math.abs(cents);
  const whole = Math.floor(n / 100);
  const frac = n % 100;
  return (cents < 0 ? "-" : "") + "$" + whole.toLocaleString("en-US") + "." + (frac < 10 ? "0" : "") + frac;
}

function cleanUrl(url) {
  if (typeof url !== "string") return "";
  const value = url.trim();
  if (!/^https?:\/\//i.test(value)) return "";
  return value;
}

function resolveBookingUrl(service, tierId) {
  const raw = config.bookingUrls[service.bookingUrlKey];
  if (raw && typeof raw === "object") {
    if (tierId && raw[tierId]) return cleanUrl(raw[tierId]);
    return "";
  }
  return cleanUrl(raw);
}

function menuLines(price) {
  if (!price) return [];
  if (price.kind === "quote") {
    return [{ label: "", amount: "Contact for quote · Starting price on request" }];
  }
  if (price.kind === "label") return [{ label: "", amount: price.label }];
  if (price.kind === "tiers") {
    return price.tiers.map(function (tier) {
      return { id: tier.id, label: tier.label, amount: dollars(tier.amount) };
    });
  }
  const text = dollars(price.amount) + (price.qualifier ? " " + price.qualifier : "");
  if (price.kind === "starting") return [{ label: "Starting at", amount: text }];
  return [{ label: "", amount: text }];
}

function serviceAmount(price, tier) {
  if (tier) return tier.amount;
  if (price && price.amount != null && price.kind !== "quote" && price.kind !== "label") return price.amount;
  return null;
}

function acidApplies(service) {
  const spec = config.prices.acidWash;
  return !!(spec && spec.appliesTo && spec.appliesTo.indexOf(service.priceKey) !== -1);
}

function acidTierAmount(sizeId) {
  const tiers = (config.prices.acidWash && config.prices.acidWash.tiers) || [];
  for (let i = 0; i < tiers.length; i++) {
    if (tiers[i].id === sizeId) return tiers[i];
  }
  return null;
}

function acidChoice(tier, acidWash, acidSize) {
  if (!acidWash) return { amount: 0, pending: false, label: "" };
  const size = tier && (tier.id === "sedan" || tier.id === "mid-small" || tier.id === "large") ? tier.id : acidSize;
  const match = acidTierAmount(size);
  if (match) return { amount: match.amount, pending: false, label: match.label };
  return { amount: 0, pending: true, label: "" };
}

function emptySelection() {
  return { tierId: "", pay: "", acidWash: false, petHair: false, acidSize: "" };
}

function oneParam(value) {
  if (Array.isArray(value)) return value[0] || "";
  return value || "";
}

function selectionFromParams(params) {
  return {
    tierId: oneParam(params.tier),
    pay: oneParam(params.pay),
    acidWash: oneParam(params.acid) === "1",
    petHair: oneParam(params.pet) === "1",
    acidSize: oneParam(params.acidSize),
  };
}

function checkoutFor(serviceId, selection) {
  const service = config.services[serviceId];
  if (!service) return null;
  const price = config.prices[service.priceKey] || null;
  const tier = price && price.tiers ? price.tiers.find(function (item) { return item.id === selection.tierId; }) || null : null;
  const amount = serviceAmount(price, tier);
  const showAcid = amount != null && acidApplies(service);
  const acid = showAcid ? acidChoice(tier, !!selection.acidWash, selection.acidSize) : { amount: 0, pending: false, label: "" };
  const showPet = !!(amount != null && service.needsUtility && config.prices.petHair && !service.quoteForm);
  const pet = showPet && selection.petHair ? config.prices.petHair.amount : 0;
  const needsTier = !!(price && price.tiers);
  const optionsReady = (!needsTier || !!tier) && (service.quoteForm || !!selection.pay) && !acid.pending;
  let parts = null;
  if (!service.quoteForm && amount != null && selection.pay && !acid.pending) {
    const serviceCents = Math.round(amount * 100);
    const petCents = Math.round((pet || 0) * 100);
    const acidCents = Math.round((acid.amount || 0) * 100);
    parts = {
      service: serviceCents,
      pet: petCents,
      acid: acidCents,
      totals: calcFromCents(serviceCents + petCents + acidCents, selection.pay, config.policies),
    };
  }
  return {
    service: service,
    price: price,
    tier: tier,
    amount: amount,
    showAcid: showAcid,
    acid: acid,
    showPet: showPet,
    pet: pet,
    showPay: !service.quoteForm,
    parts: parts,
    url: resolveBookingUrl(service, tier && tier.id),
    optionsReady: optionsReady,
    lines: menuLines(price),
    acidNeedsSize: !!(selection.acidWash && tier && tier.id === "sedan-or-mid-small"),
  };
}

function submitReady(quote, gates) {
  if (!quote || !quote.optionsReady) return false;
  if (!gates || !gates.agreed) return false;
  if (quote.service.needsUtility && gates.utility !== "supply" && gates.utility !== "bring") return false;
  return true;
}

function utilityLabel(id) {
  const match = UTILITY.find(function (item) { return item.id === id; });
  return match ? match.label : "";
}

/* Customers cannot cancel. There is no 8-hour window.
   cancellationCutoffHours in site-config is not used here. */
function policySentences() {
  const deposit = config.policies.depositPercent;
  return [
    "You cannot cancel. The only option is to reschedule.",
    "There is no cancellation window.",
    "The deposit is " + deposit + "% of the service price after tax. It is non-refundable, with no exceptions. If you reschedule, the deposit rolls over to the new appointment.",
    "Detailing, filming, and editing use the same rule.",
  ];
}

function termsParagraphs() {
  const tax = config.policies;
  const area = config.serviceArea;
  return [
    "Starting prices can increase depending on the condition of the vehicle. Oscar confirms the final quote.",
    "While you browse, the price shown is the starting price, with no tax line. At checkout, a card payment adds " + tax.taxPercent + "% " + tax.taxPlace + " sales tax (Utah Tax Commission location " + tax.taxLocationCode + ") as its own line. Cash has no tax.",
    "The deposit is " + tax.depositPercent + "% of that total. On cash, tax is zero, so the deposit is " + tax.depositPercent + "% of the service price.",
  ].concat(policySentences()).concat([
    "No travel fee within " + area.freeRadiusMiles + " miles of " + area.base + ". Outside that, a travel fee applies and is quoted when you book.",
    "This app does not collect card numbers. The booking opens in Acuity Scheduling.",
  ]);
}

function shopHref(specific) {
  const direct = cleanUrl(specific);
  if (direct) return direct;
  const store = cleanUrl(config.shopify.storeUrl);
  if (!store) return "";
  return store.replace(/\/$/, "") + "/collections/all";
}

function smsHref(body) {
  return "sms:" + config.phoneSms + "?&body=" + encodeURIComponent(body);
}

function smsBody(quote, selection, utility) {
  const lines = ["Booking request", "Service: " + quote.service.name];
  if (quote.tier) lines.push("Vehicle: " + quote.tier.label);
  if (quote.price && quote.price.kind === "quote") lines.push("Price: Contact for quote / starting price on request");
  else if (quote.tier) lines.push("Starting price: " + dollars(quote.tier.amount));
  else if (quote.amount != null) lines.push("Price: " + dollars(quote.amount));
  if (quote.parts && quote.parts.acid) lines.push("Acid wash: " + money(quote.parts.acid));
  if (quote.parts && quote.parts.pet) lines.push("Pet hair removal: " + money(quote.parts.pet));
  if (selection.pay) lines.push("Pay: " + (selection.pay === "card" ? "Card" : "Cash"));
  if (quote.parts) {
    lines.push("Tax: " + money(quote.parts.totals.tax));
    lines.push("Total: " + money(quote.parts.totals.total));
    lines.push("Deposit (" + config.policies.depositPercent + "%): " + money(quote.parts.totals.deposit));
  }
  if (quote.service.needsUtility) lines.push("Water and electricity: " + utilityLabel(utility));
  lines.push("You cannot cancel. Reschedule only. The deposit rolls over.");
  return lines.join("\n");
}

module.exports = {
  config: config,
  UTILITY: UTILITY,
  dollars: dollars,
  money: money,
  cleanUrl: cleanUrl,
  menuLines: menuLines,
  checkoutFor: checkoutFor,
  submitReady: submitReady,
  utilityLabel: utilityLabel,
  policySentences: policySentences,
  termsParagraphs: termsParagraphs,
  shopHref: shopHref,
  smsHref: smsHref,
  smsBody: smsBody,
  selectionFromParams: selectionFromParams,
  emptySelection: emptySelection,
  resolveBookingUrl: resolveBookingUrl,
};
