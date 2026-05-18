// Editorial process page — light B2B theme (design/b2b-editorial branch)
// Background: #FAFAF8, step numbers in red serif, timeline badges in grey pill

import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Our Process | Kazi Manufacturing',
  description:
    'From brief to delivery in five steps. Learn how Kazi Manufacturing takes your garment idea from a sketch to finished product, shipped direct to the UK.',
};

const steps = [
  {
    n: '01',
    headline: 'Brief Submission',
    badge: 'Days 1–2',
    body: [
      'Send us your tech pack, mood board, or even a rough sketch — whatever stage your design is at, we can work with it. Include fabric preferences, weight, colour references, and any label or packaging requirements.',
      'Our production team reviews your brief and comes back within 24 hours with questions, fabric options, and a ballpark price. No commitment required at this stage.',
    ],
  },
  {
    n: '02',
    headline: 'Sampling',
    badge: 'Days 3–10',
    body: [
      'We cut a pre-production sample using your chosen fabric and construction. Physical swatches are sent to you via DHL before we start cutting, so you can approve the hand-feel and weight in person.',
      'Sampling is priced separately from bulk production. Most clients order one to three samples before proceeding to a full run.',
    ],
  },
  {
    n: '03',
    headline: 'Approval',
    badge: 'Days 10–12',
    body: [
      "Review the physical sample. Request any changes — fit adjustments, stitching tweaks, label placement. We'll revise until the sample matches your spec exactly.",
      'Once you sign off, we lock the spec sheet and move to production scheduling. No changes can be made after approval without restarting the sample phase.',
    ],
  },
  {
    n: '04',
    headline: 'Production',
    badge: 'Days 12–35',
    body: [
      'Your order enters our Kathmandu production floor. Fabric is cut to pattern, assembled, and finished in-house. For orders over 200 units, we provide weekly production updates with photo evidence.',
      'All garments are produced against the approved spec sheet. Any deviation triggers an internal QC hold before the item leaves the cutting room.',
    ],
  },
  {
    n: '05',
    headline: 'QC & Dispatch',
    badge: 'Days 35–40',
    body: [
      'Every garment is quality-checked against your spec sheet — seam integrity, print registration, label placement, and measurements. Defective units are pulled and remade before packing.',
      'Orders are packed, tagged, and dispatched via DHL or FedEx Express direct to your UK address. Door-to-door transit is typically 3–5 business days. Full tracking is shared on dispatch.',
    ],
  },
];

export default function ProcessPage() {
  return (
    <div className="bg-[#FAFAF8] text-[#0D0D0D] min-h-screen">
      <Navbar />

      {/* Page header */}
      <div className="pt-32 pb-16 px-6 md:px-12 lg:px-20 border-b border-[#0D0D0D]/10">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-[0.22em] uppercase text-[#8B8B8B] mb-5 font-sans">
            How It Works
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0D0D0D] leading-tight max-w-2xl">
            From brief to delivery in five steps.
          </h1>
        </div>
      </div>

      {/* Steps */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <div
              key={step.n}
              className={`py-20 grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-8 lg:gap-16 ${
                i < steps.length - 1 ? 'border-b border-[#0D0D0D]/10' : ''
              }`}
            >
              {/* Left: step number + badge */}
              <div className="flex lg:flex-col items-baseline lg:items-start gap-6 lg:gap-4 lg:pt-1">
                <span className="font-serif text-6xl md:text-7xl text-[#E5232A] leading-none">
                  {step.n}
                </span>
                <span className="text-xs tracking-[0.18em] uppercase border border-[#0D0D0D]/20 text-[#8B8B8B] px-3 py-1.5 font-sans shrink-0">
                  {step.badge}
                </span>
              </div>

              {/* Right: content */}
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-[#0D0D0D] mb-6">
                  {step.headline}
                </h2>
                <div className="space-y-4">
                  {step.body.map((para, j) => (
                    <p key={j} className="text-[#8B8B8B] leading-relaxed max-w-xl">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="py-24 px-6 md:px-12 lg:px-20 bg-[#F2F0EC]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-xs tracking-[0.22em] uppercase text-[#8B8B8B] mb-3 font-sans">
              Ready to begin?
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-[#0D0D0D]">
              Every collection starts with a brief.
            </h2>
          </div>
          <Link
            href="/quote"
            className="shrink-0 inline-block px-10 py-4 bg-[#E5232A] text-white text-sm tracking-[0.1em] uppercase font-medium transition-colors duration-200 hover:bg-[#c41f25] whitespace-nowrap"
          >
            Start with a brief →
          </Link>
        </div>
      </div>

      {/* Footer */}
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
