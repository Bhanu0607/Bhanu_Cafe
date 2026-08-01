'use client';
import { useRef, useState, DragEvent } from 'react';
import { Upload, FileWarning } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import FilePreviewCard from './FilePreviewCard';
import { UploadedFile } from '@/types/application';

interface FileUploadZoneProps {
  documentLabel: string;
  required: boolean;
  hint?: string;
  accept?: string;
  acceptedMimeTypes?: string[];
  acceptAttr?: string;
  uploadedFile?: UploadedFile;
  onFileSelect: (file: File, preview?: string) => void;
  onFileRemove: () => void;
  error?: string;
}

const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export default function FileUploadZone({
  documentLabel,
  required,
  hint,
  accept,
  acceptedMimeTypes,
  acceptAttr,
  uploadedFile,
  onFileSelect,
  onFileRemove,
  error,
}: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  function validateAndSelect(file: File) {
    setLocalError(null);
    const validMimes = acceptedMimeTypes || ALLOWED_TYPES;
    if (!validMimes.includes(file.type)) {
      setLocalError(`Invalid file type. Accepted: ${accept || 'PDF, PNG, JPG'}`);
      return;
    }
    if (file.size > MAX_SIZE) {
      setLocalError('File size must not exceed 5 MB.');
      return;
    }
    // Generate preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => onFileSelect(file, e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      onFileSelect(file, undefined);
    }
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndSelect(file);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) validateAndSelect(file);
    e.target.value = ''; // allow re-selecting same file
  }

  const displayError = localError || error;

  return (
    <div className="space-y-2">
      {/* Label */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          {documentLabel}
        </label>
        {required ? (
          <span className="text-xs text-red-500 font-medium">*Required</span>
        ) : (
          <span className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">Optional</span>
        )}
      </div>
      {hint && <p className="text-xs text-gray-600 dark:text-gray-400 -mt-1">{hint}</p>}
      {accept && <p className="text-xs text-gray-500 dark:text-gray-500">Accepted: {accept}</p>}

      <AnimatePresence mode="wait">
        {uploadedFile ? (
          <FilePreviewCard
            key={uploadedFile.id}
            id={uploadedFile.id}
            label={uploadedFile.documentLabel}
            file={uploadedFile.file}
            preview={uploadedFile.preview}
            onRemove={() => onFileRemove()}
          />
        ) : (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`relative border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-200
              ${
                isDragging
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 scale-[1.01]'
                  : displayError
                  ? 'border-red-400 bg-red-50/50 dark:bg-red-900/10'
                  : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-primary-50/30 dark:hover:bg-primary-900/10'
              }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
            aria-label={`Upload ${documentLabel}`}
          >
            <input
              ref={inputRef}
              type="file"
              accept={acceptAttr || ".pdf,.png,.jpg,.jpeg"}
              className="hidden"
              onChange={handleInputChange}
            />
            <div className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                isDragging ? 'bg-primary-100 dark:bg-primary-800' : 'bg-gray-100 dark:bg-gray-800'
              }`}>
                <Upload className={`w-5 h-5 ${isDragging ? 'text-primary-600' : 'text-gray-600 dark:text-gray-400'}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {isDragging ? 'Drop file here' : 'Drag & drop or click to upload'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  {accept || 'PDF, PNG, JPG'} — max 5 MB
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {displayError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1.5 text-red-600 dark:text-red-400"
          >
            <FileWarning className="w-3.5 h-3.5 flex-shrink-0" />
            <p className="text-xs">{displayError}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
