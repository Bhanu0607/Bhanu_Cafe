import { Clock, IndianRupee, Info, CheckCircle2 } from 'lucide-react';
import { ServiceApplication } from '@/types/application';

interface ServiceInfoCardProps {
  service: ServiceApplication;
}

export default function ServiceInfoCard({ service }: ServiceInfoCardProps) {
  return (
    <div className="space-y-5">
      {/* Price & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card rounded-2xl p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-2">
            <IndianRupee className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-400 uppercase tracking-wide mb-1">Service Charge</p>
          <p className="text-xl font-bold text-green-600 dark:text-green-400">{service.price}</p>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center">
          <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-2">
            <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-400 uppercase tracking-wide mb-1">Processing Time</p>
          <p className="text-sm font-bold text-primary-600 dark:text-primary-400">{service.processingTime}</p>
        </div>
      </div>

      {/* Instructions */}
      <div className="glass-card rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-4 h-4 text-primary-600 dark:text-primary-400" />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">How It Works</h3>
        </div>
        <ol className="space-y-3">
          {service.instructions.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-6 h-6 rounded-full gradient-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
              <p className="text-sm text-gray-800 dark:text-gray-300 leading-relaxed">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Required Documents checklist */}
      <div className="glass-card rounded-2xl p-5">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-4">Documents Needed</h3>
        <ul className="space-y-2">
          {service.requiredDocuments.map((doc, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                doc.required ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'
              }`} />
              <div>
                <span className={`text-sm ${
                  doc.required ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-600 dark:text-gray-400'
                }`}>{doc.label}</span>
                {!doc.required && <span className="ml-1 text-xs text-gray-500">(optional)</span>}
                {doc.hint && <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{doc.hint}</p>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
