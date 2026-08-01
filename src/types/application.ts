// ===================================================
// TYPES: Application Portal
// ===================================================

export interface ServiceDocument {
  label: string;       // e.g. "Aadhaar Card"
  required: boolean;   // if false, it's optional
  hint?: string;       // e.g. "Front & back scan"
  accept?: string;     // e.g. "PDF, JPG" (display hint only)
  acceptedMimeTypes?: string[]; // e.g. ['application/pdf', 'image/png']
  acceptAttr?: string; // e.g. ".pdf,.png,.jpg,.jpeg"
}

export interface ServiceApplication {
  slug: string;               // URL-safe id, e.g. "pan-card"
  name: string;               // Display name, e.g. "PAN Card"
  categoryId: string;         // matches service category
  description: string;        // Short description for the page
  longDescription: string;    // Detailed description
  price: string;              // e.g. "₹199"
  processingTime: string;     // e.g. "15-20 working days"
  instructions: string[];     // Step-by-step instructions shown above form
  requiredDocuments: ServiceDocument[];
  additionalFields?: AdditionalField[];  // Service-specific extra fields
}

export interface AdditionalField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'textarea';
  required: boolean;
  placeholder?: string;
  options?: string[];  // for select type
}

export interface UploadedFile {
  documentLabel: string;  // Which document slot this is for
  file: File;
  preview?: string;       // data URL for image previews
  id: string;             // unique id for React keys
}

export interface FormErrors {
  fullName?: string;
  mobile?: string;
  email?: string;
  address?: string;
  files?: Record<string, string>;  // keyed by document label
  general?: string;
}

export interface ApplicationFormState {
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  message: string;
  additionalFields: Record<string, string>;
}

export interface SubmitResult {
  success: boolean;
  applicationId?: string;
  error?: string;
}

export interface EmailAttachment {
  filename: string;
  content: Buffer;
}
