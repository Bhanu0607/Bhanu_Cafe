'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { testimonials } from '@/data/testimonials';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Testimonials() {
  return (
    <SectionWrapper
      id="testimonials"
      title="What Our Customers Say"
      subtitle="Real reviews from our valued customers"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="glass-card rounded-2xl p-6 flex flex-col h-full"
          >
            <div className="flex space-x-1 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star
                  key={j}
                  className={`w-5 h-5 ${
                    j < testimonial.rating
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
            
            <p className="italic text-gray-800 dark:text-gray-300 mb-6 flex-grow">
              "{testimonial.review}"
            </p>
            
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                {testimonial.initials}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {testimonial.name}
                </h4>
                <p className="text-xs text-gray-700 dark:text-gray-400">
                  {testimonial.service}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
