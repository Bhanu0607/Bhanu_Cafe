"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, Users, Layers, Zap, IndianRupee, ShieldCheck } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";

interface CounterProps {
  end: number;
  label: string;
  icon: React.ElementType;
  suffix?: string;
}

const Counter = ({ end, label, icon: Icon, suffix = "+" }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const duration = 2000; // 2 seconds

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        // Easing out function
        const easeOutQuad = (t: number) => t * (2 - t);
        const currentCount = Math.floor(end * easeOutQuad(percentage));
        
        setCount(currentCount);

        if (progress < duration) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-6 glass-card rounded-2xl"
    >
      <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
        <Icon size={32} />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-800 dark:text-gray-300 font-medium text-lg">
        {label}
      </div>
    </motion.div>
  );
};

const WhyChooseUs = () => {
  const features = [
    {
      title: "Fast Same-Day Service",
      description: "Most services completed within the same day.",
      icon: Zap,
    },
    {
      title: "Affordable Pricing",
      description: "Competitive rates with no hidden charges.",
      icon: IndianRupee,
    },
    {
      title: "Trusted & Reliable",
      description: "Serving the community with trust for over a decade.",
      icon: ShieldCheck,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <SectionWrapper
      id="about"
      title="Why Choose Us"
      subtitle="Delivering excellence in digital services"
      dark={true}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Counter end={10} label="Years Experience" icon={Clock} />
        <Counter end={15000} label="Happy Customers" icon={Users} />
        <Counter end={100} label="Services" icon={Layers} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className="glass-card rounded-2xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
          >
            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6">
              <feature.icon className="text-blue-600 dark:text-blue-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-800 dark:text-gray-400">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

export default WhyChooseUs;
