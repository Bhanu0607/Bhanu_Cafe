export interface Testimonial {
  name: string;
  service: string;
  rating: number;
  review: string;
  initials: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Rajesh Kumar",
    service: "Passport Application",
    rating: 5,
    review:
      "Excellent service! Got my passport application done in just 30 minutes. The staff was very helpful and guided me through all the steps. Highly recommended for anyone needing passport assistance.",
    initials: "RK",
  },
  {
    name: "Priya Sharma",
    service: "Resume Creation",
    rating: 5,
    review:
      "They created an amazing professional resume for me. The design was modern and I got interview calls within a week. Best investment for my career. Very affordable too!",
    initials: "PS",
  },
  {
    name: "Amit Patel",
    service: "PAN Card & Aadhaar Update",
    rating: 4,
    review:
      "Got both my PAN card and Aadhaar update done at the same time. Quick processing, fair pricing, and the staff knew exactly what documents were needed. Saved me a lot of time.",
    initials: "AP",
  },
  {
    name: "Sunita Devi",
    service: "Ticket Booking & Printing",
    rating: 5,
    review:
      "I regularly visit Bhanu Cyber Cafe for ticket booking and printing. They are always polite, the shop is very clean, and service is fast. My go-to place for all digital services.",
    initials: "SD",
  },
];
