'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Check } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send');
      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-[#0A0A0B] text-white">
        <Navbar />
        <div className="max-w-xl mx-auto px-4 py-32 text-center">
          <div className="w-16 h-16 border border-[#FF0000]/40 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-[#FF0000]" strokeWidth={2.5} />
          </div>
          <div
            className="text-[11px] text-[#FF0000] tracking-[0.2em] uppercase mb-3"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
          >
            MESSAGE.SENT — AWAITING RESPONSE
          </div>
          <h1 className="text-3xl font-bold mb-4 text-white">Message sent</h1>
          <p className="text-gray-500 mb-8">We&apos;ll get back to you within 24 hours.</p>
          <Link
            href="/"
            className="text-sm text-[#FF0000] hover:text-red-400 transition-colors duration-200 tracking-widest uppercase"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
          >
            ← Return to homepage
          </Link>
        </div>
      </main>
    );
  }

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
            COMMS — DIRECT CONTACT
          </div>
          <h1
            className="text-5xl md:text-6xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "'Dogma', sans-serif" }}
          >
            Contact Us
          </h1>
          <p className="text-gray-400 text-lg max-w-xl">
            Get in touch and we&apos;ll respond within 24 hours.
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Contact info row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            {[
              { label: 'EMAIL', value: 'hello@kazimanufacturing.com', href: 'mailto:hello@kazimanufacturing.com' },
              { label: 'LOCATION', value: 'Kathmandu, Nepal', href: null },
              { label: 'RESPONSE TIME', value: '< 24 hours', href: null },
            ].map(({ label, value, href }) => (
              <div
                key={label}
                className="border border-[#1E1E24] p-5 hover:border-[#FF0000]/30 transition-colors duration-200"
              >
                <div
                  className="text-[10px] text-gray-600 tracking-widest uppercase mb-2"
                  style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                >
                  {label}
                </div>
                {href ? (
                  <a href={href} className="text-sm text-[#FF0000] hover:text-red-400 transition-colors duration-200">
                    {value}
                  </a>
                ) : (
                  <div className="text-sm text-gray-300 stat-readout">{value}</div>
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="border border-[#1E1E24] bg-[#111114]">
            <div className="px-8 py-5 border-b border-[#1E1E24]">
              <div
                className="text-[11px] text-[#FF0000] tracking-[0.2em] uppercase"
                style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
              >
                SEND MESSAGE
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              {error && (
                <div className="border border-red-500/50 bg-red-900/20 text-red-400 px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-[10px] font-medium text-gray-600 mb-1 tracking-widest uppercase"
                    style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0A0A0B] border border-[#1E1E24] text-white focus:border-[#FF0000]/60 focus:ring-1 focus:ring-[#FF0000]/30 outline-none transition-colors duration-200"
                  />
                </div>
                <div>
                  <label
                    className="block text-[10px] font-medium text-gray-600 mb-1 tracking-widest uppercase"
                    style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0A0A0B] border border-[#1E1E24] text-white focus:border-[#FF0000]/60 focus:ring-1 focus:ring-[#FF0000]/30 outline-none transition-colors duration-200"
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-[10px] font-medium text-gray-600 mb-1 tracking-widest uppercase"
                  style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                >
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0A0A0B] border border-[#1E1E24] text-white focus:border-[#FF0000]/60 focus:ring-1 focus:ring-[#FF0000]/30 outline-none transition-colors duration-200"
                />
              </div>

              <div>
                <label
                  className="block text-[10px] font-medium text-gray-600 mb-1 tracking-widest uppercase"
                  style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
                >
                  Message *
                </label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your project — product type, quantity, timeline, any questions..."
                  className="w-full px-4 py-3 bg-[#0A0A0B] border border-[#1E1E24] text-white focus:border-[#FF0000]/60 focus:ring-1 focus:ring-[#FF0000]/30 outline-none resize-none placeholder:text-gray-700 transition-colors duration-200"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#FF0000] text-white py-4 font-semibold text-sm tracking-widest uppercase hover:bg-red-500 hover:shadow-[0_0_20px_rgba(255,0,0,0.5)] disabled:opacity-40 transition-all duration-200"
              >
                {submitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          </div>

          <p
            className="text-center text-xs text-gray-600 mt-6"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
          >
            Need a detailed quote?{' '}
            <Link href="/pricing" className="text-[#FF0000] hover:text-red-400 transition-colors duration-200">
              Use the quote configurator →
            </Link>
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
