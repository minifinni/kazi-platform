'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    title: 'T-Shirts & Basics',
    description: 'High-quality cotton and blended tees, from classic fits to modern cuts. Perfect for brands, events, and corporate wear.',
    image: '/images/tshirts.jpg',
    icon: '👕',
  },
  {
    title: 'Hoodies & Outerwear',
    description: 'Premium hoodies, sweatshirts, and jackets with custom branding and detailing.',
    image: '/images/factory-1.jpg',
    icon: '🧥',
  },
  {
    title: 'Embroidery & Print',
    description: 'High-quality embroidery, screen printing, and direct-to-garment printing services.',
    image: '/images/embroidery.jpg',
    icon: '🧵',
  },
  {
    title: 'Private Label',
    description: 'Full private label service including custom tags, packaging, and branding.',
    image: '/images/factory-3.jpg',
    icon: '🏷️',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero with Background Image */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/kazi-hero-mountain.jpg"
            alt="Kazi Manufacturing"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay - warm tones to match sunrise mountain */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-900/30 via-blue-950/50 to-slate-900/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Your Manufacturing Partner in Nepal
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            T-shirts, hoodies, embroidery & custom apparel. 0% UK import duty. MOQ from 50 units.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="inline-block bg-orange-500 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
            >
              See Pricing
            </Link>
            <Link
              href="/quote"
              className="inline-block bg-white/10 text-white px-10 py-4 rounded-lg font-semibold text-lg border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 md:py-24 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Content */}
                <div className="p-6">
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Print Methods */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Our Print Methods</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Choose the perfect technique for your design
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'DTG Printing', desc: 'Perfect for detailed designs and small runs', href: '/services/dtg' },
              { title: 'Embroidery', desc: 'Premium stitched designs that last', href: '/services/embroidery' },
              { title: 'Screen Printing', desc: 'Ideal for bulk orders and bold graphics', href: '/services/screen-printing' },
              { title: 'DTF Transfers', desc: 'Vibrant colors on any fabric type', href: '/services/dtf' },
            ].map((method) => (
              <Link key={method.title} href={method.href} className="group">
                <div className="bg-gray-50 rounded-xl p-6 text-center hover:bg-gray-100 transition-colors h-full border border-gray-200 hover:border-orange-300">
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{method.title}</h3>
                  <p className="text-gray-600 text-sm">{method.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Ready to start your production?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Get a quote within 24 hours. No commitment required.
          </p>
          <Link
            href="/quote"
            className="inline-block bg-orange-500 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-orange-600 transition-all duration-300 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105"
          >
            Get a Quote
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t bg-white">
        <div className="max-w-6xl mx-auto text-center text-gray-500">
          <p>&copy; 2026 Kazi Manufacturing. All rights reserved.</p>
          <p className="text-sm mt-2">Kathmandu, Nepal | hello@kazimanufacturing.com</p>
        </div>
      </footer>
    </main>
  );
}
