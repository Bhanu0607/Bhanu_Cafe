import {
  FileText, CreditCard, BookOpen, Vote, Car, Award, Users, Home, Baby, Skull,
  ClipboardList, GraduationCap, Briefcase, Building, School, Landmark,
  Printer, Palette, Copy, Layers, BookOpenCheck, ScanLine, Camera,
  Train, Plane, Bus, Hotel,
  FileSpreadsheet, Mail, Wallet, Zap, Receipt, Building2, BrainCircuit
} from "lucide-react";
import { ElementType } from "react";

export interface Service {
  name: string;
  icon: ElementType;
  description: string;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: ElementType;
  services: Service[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "government",
    name: "Government Services",
    icon: Landmark,
    services: [
      { name: "PAN Card", icon: CreditCard, description: "Apply for new PAN card or make corrections to existing one." },
      { name: "Passport Application", icon: BookOpen, description: "Fresh passport application, renewal, and tatkal services." },
      { name: "Aadhaar Update", icon: ClipboardList, description: "Update your Aadhaar details including address, name, mobile number, and more." },
      { name: "Voter ID", icon: Vote, description: "New voter ID registration and corrections." },
      { name: "Driving License", icon: Car, description: "Apply for learner's license, permanent DL, and renewals." },
      { name: "Income Certificate", icon: Award, description: "Apply for income certificate from revenue department." },
      { name: "Caste Certificate", icon: Users, description: "Apply for caste certificate online through e-District portal." },
      { name: "Domicile Certificate", icon: Home, description: "Apply for domicile/residence certificate." },
      { name: "Birth Certificate", icon: Baby, description: "Apply for birth certificate registration." },
      { name: "Death Certificate", icon: Skull, description: "Apply for death certificate registration." },
    ],
  },
  {
    id: "online",
    name: "Online Services",
    icon: ClipboardList,
    services: [
      { name: "Online Form Filling", icon: ClipboardList, description: "Professional form filling for any government or private application." },
      { name: "Scholarship Forms", icon: GraduationCap, description: "Apply for state and central government scholarships." },
      { name: "Exam Registration", icon: FileText, description: "Register for competitive exams, board exams, and entrance tests." },
      { name: "Job Applications", icon: Briefcase, description: "Apply for government and private sector jobs online." },
      { name: "College Admissions", icon: School, description: "Online admission forms for colleges and universities." },
      { name: "E-District Services", icon: Building, description: "Access all e-District portal services and applications." },
    ],
  },
  {
    id: "printing",
    name: "Printing & Documentation",
    icon: Printer,
    services: [
      { name: "Black & White Printing", icon: Printer, description: "High-quality B&W printing at affordable rates." },
      { name: "Color Printing", icon: Palette, description: "Vibrant color printing for documents and photos." },
      { name: "Photocopy", icon: Copy, description: "Fast photocopying service for all document sizes." },
      { name: "Lamination", icon: Layers, description: "Protect your important documents with lamination." },
      { name: "Spiral Binding", icon: BookOpenCheck, description: "Professional spiral binding for reports and projects." },
      { name: "Document Scanning", icon: ScanLine, description: "High-resolution document scanning to digital format." },
      { name: "Passport Size Photos", icon: Camera, description: "Instant passport and visa size photographs." },
    ],
  },
  {
    id: "travel",
    name: "Travel Services",
    icon: Train,
    services: [
      { name: "Railway Ticket Booking", icon: Train, description: "Book IRCTC railway tickets for all classes." },
      { name: "Flight Booking", icon: Plane, description: "Domestic and international flight ticket booking." },
      { name: "Bus Booking", icon: Bus, description: "Book state and private bus tickets online." },
      { name: "Hotel Booking", icon: Hotel, description: "Find and book hotels at best prices." },
    ],
  },
  {
    id: "digital",
    name: "Digital Services",
    icon: FileSpreadsheet,
    services: [
      { name: "Resume Creation", icon: FileSpreadsheet, description: "Professional resume/CV creation and formatting." },
      { name: "Email Creation", icon: Mail, description: "Create and set up email accounts (Gmail, Outlook, etc.)." },
      { name: "Online Payments", icon: Wallet, description: "Assistance with online payments and transactions." },
      { name: "Utility Bill Payment", icon: Zap, description: "Pay electricity, water, gas, and other utility bills." },
      { name: "GST Assistance", icon: Receipt, description: "GST registration, return filing, and compliance help." },
    ],
  },
  {
    id: "ai",
    name: "AI Assistance Services",
    icon: BrainCircuit,
    services: [
      { name: "AI Assistance Services", icon: BrainCircuit, description: "Professional help using modern AI tools — Resume, Assignments, Coding, Translation, and more." },
    ],
  },
];

export const allServices = serviceCategories.flatMap((cat) =>
  cat.services.map((s) => ({ ...s, category: cat.name, categoryId: cat.id }))
);
