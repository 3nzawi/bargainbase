export type Tool = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

export const tools: Tool[] = [
  {
    slug: "discount-calculator",
    name: "Discount Calculator",
    description: "See the real price after stacked discounts and sales tax.",
    icon: "%",
  },
  {
    slug: "unit-price",
    name: "Unit Price Comparer",
    description: "Which pack is actually cheaper? Compare price per unit.",
    icon: "⚖",
  },
  {
    slug: "qr-code",
    name: "QR Code Generator",
    description: "Turn any link or text into a downloadable QR code.",
    icon: "▦",
  },
  {
    slug: "password-generator",
    name: "Password Generator",
    description: "Strong random passwords, generated right in your browser.",
    icon: "✱",
  },
];
