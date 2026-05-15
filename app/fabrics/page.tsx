'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

interface Fabric {
  name: string;
  composition: string;
  gsm: number;
  category: string;
  priceFrom: number;
  leadDays: number;
  moq: number;
  certs: string[];
}

const fabrics: Fabric[] = [
  { name: 'Cotton Jersey (Standard)', composition: '100% Cotton', gsm: 160, category: 'Jersey', priceFrom: 1.20, leadDays: 14, moq: 500, certs: [] },
  { name: 'Cotton Jersey (Heavyweight)', composition: '100% Cotton', gsm: 220, category: 'Jersey', priceFrom: 1.60, leadDays: 14, moq: 500, certs: [] },
  { name: 'Cotton/Poly Blend Jersey', composition: '60% Cotton, 40% Poly', gsm: 180, category: 'Jersey', priceFrom: 1.10, leadDays: 14, moq: 500, certs: [] },
  { name: 'Pique Polo', composition: '100% Cotton', gsm: 220, category: 'Jersey', priceFrom: 1.90, leadDays: 18, moq: 300, certs: [] },
  { name: 'Waffle Knit', composition: '100% Cotton', gsm: 200, category: 'Jersey', priceFrom: 2.30, leadDays: 21, moq: 300, certs: [] },
  { name: 'French Terry', composition: '80% Cotton, 20% Poly', gsm: 280, category: 'Fleece', priceFrom: 2.20, leadDays: 18, moq: 300, certs: [] },
  { name: 'Brushed Fleece', composition: '80% Cotton, 20% Poly', gsm: 320, category: 'Fleece', priceFrom: 2.80, leadDays: 18, moq: 300, certs: [] },
  { name: 'Heavyweight Fleece', composition: '80% Cotton, 20% Poly', gsm: 400, category: 'Fleece', priceFrom: 3.40, leadDays: 21, moq: 300, certs: [] },
  { name: 'Organic Cotton Jersey (GOTS)', composition: '100% GOTS Organic Cotton', gsm: 160, category: 'Organic', priceFrom: 1.80, leadDays: 21, moq: 500, certs: ['GOTS'] },
  { name: 'Recycled Poly Fleece', composition: '100% rPET', gsm: 280, category: 'Recycled', priceFrom: 2.40, leadDays: 21, moq: 500, certs: ['GRS', 'Oeko-Tex'] },
  { name: 'TENCEL™ Jersey', composition: '100% TENCEL™ Lyocell', gsm: 160, category: 'Organic', priceFrom: 3.20, leadDays: 25, moq: 300, certs: ['TENCEL™'] },
  { name: 'Bamboo Jersey', composition: '95% Bamboo, 5% Spandex', gsm: 180, category: 'Organic', priceFrom: 2.60, leadDays: 21, moq: 300, certs: [] },
  { name: 'Ribbed Knit (1x1)', composition: '95% Cotton, 5% Elastane', gsm: 200, category: 'Jersey', priceFrom: 2.10, leadDays: 21, moq: 200, certs: [] },
  { name: 'Performance Mesh', composition: '100% Polyester', gsm: 120, category: 'Technical', priceFrom: 1.40, leadDays: 18, moq: 500, certs: [] },
  { name: '4-Way Stretch Performance', composition: '88% Polyester, 12% Spandex', gsm: 200, category: 'Technical', priceFrom: 2.80, leadDays: 21, moq: 300, certs: [] },
  { name: 'Stretch Woven', composition: '97% Cotton, 3% Elastane', gsm: 240, category: 'Woven', priceFrom: 3.50, leadDays: 25, moq: 200, certs: [] },
  { name: 'Canvas (Duck)', composition: '100% Cotton', gsm: 400, category: 'Woven', priceFrom: 3.80, leadDays: 25, moq: 200, certs: [] },
  { name: 'Denim (8oz)', composition: '99% Cotton, 1% Elastane', gsm: 320, category: 'Woven', priceFrom: 4.20, leadDays: 28, moq: 200, certs: [] },
  { name: 'Linen Blend', composition: '55% Linen, 45% Cotton', gsm: 180, category: 'Woven', priceFrom: 4.50, leadDays: 28, moq: 200, certs: [] },
  { name: 'Corduroy (21-wale)', composition: '100% Cotton', gsm: 350, category: 'Woven', priceFrom: 5.20, leadDays: 28, moq: 200, certs: [] },
  { name: 'Interlock (Double Knit)', composition: '100% Cotton', gsm: 240, category: 'Jersey', priceFrom: 2.00, leadDays: 18, moq: 300, certs: [] },
  { name: 'Thermal Waffle', composition: '100% Cotton', gsm: 260, category: 'Jersey', priceFrom: 2.80, leadDays: 21, moq: 300, certs: [] },
  { name: 'Velvet', composition: '80% Polyester, 20% Cotton', gsm: 350, category: 'Woven', priceFrom: 6.00, leadDays: 35, moq: 150, certs: [] },
  { name: 'Satin Lining', composition: '100% Polyester', gsm: 60, category: 'Woven', priceFrom: 0.80, leadDays: 14, moq: 500, certs: [] },
  { name: 'Ribbed Knit (2x2)', composition: '95% Cotton, 5% Elastane', gsm: 220, category: 'Jersey', priceFrom: 2.30, leadDays: 21, moq: 200, certs: [] },
];

const categories = ['All', 'Jersey', 'Fleece', 'Woven', 'Technical', 'Organic', 'Recycled'];

// Neutral swatch palette mapped by category
const swatchGradients: Record<string, string> = {
  Jersey: 'linear-gradient(135deg, #C8B89A 0%, #9A8060 100%)',
  Fleece: 'linear-gradient(135deg, #A0A0A0 0%, #606060 100%)',
  Woven: 'linear-gradient(135deg, #B8A898 0%, #786858 100%)',
  Technical: 'linear-gradient(135deg, #7A8A9A 0%, #4A5A6A 100%)',
  Organic: 'linear-gradient(135deg, #B0C0A0 0%, #7A9060 100%)',
  Recycled: 'linear-gradient(135deg, #7A9898 0%, #4A6868 100%)',
};

const certColours: Record<string, string> = {
  GOTS: 'bg-green-900/60 text-green-300 border-green-700/50',
  'Oeko-Tex': 'bg-blue-900/60 text-blue-300 border-blue-700/50',
  GRS: 'bg-teal-900/60 text-teal-300 border-teal-700/50',
  'TENCEL™': 'bg-purple-900/60 text-purple-300 border-purple-700/50',
  rPET: 'bg-cyan-900/60 text-cyan-300 border-cyan-700/50',
};

export default function FabricsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? fabrics
    : fabrics.filter((f) => f.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white">
      <Navbar />

      {/* ============================================================
          PAGE HEADER
          ============================================================ */}
      <section className="relative pt-28 pb-14 px-6 border-b border-[#1E1E24] overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[200px] bg-[#E5232A]/4 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div
            className="text-[11px] text-[#E5232A] tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
          >
            MAT.CAT — MATERIAL INDEX
          </div>
          <h1
            className="font-bold uppercase tracking-tight mb-4"
            style={{ fontFamily: "'Dogma', sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}
          >
            FABRIC CATALOGUE
          </h1>
          <p className="text-gray-500 text-base max-w-xl">
            Kazi stock fabrics — available from 200m MOQ. All materials certified and
            tested. Specify your GSM, composition, and certification requirements.
          </p>

          {/* Stats row */}
          <div className="mt-8 flex flex-wrap gap-6">
            {[
              { label: 'SKUs', value: '25' },
              { label: 'Categories', value: '6' },
              { label: 'Min MOQ', value: '150m' },
              { label: 'Certifications', value: 'GOTS · GRS · Oeko-Tex' },
            ].map((s) => (
              <div key={s.label}>
                <div
                  className="text-xl font-bold text-[#00FF88] stat-readout"
                >
                  {s.value}
                </div>
                <div
                  className="text-[10px] text-gray-600 tracking-widest uppercase mt-0.5"
                  style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          FILTER ROW
          ============================================================ */}
      <section className="sticky top-[64px] z-30 bg-[#0A0A0B]/95 backdrop-blur-md border-b border-[#1E1E24] px-6 py-4 overflow-x-auto">
        <div className="flex items-center gap-2 max-w-7xl mx-auto min-w-max">
          <span
            className="text-[10px] text-gray-600 tracking-[0.2em] uppercase mr-2 shrink-0"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
          >
            FILTER
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-xs tracking-widest uppercase border transition-all duration-200 shrink-0 ${
                activeCategory === cat
                  ? 'border-[#E5232A] text-white bg-[#E5232A]/15'
                  : 'border-[#1E1E24] text-gray-500 hover:border-[#E5232A]/40 hover:text-gray-300'
              }`}
              style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
            >
              {cat}
            </button>
          ))}
          <span
            className="ml-auto pl-6 text-[10px] text-gray-600 shrink-0"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
          >
            {filtered.length} results
          </span>
        </div>
      </section>

      {/* ============================================================
          FABRIC GRID
          ============================================================ */}
      <section className="py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((fabric) => {
            const leadFast = fabric.leadDays < 21;
            const swatch = swatchGradients[fabric.category] ?? swatchGradients.Jersey;

            return (
              <div key={fabric.name} className="tech-card group overflow-hidden flex flex-col">
                {/* Colour swatch */}
                <div
                  className="h-20 relative overflow-hidden"
                  style={{ background: swatch }}
                >
                  <div className="absolute inset-0 grid-overlay-fine opacity-60" />
                  {/* Category tag */}
                  <div
                    className="absolute top-2 left-2 px-2 py-0.5 border border-white/10 bg-black/50 text-[9px] tracking-widest uppercase text-gray-400"
                    style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                  >
                    {fabric.category}
                  </div>
                  {/* GSM badge */}
                  <div
                    className="absolute bottom-2 right-2 text-[10px] font-bold text-white/80"
                    style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                  >
                    {fabric.gsm} GSM
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-bold text-white text-sm mb-1 group-hover:text-[#E5232A] transition-colors duration-200 leading-snug">
                    {fabric.name}
                  </h3>
                  <p
                    className="text-gray-500 text-[11px] mb-3"
                    style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                  >
                    {fabric.composition}
                  </p>

                  {/* Data rows */}
                  <div className="space-y-1.5 mb-3 flex-1">
                    <div className="flex justify-between items-center">
                      <span
                        className="text-[10px] text-gray-600 uppercase tracking-widest"
                        style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                      >
                        LEAD
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm border ${
                          leadFast
                            ? 'text-[#00FF88] border-[#00FF88]/30 bg-[#00FF88]/8'
                            : 'text-amber-400 border-amber-500/30 bg-amber-500/8'
                        }`}
                        style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                      >
                        {fabric.leadDays} days
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className="text-[10px] text-gray-600 uppercase tracking-widest"
                        style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                      >
                        MOQ
                      </span>
                      <span
                        className="text-[11px] text-white font-semibold"
                        style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                      >
                        {fabric.moq}m
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span
                        className="text-[10px] text-gray-600 uppercase tracking-widest"
                        style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                      >
                        PRICE
                      </span>
                      <span
                        className="text-[11px] text-[#E5232A] font-semibold"
                        style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                      >
                        From £{fabric.priceFrom.toFixed(2)}/m
                      </span>
                    </div>
                  </div>

                  {/* Cert badges */}
                  {fabric.certs.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {fabric.certs.map((cert) => (
                        <span
                          key={cert}
                          className={`px-2 py-0.5 text-[9px] border rounded-sm ${certColours[cert] ?? 'bg-gray-800 text-gray-400 border-gray-700'}`}
                          style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace", letterSpacing: '0.06em' }}
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom accent */}
                <div className="h-px bg-[#E5232A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================
          CUSTOM FABRIC CTA
          ============================================================ */}
      <section className="py-20 px-6 border-t border-[#1E1E24] bg-[#0D0D10] relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[200px] bg-[#E5232A]/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div
            className="text-[11px] text-[#E5232A] tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
          >
            CUSTOM SOURCING
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Don&apos;t see what you need?
          </h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            We source custom fabrics. Tell us your specification — GSM, composition,
            hand-feel, certification — and we&apos;ll find or develop it.
          </p>
          <Link
            href="/quote"
            className="inline-block px-12 py-4 bg-[#E5232A] text-white font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_32px_rgba(229,35,42,0.6)] hover:scale-105"
          >
            Request Custom Fabric →
          </Link>
        </div>
      </section>

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer className="py-10 px-6 border-t border-[#1E1E24] bg-[#0A0A0B]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#E5232A] rounded-sm inline-block" />
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
            className="text-xs text-gray-600 hover:text-[#E5232A] transition-colors duration-200 tracking-wide"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
          >
            hello@kazimanufacturing.com
          </a>
        </div>
      </footer>
    </main>
  );
}
