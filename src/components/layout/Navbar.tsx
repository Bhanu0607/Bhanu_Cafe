'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '@/components/ui/ThemeProvider';
import { allServices } from '@/data/services';
import Link from 'next/link';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Services', href: '#services' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Documents', href: '#documents' },
  { name: 'About', href: '#about' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'FAQs', href: '#faqs' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Search state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof allServices>([]);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  // Handle scroll for sticky nav and active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    const observeSections = () => {
      const sections = navLinks.map(link => document.getElementById(link.href.substring(1))).filter(Boolean);
      sections.forEach(section => observer.observe(section as Element));
    };

    observeSections();
    // Re-observe if DOM changes could be added, but timeout helps ensure elements are mounted
    const timeoutId = setTimeout(observeSections, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  // Handle click outside search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle search logic
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      const query = searchQuery.toLowerCase();
      const results = allServices.filter(s => 
        s.name.toLowerCase().includes(query) || 
        s.category.toLowerCase().includes(query)
      );
      setSearchResults(results.slice(0, 5)); // Limit to 5 results
    }
  }, [searchQuery]);

  const handleResultClick = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? 'glass shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md h-16 md:h-18' 
            : 'glass bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm h-16 md:h-18'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-1">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-500">Bhanu</span>
                <span className="text-2xl font-normal text-gray-800 dark:text-gray-200">Cyber</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-3 py-2 text-sm font-medium transition-colors relative ${
                      isActive 
                        ? 'text-primary-600 dark:text-primary-500' 
                        : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side controls */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search */}
              <div className="relative" ref={searchRef}>
                <div className="flex items-center">
                  <AnimatePresence>
                    {isSearchOpen && (
                      <motion.input
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: '200px', opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        type="text"
                        placeholder="Search services..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="absolute right-10 py-1.5 px-3 rounded-full text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                        autoFocus
                      />
                    )}
                  </AnimatePresence>
                  <button
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Search"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>

                {/* Search Results Dropdown */}
                <AnimatePresence>
                  {isSearchOpen && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-64 md:w-80 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden z-50"
                    >
                      <ul className="max-h-64 overflow-y-auto py-2">
                        {searchResults.map((result, idx) => {
                          const Icon = result.icon;
                          return (
                            <li key={idx}>
                              <button
                                onClick={handleResultClick}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-3 transition-colors"
                              >
                                <div className="p-1.5 bg-primary-50 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{result.name}</p>
                                  <p className="text-xs text-gray-700 dark:text-gray-400">{result.category}</p>
                                </div>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] md:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-[70] md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold text-primary-600 dark:text-primary-500">Bhanu</span>
                  <span className="text-xl font-normal text-gray-800 dark:text-gray-200">Cyber</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-4 px-4">
                <nav className="flex flex-col space-y-1">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href.substring(1);
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                          isActive
                            ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                            : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50'
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
              
              <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-400">Theme Preference</span>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm"
                >
                  {theme === 'dark' ? (
                    <><Sun className="w-4 h-4" /> Light</>
                  ) : (
                    <><Moon className="w-4 h-4" /> Dark</>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
