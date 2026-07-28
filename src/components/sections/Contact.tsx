"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  CheckCircle,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }
    if (!formData.message || formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop standard form submission

    if (validate()) {
      try {
        // Use the /ajax/ endpoint for FormSubmit
        const response = await fetch(
          "https://formsubmit.co/ajax/Bhuveshbansal01@gmail.com",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              _subject: "New Contact Form Submission - Bhanu Cyber Cafe",
              ...formData,
            }),
          },
        );

        if (response.ok) {
          setIsSubmitted(true);
          setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
              name: "",
              email: "",
              phone: "",
              service: "",
              message: "",
            });
          }, 3000);
        } else {
          console.error("Form submission failed");
        }
      } catch (error) {
        console.error("Error submitting form", error);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  return (
    <SectionWrapper
      id="contact"
      title="Get In Touch"
      subtitle="Visit us or send us a message"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Contact Info */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Bhanu Cyber Cafe
          </h3>

          <div className="glass-card rounded-xl p-4 flex items-center gap-4">
            <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-lg text-primary-600 dark:text-primary-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-400 font-medium mb-1">
                Address
              </p>
              <p className="text-gray-900 dark:text-white">
                Main Road, City Center, Your City - 000000
              </p>
            </div>
          </div>

          <a
            href="tel:+919999999999"
            className="glass-card rounded-xl p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-lg text-primary-600 dark:text-primary-400">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-400 font-medium mb-1">
                Phone
              </p>
              <p className="text-gray-900 dark:text-white">+91 99999 99999</p>
            </div>
          </a>

          <a
            href="mailto:info@bhanucybercafe.com"
            className="glass-card rounded-xl p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-lg text-primary-600 dark:text-primary-400">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-400 font-medium mb-1">
                Email
              </p>
              <p className="text-gray-900 dark:text-white">
                info@bhanucybercafe.com
              </p>
            </div>
          </a>

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noreferrer"
            className="glass-card rounded-xl p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-green-600 dark:text-green-400">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-400 font-medium mb-1">
                WhatsApp
              </p>
              <p className="text-gray-900 dark:text-white">Chat on WhatsApp</p>
            </div>
          </a>

          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Business Hours
              </h4>
            </div>
            <div className="space-y-2 text-gray-800 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Monday - Saturday:</span>
                <span className="font-medium">9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-medium">10:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden w-full h-64 border border-gray-200 dark:border-gray-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.54004978016!2d77.0441742618968!3d28.52721814115401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="glass-card rounded-2xl p-8 h-fit">
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Send us a message
          </h4>

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Message sent successfully!
                </h5>
                <p className="text-gray-800 dark:text-gray-400">
                  We'll get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl p-3 border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-white/5 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all dark:text-white"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl p-3 border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-white/5 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all dark:text-white"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-xl p-3 border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-white/5 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all dark:text-white"
                    placeholder="10-digit mobile number"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Service Needed
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full rounded-xl p-3 border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-white/5 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all dark:text-white"
                  >
                    <option value="">Select a service (Optional)</option>
                    <option value="passport">Passport Application</option>
                    <option value="pan">PAN Card Services</option>
                    <option value="aadhaar">Aadhaar Update</option>
                    <option value="ticket">Ticket Booking</option>
                    <option value="print">Printing & Scanning</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-xl p-3 border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-white/5 focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all dark:text-white resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full gradient-primary text-white font-semibold rounded-xl py-3 px-4 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  Send Message
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SectionWrapper>
  );
}
