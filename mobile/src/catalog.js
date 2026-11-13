/* Menu order and short descriptions from the website.
   Dollar amounts are not stored here. They are read from site-config.js. */

export const storeNote =
  "This app targets the Apple App Store and Google Play from one Expo project. It has not been submitted to either store. Submitting still needs Oscar's Apple Developer account and Google Play Console account. This build does not sign in to Apple or Google, and it does not spend money to publish.";

export const footageUrl =
  "https://www.dropbox.com/scl/fo/sbfpjallkhtsvq1ffmpup/AAX2t2ay74C5IrpzEY804Vk?rlkey=fpohmqtg0uri4g5lo3x1vymim&st=xrkfwr0e&dl=0";

export const detailingMenu = [
  { type: "service", id: "exteriorOnly", blurb: "Exterior wash with a light interior vacuum. Paint, wheels and tires, and glass." },
  { type: "service", id: "standardInteriorExterior", blurb: "Interior and exterior together. The everyday full detail." },
  { type: "service", id: "premiumInteriorExterior", blurb: "Interior and exterior with steam, extraction, and clay." },
  { type: "service", id: "standardInteriorOnly", blurb: "The cabin on its own: vacuum, wipe-down, and a reset of the interior." },
  { type: "service", id: "premiumInteriorOnly", blurb: "Interior only, with steam and extraction." },
  {
    type: "addon",
    priceKey: "petHair",
    name: "Pet Hair Removal",
    blurb: "Optional add-on on a detail. Starting price, before tax. It can go up depending on how much hair is in the vehicle. Choose it in the booking summary.",
  },
  {
    type: "addon",
    priceKey: "acidWash",
    name: "Acid Wash",
    blurb: "Add-on for Exterior Only, Standard Interior & Exterior, and Premium Interior & Exterior. The price is before tax. Choose it in the booking summary. It does not change the Acuity link.",
  },
  { type: "service", id: "maintenance", blurb: "Upkeep between fuller details. Ask Oscar for the starting price for your vehicle." },
  {
    type: "service",
    id: "maintenanceDetail",
    blurb: "The upkeep detail that keeps a clean car clean. It takes a quote and authorization from O.G. first: a previous O.G. detail, or Oscar's OK before you book.",
  },
  { type: "service", id: "interiorExteriorWash", blurb: "Hand wash, wheels and tires, and glass outside; vacuum, wipe-down, and glass inside." },
  { type: "service", id: "deepInterior", blurb: "Seats and carpets extracted, leather cleaned and conditioned, vents, trim, and glass." },
  { type: "service", id: "signatureDetail", blurb: "Oscar's signature detail. The quote depends on the vehicle and its condition." },
  { type: "service", id: "paintCorrection", blurb: "Swirls and haze cut out panel by panel until the reflections run straight." },
  {
    type: "service",
    id: "interiorRestoration",
    blurb: "Neglected interiors brought back piece by piece. For a full restoration, text interior photos from all 4 sides to Oscar when you book.",
  },
  { type: "service", id: "polishOnly", blurb: "A gloss-focused polish. Up to a 5-step polish is available." },
  { type: "service", id: "polishAndWax", blurb: "Machine polish for swirls and haze, finished with wax." },
  { type: "service", id: "ceramicCoating12Month", blurb: "A year of ceramic protection: gloss, water beading, and paint that washes easier." },
  { type: "service", id: "ceramicCoating3to5Year", blurb: "Years of hard, glossy protection against Utah sun, road salt, and daily driving." },
  { type: "service", id: "wheelCeramicCoating", blurb: "Ceramic protection for the wheels so brake dust rinses off easier." },
  { type: "service", id: "interiorLeatherCeramicCoating", blurb: "Ceramic protection for interior leather so seats and trim resist stains and fading." },
  { type: "service", id: "windowTint", blurb: "Heat rejection, glare cut, and privacy, with clean edges." },
  { type: "service", id: "wraps", blurb: "Vinyl wraps that change the look of the vehicle and protect the paint underneath." },
  { type: "service", id: "semis", blurb: "Semi detailing, inside the cab, outside the rig, or both." },
  { type: "service", id: "engineBay", blurb: "The engine bay degreased, cleaned, and dressed." },
  { type: "service", id: "commercialAccounts", blurb: "Recurring detailing for businesses and fleets, on a schedule." },
];

export const filmingMenu = [
  { id: "filmingConcert", blurb: "Full sets filmed up close: the stage, the crowd, and the moments in between." },
  { id: "filmingClub", blurb: "DJ sets, live acts, and nightlife, filmed as the night actually feels." },
  { id: "filmingPrivate", blurb: "Parties and private gatherings filmed start to finish." },
  { id: "filmingCommunity", blurb: "Festivals, car meets, and neighborhood events." },
  { id: "filmingBirthday", blurb: "The entrance, the cake, the dancing, and everyone who showed up." },
  { id: "filmingOther", blurb: "Tell Oscar what you're planning." },
];

export const podcastGroups = [
  { title: "30-Minute Podcast", ids: ["podcast30Basic", "podcast30Standard", "podcast30Premium"] },
  { title: "1-Hour Podcast", ids: ["podcast60Basic", "podcast60Standard", "podcast60Premium"] },
  { title: "2-Hour Podcast", ids: ["podcast120Basic", "podcast120Standard", "podcast120Premium"] },
];

export const podcastMonthly = ["podcastStarter", "podcastGrowth", "podcastPro"];

export const eventEdits = ["eventBasic", "eventStandard", "eventPremium"];

export const editAddonKeys = [
  "addon3Clips",
  "addon5Clips",
  "addon10Clips",
  "addonThumbnail",
  "addonCaptions",
  "addonIntro",
  "addonRush",
  "addonRevision",
];
