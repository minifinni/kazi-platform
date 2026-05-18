'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';

const featuredFabrics = [
  {
    name: 'Cotton Jersey Heavyweight',
    spec: '220 GSM · 100% Cotton · 14 days',
    price: '£1.60/m',
    certs: [],
    swatchBg: 'linear-gradient(135deg, #C8B89A 0%, #A89070 100%)',
  },
  {
    name: 'Brushed Fleece',
    spec: '320 GSM · 80/20 Cotton/Poly · 18 days',
    price: '£2.80/m',
    certs: [],
    swatchBg: 'linear-gradient(135deg, #9E9E9E 0%, #707070 100%)',
  },
  {
    name: 'TENCEL™ Jersey',
    spec: '160 GSM · 100% TENCEL™ · 25 days',
    price: '£3.20/m',
    certs: ['TENCEL™'],
    swatchBg: 'linear-gradient(135deg, #B8C4BE 0%, #8FA89A 100%)',
  },
  {
    name: 'Organic Cotton (GOTS)',
    spec: '160 GSM · 100% Organic Cotton · 21 days',
    price: '£1.80/m',
    certs: ['GOTS'],
    swatchBg: 'linear-gradient(135deg, #D4C5A9 0%, #B0977B 100%)',
  },
  {
    name: 'Recycled Poly Fleece',
    spec: '280 GSM · 100% rPET · 21 days',
    price: '£2.40/m',
    certs: ['GRS'],
    swatchBg: 'linear-gradient(135deg, #8B9EA8 0%, #5E7A8A 100%)',
  },
  {
    name: '4-Way Stretch Performance',
    spec: '200 GSM · 88% Poly/12% Spandex · 21 days',
    price: '£2.80/m',
    certs: [],
    swatchBg: 'linear-gradient(135deg, #6B7280 0%, #374151 100%)',
  },
];

const categories = [
  { label: 'JERSEY', filter: 'jersey' },
  { label: 'FLEECE', filter: 'fleece' },
  { label: 'TECHNICAL', filter: 'technical' },
  { label: 'ORGANIC', filter: 'organic' },
  { label: 'RECYCLED', filter: 'recycled' },
  { label: 'WOVEN', filter: 'woven' },
];

const certColours: Record<string, string> = {
  GOTS: 'bg-green-900/60 text-green-300 border-green-700/50',
  'Oeko-Tex': 'bg-blue-900/60 text-blue-300 border-blue-700/50',
  GRS: 'bg-teal-900/60 text-teal-300 border-teal-700/50',
  'TENCEL™': 'bg-purple-900/60 text-purple-300 border-purple-700/50',
  rPET: 'bg-cyan-900/60 text-cyan-300 border-cyan-700/50',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white">
      <Navbar />

      {/* ============================================================
          HERO — SPLIT LAYOUT
          ============================================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Grid overlays */}
        <div className="absolute inset-0 grid-overlay opacity-50" />
        <div className="absolute inset-0 grid-overlay-fine" />
        {/* Subtle red radial glow bottom-left */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-[#E5232A]/6 blur-[120px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-28 pb-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-0">

          {/* ── LEFT 55% ── */}
          <div className="w-full lg:w-[55%] lg:pr-12">
            {/* System label */}
            <div
              className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 border border-[#E5232A]/30 text-[#E5232A] animate-fade-in opacity-0"
              style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace", fontSize: '11px', letterSpacing: '0.15em' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5232A] animate-pulse inline-block" />
              MAT.SYS — 100+ FABRICS IN STOCK
            </div>

            {/* Main headline */}
            <h1
              className="font-bold uppercase leading-none tracking-tight mb-6 animate-fade-in-up opacity-0 delay-100"
              style={{
                fontFamily: "'Dogma', sans-serif",
                fontSize: 'clamp(44px, 6vw, 80px)',
              }}
            >
              <span className="block text-white">MATERIAL FIRST.</span>
              <span className="block text-[#E5232A]">MANUFACTURING</span>
              <span className="block text-white">SECOND.</span>
            </h1>

            {/* Subtext */}
            <p
              className="text-gray-400 mb-10 leading-relaxed animate-fade-in-up opacity-0 delay-200 max-w-xl"
              style={{ fontSize: 'clamp(15px, 1.4vw, 18px)' }}
            >
              Every Kazi garment starts with fabric selection. Choose from 100+ certified
              materials, specify your GSM, and we&apos;ll produce from 50 units.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up opacity-0 delay-300">
              <Link
                href="/fabrics"
                className="inline-block px-10 py-4 bg-[#E5232A] text-white font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_24px_rgba(229,35,42,0.6)] hover:scale-105"
              >
                Explore Fabrics →
              </Link>
              <Link
                href="/quote"
                className="inline-block px-10 py-4 bg-transparent text-white font-semibold text-sm tracking-widest uppercase border border-white/20 transition-all duration-300 hover:border-white/50 hover:bg-white/5"
              >
                Get a Quote
              </Link>
            </div>
          </div>

          {/* ── RIGHT 45% — Fabric Spec Card ── */}
          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end animate-fade-in-up opacity-0 delay-400">
            <div
              className="relative w-full max-w-sm rounded-sm overflow-hidden border border-[#00FF88]/20"
              style={{ background: '#0D1612', boxShadow: '0 0 40px rgba(0,255,136,0.08), 0 0 80px rgba(0,0,0,0.8)' }}
            >
              {/* Card header bar */}
              <div
                className="flex items-center justify-between px-5 py-3 border-b border-[#00FF88]/15"
                style={{ background: '#111A14' }}
              >
                <span
                  style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace", fontSize: '10px', color: '#00FF88', letterSpacing: '0.18em' }}
                >
                  FABRIC SPEC READER — v2.4
                </span>
                <span style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace", fontSize: '10px', color: '#00FF88', opacity: 0.5 }}>●</span>
              </div>

              {/* Swatch area with scan line */}
              <div
                className="relative h-36 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1A2A1A 0%, #0F1A12 60%, #0A120D 100%)' }}
              >
                {/* Fabric texture pattern */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,136,0.05) 3px, rgba(0,255,136,0.05) 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,255,136,0.05) 3px, rgba(0,255,136,0.05) 4px)',
                  }}
                />
                {/* Swatch colour blocks */}
                <div className="absolute inset-0 flex">
                  {['#2D4A2D', '#1E3A1E', '#152E15', '#0F2510', '#182D18'].map((c, i) => (
                    <div key={i} className="flex-1 opacity-80" style={{ background: c }} />
                  ))}
                </div>
                {/* Corner label */}
                <div
                  className="absolute top-3 left-4 px-2 py-0.5 border border-[#00FF88]/30"
                  style={{ background: 'rgba(0,0,0,0.6)', fontFamily: "'SF Mono','Fira Code','Consolas',monospace", fontSize: '10px', color: '#00FF88', letterSpacing: '0.15em' }}
                >
                  SAMPLE
                </div>
                {/* Animated scan line */}
                <div
                  className="absolute left-0 right-0 h-0.5 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(0,255,136,0.6), transparent)',
                    animation: 'fabricScan 3s ease-in-out infinite',
                  }}
                />
              </div>

              {/* Spec data rows */}
              <div className="px-5 pt-4 pb-5 space-y-3">
                {/* Fabric ID */}
                <div
                  style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace", fontSize: '12px', color: '#00FF88', letterSpacing: '0.1em' }}
                >
                  FABRIC ID: KZ-0012
                </div>
                <div className="text-white font-semibold text-base tracking-wide">Heavyweight Cotton</div>
                <div className="text-white font-semibold text-base tracking-wide" style={{ marginTop: 2 }}>Jersey</div>

                <div className="mt-4 space-y-2 border-t border-[#00FF88]/10 pt-3">
                  {[
                    ['GSM', '220'],
                    ['COMP', '100% Cotton'],
                    ['CERT', 'Oeko-Tex 100'],
                    ['LEAD', '14 days'],
                    ['MOQ', '500m'],
                  ].map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span
                        style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace", fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em' }}
                      >
                        {key}
                      </span>
                      <span
                        style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace", fontSize: '12px', color: '#00FF88', letterSpacing: '0.08em' }}
                      >
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom status bar */}
              <div
                className="px-5 py-2 border-t border-[#00FF88]/10 flex items-center justify-between"
                style={{ background: '#0C1510' }}
              >
                <span style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace", fontSize: '9px', color: 'rgba(0,255,136,0.4)', letterSpacing: '0.12em' }}>
                  STATUS: IN_STOCK
                </span>
                <span style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace", fontSize: '9px', color: 'rgba(0,255,136,0.4)', letterSpacing: '0.12em' }}>
                  OEKO-TEX VERIFIED
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FABRIC CATEGORIES STRIP
          ============================================================ */}
      <section className="border-t border-[#1E1E24] bg-[#0D0D10] py-6 px-6 overflow-x-auto">
        <div className="flex items-center gap-3 max-w-7xl mx-auto min-w-max sm:min-w-0 sm:justify-center flex-nowrap">
          <span
            className="text-[10px] text-gray-600 tracking-[0.2em] uppercase mr-2 shrink-0"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
          >
            CATEGORY
          </span>
          {categories.map((cat) => (
            <Link
              key={cat.filter}
              href={`/fabrics?cat=${cat.filter}`}
              className="shrink-0 px-5 py-2 border border-[#1E1E24] text-gray-400 text-xs tracking-widest uppercase transition-all duration-200 hover:border-[#E5232A]/50 hover:text-white hover:bg-[#E5232A]/8"
              style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================
          FABRIC SPOTLIGHT GRID
          ============================================================ */}
      <section className="py-24 px-6 bg-[#0A0A0B] border-t border-[#1E1E24]">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-12">
            <div
              className="text-[11px] text-[#E5232A] tracking-[0.2em] uppercase mb-2"
              style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
            >
              MAT.02 — SEASONAL SELECTION
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              FEATURED MATERIALS THIS SEASON
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredFabrics.map((fabric) => (
              <Link key={fabric.name} href="/fabrics" className="group">
                <div className="tech-card overflow-hidden">
                  {/* Colour swatch */}
                  <div
                    className="h-24 relative overflow-hidden"
                    style={{ background: fabric.swatchBg }}
                  >
                    <div className="absolute inset-0 grid-overlay-fine opacity-50" />
                    {/* Price badge */}
                    <div
                      className="absolute bottom-3 right-3 px-2 py-1 bg-[#0A0A0B]/80 border border-[#1E1E24] text-[#E5232A] text-xs font-semibold"
                      style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                    >
                      From {fabric.price}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-white text-base mb-2 group-hover:text-[#E5232A] transition-colors duration-200">
                      {fabric.name}
                    </h3>
                    <p
                      className="text-gray-500 text-xs mb-3"
                      style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                    >
                      {fabric.spec}
                    </p>

                    {/* Cert badges */}
                    {fabric.certs.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {fabric.certs.map((cert) => (
                          <span
                            key={cert}
                            className={`px-2 py-0.5 text-[10px] border rounded-sm ${certColours[cert] ?? 'bg-gray-800 text-gray-400 border-gray-700'}`}
                            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace", letterSpacing: '0.08em' }}
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
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/fabrics"
              className="inline-block px-10 py-4 border border-[#1E1E24] text-gray-400 text-sm tracking-widest uppercase transition-all duration-300 hover:border-[#E5232A]/50 hover:text-white"
              style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
            >
              View Full Catalogue — 25 Fabrics →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          TRUST METRICS BAR
          ============================================================ */}
      <section className="border-t border-[#1E1E24] bg-[#0D0D10] py-5 px-6 overflow-x-auto">
        <div className="flex items-center justify-center gap-0 max-w-6xl mx-auto">
          {[
            '25 FABRIC TYPES',
            '500M+ MOQ FROM',
            'GOTS CERTIFIED',
            'OEKO-TEX TESTED',
            'SHIPS TO UK & EU',
          ].map((item, i) => (
            <div key={item} className="flex items-center shrink-0">
              <span
                className="text-[10px] text-gray-500 tracking-[0.18em] uppercase px-5 whitespace-nowrap"
                style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
              >
                {item}
              </span>
              {i < 4 && <span className="text-[#1E1E24] text-lg">·</span>}
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================
          WHY MATERIAL-FIRST SECTION
          ============================================================ */}
      <section className="py-24 px-6 bg-[#0A0A0B] border-t border-[#1E1E24]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div
              className="text-[11px] text-[#E5232A] tracking-[0.2em] uppercase mb-2"
              style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
            >
              MAT.03 — PROCESS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
              Fabric is the product.<br />
              <span className="text-[#E5232A]">Not an afterthought.</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              Most manufacturers pick whatever fabric is available. Kazi starts every order
              with a material specification sheet — GSM, composition, certification, hand-feel.
              Your brand builds on a precise foundation, not a guess.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Nepal&apos;s DFQF agreement with the UK means 0% import duty. Combined with
              certified materials and 50-unit MOQ, you get premium construction at honest margins.
            </p>
            <Link
              href="/fabrics"
              className="inline-block px-8 py-3 bg-[#E5232A] text-white font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_24px_rgba(229,35,42,0.6)]"
            >
              Browse Fabrics
            </Link>
          </div>

          {/* Right: spec table */}
          <div className="border border-[#1E1E24] overflow-hidden">
            <div
              className="bg-[#111114] border-b border-[#1E1E24] px-6 py-3 text-[11px] text-gray-500 tracking-widest uppercase flex justify-between"
              style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
            >
              <span>SPEC</span>
              <span>VALUE</span>
            </div>
            {[
              ['Fabric count', '100+ SKUs', 'green'],
              ['GSM range', '60 – 400 gsm', 'white'],
              ['UK Import Duty', '0%', 'red'],
              ['MOQ', '50 units', 'white'],
              ['Lead Time', '14–35 days', 'white'],
              ['Certifications', 'GOTS · Oeko-Tex · GRS', 'white'],
              ['Fabric MOQ', 'From 150m', 'white'],
              ['Shipping', 'Air & sea · UK & EU', 'white'],
            ].map(([spec, val, color]) => (
              <div
                key={spec}
                className="flex items-center justify-between px-6 py-3.5 border-b border-[#1E1E24] last:border-0 hover:bg-[#111114] transition-colors duration-150"
              >
                <span className="text-sm text-gray-400">{spec}</span>
                <span
                  className={`text-sm font-semibold stat-readout ${
                    color === 'red' ? 'text-[#E5232A]' : color === 'green' ? 'text-[#00FF88]' : 'text-white'
                  }`}
                >
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA SECTION
          ============================================================ */}
      <section className="py-24 px-6 bg-[#0D0D10] border-t border-[#1E1E24] relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] bg-[#E5232A]/5 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div
            className="text-[11px] text-[#E5232A] tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
          >
            INITIATE PRODUCTION
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight">
            Start with the fabric.<br />
            <span className="text-[#E5232A]">We&apos;ll handle the rest.</span>
          </h2>
          <p className="text-gray-500 mb-10 text-lg max-w-xl mx-auto">
            Browse 100+ materials, specify your requirements, and receive a quote within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/fabrics"
              className="inline-block px-12 py-4 bg-[#E5232A] text-white font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_32px_rgba(229,35,42,0.7)] hover:scale-105"
            >
              Explore Fabrics →
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

      {/* Scan-line keyframe injected via style tag */}
      <style>{`
        @keyframes fabricScan {
          0%   { top: -4px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </main>
  );
}
