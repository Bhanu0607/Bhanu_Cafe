"use client";

import { motion } from "framer-motion";
import { ClipboardList, FileText, Settings, CheckCircle } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

const steps = [
  {
    title: "Choose Service",
    description: "Browse our services and select what you need.",
    icon: ClipboardList,
  },
  {
    title: "Submit Documents",
    description: "Bring the required documents to our center.",
    icon: FileText,
  },
  {
    title: "Processing",
    description: "We handle the application and processing.",
    icon: Settings,
  },
  {
    title: "Collect Your Documents",
    description: "Pick up your completed documents.",
    icon: CheckCircle,
  },
];

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <SectionWrapper
      id="how-it-works"
      title="How It Works"
      subtitle="Simple 4-step process"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative"
      >
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gray-200 dark:bg-gray-700 z-0"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center text-center relative"
            >
              {/* Vertical connecting line for mobile */}
              {index !== steps.length - 1 && (
                <div className="md:hidden absolute top-24 left-1/2 w-0.5 h-16 -ml-0.5 bg-gray-200 dark:bg-gray-700 -z-10"></div>
              )}

              <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-800 shadow-lg border-4 border-white dark:border-gray-800 flex items-center justify-center mb-6 relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full gradient-primary text-white flex items-center justify-center font-bold text-sm shadow-md">
                  {index + 1}
                </div>
                <step.icon className="text-blue-600 dark:text-blue-400" size={40} />
              </div>
              
              <div className="glass-card rounded-2xl p-6 w-full shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-800 dark:text-gray-400 text-sm">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

export default HowItWorks;
