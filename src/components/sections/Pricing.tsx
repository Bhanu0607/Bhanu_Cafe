"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { pricingItems } from "@/data/pricing";
import Link from "next/link";

const Pricing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <SectionWrapper
      id="pricing"
      title="Affordable Pricing"
      subtitle="Transparent pricing with no hidden charges"
      dark={true}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12"
      >
        {pricingItems.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -4 }}
            className={`glass-card rounded-2xl p-6 relative flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-500/50 ${
              item.popular ? "ring-2 ring-blue-500 ring-opacity-50" : ""
            }`}
          >
            {item.popular && (
              <div className="absolute -top-3 right-4 gradient-primary text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                Popular
              </div>
            )}
            
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
              {item.service}
            </h3>
            
            <div className="mt-auto mb-4">
              <span className="text-3xl font-bold text-gradient">
                ₹{item.price}
              </span>
              {item.unit && (
                <span className="text-gray-700 dark:text-gray-400 text-sm ml-1">
                  /{item.unit}
                </span>
              )}
            </div>
            
            {item.description && (
              <p className="text-sm text-gray-700 dark:text-gray-400">
                {item.description}
              </p>
            )}
          </motion.div>
        ))}
      </motion.div>

      <div className="text-center">
        <p className="text-gray-800 dark:text-gray-400 mb-4">
          Looking for a service not listed here?
        </p>
        <Link 
          href="#contact"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white gradient-primary hover:opacity-90 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Contact us for custom pricing
        </Link>
      </div>
    </SectionWrapper>
  );
};

export default Pricing;
