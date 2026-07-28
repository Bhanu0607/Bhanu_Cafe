export interface PricingItem {
  service: string;
  price: string;
  unit?: string;
  popular?: boolean;
  description: string;
}

export const pricingItems: PricingItem[] = [
  {
    service: "Passport Form Filling",
    price: "₹299",
    popular: true,
    description: "Complete passport application form filling with guidance on required documents.",
  },
  {
    service: "PAN Card Assistance",
    price: "₹199",
    popular: true,
    description: "New PAN card application or corrections with complete form support.",
  },
  {
    service: "Resume Creation",
    price: "₹149",
    description: "Professional resume design with modern templates and formatting.",
  },
  {
    service: "Color Printing",
    price: "₹10",
    unit: "/page",
    description: "High-quality color printing on A4 paper with vibrant colors.",
  },
  {
    service: "B&W Printing",
    price: "₹2",
    unit: "/page",
    description: "Fast black and white printing on standard A4 paper.",
  },
  {
    service: "Lamination",
    price: "₹50",
    description: "Document lamination to protect your important certificates.",
  },
  {
    service: "Ticket Booking",
    price: "₹99",
    unit: " onwards",
    popular: true,
    description: "Railway, flight, and bus ticket booking with seat selection.",
  },
];
