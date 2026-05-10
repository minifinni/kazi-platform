import Navbar from '@/components/Navbar';
import { Check } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 'SVC-001',
    title: 'T-Shirts & Basics',
    stat: '50 unit MOQ',
    description:
      'We manufacture high-quality t-shirts in various weights (140gsm to 220gsm) and fabric blends including 100% cotton, cotton-polyester mixes, and organic options.',
    features: [
      'Custom cuts and fits',
      'Multiple fabric weights',
      'Tags and labels included',
      'Custom packaging available',
    ],
  },
  {
    id: 'SVC-002',
    title: 'Hoodies & Outerwear',
    stat: 'From £14.50/unit',
    description:
      'Premium hoodies, crewnecks, and zip-ups in various weights. Fully customisable with kangaroo pockets, drawstrings, ribbed cuffs and more.',
    features: [
      'Pullover and zip styles',
      'Fleece-lined options',
      'Custom drawstring colours',
      'Embroidery ready',
    ],
  },
  {
    id: 'SVC-003',
    title: 'Embroidery',
    stat: 'From +£2.50/unit',
    description:
      'Professional embroidery for logos, badges, and decorative elements. We can embroider on almost any garment including caps, beanies, and outerwear.',
    features: [
      '3D puff embroidery',
      'Flat embroidery',
      'Appliqué',
      'Small and large designs',
    ],
  },
  {
    id: 'SVC-004',
    title: 'Screen & DTG Printing',
    stat: 'Up to 6 colours',
    description:
      'Both screen printing (best for bulk orders) and Direct-to-Garment printing (best for complex designs and smaller runs).',
    features: [
      'Up to 6 colour screen print',
      'Full colour DTG',
      'Discharge printing',
      'Water-based inks',
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white">
      <Navbar />

      {/* Page Header */}
      <div className="relative pt-32 pb-16 px-4 border-b border-[#1E1E24] overflow-hidden">
        {/* Grid texture */}
        <div className="absolute inset-0 grid-overlay opacity-50" />
        {/* Red glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#FF0000]/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div
            className="text-[11px] text-[#FF0000] tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
          >
            CAT.01 — CAPABILITIES
          </div>
          <h1
            className="text-5xl md:text-6xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "'Dogma', sans-serif" }}
          >
            Our Services
          </h1>
          <p className="text-gray-400 text-lg max-w-xl">
            Full-service garment manufacturing from Kathmandu, Nepal — engineered for UK clothing brands.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="tech-card p-8 relative group"
              >
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div
                      className="text-[10px] text-gray-600 tracking-widest mb-1"
                      style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                    >
                      {svc.id}
                    </div>
                    <h2 className="text-xl font-bold text-white">{svc.title}</h2>
                  </div>
                  <span
                    className="text-xs text-[#FF0000] border border-[#FF0000]/30 px-3 py-1 shrink-0 ml-4 stat-readout"
                  >
                    {svc.stat}
                  </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-[#1E1E24] mb-4 group-hover:bg-[#FF0000]/20 transition-colors duration-300" />

                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {svc.description}
                </p>

                {/* Feature list */}
                <ul className="space-y-2">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-gray-400">
                      <Check className="w-3.5 h-3.5 text-[#FF0000] shrink-0" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Bottom glow line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-[#FF0000] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Private Label Section */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="border border-[#1E1E24] bg-[#111114] overflow-hidden">
            {/* Header */}
            <div className="px-8 py-5 border-b border-[#1E1E24] flex items-center justify-between">
              <div>
                <div
                  className="text-[10px] text-gray-600 tracking-widest mb-1"
                  style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                >
                  SVC-005 — FULL STACK
                </div>
                <h2 className="text-xl font-bold text-white">Private Label Service</h2>
              </div>
              <span
                className="text-xs text-[#FF0000] border border-[#FF0000]/30 px-3 py-1 stat-readout"
              >
                100% your brand
              </span>
            </div>

            {/* Content */}
            <div className="p-8">
              <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-2xl">
                Complete private label solutions. Your brand identity, our manufacturing precision.
                We handle everything from custom woven labels to final packaging.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { title: 'Custom Tags', desc: 'Woven labels, printed tags, size labels — all custom designed.' },
                  { title: 'Packaging', desc: 'Poly bags, boxes, tissue paper, brand stickers.' },
                  { title: 'Hang Tags', desc: 'Custom designed and printed hang tags for retail-ready presentation.' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="border border-[#1E1E24] p-5 hover:border-[#FF0000]/30 transition-colors duration-200"
                  >
                    <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-[#1E1E24] bg-[#0D0D10]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to configure your order?
          </h2>
          <p className="text-gray-500 mb-8">Get a quote within 24 hours.</p>
          <Link
            href="/pricing"
            className="inline-block px-10 py-4 bg-[#FF0000] text-white font-semibold text-sm tracking-widest uppercase transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_24px_rgba(255,0,0,0.6)]"
          >
            Configure Order
          </Link>
        </div>
      </section>

      {/* Footer */}
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
