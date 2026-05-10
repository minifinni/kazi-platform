import Navbar from '@/components/Navbar';
import PricingQuoteSection from '@/components/PricingQuoteSection';
import Link from 'next/link';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0B] text-white">
      <Navbar />

      {/* Page Header */}
      <div className="relative pt-32 pb-16 px-4 border-b border-[#1E1E24] overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-[#FF0000]/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div
            className="text-[11px] text-[#FF0000] tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
          >
            QUOTE ENGINE — CONFIGURE & REQUEST
          </div>
          <h1
            className="text-5xl md:text-6xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "'Dogma', sans-serif" }}
          >
            Get a Quote
          </h1>
          <p className="text-gray-400 text-lg max-w-xl">
            Configure your order below and submit a request — we'll respond within 24 hours.
          </p>
        </div>
      </div>

      {/* Quote Calculator */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <PricingQuoteSection />
        </div>
      </section>

      {/* Volume Pricing Reference — Spec Sheet Style */}
      <section className="py-16 px-4 bg-[#0D0D10] border-t border-[#1E1E24]">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="mb-8">
            <div
              className="text-[11px] text-[#FF0000] tracking-[0.2em] uppercase mb-2"
              style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
            >
              PRICING.REF — VOLUME TIERS
            </div>
            <h2 className="text-xl font-bold text-white">Volume pricing reference</h2>
          </div>

          {/* Tables row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* T-Shirts */}
            <div className="border border-[#1E1E24] overflow-hidden">
              <div
                className="bg-[#111114] border-b border-[#1E1E24] px-6 py-3 flex items-center justify-between"
              >
                <span
                  className="text-[11px] text-gray-400 tracking-widest uppercase"
                  style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                >
                  T-SHIRTS
                </span>
                <span
                  className="text-[10px] text-gray-600"
                  style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                >
                  PRD-001
                </span>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1E1E24]">
                    <th
                      className="px-6 py-3 text-left font-normal text-[11px] text-gray-600 tracking-widest uppercase"
                      style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                    >
                      QTY RANGE
                    </th>
                    <th
                      className="px-6 py-3 text-right font-normal text-[11px] text-gray-600 tracking-widest uppercase"
                      style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                    >
                      PER UNIT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['50–99',   '£8.50'],
                    ['100–249', '£6.50'],
                    ['250–499', '£5.00'],
                    ['500–999', '£4.00'],
                    ['1000+',   '£3.20'],
                  ].map(([qty, price], i) => (
                    <tr
                      key={qty}
                      className="border-b border-[#1E1E24] last:border-0 hover:bg-[#111114] transition-colors duration-150"
                    >
                      <td
                        className="px-6 py-3.5 text-gray-400 stat-readout"
                      >
                        {qty}
                      </td>
                      <td
                        className={`px-6 py-3.5 text-right font-semibold stat-readout ${i === 4 ? 'text-[#FF0000]' : 'text-white'}`}
                      >
                        {price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Hoodies */}
            <div className="border border-[#1E1E24] overflow-hidden">
              <div className="bg-[#111114] border-b border-[#1E1E24] px-6 py-3 flex items-center justify-between">
                <span
                  className="text-[11px] text-gray-400 tracking-widest uppercase"
                  style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                >
                  HOODIES
                </span>
                <span
                  className="text-[10px] text-gray-600"
                  style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                >
                  PRD-002
                </span>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1E1E24]">
                    <th
                      className="px-6 py-3 text-left font-normal text-[11px] text-gray-600 tracking-widest uppercase"
                      style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                    >
                      QTY RANGE
                    </th>
                    <th
                      className="px-6 py-3 text-right font-normal text-[11px] text-gray-600 tracking-widest uppercase"
                      style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                    >
                      PER UNIT
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['50–99',   '£18.00'],
                    ['100–249', '£14.50'],
                    ['250–499', '£12.00'],
                    ['500–999', '£10.00'],
                    ['1000+',   '£8.50'],
                  ].map(([qty, price], i) => (
                    <tr
                      key={qty}
                      className="border-b border-[#1E1E24] last:border-0 hover:bg-[#111114] transition-colors duration-150"
                    >
                      <td className="px-6 py-3.5 text-gray-400 stat-readout">{qty}</td>
                      <td
                        className={`px-6 py-3.5 text-right font-semibold stat-readout ${i === 4 ? 'text-[#FF0000]' : 'text-white'}`}
                      >
                        {price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Decoration add-ons */}
          <div
            className="text-[11px] text-gray-600 tracking-widest uppercase mb-3"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
          >
            DECORATION ADD-ONS
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              ['Embroidery (small)', '+£2.50', 'DEC-01'],
              ['Embroidery (large)', '+£4.00', 'DEC-02'],
              ['Screen print /colour', '+£1.50', 'DEC-03'],
              ['DTG print', '+£3.50', 'DEC-04'],
            ].map(([label, price, code]) => (
              <div
                key={label}
                className="border border-[#1E1E24] p-4 bg-[#111114] hover:border-[#FF0000]/30 transition-colors duration-200"
              >
                <div
                  className="text-[10px] text-gray-600 mb-2"
                  style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                >
                  {code}
                </div>
                <div className="text-xs text-gray-400 leading-snug mb-1">{label}</div>
                <div className="text-sm font-semibold text-[#FF0000] stat-readout">{price}/unit</div>
              </div>
            ))}
          </div>

          <p
            className="text-[11px] text-gray-600 mt-5"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
          >
            * PRICES ARE ESTIMATES. EXCLUDE SHIPPING, CUSTOMS AND CUSTOM PACKAGING. FINAL QUOTES MAY VARY.
          </p>
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
