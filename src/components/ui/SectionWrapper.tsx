"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionWrapperProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export default function SectionWrapper({
  id,
  title,
  subtitle,
  children,
  className = "",
  dark = false,
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${
        dark ? "bg-blue-50/50 dark:bg-zinc-800/50" : "bg-white dark:bg-zinc-900"
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 inline-block mb-4 text-gradient">
            {title}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
          {subtitle && (
            <p className="max-w-2xl mx-auto text-lg text-gray-800 dark:text-gray-300">
              {subtitle}
            </p>
          )}
        </motion.div>
        
        {children}
      </div>
    </section>
  );
}
