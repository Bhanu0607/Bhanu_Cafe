"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { documentRequirements } from "@/data/documents";

const Documents = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <SectionWrapper
      id="documents"
      title="Required Documents"
      subtitle="Check what documents you need before visiting"
    >
      <div className="max-w-3xl mx-auto space-y-4">
        {documentRequirements.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              initial={false}
              className={`glass-card rounded-2xl overflow-hidden border transition-colors duration-300 ${
                isOpen 
                  ? "border-blue-200 dark:border-blue-800/50 shadow-md" 
                  : "border-gray-100 dark:border-gray-800 shadow-sm hover:border-gray-300 dark:hover:border-gray-700"
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className={`font-semibold text-lg transition-colors ${
                  isOpen ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-white"
                }`}>
                  {item.service}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="flex-shrink-0 ml-4 text-gray-700"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-5 pt-1 border-t border-gray-100 dark:border-gray-800/50">
                      <ul className="space-y-3 mt-3">
                        {item.documents.map((doc, docIndex) => (
                          <motion.li 
                            key={docIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: docIndex * 0.05 }}
                            className="flex items-start"
                          >
                            <CheckCircle2 
                              className="text-green-500 flex-shrink-0 mt-0.5 mr-3" 
                              size={18} 
                            />
                            <span className="text-gray-700 dark:text-gray-300">
                              {doc}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default Documents;
