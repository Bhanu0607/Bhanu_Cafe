'use client';
import { motion } from 'framer-motion';
import { CheckCircle, Copy, Home, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface SuccessModalProps {
  applicationId: string;
  serviceName: string;
  onReset: () => void;
}

export default function SuccessModal({ applicationId, serviceName, onReset }: SuccessModalProps) {
  const [copied, setCopied] = useState(false);

  function copyId() {
    navigator.clipboard.writeText(applicationId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.1 }}
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
      >
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
          className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200 dark:shadow-green-900/30"
        >
          <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Application Submitted!</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Your <strong>{serviceName}</strong> application has been received. We will contact you shortly.
          </p>

          {/* Application ID */}
          <div className="bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800/50 rounded-2xl p-5 mb-6">
            <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-widest mb-2">Your Application ID</p>
            <div className="flex items-center justify-center gap-3">
              <p className="text-2xl font-bold text-primary-700 dark:text-primary-300 tracking-wider font-mono">{applicationId}</p>
              <button
                onClick={copyId}
                className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-primary-200 dark:border-primary-700 flex items-center justify-center text-primary-600 hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors shadow-sm"
                title="Copy Application ID"
              >
                {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Save this ID for future reference. It is included in the confirmation email sent to the owner.</p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onReset}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Submit Another
            </button>
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl gradient-primary text-white font-medium hover:opacity-90 transition-opacity"
            >
              <Home className="w-4 h-4" />
              Go to Home
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
