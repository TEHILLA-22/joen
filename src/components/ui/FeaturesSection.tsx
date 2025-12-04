'use client';

import { motion } from 'framer-motion';
import { 
  Lock, 
  TrendingUp, 
  Globe2, 
  Zap, 
  BarChart3, 
  Shield,
  Users,
  CreditCard
} from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-level encryption and compliance with industry standards",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Make data-driven decisions with live insights and forecasting",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Globe2,
      title: "Global Network",
      description: "Connect with verified suppliers across 150+ countries",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process thousands of transactions per second with zero downtime",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: BarChart3,
      title: "Smart Pricing",
      description: "AI-powered dynamic pricing and bulk discount automation",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: Shield,
      title: "Fraud Protection",
      description: "Advanced fraud detection and risk management systems",
      gradient: "from-yellow-500 to-amber-500"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Role-based access control and team management tools",
      gradient: "from-rose-500 to-pink-500"
    },
    {
      icon: CreditCard,
      title: "Flexible Payments",
      description: "Multiple payment methods and flexible financing options",
      gradient: "from-teal-500 to-green-500"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Built for{' '}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Scale & Security
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Every feature designed to handle enterprise workloads while maintaining perfect user experience.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.2 }
            }}
            className="group"
          >
            <div className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-gray-700 transition-all">
              {/* Gradient Corner */}
              <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity`} />
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400">
                  {feature.description}
                </p>
                
                {/* Hover Indicator */}
                <div className="mt-6 pt-4 border-t border-gray-800 group-hover:border-gray-700 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient}`} />
                    <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                      Learn more
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}