export type Deal = {
  id: string;
  store: string;
  title: string;
  category: Category;
  /** Coupon code to copy. Omit for no-code offers (e.g. automatic sale pricing). */
  code?: string;
  discount: string;
  expires?: string; // ISO date
};

export const categories = [
  "Food",
  "Fashion",
  "Electronics",
  "Travel",
  "Home",
] as const;

export type Category = (typeof categories)[number];

// Placeholder data with fictional stores so the UI can be built and tested.
// Replace with a real source (affiliate network API, database) before launch.
export const deals: Deal[] = [
  { id: "1", store: "FreshCart", title: "20% off your first grocery order", category: "Food", code: "FRESH20", discount: "20% off", expires: "2026-12-31" },
  { id: "2", store: "PizzaPlanet", title: "Buy one large pizza, get one free", category: "Food", code: "BOGOPIE", discount: "BOGO", expires: "2026-11-15" },
  { id: "3", store: "ThreadLine", title: "Extra 30% off sale items", category: "Fashion", code: "EXTRA30", discount: "30% off" },
  { id: "4", store: "SoleMates", title: "Free shipping on all sneakers", category: "Fashion", discount: "Free shipping" },
  { id: "5", store: "VoltHub", title: "$50 off headphones over $200", category: "Electronics", code: "SOUND50", discount: "$50 off", expires: "2026-10-31" },
  { id: "6", store: "PixelPoint", title: "15% off refurbished laptops", category: "Electronics", code: "REFURB15", discount: "15% off" },
  { id: "7", store: "SkyHop", title: "10% off domestic flights", category: "Travel", code: "FLY10", discount: "10% off", expires: "2026-12-01" },
  { id: "8", store: "StayEasy", title: "Third night free on hotel bookings", category: "Travel", discount: "1 night free" },
  { id: "9", store: "NestNook", title: "25% off bedding and linens", category: "Home", code: "COZY25", discount: "25% off" },
  { id: "10", store: "BrightBulb", title: "$10 off orders over $60", category: "Home", code: "BRIGHT10", discount: "$10 off", expires: "2026-10-20" },
];
