"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { serviceCategories, allServices } from '@/data/services';

// Slug map for services that have online application forms
const SERVICE_SLUGS: Record<string, string> = {
  'PAN Card': 'pan-card',
  'Passport Application': 'passport',
  'Aadhaar Update Assistance': 'aadhaar-update',
  'Driving License': 'driving-license',
  'Voter ID': 'voter-id',
  'Birth Certificate': 'birth-certificate',
  'Income Certificate': 'income-certificate',
  'Railway Ticket Booking': 'railway-ticket',
  'Flight Booking': 'flight-booking',
  'Resume Creation': 'resume-creation',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

export default function Services() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    return allServices.filter(service => {
      const matchesCategory = activeTab === 'All' || service.categoryId === activeTab;
      const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            service.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <SectionWrapper 
      id="services" 
      title="Our Services" 
      subtitle="Comprehensive digital services for all your needs"
    >
      <div className="flex flex-col space-y-8 mb-12">
        {/* Search Bar */}
        <div className="max-w-md mx-auto w-full">
          <div className="glass-card relative flex items-center w-full rounded-full overflow-hidden border border-slate-200/50 dark:border-slate-700/50 p-1">
            <div className="pl-4 pr-2 text-slate-800">
              <Search className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              placeholder="Search for a service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none py-3 pr-4 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:ring-0"
            />
          </div>
        </div>

        {/* Tab Filter Bar */}
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center gap-2 sm:gap-3 hide-scrollbar">
          <button
            onClick={() => setActiveTab('All')}
            className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-medium transition-all ${
              activeTab === 'All' 
                ? 'gradient-primary text-white shadow-md' 
                : 'glass-card hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-300'
            }`}
          >
            All Services
          </button>
          
          {serviceCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center gap-2 whitespace-nowrap px-6 py-3 rounded-full text-sm font-medium transition-all ${
                  activeTab === category.id 
                    ? 'gradient-primary text-white shadow-md' 
                    : 'glass-card hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-300'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Services Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.name}
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-lg transition-all duration-300 flex flex-col h-full bg-white/50 dark:bg-slate-900/50 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
                      {Icon && <Icon className="w-6 h-6" />}
                    </div>
                    {SERVICE_SLUGS[service.name] && (
                      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-1 rounded-full border border-primary-200/50 dark:border-primary-800/50">
                        <Zap className="w-2.5 h-2.5" /> Online
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-400 line-clamp-2 flex-1">
                    {service.description}
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    {SERVICE_SLUGS[service.name] ? (
                      <Link
                        href={`/apply/${SERVICE_SLUGS[service.name]}`}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl gradient-primary text-white text-sm font-semibold hover:opacity-90 transition-all shadow-sm shadow-primary-500/20 group-hover:shadow-primary-500/30"
                      >
                        Apply Now <ArrowRight className="w-4 h-4" />
                      </Link>
                    ) : (
                      <a
                        href="/#contact"
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400 text-sm font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all"
                      >
                        Contact Us <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="col-span-full py-20 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-medium text-slate-800 dark:text-slate-200 mb-2">No services found</h3>
              <p className="text-slate-700 dark:text-slate-400">
                We couldn't find any services matching "{searchQuery}". Please try another search term.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}
