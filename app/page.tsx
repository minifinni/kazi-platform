'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';

const services = [
  {
    title: 'T-Shirts & Basics',
    code: 'SVC-001',
    description: 'High-quality cotton and blended tees from classic fits to modern cuts. Multiple weights — 140gsm to 220gsm.',
    stat: '50 unit MOQ',
    image: '/images/tshirts.jpg',
  },
  {
    title: 'Hoodies & Outerwear',
    code: 'SVC-002',
    description: 'Premium hoodies, sweatshirts and jackets with full custom detailing — drawstrings, pockets, cuffs.',
    stat: 'From £14.50/unit',
    image: '/images/factory-1.jpg',
  },
  {
    title: 'Embroidery & Print',
    code: 'SVC-003',
    description: 'DTG, screen printing, DTF transfers and professional embroidery — flat, 3D puff, and appliqué.',
    stat: '4 print methods',
    image: '/images/embroidery.jpg',
  },
  {
    title: 'Private Label',
    code: 'SVC-004',
    description: 'Complete private label solutions: custom woven tags, packaging, hang tags and full branding.',
    stat: '100% your brand',
    image: '/images/factory-3.jpg',
  },
];

const stats = [
  { value: '50', unit: 'units', label: 'Minimum order', prefix: '' },
  { value: '0', unit: '%', label: 'UK import duty', prefix: '' },
  { value: '14', unit: 'days', label: 'Avg. turnaround', prefix: '' },
  { value: '£3.20', unit: '/unit', label: 'From (1000+ tees)', prefix: '' },
];

const printMethods = [
  { title: 'DTG Printing', code: 'P-01', desc: 'Perfect for detailed designs and small runs', href: '/services/dtg' },
  { title: 'Embroidery', code: 'P-02', desc: 'Premium stitched designs built to last', href: '/services/embroidery' },
  { title: 'Screen Printing', code: 'P-03', desc: 'Ideal for bulk orders and bold graphics', href: '/services/screen-printing' },
  { title: 'DTF Transfers', code: 'P-04', desc: 'Vibrant full-colour prints on any fabric', href: '/services/dtf' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white">
      <Navbar />

      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with dark overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/kazi-hero-mountain.jpg"
            alt="Kazi Manufacturing"
            fill
            className="object-cover object-top opacity-20"
            priority
            quality={90}
          />
          {/* Gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/60 via-[#0A0A0B]/40 to-[#0A0A0B]" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay opacity-60" />

        {/* Fine grid layer */}
        <div className="absolute inset-0 grid-overlay-fine" />

        {/* Horizontal accent line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF0000]/20 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 pb-12">
          {/* System label */}
          <div
            className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 border border-[#FF0000]/30 text-[#FF0000] animate-fade-in opacity-0"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace", fontSize: '11px', letterSpacing: '0.15em' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse inline-block" />
            SYS.ONLINE — KATHMANDU, NEPAL — ISO COMPLIANT
          </div>

          {/* Main heading */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-none tracking-tight animate-fade-in-up opacity-0 delay-100"
            style={{ fontFamily: "'Dogma', sans-serif" }}
          >
            <span className="block text-white">PRECISION</span>
            <span className="block text-white">GARMENT</span>
            <span className="block text-[#FF0000] text-glow-red">MANUFACTURING</span>
          </h1>

          {/* Subheadline */}
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up opacity-0 delay-300">
            Custom apparel from Kathmandu for UK clothing brands.
            0% import duty. MOQ from 50 units.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in-up opacity-0 delay-400">
            <Link
              href="/pricing"
              className="inline-block px-10 py-4 bg-[#FF0000] text-white font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_24px_rgba(255,0,0,0.6)] hover:scale-105"
            >
              Configure Order
            </Link>
            <Link
              href="/quote"
              className="inline-block px-10 py-4 bg-transparent text-white font-semibold text-sm tracking-widest uppercase border border-white/20 transition-all duration-300 hover:border-white/60 hover:bg-white/5"
            >
              Contact Us
            </Link>
          </div>

          {/* Stat readouts */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-in-up opacity-0 delay-500">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="corner-accent p-4 bg-[#111114] border border-[#1E1E24] group hover:border-[#FF0000]/40 transition-all duration-300"
              >
                <div
                  className="text-3xl font-bold text-[#FF0000] leading-none mb-1 stat-readout"
                >
                  {stat.value}
                  <span className="text-base font-normal text-red-400/70 ml-0.5">{stat.unit}</span>
                </div>
                <div
                  className="text-[10px] text-gray-500 uppercase tracking-widest"
                  style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in opacity-0 delay-800">
          <div
            className="text-[10px] text-gray-600 tracking-widest uppercase"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
          >
            SCROLL
          </div>
          <div className="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent" />
        </div>
      </section>

      {/* ============================================================
          SERVICES SECTION
          ============================================================ */}
      <section className="py-24 px-4 bg-[#0A0A0B] border-t border-[#1E1E24]">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="mb-12 flex items-end justify-between">
            <div>
              <div
                className="text-[11px] text-[#FF0000] tracking-[0.2em] uppercase mb-2"
                style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
              >
                CAT.01 — CAPABILITIES
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Our Services
              </h2>
            </div>
            <Link
              href="/services"
              className="hidden sm:flex items-center gap-2 text-sm text-gray-500 hover:text-[#FF0000] transition-colors duration-200 group"
            >
              View all
              <span className="text-[#FF0000] group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="tech-card group relative overflow-hidden"
              >
                {/* Image strip */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-[#111114]/40 to-transparent" />
                  {/* Code label */}
                  <div
                    className="absolute top-3 left-3 text-[10px] text-gray-500 tracking-widest"
                    style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                  >
                    {service.code}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">{service.title}</h3>
                    <span
                      className="text-xs text-[#FF0000] border border-[#FF0000]/30 px-2 py-0.5 shrink-0 ml-3 stat-readout"
                    >
                      {service.stat}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                </div>

                {/* Bottom border accent on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#FF0000] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PRINT METHODS SECTION
          ============================================================ */}
      <section className="py-24 px-4 bg-[#0D0D10] border-t border-[#1E1E24]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div
              className="text-[11px] text-[#FF0000] tracking-[0.2em] uppercase mb-2"
              style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
            >
              CAT.02 — PRINT METHODS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Decoration Techniques
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl">
              Choose the optimal technique for your design, fabric type, and order volume.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {printMethods.map((method) => (
              <Link key={method.title} href={method.href} className="group">
                <div className="tech-card h-full p-6 relative">
                  {/* Code tag */}
                  <div
                    className="text-[10px] text-gray-600 tracking-widest mb-4"
                    style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                  >
                    {method.code}
                  </div>
                  <h3 className="font-bold text-base text-white mb-2 group-hover:text-[#FF0000] transition-colors duration-200">
                    {method.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{method.desc}</p>

                  {/* Arrow */}
                  <div className="mt-4 text-gray-600 group-hover:text-[#FF0000] transition-colors duration-200 text-sm">
                    Learn more →
                  </div>

                  {/* Corner accent on hover */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-transparent group-hover:border-[#FF0000]/60 transition-colors duration-300" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-transparent group-hover:border-[#FF0000]/60 transition-colors duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          WHY KAZI / SPECS SECTION
          ============================================================ */}
      <section className="py-24 px-4 bg-[#0A0A0B] border-t border-[#1E1E24]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: heading */}
            <div>
              <div
                className="text-[11px] text-[#FF0000] tracking-[0.2em] uppercase mb-2"
                style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
              >
                CAT.03 — WHY NEPAL
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
                Built for UK brands.<br />
                <span className="text-[#FF0000]">Engineered for margin.</span>
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Nepal's DFQF trade agreement with the UK means zero import duty on garments —
                a structural cost advantage over China, India, and Bangladesh-based competitors.
                Combined with Kazi's precision manufacturing, it means higher margins without
                sacrificing quality.
              </p>
              <Link
                href="/pricing"
                className="inline-block px-8 py-3 bg-[#FF0000] text-white font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_24px_rgba(255,0,0,0.6)]"
              >
                See Pricing
              </Link>
            </div>

            {/* Right: spec table */}
            <div className="border border-[#1E1E24] overflow-hidden">
              {/* Table header */}
              <div
                className="bg-[#111114] border-b border-[#1E1E24] px-6 py-3 text-[11px] text-gray-500 tracking-widest uppercase flex justify-between"
                style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
              >
                <span>SPEC</span>
                <span>VALUE</span>
              </div>
              {/* Rows */}
              {[
                ['UK Import Duty', '0%', 'red'],
                ['MOQ', '50 units', 'white'],
                ['Lead Time', '14–21 days', 'white'],
                ['Quality Control', 'In-house QC', 'white'],
                ['Certifications', 'GOTS available', 'white'],
                ['Fabric weight range', '140–380 gsm', 'white'],
                ['Min. embroidery', '1,000 stitches', 'white'],
                ['Shipping', 'Air & sea freight', 'white'],
              ].map(([spec, val, color]) => (
                <div
                  key={spec}
                  className="flex items-center justify-between px-6 py-3.5 border-b border-[#1E1E24] last:border-0 hover:bg-[#111114] transition-colors duration-150 group"
                >
                  <span className="text-sm text-gray-400">{spec}</span>
                  <span
                    className={`text-sm font-semibold stat-readout ${color === 'red' ? 'text-[#FF0000]' : 'text-white'}`}
                  >
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA SECTION
          ============================================================ */}
      <section className="py-24 px-4 bg-[#0D0D10] border-t border-[#1E1E24] relative overflow-hidden">
        {/* Grid backdrop */}
        <div className="absolute inset-0 grid-overlay opacity-40" />
        {/* Red glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] bg-[#FF0000]/5 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div
            className="text-[11px] text-[#FF0000] tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
          >
            INITIATE PRODUCTION
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight">
            Ready to start your run?
          </h2>
          <p className="text-gray-500 mb-10 text-lg max-w-xl mx-auto">
            Configure your order and receive a quote within 24 hours. No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="inline-block px-12 py-4 bg-[#FF0000] text-white font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_32px_rgba(255,0,0,0.7)] hover:scale-105"
            >
              Configure Order
            </Link>
            <Link
              href="/quote"
              className="inline-block px-12 py-4 bg-transparent text-white font-semibold text-sm tracking-widest uppercase border border-white/20 transition-all duration-300 hover:border-white/50 hover:bg-white/5"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer className="py-10 px-4 border-t border-[#1E1E24] bg-[#0A0A0B]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#FF0000] rounded-sm inline-block" />
            <span
              className="text-white font-bold tracking-[0.15em] text-sm uppercase"
              style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
            >
              KAZI MFG
            </span>
          </div>
          <p
            className="text-xs text-gray-600 tracking-wide"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
          >
            © 2026 KAZI MANUFACTURING — KATHMANDU, NEPAL
          </p>
          <a
            href="mailto:hello@kazimanufacturing.com"
            className="text-xs text-gray-600 hover:text-[#FF0000] transition-colors duration-200 tracking-wide"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
          >
            hello@kazimanufacturing.com
          </a>
        </div>
      </footer>
    </main>
  );
}
