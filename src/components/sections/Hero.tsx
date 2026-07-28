"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
} as const;

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-900 pt-20">
      <div className="absolute inset-0 gradient-hero z-0 pointer-events-none opacity-50"></div>
      
      {/* Animated abstract shapes */}
      <motion.div 
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl z-0 pointer-events-none"
      />
      <motion.div 
        animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl z-0 pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl z-0 pointer-events-none"
      />

      <div className="container mx-auto px-4 z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <span className="glass-card px-4 py-2 rounded-full text-sm font-medium text-slate-800 dark:text-slate-200 shadow-sm border border-slate-200/50 dark:border-slate-700/50 inline-flex items-center gap-2">
              🏆 Trusted by 15,000+ Customers
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-gradient">Your One-Stop Digital Service Center</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-800 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Government Services, Online Applications, Printing, Scanning, Ticket Booking, Passport Services, PAN Card, Aadhaar Assistance and Much More.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full sm:w-auto">
            <Link href="#contact" className="w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full gradient-primary text-white font-semibold rounded-full px-8 py-4 shadow-lg hover:shadow-xl transition-all"
              >
                Book a Service
              </motion.button>
            </Link>
            <Link href="#services" className="w-full sm:w-auto">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full border-2 border-primary-500 text-primary-600 dark:text-primary-400 font-semibold rounded-full px-8 py-4 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
              >
                View Services
              </motion.button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm font-medium text-slate-800 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary-500" />
              <span>✓ Same Day Service</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary-500" />
              <span>✓ Affordable Pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary-500" />
              <span>✓ 10+ Years Experience</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
