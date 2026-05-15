'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function Navbar() {
  const [user, setUser] = useState<{ id: string; role: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', authUser.id)
          .single();
        setUser({ id: authUser.id, role: profile?.role || 'customer' });
      }
    };
    getUser();
  }, [supabase]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const getDashboardLink = () => {
    if (!user) return '/auth/login';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'employee') return '/factory';
    return '/dashboard';
  };

  const navLinks = [
    { href: '/configure', label: 'Configure' },
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Get a Quote' },
    { href: '/quote', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0B]/95 backdrop-blur-md border-b border-[#1E1E24] shadow-[0_1px_0_rgba(255,0,0,0.1)]'
          : 'bg-transparent border-b border-white/5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="w-1.5 h-5 bg-[#FF0000] rounded-sm inline-block shrink-0 group-hover:shadow-[0_0_8px_rgba(255,0,0,0.7)] transition-shadow duration-200" />
          <img
            src="/logos/kazi-logo-white.png"
            alt="Kazi Manufacturing"
            className="h-8 w-auto"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <span className="sr-only">Kazi Manufacturing</span>
          <span
            className="text-white font-bold tracking-[0.15em] text-sm uppercase"
            style={{ fontFamily: "'SF Mono','Fira Code','Consolas',monospace" }}
            aria-hidden="true"
          >
            KAZI MFG
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link-underline text-gray-400 hover:text-white text-sm tracking-wide transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                href={getDashboardLink()}
                className="nav-link-underline text-[#FF0000] font-semibold text-sm tracking-wide hover:text-red-400 transition-colors duration-200"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs text-gray-600 hover:text-gray-400 transition-colors duration-200 tracking-wide"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/auth/login"
              className="relative px-5 py-2 text-sm font-semibold text-white border border-[#FF0000] tracking-wider uppercase transition-all duration-200 hover:bg-[#FF0000] hover:shadow-[0_0_16px_rgba(255,0,0,0.5)]"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden p-2 flex flex-col gap-1.5"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-gray-300 transition-all duration-200 ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}
          />
          <span
            className={`block w-6 h-px bg-gray-300 transition-all duration-200 ${mobileMenuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-px bg-gray-300 transition-all duration-200 ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}
          />
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="sm:hidden bg-[#0A0A0B]/98 border-t border-[#1E1E24] px-6 py-6">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-400 hover:text-white text-sm tracking-widest uppercase transition-colors duration-200 py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  href={getDashboardLink()}
                  className="text-[#FF0000] font-semibold text-sm tracking-widest uppercase py-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                  className="text-left text-gray-600 text-xs tracking-wide py-1 hover:text-gray-400 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="inline-block mt-2 px-5 py-3 text-center text-sm font-semibold text-white border border-[#FF0000] tracking-wider uppercase hover:bg-[#FF0000] transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
