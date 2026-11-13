/* ============================================================
   O.G. SITE CONFIG — edit this file only
   Prices, tax, deposit, cancellation cutoff, contacts,
   booking links, and ticket links all live here.
   Leave every booking URL and ticket URL as "" until you
   paste the real link. Do not put a placeholder URL here.
   ============================================================ */
var OG_CONFIG = {
  publicName: "Oscar G.",

  phoneDisplay: "385-346-8125",
  /* E.164 number used for sms: links. Display stays phoneDisplay. */
  phoneSms: "+13853468125",

  emails: {
    detailing: "o.g.autospa.services@gmail.com",
    filmingAndEdits: "ogproductions385@gmail.com",
    /* Planned catalog inbox. INACTIVE — the site does not show this address. */
    products: "ogproducts385@gmail.com",
    productsPublic: false
  },

  serviceArea: {
    base: "Kearns, UT",
    freeRadiusMiles: 30
  },

  /*
    Card payments add this rate as its own line in the booking summary.
    Cash has no tax. Salt Lake City combined rate, Utah Tax Commission
    location code 18-122, as of April 1, 2026.
    Edit taxPercent as a percent (8.45 means 8.45%).
  */
  policies: {
    taxPercent: 8.45,
    taxLocationCode: "18-122",
    taxAsOf: "2026-04-01",
    taxPlace: "Salt Lake City combined",
    /* Deposit is this percent of the service price AFTER tax. */
    depositPercent: 50,
    /* Hours before the appointment. */
    cancellationCutoffHours: 8
  },

  /*
    One shared Acuity calendar. A string is one appointment type.
    An object maps a vehicle-size id to that size's appointment type.
    Leave "" where Oscar has not created a type yet.
  */
  acuityOwner: "40723502",
  bookingUrls: {
    exteriorOnly: {
      "sedan-or-mid-small": "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415453",
      large: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415467"
    },
    standardInteriorExterior: {
      sedan: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415474",
      "mid-small": "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415481",
      large: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415490"
    },
    premiumInteriorExterior: {
      sedan: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415549",
      "mid-small": "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415491",
      large: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415497"
    },
    standardInteriorOnly: {
      sedan: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415555",
      "mid-small": "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415514",
      large: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415520"
    },
    premiumInteriorOnly: {
      sedan: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415560",
      "mid-small": "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415531",
      large: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415539"
    },
    maintenanceDetail: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415606",
    interiorExteriorWash: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415617",
    polishOnly: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415624",
    polishAndWax: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415635",
    deepInterior: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415643",
    signatureDetail: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415650",
    ceramicCoating12Month: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415662",
    ceramicCoating3to5Year: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415676",
    wheelCeramicCoating: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415698",
    interiorLeatherCeramicCoating: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415712",
    paintCorrection: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415716",
    interiorRestoration: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415637",
    windowTint: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415747",
    wraps: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415761",
    semis: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415766",
    filming: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415772",
    podcastEditing: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415785",
    eventEditing: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415792",
    consultationPhone15: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415803",
    consultationInPerson: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415812",
    general: "https://app.acuityscheduling.com/schedule.php?owner=40723502",
    /* No appointment type was provided for these. */
    maintenance: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100415606",
    petHair: "",
    engineBay: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100416389",
    commercialAccounts: "https://app.acuityscheduling.com/schedule.php?owner=40723502&appointmentType=100416403"
  },

  /* Every show is ticketed. Paste a ticket URL or leave "". */
  ticketUrls: {
    losVakerosOct30: "",
    theDescentOct31: "",
    micheladaFestNov1: "",
    losVakerosNov7: "",
    loveOnTheBlockNov22: ""
  },

  catalog: {
    /* Affiliate catalog. This site links out. It does not check out. */
    url: "https://ogproducts.netlify.app",
    pickCount: 134
  },

  /*
    Merch stays on Shopify. The store password stays on until you
    fully release it — do not remove that password in Shopify.
    Product URLs can stay "" and the buttons use storeUrl.
  */
  shopify: {
    storeUrl: "https://11u81s-f0.myshopify.com",
    passwordProtected: true,
    racingTeeUrl: "",
    hoodieUrl: "",
    shoulderBagsUrl: ""
  },

  /*
    Published offers already on the site. They come off the final
    total when the customer mentions them. They are not subtracted
    from the starting price on the menu.
  */
  offers: {
    firstDetailOff: 25,
    responderMilitaryPercent: 10
  },

  fees: {
    /* Flat fee added to the balance when a detailing appointment starts after this time. */
    detailingAfterHours: 50,
    detailingAfterHoursAfter: "8 PM",
    filmingMidweek: 50,
    filmingExtraHour: 100,
    filmingHoursIncluded: 4
  },

  /*
    kind:
      "tiers"    — customer picks a vehicle class in the summary
      "starting" — one starting price
      "listed"   — a listed edit price (may still vary; see note)
      "label"    — text only, such as a range
      "quote"    — contact for a quote; no dollar amount
    Coupes use the sedan price. Regular cabs and extended cabs are
    not separate rows; trucks are midsize/small or large.
  */
  prices: {
    exteriorOnly: {
      kind: "tiers",
      tiers: [
        { id: "sedan-or-mid-small", label: "Sedan or midsize/small truck", amount: 85 },
        { id: "large", label: "Large SUV, 3-row, van, or large truck", amount: 105 }
      ]
    },
    standardInteriorExterior: {
      kind: "tiers",
      tiers: [
        { id: "sedan", label: "Sedan", amount: 200 },
        { id: "mid-small", label: "Midsize/small truck", amount: 220 },
        { id: "large", label: "Large SUV, 3-row, van, or large truck", amount: 240 }
      ]
    },
    premiumInteriorExterior: {
      kind: "tiers",
      tiers: [
        { id: "sedan", label: "Sedan", amount: 250 },
        { id: "mid-small", label: "Midsize/small truck", amount: 280 },
        { id: "large", label: "Large SUV, 3-row, van, or large truck", amount: 315 }
      ]
    },
    standardInteriorOnly: {
      kind: "tiers",
      tiers: [
        { id: "sedan", label: "Sedan", amount: 150 },
        { id: "mid-small", label: "Midsize/small truck", amount: 160 },
        { id: "large", label: "Large SUV, 3-row, van, or large truck", amount: 180 }
      ]
    },
    premiumInteriorOnly: {
      kind: "tiers",
      tiers: [
        { id: "sedan", label: "Sedan", amount: 200 },
        { id: "mid-small", label: "Midsize/small truck", amount: 225 },
        { id: "large", label: "Large SUV, 3-row, van, or large truck", amount: 250 }
      ]
    },
    petHair: { kind: "starting", amount: 30 },
    acidWash: {
      kind: "tiers",
      appliesTo: ["exteriorOnly", "standardInteriorExterior", "premiumInteriorExterior"],
      tiers: [
        { id: "sedan", label: "Sedan", amount: 40 },
        { id: "mid-small", label: "Midsize/small truck", amount: 50 },
        { id: "large", label: "Large SUV, 3-row, van, or large truck", amount: 50 }
      ]
    },
    maintenance: { kind: "quote" },
    maintenanceDetail: { kind: "quote" },
    interiorExteriorWash: { kind: "quote" },
    deepInterior: { kind: "quote" },
    signatureDetail: { kind: "quote" },
    paintCorrection: { kind: "quote" },
    interiorRestoration: { kind: "quote" },
    polishOnly: { kind: "quote" },
    polishAndWax: { kind: "quote" },
    ceramicCoating12Month: { kind: "quote" },
    ceramicCoating3to5Year: { kind: "quote" },
    wheelCeramicCoating: { kind: "quote" },
    interiorLeatherCeramicCoating: { kind: "quote" },
    windowTint: { kind: "quote" },
    wraps: { kind: "quote" },
    semis: { kind: "quote" },
    engineBay: { kind: "starting", amount: 50 },
    commercialAccounts: { kind: "quote" },

    filmingConcert: { kind: "starting", amount: 500 },
    filmingClub: { kind: "starting", amount: 350 },
    filmingPrivate: { kind: "starting", amount: 500 },
    filmingCommunity: { kind: "starting", amount: 350 },
    filmingBirthday: { kind: "starting", amount: 350 },
    filmingOther: { kind: "starting", amount: 350 },

    podcast30Basic: { kind: "listed", amount: 100 },
    podcast30Standard: { kind: "listed", amount: 150 },
    podcast30Premium: { kind: "listed", amount: 225 },
    podcast60Basic: { kind: "listed", amount: 150 },
    podcast60Standard: { kind: "listed", amount: 225 },
    podcast60Premium: { kind: "listed", amount: 350 },
    podcast120Basic: { kind: "listed", amount: 250 },
    podcast120Standard: { kind: "listed", amount: 350 },
    podcast120Premium: { kind: "listed", amount: 500 },
    podcastStarter: { kind: "listed", amount: 350, qualifier: "/month" },
    podcastGrowth: { kind: "listed", amount: 800, qualifier: "/month" },
    podcastPro: { kind: "listed", amount: 1250, qualifier: "/month" },

    eventBasic: { kind: "listed", amount: 200 },
    eventStandard: { kind: "listed", amount: 250 },
    eventPremium: { kind: "listed", amount: 400 },

    addon3Clips: { kind: "label", label: "$75" },
    addon5Clips: { kind: "label", label: "$125" },
    addon10Clips: { kind: "label", label: "$225" },
    addonThumbnail: { kind: "label", label: "$25–$50" },
    addonCaptions: { kind: "label", label: "$25–$75" },
    addonIntro: { kind: "label", label: "$75–$200" },
    addonRush: { kind: "label", label: "Additional 25–50%" },
    addonRevision: { kind: "label", label: "$40–$75" },

    partnerBasic: { kind: "listed", amount: 800, qualifier: "one-time" },
    partnerBooking: { kind: "listed", amount: 1200, qualifier: "one-time" },

    shoulderBag: { kind: "listed", amount: 180 }
  },

  /*
    What the booking summary knows about each button.
    bookingUrlKey must match a key in bookingUrls.
    needsUtility is the water-and-power choice (detailing only).
  */
  services: {
    exteriorOnly: {
      name: "Exterior Only",
      group: "detail",
      bookingUrlKey: "exteriorOnly",
      priceKey: "exteriorOnly",
      needsUtility: true
    },
    standardInteriorExterior: {
      name: "Standard Interior & Exterior",
      group: "detail",
      bookingUrlKey: "standardInteriorExterior",
      priceKey: "standardInteriorExterior",
      needsUtility: true
    },
    premiumInteriorExterior: {
      name: "Premium Interior & Exterior",
      group: "detail",
      bookingUrlKey: "premiumInteriorExterior",
      priceKey: "premiumInteriorExterior",
      needsUtility: true
    },
    standardInteriorOnly: {
      name: "Standard Interior Only",
      group: "detail",
      bookingUrlKey: "standardInteriorOnly",
      priceKey: "standardInteriorOnly",
      needsUtility: true
    },
    premiumInteriorOnly: {
      name: "Premium Interior Only",
      group: "detail",
      bookingUrlKey: "premiumInteriorOnly",
      priceKey: "premiumInteriorOnly",
      needsUtility: true
    },
    maintenance: {
      name: "Maintenance",
      group: "detail",
      bookingUrlKey: "maintenance",
      priceKey: "maintenance",
      needsUtility: true,
      quoteForm: true
    },
    maintenanceDetail: {
      name: "Maintenance Detail",
      group: "detail",
      bookingUrlKey: "maintenanceDetail",
      priceKey: "maintenanceDetail",
      needsUtility: true
    },
    interiorExteriorWash: {
      name: "Interior & Exterior Wash",
      group: "detail",
      bookingUrlKey: "interiorExteriorWash",
      priceKey: "interiorExteriorWash",
      needsUtility: true
    },
    deepInterior: {
      name: "Deep Interior",
      group: "detail",
      bookingUrlKey: "deepInterior",
      priceKey: "deepInterior",
      needsUtility: true
    },
    signatureDetail: {
      name: "Signature Detail",
      group: "detail",
      bookingUrlKey: "signatureDetail",
      priceKey: "signatureDetail",
      needsUtility: true
    },
    paintCorrection: {
      name: "Paint Correction",
      group: "detail",
      bookingUrlKey: "paintCorrection",
      priceKey: "paintCorrection",
      needsUtility: true
    },
    interiorRestoration: {
      name: "Interior Restoration",
      group: "detail",
      bookingUrlKey: "interiorRestoration",
      priceKey: "interiorRestoration",
      needsUtility: true
    },
    polishOnly: {
      name: "Polish Only",
      group: "detail",
      bookingUrlKey: "polishOnly",
      priceKey: "polishOnly",
      needsUtility: true
    },
    polishAndWax: {
      name: "Polish & Wax",
      group: "detail",
      bookingUrlKey: "polishAndWax",
      priceKey: "polishAndWax",
      needsUtility: true
    },
    ceramicCoating12Month: {
      name: "Ceramic Coating — 12 Month",
      group: "detail",
      bookingUrlKey: "ceramicCoating12Month",
      priceKey: "ceramicCoating12Month",
      needsUtility: true
    },
    ceramicCoating3to5Year: {
      name: "Ceramic Coating — 3 to 5 Year",
      group: "detail",
      bookingUrlKey: "ceramicCoating3to5Year",
      priceKey: "ceramicCoating3to5Year",
      needsUtility: true
    },
    wheelCeramicCoating: {
      name: "Wheel Ceramic Coating",
      group: "detail",
      bookingUrlKey: "wheelCeramicCoating",
      priceKey: "wheelCeramicCoating",
      needsUtility: true
    },
    interiorLeatherCeramicCoating: {
      name: "Interior Leather Ceramic Coating",
      group: "detail",
      bookingUrlKey: "interiorLeatherCeramicCoating",
      priceKey: "interiorLeatherCeramicCoating",
      needsUtility: true
    },
    windowTint: {
      name: "Window Tint",
      group: "detail",
      bookingUrlKey: "windowTint",
      priceKey: "windowTint",
      needsUtility: true
    },
    wraps: {
      name: "Wraps",
      group: "detail",
      bookingUrlKey: "wraps",
      priceKey: "wraps",
      needsUtility: true
    },
    semis: {
      name: "Semis",
      group: "detail",
      bookingUrlKey: "semis",
      priceKey: "semis",
      needsUtility: true
    },
    engineBay: {
      name: "Engine Bay Cleaning",
      group: "detail",
      bookingUrlKey: "engineBay",
      priceKey: "engineBay",
      needsUtility: true,
      quoteForm: true
    },
    commercialAccounts: {
      name: "Commercial Accounts",
      group: "detail",
      bookingUrlKey: "commercialAccounts",
      priceKey: "commercialAccounts",
      needsUtility: true,
      quoteForm: true
    },
    filmingConcert: {
      name: "Filming — Concert / Live Show",
      group: "film",
      bookingUrlKey: "filming",
      priceKey: "filmingConcert",
      needsUtility: false
    },
    filmingClub: {
      name: "Filming — Club / Bar",
      group: "film",
      bookingUrlKey: "filming",
      priceKey: "filmingClub",
      needsUtility: false
    },
    filmingPrivate: {
      name: "Filming — Private Event",
      group: "film",
      bookingUrlKey: "filming",
      priceKey: "filmingPrivate",
      needsUtility: false
    },
    filmingCommunity: {
      name: "Filming — Community Event",
      group: "film",
      bookingUrlKey: "filming",
      priceKey: "filmingCommunity",
      needsUtility: false
    },
    filmingBirthday: {
      name: "Filming — Birthday",
      group: "film",
      bookingUrlKey: "filming",
      priceKey: "filmingBirthday",
      needsUtility: false
    },
    filmingOther: {
      name: "Filming — Other Event",
      group: "film",
      bookingUrlKey: "filming",
      priceKey: "filmingOther",
      needsUtility: false
    },
    podcast30Basic: { name: "30-Minute Podcast — Basic Edit", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcast30Basic", needsUtility: false },
    podcast30Standard: { name: "30-Minute Podcast — Standard Edit", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcast30Standard", needsUtility: false },
    podcast30Premium: { name: "30-Minute Podcast — Premium Edit", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcast30Premium", needsUtility: false },
    podcast60Basic: { name: "1-Hour Podcast — Basic Edit", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcast60Basic", needsUtility: false },
    podcast60Standard: { name: "1-Hour Podcast — Standard Edit", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcast60Standard", needsUtility: false },
    podcast60Premium: { name: "1-Hour Podcast — Premium Edit", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcast60Premium", needsUtility: false },
    podcast120Basic: { name: "2-Hour Podcast — Basic Edit", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcast120Basic", needsUtility: false },
    podcast120Standard: { name: "2-Hour Podcast — Standard Edit", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcast120Standard", needsUtility: false },
    podcast120Premium: { name: "2-Hour Podcast — Premium Edit", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcast120Premium", needsUtility: false },
    podcastStarter: { name: "Podcast monthly — Starter", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcastStarter", needsUtility: false },
    podcastGrowth: { name: "Podcast monthly — Growth", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcastGrowth", needsUtility: false },
    podcastPro: { name: "Podcast monthly — Pro", group: "edit", bookingUrlKey: "podcastEditing", priceKey: "podcastPro", needsUtility: false },
    eventBasic: { name: "Event Editing — Basic Edit", group: "edit", bookingUrlKey: "eventEditing", priceKey: "eventBasic", needsUtility: false },
    eventStandard: { name: "Event Editing — Standard Edit", group: "edit", bookingUrlKey: "eventEditing", priceKey: "eventStandard", needsUtility: false },
    eventPremium: { name: "Event Editing — Premium Edit", group: "edit", bookingUrlKey: "eventEditing", priceKey: "eventPremium", needsUtility: false }
  },

  shows: [
    { id: "losVakerosOct30", name: "Los Vakeros", month: "Oct", day: "30", dow: "Friday", year: "2026", note: "Filming the full set live." },
    { id: "theDescentOct31", name: "The Descent", month: "Oct", day: "31", dow: "Saturday", year: "2026", note: "Filming the full set live. Mac Castro Presents." },
    { id: "micheladaFestNov1", name: "Michelada Fest", month: "Nov", day: "1", dow: "Sunday", year: "2026", note: "Filming live · 801 Event Center, 1055 W North Temple, Salt Lake City · 4 PM–12 AM" },
    { id: "losVakerosNov7", name: "Los Vakeros", month: "Nov", day: "7", dow: "Saturday", year: "2026", note: "Filming the full set live." },
    { id: "loveOnTheBlockNov22", name: "Love On The Block", month: "Nov", day: "22", dow: "Sunday", year: "2026", note: "Filming the full set live." }
  ],

  bags: [
    { name: "Pink Signature-Style Shoulder Bag", image: "bag-1.jpg" },
    { name: "Light Pink Signature-Style Shoulder Bag", image: "bag-2.jpg" },
    { name: "Cherry Print Shoulder Bag – Tan", image: "bag-3.jpg" },
    { name: "Cherry Print Shoulder Bag – Navy", image: "bag-4.jpg" },
    { name: "Black Signature-Style Shoulder Bag", image: "bag-5.jpg" },
    { name: "Brown Signature-Style Shoulder Bag – Black Trim", image: "bag-6.jpg" },
    { name: "Brown Signature-Style Shoulder Bag – Saddle Trim", image: "bag-7.jpg" },
    { name: "Cream Signature-Style Shoulder Bag – Taupe Trim", image: "bag-8.jpg" }
  ]
};

if (typeof window !== "undefined") window.OG_CONFIG = OG_CONFIG;
if (typeof module !== "undefined" && module.exports) module.exports = OG_CONFIG;
