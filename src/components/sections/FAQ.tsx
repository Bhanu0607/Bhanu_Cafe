'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { faqs } from '@/data/faqs';

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <SectionWrapper
      id="faqs"
      title="Frequently Asked Questions"
      subtitle="Find answers to common queries"
    >
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => {
          const isOpen = openItems.includes(index);
          return (
            <div key={index} className="glass-card rounded-xl mb-4 overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-medium text-lg text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-gray-700" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="p-6 pt-0 text-gray-800 dark:text-gray-400">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
