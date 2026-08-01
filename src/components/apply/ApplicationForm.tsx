'use client';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Phone, Mail, MapPin, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import FileUploadZone from './FileUploadZone';
import SuccessModal from './SuccessModal';
import { ServiceApplication, UploadedFile, ApplicationFormState, FormErrors, SubmitResult } from '@/types/application';

interface ApplicationFormProps {
  service: ServiceApplication;
}

export default function ApplicationForm({ service }: ApplicationFormProps) {
  const [form, setForm] = useState<ApplicationFormState>({
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    message: '',
    additionalFields: {},
  });

  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadedFile>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // File handlers
  const handleFileSelect = useCallback((documentLabel: string, file: File, preview?: string) => {
    const id = `${documentLabel}-${Date.now()}`;
    setUploadedFiles((prev) => ({
      ...prev,
      [documentLabel]: { documentLabel, file, preview, id },
    }));
    // Clear file error for this slot
    setErrors((prev) => {
      const newFiles = { ...(prev.files || {}) };
      delete newFiles[documentLabel];
      return { ...prev, files: newFiles };
    });
  }, []);

  const handleFileRemove = useCallback((documentLabel: string) => {
    setUploadedFiles((prev) => {
      const next = { ...prev };
      delete next[documentLabel];
      return next;
    });
  }, []);

  // Validation
  function validate(): boolean {
    const newErrors: FormErrors = { files: {} };

    if (!form.fullName.trim() || form.fullName.trim().length < 2)
      newErrors.fullName = 'Full name must be at least 2 characters.';
    
    const mobileDigits = form.mobile.replace(/\D/g, '');
    if (mobileDigits.length !== 10)
      newErrors.mobile = 'Enter a valid 10-digit mobile number.';
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Enter a valid email address.';
    
    if (!form.address.trim() || form.address.trim().length < 10)
      newErrors.address = 'Please enter your complete address.';

    // Check required documents
    for (const doc of service.requiredDocuments) {
      if (doc.required && !uploadedFiles[doc.label]) {
        newErrors.files![doc.label] = `Please upload ${doc.label}.`;
      }
    }

    // Check required additional fields
    if (service.additionalFields) {
      for (const field of service.additionalFields) {
        if (field.required && !form.additionalFields[field.id]?.trim()) {
          newErrors[`additional_${field.id}` as keyof FormErrors] = `${field.label} is required.` as never;
        }
      }
    }

    setErrors(newErrors);
    return !newErrors.fullName && !newErrors.mobile && !newErrors.email && !newErrors.address &&
      Object.keys(newErrors.files || {}).length === 0 &&
      !Object.keys(newErrors).some((k) => k.startsWith('additional_') && newErrors[k as keyof FormErrors]);
  }

  // Submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    setGeneralError(null);

    try {
      const fd = new FormData();
      fd.append('serviceName', service.name);
      fd.append('serviceSlug', service.slug);
      fd.append('fullName', form.fullName.trim());
      fd.append('mobile', form.mobile.trim());
      fd.append('email', form.email.trim());
      fd.append('address', form.address.trim());
      if (form.message.trim()) fd.append('message', form.message.trim());

      // Append all uploaded files
      for (const uf of Object.values(uploadedFiles)) {
        fd.append('files', uf.file, uf.file.name);
      }

      const res = await fetch('/api/submit-application', {
        method: 'POST',
        body: fd,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setGeneralError(data.error || 'Something went wrong. Please try again.');
      } else {
        setSubmitResult({ success: true, applicationId: data.applicationId });
      }
    } catch {
      setGeneralError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setForm({ fullName: '', mobile: '', email: '', address: '', message: '', additionalFields: {} });
    setUploadedFiles({});
    setErrors({});
    setSubmitResult(null);
    setGeneralError(null);
  }

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl px-4 py-3 text-sm font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-800/60 border transition-all outline-none focus:ring-2 focus:ring-primary-500/40 ${
      hasError
        ? 'border-red-400 dark:border-red-500 bg-red-50 dark:bg-red-900/10'
        : 'border-gray-200 dark:border-gray-700 focus:border-primary-400 dark:focus:border-primary-500'
    }`;

  return (
    <>
      <AnimatePresence>
        {submitResult?.success && submitResult.applicationId && (
          <SuccessModal
            applicationId={submitResult.applicationId}
            serviceName={service.name}
            onReset={handleReset}
          />
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Personal Details */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full gradient-primary text-white text-xs font-bold flex items-center justify-center">1</span>
            Personal Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="sm:col-span-2">
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1.5">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                  className={`${inputClass(!!errors.fullName)} pl-10`}
                  autoComplete="name"
                />
              </div>
              {errors.fullName && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.fullName}</p>}
            </div>

            {/* Mobile */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1.5">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="mobile"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={form.mobile}
                  onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value }))}
                  className={`${inputClass(!!errors.mobile)} pl-10`}
                  autoComplete="tel"
                  maxLength={15}
                />
              </div>
              {errors.mobile && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.mobile}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className={`${inputClass(!!errors.email)} pl-10`}
                  autoComplete="email"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label htmlFor="address" className="block text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1.5">
                Full Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <textarea
                  id="address"
                  rows={3}
                  placeholder="House no., Street, City, State, PIN code"
                  value={form.address}
                  onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                  className={`${inputClass(!!errors.address)} pl-10 resize-none`}
                  autoComplete="street-address"
                />
              </div>
              {errors.address && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.address}</p>}
            </div>
          </div>
        </div>

        {/* Service-specific Additional Fields */}
        {service.additionalFields && service.additionalFields.length > 0 && (
          <div className="glass-card rounded-2xl p-6">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full gradient-primary text-white text-xs font-bold flex items-center justify-center">2</span>
              Service Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.additionalFields.map((field) => {
                const fieldError = errors[`additional_${field.id}` as keyof FormErrors] as string | undefined;
                return (
                  <div key={field.id} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                    <label htmlFor={field.id} className="block text-sm font-semibold text-gray-800 dark:text-gray-300 mb-1.5">
                      {field.label}{field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {field.type === 'select' ? (
                      <select
                        id={field.id}
                        value={form.additionalFields[field.id] || ''}
                        onChange={(e) => setForm((p) => ({ ...p, additionalFields: { ...p.additionalFields, [field.id]: e.target.value } }))}
                        className={inputClass(!!fieldError)}
                      >
                        <option value="">Select {field.label}...</option>
                        {field.options?.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : field.type === 'date' ? (
                      <input
                        id={field.id}
                        type="date"
                        value={form.additionalFields[field.id] || ''}
                        onChange={(e) => setForm((p) => ({ ...p, additionalFields: { ...p.additionalFields, [field.id]: e.target.value } }))}
                        className={inputClass(!!fieldError)}
                      />
                    ) : field.type === 'textarea' ? (
                      <textarea
                        id={field.id}
                        rows={3}
                        placeholder={field.placeholder}
                        value={form.additionalFields[field.id] || ''}
                        onChange={(e) => setForm((p) => ({ ...p, additionalFields: { ...p.additionalFields, [field.id]: e.target.value } }))}
                        className={`${inputClass(!!fieldError)} resize-none`}
                      />
                    ) : (
                      <input
                        id={field.id}
                        type="text"
                        placeholder={field.placeholder}
                        value={form.additionalFields[field.id] || ''}
                        onChange={(e) => setForm((p) => ({ ...p, additionalFields: { ...p.additionalFields, [field.id]: e.target.value } }))}
                        className={inputClass(!!fieldError)}
                      />
                    )}
                    {fieldError && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{fieldError}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Document Uploads */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full gradient-primary text-white text-xs font-bold flex items-center justify-center">
              {service.additionalFields && service.additionalFields.length > 0 ? '3' : '2'}
            </span>
            Upload Documents
          </h3>
          <p className="text-sm text-gray-700 dark:text-gray-400 mb-5">Upload clear scans or photos. Max 5 MB per file.</p>
          <div className="space-y-5">
            {service.requiredDocuments.map((doc) => (
              <FileUploadZone
                key={doc.label}
                documentLabel={doc.label}
                required={doc.required}
                hint={doc.hint}
                accept={doc.accept}
                uploadedFile={uploadedFiles[doc.label]}
                onFileSelect={(file, preview) => handleFileSelect(doc.label, file, preview)}
                onFileRemove={() => handleFileRemove(doc.label)}
                error={errors.files?.[doc.label]}
              />
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="glass-card rounded-2xl p-6">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            Additional Message <span className="text-xs font-normal text-gray-600 dark:text-gray-400">(Optional)</span>
          </h3>
          <textarea
            id="message"
            rows={4}
            placeholder="Any special instructions, questions, or information you would like to share..."
            value={form.message}
            onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
            className="w-full rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 focus:border-primary-400 focus:ring-2 focus:ring-primary-500/40 outline-none transition-all resize-none"
          />
        </div>

        {/* General Error */}
        <AnimatePresence>
          {generalError && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
            >
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700 dark:text-red-300">{generalError}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
          className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl gradient-primary text-white font-bold text-base shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:opacity-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Submitting Application...</>
          ) : (
            <><Send className="w-5 h-5" /> Submit Application</>
          )}
        </motion.button>

        <p className="text-center text-xs text-gray-600 dark:text-gray-400">
          By submitting, you agree to share your documents with Bhanu Cyber Cafe for processing. Your data is handled securely.
        </p>
      </form>
    </>
  );
}
