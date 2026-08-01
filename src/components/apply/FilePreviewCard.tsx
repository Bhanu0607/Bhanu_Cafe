'use client';
import { motion } from 'framer-motion';
import { X, FileText, Image as ImageIcon, CheckCircle } from 'lucide-react';

interface FilePreviewCardProps {
  id: string;
  label: string;
  file: File;
  preview?: string;
  onRemove: (id: string) => void;
}

export default function FilePreviewCard({ id, label, file, preview, onRemove }: FilePreviewCardProps) {
  const sizeInKB = (file.size / 1024).toFixed(1);
  const sizeDisplay = file.size > 1024 * 1024
    ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
    : `${sizeInKB} KB`;

  const isPDF = file.type === 'application/pdf';
  const ext = file.name.split('.').pop()?.toUpperCase() || 'FILE';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-xl"
    >
      {/* Thumbnail or icon */}
      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
        {preview && !isPDF ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt={file.name} className="w-full h-full object-cover" />
        ) : isPDF ? (
          <FileText className="w-6 h-6 text-red-500" />
        ) : (
          <ImageIcon className="w-6 h-6 text-primary-500" />
        )}
      </div>

      {/* File info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <CheckCircle className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
          <p className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wide">{label}</p>
        </div>
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{file.name}</p>
        <p className="text-xs text-gray-600 dark:text-gray-400">{ext} · {sizeDisplay}</p>
      </div>

      {/* Remove button */}
      <button
        type="button"
        onClick={() => onRemove(id)}
        className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-red-500 hover:border-red-300 transition-colors shadow-sm"
        aria-label={`Remove ${file.name}`}
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}
