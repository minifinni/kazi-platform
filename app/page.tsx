'use client';

// NOTE: The Navbar component uses a dark background by design (dark futuristic theme).
// In this editorial branch we wrap the page in a light container but let the Navbar
// sit dark — acceptable for this design variant. A fully light Navbar would require
// extracting a separate EditorialNavbar component (future work).

import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="bg-[#FAFAF8] text-[#0D0D0D] min-h-screen">
      <Navbar />

      {/* ============================================================
          HERO SECTION — split layout
          ============================================================ */}
      <section className="min-h-screen flex items-center pt-20 pb-16 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: editorial copy */}
          <div>
            {/* Location label */}
            <p className="text-xs tracking-[0.22em] uppercase text-[#8B8B8B] mb-8 font-sans">
              Kathmandu · Nepal · Est. 2019
            </p>

            {/* Headline */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.05] tracking-tight mb-8 text-[#0D0D0D]">
              <span className="block">Garments</span>
              <span className="block">made right,</span>
              <span className="block">from source.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#8B8B8B] text-lg leading-relaxed mb-10 max-w-md">
              Private label manufacturing for UK and European clothing brands.
              50-unit MOQ, 21–35 day production.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Link
                href="/quote"
                className="inline-block px-8 py-3.5 bg-[#E5232A] text-white text-sm tracking-[0.1em] uppercase font-medium transition-colors duration-200 hover:bg-[#c41f25]"
              >
                Request a Sample
              </Link>
              <Link
                href="/process"
                className="text-sm text-[#0D0D0D] hover:text-[#E5232A] transition-colors duration-200 tracking-wide"
              >
                See our process →
              </Link>
            </div>
          </div>

          {/* Right: stat column */}
          <div className="lg:pl-12 lg:border-l border-[#0D0D0D]/10">
            {[
              { number: '50', label: 'Unit minimum' },
              { number: '21–35', label: 'Day production' },
              { number: '100+', label: 'Fabric options' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`py-8 ${i < 2 ? 'border-b border-[#0D0D0D]/10' : ''}`}
              >
                <p className="font-serif text-6xl md:text-7xl text-[#0D0D0D] leading-none mb-2">
                  {stat.number}
                </p>
                <p className="text-xs tracking-[0.18em] uppercase text-[#8B8B8B]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Thin red rule */}
      <div className="border-t border-[#E5232A] mx-6 md:mx-12 lg:mx-20" />

      {/* ============================================================
          SERVICES GRID — text blocks with left red border
          ============================================================ */}
      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="mb-14">
            <p className="text-xs tracking-[0.22em] uppercase text-[#8B8B8B] mb-4 font-sans">
              What We Make
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0D0D0D] leading-snug">
              Private label. Cut &amp; sew. Your brand.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
            {[
              {
                title: 'T-Shirts & Basics',
                meta: 'From £3.20/unit · 50 MOQ · 180–220 GSM jersey',
              },
              {
                title: 'Hoodies & Sweatshirts',
                meta: 'From £8.50/unit · 50 MOQ · French terry or brushed fleece',
              },
              {
                title: 'Cut & Sew Custom',
                meta: 'From £12.00/unit · 30 MOQ · Any pattern, any fabric',
              },
              {
                title: 'Private Label Package',
                meta: 'Labels, hangtags, packaging included · MOQ negotiable',
              },
            ].map((service) => (
              <div key={service.title} className="pl-5 border-l-2 border-[#E5232A]">
                <h3 className="font-serif text-xl text-[#0D0D0D] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-[#8B8B8B] leading-relaxed">
                  {service.meta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PROCESS SECTION — numbered steps
          ============================================================ */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#F2F0EC]">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="mb-14">
            <p className="text-xs tracking-[0.22em] uppercase text-[#8B8B8B] mb-4 font-sans">
              How It Works
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0D0D0D] leading-snug">
              From brief to delivery in five steps.
            </h2>
          </div>

          <ol className="space-y-10">
            {[
              {
                n: '01',
                step: 'Submit your brief',
                detail: 'Tech pack or description',
              },
              {
                n: '02',
                step: 'Fabric and trim selection',
                detail: 'We send physical swatches',
              },
              {
                n: '03',
                step: 'Sampling & approval',
                detail: 'Pre-production sample, 7–10 days',
              },
              {
                n: '04',
                step: 'Production',
                detail: '21–28 days from approval',
              },
              {
                n: '05',
                step: 'QC & delivery',
                detail: 'DHL/FedEx direct to your UK address',
              },
            ].map((item, i) => (
              <li
                key={item.n}
                className={`flex items-baseline gap-8 pb-10 ${
                  i < 4 ? 'border-b border-[#0D0D0D]/10' : ''
                }`}
              >
                <span className="font-serif text-4xl md:text-5xl text-[#E5232A] shrink-0 leading-none w-16">
                  {item.n}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-[#0D0D0D] mb-1">
                    {item.step}
                  </h3>
                  <p className="text-sm text-[#8B8B8B]">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================================================
          TESTIMONIAL / TRUST SECTION
          ============================================================ */}
      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <blockquote className="mb-8">
              <p className="font-serif text-2xl md:text-3xl text-[#0D0D0D] leading-snug mb-5">
                &ldquo;Kazi turned our design into production-ready samples in
                10 days. The fabric quality matched our spec exactly.&rdquo;
              </p>
              <footer className="text-sm text-[#8B8B8B] tracking-wide">
                — UK Streetwear Brand, 2024
              </footer>
            </blockquote>

            {/* Certification pills */}
            <div className="flex flex-wrap gap-3 mt-10">
              {['GOTS CERTIFIED', 'OEKO-TEX TESTED', 'BSCI COMPLIANT'].map(
                (cert) => (
                  <span
                    key={cert}
                    className="text-xs tracking-[0.18em] uppercase border border-[#0D0D0D]/20 text-[#8B8B8B] px-4 py-2 font-sans"
                  >
                    {cert}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER CTA
          ============================================================ */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-[#F2F0EC]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-[#E5232A] mb-10 leading-tight">
            Ready to start your collection?
          </h2>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              href="/pricing"
              className="inline-block px-10 py-4 bg-[#E5232A] text-white text-sm tracking-[0.1em] uppercase font-medium transition-colors duration-200 hover:bg-[#c41f25]"
            >
              Get a Quote
            </Link>
            <Link
              href="/quote"
              className="inline-block px-10 py-4 border border-[#0D0D0D] text-[#0D0D0D] text-sm tracking-[0.1em] uppercase font-medium transition-colors duration-200 hover:border-[#E5232A] hover:text-[#E5232A]"
            >
              Download Lookbook
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer className="py-10 px-6 md:px-12 lg:px-20 border-t border-[#0D0D0D]/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1 h-4 bg-[#E5232A] inline-block" />
            <span className="text-sm font-medium tracking-[0.12em] uppercase text-[#0D0D0D]">
              Kazi Manufacturing
            </span>
          </div>
          <p className="text-xs text-[#8B8B8B] tracking-wide">
            © 2026 Kazi Manufacturing — Kathmandu, Nepal
          </p>
          <a
            href="mailto:hello@kazimanufacturing.com"
            className="text-xs text-[#8B8B8B] hover:text-[#E5232A] transition-colors duration-200 tracking-wide"
          >
            hello@kazimanufacturing.com
          </a>
        </div>
      </footer>
    </div>
  );
}
