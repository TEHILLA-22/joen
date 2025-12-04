'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Building2, Globe, TrendingUp } from 'lucide-react';

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60); // 60fps
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [end, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function StatsSection() {
  const stats = [
    { icon: Users, value: 50000, label: 'Active Businesses', suffix: '+' },
    { icon: Building2, value: 15000, label: 'Verified Suppliers', suffix: '+' },
    { icon: Globe, value: 120, label: 'Countries Served', suffix: '' },
    { icon: TrendingUp, value: 98.7, label: 'Uptime SLA', suffix: '%' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-4">
              <stat.icon className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-4xl font-bold text-white mb-2">
              <AnimatedCounter end={stat.value} />
              {stat.suffix}
            </div>
            <p className="text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}