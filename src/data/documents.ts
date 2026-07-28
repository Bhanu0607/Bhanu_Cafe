export interface DocumentRequirement {
  service: string;
  documents: string[];
}

export const documentRequirements: DocumentRequirement[] = [
  {
    service: "Passport",
    documents: [
      "Aadhaar Card (original + photocopy)",
      "PAN Card",
      "Voter ID or Driving License",
      "Birth Certificate (for minors / first-time applicants)",
      "10th Class Marksheet (as date of birth proof)",
      "Current Address Proof (electricity bill / bank statement)",
      "Old Passport (for renewal)",
      "2 Passport Size Photographs (white background)",
      "Marriage Certificate (if applicable)",
    ],
  },
  {
    service: "PAN Card",
    documents: [
      "Aadhaar Card (original + photocopy)",
      "Passport Size Photograph",
      "Signature on white paper",
      "Proof of Date of Birth (10th Marksheet / Birth Certificate)",
      "Address Proof (Aadhaar / Voter ID / Driving License)",
      "Identity Proof (Aadhaar / Voter ID / Passport)",
    ],
  },
  {
    service: "Driving License",
    documents: [
      "Aadhaar Card (original + photocopy)",
      "Address Proof (Aadhaar / utility bill / bank statement)",
      "Age Proof (10th Marksheet / Birth Certificate)",
      "Passport Size Photographs (6 photos recommended)",
      "Learner's License (for permanent DL)",
      "Medical Certificate (Form 1A)",
      "Existing DL (for renewal)",
      "Blood Group Certificate",
    ],
  },
  {
    service: "Aadhaar Update",
    documents: [
      "Existing Aadhaar Card / Enrolment Slip",
      "Proof of Identity (PAN / Passport / Voter ID)",
      "Proof of Address (Utility Bill / Bank Passbook / Rent Agreement)",
      "Proof of Date of Birth (Birth Certificate / 10th Marksheet)",
      "Proof of Relationship (Marriage Certificate, if updating name after marriage)",
      "Mobile Number linked to Aadhaar",
    ],
  },
  {
    service: "Voter ID",
    documents: [
      "Aadhaar Card",
      "Passport Size Photograph",
      "Age Proof (10th Marksheet / Birth Certificate / Passport)",
      "Address Proof (Aadhaar / Utility Bill / Rent Agreement)",
      "Identity Proof (PAN / Passport / Driving License)",
      "Filled Form 6 (for new registration)",
      "Filled Form 8 (for corrections / shifting)",
    ],
  },
];
