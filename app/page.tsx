'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';

const services = [
  {
    title: 'T-Shirts & Basics',
    code: 'SVC-001',
    description: 'Classic and modern cuts, 140–220 gsm. Cotton, blends, and performance fabrics.',
    moq: 'MOQ 50 units',
  },
  {
    title: 'Hoodies & Fleece',
    code: 'SVC-002',
    description: 'Premium hoodies and crewnecks with full custom detailing — drawstrings, pockets, cuffs.',
    moq: 'MOQ 50 units',
  },
  {
    title: 'Cut & Sew Custom',
    code: 'SVC-003',
    description: 'Full pattern development and cut-and-sew. Bring any tech pack — we build it precisely.',
    moq: 'MOQ 100 units',
  },
  {
    title: 'Private Label',
    code: 'SVC-004',
    description: 'Custom woven tags, packaging, hang tags, and complete brand identity in fabric.',
    moq: '100% your brand',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white overflow-x-hidden">
      <Navbar />

      {/* ============================================================
          HERO SECTION — DANIT PELEG "DIGITAL FABRICATION" VOID
          ============================================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute inset-0 grid-overlay-fine" />

        {/* Deep red ambient glow behind headline */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E5232A]/[0.04] rounded-full blur-[140px] pointer-events-none" />

        {/* Wireframe 3D garment silhouette — right side */}
        <div className="wireframe-garment hidden lg:block" aria-hidden="true">
          <div className="wf-shoulder-l" />
          <div className="wf-shoulder-r" />
          <div className="wf-neck" />
          <div className="wf-body" />
          <div className="wf-inner" />
          <div className="wf-cross-h" />
          <div className="wf-cross-v" />
        </div>

        {/* Hero content — left-aligned on large, centred on small */}
        <div className="relative z-10 px-6 sm:px-10 max-w-6xl mx-auto w-full pt-32 pb-20">
          {/* System label */}
          <div
            className="inline-flex items-center gap-2 mb-10 px-4 py-1.5 border border-[#E5232A]/30 text-[#E5232A] animate-fade-in opacity-0"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace", fontSize: '11px', letterSpacing: '0.15em' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5232A] animate-pulse inline-block" />
            SYS.ONLINE — KATHMANDU, NEPAL — 3D CONFIGURED
          </div>

          {/* Main headline — 3 lines */}
          <h1
            className="font-bold leading-none tracking-tight mb-8 animate-fade-in-up opacity-0 delay-100"
            style={{
              fontFamily: "'Dogma', sans-serif",
              fontSize: 'clamp(48px, 7.5vw, 96px)',
            }}
          >
            <span className="block text-white">YOUR COLLECTION.</span>
            <span className="block text-white">RENDERED.</span>
            <span className="block text-[#E5232A] text-glow-red">THEN MADE.</span>
          </h1>

          {/* Subtext */}
          <p
            className="text-gray-400 mb-10 max-w-xl leading-relaxed animate-fade-in-up opacity-0 delay-200"
            style={{ fontSize: 'clamp(16px, 1.6vw, 20px)' }}
          >
            Design your garments in 3D. Approve the render.
            We manufacture in Kathmandu.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up opacity-0 delay-300">
            <Link
              href="/configure"
              className="inline-block px-10 py-4 bg-[#E5232A] text-white font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_28px_rgba(229,35,42,0.65)] hover:scale-105"
            >
              Configure Your Collection →
            </Link>
            <Link
              href="/quote"
              className="inline-block px-10 py-4 bg-transparent text-white font-semibold text-sm tracking-widest uppercase border border-white/20 transition-all duration-300 hover:border-white/60 hover:bg-white/5"
            >
              Request a Quote
            </Link>
          </div>
        </div>

        {/* Bottom scroll cue */}
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

      {/* Animated border divider */}
      <div className="border-glow-line w-full" />

      {/* ============================================================
          TRUST BAR
          ============================================================ */}
      <div className="bg-[#0D0D10] border-b border-[#1E1E24] py-4 px-4 overflow-hidden">
        <p
          className="text-center text-[11px] text-gray-500 tracking-[0.22em] uppercase"
          style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
        >
          MOQ FROM 50 UNITS&nbsp;&nbsp;·&nbsp;&nbsp;SHIPS TO UK &amp; EU&nbsp;&nbsp;·&nbsp;&nbsp;NET-30 PAYMENT TERMS&nbsp;&nbsp;·&nbsp;&nbsp;GOTS CERTIFIED FABRICS AVAILABLE
        </p>
      </div>

      {/* ============================================================
          SERVICES SECTION
          ============================================================ */}
      <section className="py-28 px-6 sm:px-10 bg-[#0A0A0B]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <div
              className="text-[11px] text-[#E5232A] tracking-[0.2em] uppercase mb-3"
              style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
            >
              CAT.01 — CAPABILITIES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              What We Make
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <div
                key={service.title}
                className="tech-card corner-accent group relative p-6 flex flex-col gap-3"
              >
                <div
                  className="text-[10px] text-gray-600 tracking-widest"
                  style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                >
                  {service.code}
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#E5232A] transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">
                  {service.description}
                </p>
                <span
                  className="text-xs text-[#E5232A] border border-[#E5232A]/30 px-2 py-0.5 self-start stat-readout"
                >
                  {service.moq}
                </span>
                {/* Bottom hover line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#E5232A] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated border divider */}
      <div className="border-glow-line w-full" />

      {/* ============================================================
          PROCESS SECTION — FROM PIXELS TO PRODUCT
          ============================================================ */}
      <section className="py-28 px-6 sm:px-10 bg-[#0D0D10]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div
              className="text-[11px] text-[#E5232A] tracking-[0.2em] uppercase mb-3"
              style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
            >
              CAT.02 — WORKFLOW
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              From Pixels to Product
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#1E1E24]">
            {[
              {
                num: '01',
                title: 'Design',
                body: 'Upload your tech pack or use our 3D configurator. We model every stitch before production begins.',
              },
              {
                num: '02',
                title: 'Approve',
                body: 'We send fabric swatches and 3D renders before production starts. Nothing moves without your sign-off.',
              },
              {
                num: '03',
                title: 'Manufacture',
                body: 'Produced in Kathmandu, shipped to your door in 21–35 days. Full tracking from cut to courier.',
              },
            ].map((step) => (
              <div key={step.num} className="px-8 py-10 group">
                <div className="process-step-num mb-4">{step.num}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#E5232A] transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA SECTION
          ============================================================ */}
      <section className="py-28 px-6 sm:px-10 bg-[#0A0A0B] border-t border-[#1E1E24] relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[300px] bg-[#E5232A]/[0.04] rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div
            className="text-[11px] text-[#E5232A] tracking-[0.2em] uppercase mb-5"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
          >
            INITIATE PRODUCTION
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-5 text-white tracking-tight">
            See your collection in 3D<br />
            <span className="text-[#E5232A]">before we make a single stitch.</span>
          </h2>
          <p className="text-gray-500 mb-10 text-lg max-w-xl mx-auto">
            Configure your order and receive a quote within 24 hours. No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/configure"
              className="inline-block px-12 py-4 bg-[#E5232A] text-white font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_32px_rgba(229,35,42,0.7)] hover:scale-105"
            >
              Configure Your Collection →
            </Link>
            <Link
              href="/quote"
              className="inline-block px-12 py-4 bg-transparent text-white font-semibold text-sm tracking-widest uppercase border border-white/20 transition-all duration-300 hover:border-white/50 hover:bg-white/5"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer className="py-10 px-6 border-t border-[#1E1E24] bg-[#0A0A0B]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-5 bg-[#E5232A] rounded-sm inline-block" />
            <img
              src="/logos/kazi-logo-white.png"
              alt="Kazi Manufacturing"
              className="h-7 w-auto"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
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
