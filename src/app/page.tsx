import { AnimatedHero } from '~/components/ui/AnimatedHero';
import { FeaturesSection } from '~/components/ui/FeaturesSection';
import { StatsSection } from '~/components/ui/StatsSection';
import { CtaSection } from '~/components/ui/CtaSection';
import { MobileNav } from '~/components/ui/MobileNav';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Mobile Navigation */}
      <MobileNav />
      
      {/* Hero Section */}
      <section className="relative">
        <AnimatedHero />
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <FeaturesSection />
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950">
        <StatsSection />
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <CtaSection />
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg"></div>
                <span className="text-2xl font-bold text-white">joenise</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Revolutionizing B2B commerce with cutting-edge technology and seamless experiences.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">API</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Joenise. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}