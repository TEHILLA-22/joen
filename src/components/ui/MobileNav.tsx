'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  ChevronRight, 
  ChevronDown,
  Building2, 
  Package, 
  Users, 
  BarChart3, 
  Globe,
  HelpCircle,
  CreditCard,
  FileText,
  Shield,
  Zap,
  TrendingUp,
  Target,
  Globe2,
  MessageSquare,
  BookOpen,
  Code
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Navigation structure with real links
  const navigation = {
    businesses: {
      label: 'For Businesses',
      icon: Building2,
      href: '/businesses',
      submenu: [
        { label: 'Dashboard', href: '/dashboard', icon: BarChart3 },
        { label: 'Product Management', href: '/dashboard/products', icon: Package },
        { label: 'Order Processing', href: '/dashboard/orders', icon: TrendingUp },
        { label: 'Analytics', href: '/dashboard/analytics', icon: Target },
        { label: 'Company Settings', href: '/dashboard/settings', icon: Shield },
      ]
    },
    products: {
      label: 'Products',
      icon: Package,
      href: '/products',
      submenu: [
        { label: 'Browse Catalog', href: '/products/catalog', icon: Package },
        { label: 'Bulk Pricing', href: '/products/bulk-pricing', icon: CreditCard },
        { label: 'Categories', href: '/products/categories', icon: FileText },
        { label: 'New Arrivals', href: '/products/new', icon: Zap },
      ]
    },
    suppliers: {
      label: 'Suppliers',
      icon: Users,
      href: '/suppliers',
      submenu: [
        { label: 'Find Suppliers', href: '/suppliers/find', icon: Users },
        { label: 'Verified Partners', href: '/suppliers/verified', icon: Shield },
        { label: 'Global Directory', href: '/suppliers/directory', icon: Globe2 },
        { label: 'Become a Supplier', href: '/suppliers/register', icon: TrendingUp },
      ]
    },
    network: {
      label: 'Network',
      icon: Globe,
      href: '/network',
      submenu: [
        { label: 'Global Coverage', href: '/network/coverage', icon: Globe2 },
        { label: 'Local Hubs', href: '/network/hubs', icon: Target },
        { label: 'Partner Program', href: '/network/partners', icon: Users },
        { label: 'API Access', href: '/api', icon: Code },
      ]
    },
    resources: {
      label: 'Resources',
      icon: BookOpen,
      href: '/resources',
      submenu: [
        { label: 'Documentation', href: '/docs', icon: FileText },
        { label: 'API Reference', href: '/api/docs', icon: Code },
        { label: 'Help Center', href: '/help', icon: HelpCircle },
        { label: 'Community Forum', href: '/community', icon: MessageSquare },
      ]
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-900/95 backdrop-blur-lg border-b border-gray-800' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg"></div>
              <span className="text-2xl font-bold text-white">joenise</span>
            </Link>

            {/* Main Navigation */}
            <div className="flex items-center gap-1" ref={dropdownRef}>
              {Object.entries(navigation).map(([key, item]) => (
                <div key={key} className="relative">
                  <button
                    onClick={() => setOpenDropdown(openDropdown === key ? null : key)}
                    onMouseEnter={() => setOpenDropdown(key)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors rounded-lg hover:bg-white/5"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                    <ChevronDown className={`w-3 h-3 transition-transform ${
                      openDropdown === key ? 'rotate-180' : ''
                    }`} />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {openDropdown === key && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        onMouseLeave={() => setOpenDropdown(null)}
                        className="absolute top-full left-0 mt-2 w-64 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden"
                      >
                        <div className="p-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                pathname === subItem.href
                                  ? 'bg-blue-500/20 text-blue-300'
                                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
                              }`}
                              onClick={() => setOpenDropdown(null)}
                            >
                              <subItem.icon className="w-4 h-4" />
                              <span className="font-medium">{subItem.label}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Static Pages */}
              <Link
                href="/pricing"
                className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-gray-300 hover:text-white font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/register-company"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50">
        {/* Top Bar */}
        <motion.div
          className={`px-4 py-3 transition-all duration-300 ${
            scrolled || isOpen ? 'bg-gray-900/95 backdrop-blur-lg' : 'bg-transparent'
          }`}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg"></div>
              <span className="text-xl font-bold text-white">joenise</span>
            </Link>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900/95 backdrop-blur-lg z-40 pt-20 overflow-y-auto"
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25 }}
                className="h-full bg-gray-900 border-l border-gray-800"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 pb-32">
                  {/* Navigation Items with Dropdowns */}
                  {Object.entries(navigation).map(([key, item]) => (
                    <div key={key} className="mb-2">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === key ? null : key)}
                        className="flex items-center justify-between w-full p-4 rounded-xl hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                            <item.icon className="w-5 h-5 text-blue-400" />
                          </div>
                          <span className="text-white font-medium">{item.label}</span>
                        </div>
                        <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                          openDropdown === key ? 'rotate-90' : ''
                        }`} />
                      </button>

                      {/* Mobile Submenu */}
                      <AnimatePresence>
                        {openDropdown === key && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="ml-4 pl-4 border-l border-gray-800 overflow-hidden"
                          >
                            {item.submenu.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className="flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                                onClick={() => {
                                  setIsOpen(false);
                                  setOpenDropdown(null);
                                }}
                              >
                                <subItem.icon className="w-4 h-4" />
                                <span>{subItem.label}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  {/* Static Pages */}
                  <div className="space-y-2 mt-6 pt-6 border-t border-gray-800">
                    <Link
                      href="/pricing"
                      className="block p-4 rounded-xl hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Pricing
                    </Link>
                    <Link
                      href="/contact"
                      className="block p-4 rounded-xl hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/about"
                      className="block p-4 rounded-xl hover:bg-gray-800 text-gray-300 hover:text-white transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      About Us
                    </Link>
                  </div>

                  {/* Auth Buttons */}
                  <div className="space-y-3 mt-8 pt-8 border-t border-gray-800">
                    <Link
                      href="/login"
                      className="block w-full p-4 text-center border border-gray-700 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/register-company"
                      className="block w-full p-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started Free
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}