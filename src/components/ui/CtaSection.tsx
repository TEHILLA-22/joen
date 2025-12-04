'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

export function CtaSection() {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 p-8 md:p-12"
      >
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Transform Your{' '}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  B2B Operations?
                </span>
              </h2>
              <p className="text-gray-400 text-lg mb-6">
                Join thousands of businesses already scaling with Joenise. No commitments, cancel anytime.
              </p>
              
              <div className="space-y-3 mb-8">
                {[
                  '14-day free trial',
                  'No credit card required',
                  'Full platform access',
                  'Priority support'
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex-1 max-w-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-4">Start Your Free Trial</h3>
                
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Work Email"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:shadow-2xl hover:shadow-blue-500/25 transition-all"
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </form>
                
                <p className="text-gray-500 text-sm text-center mt-4">
                  By signing up, you agree to our Terms and Privacy Policy
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}