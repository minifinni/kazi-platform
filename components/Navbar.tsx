'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function Navbar() {
  const [user, setUser] = useState<{ id: string; role: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/quote', label: 'Quote' },
  ];

  return (
    <header className="border-b border-gray-200 px-4 sm:px-8 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-tight">
          KAZI MFG
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-4 sm:gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href} 
              className="text-gray-700 hover:text-gray-900"
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link 
                href={getDashboardLink()}
                className="text-red-600 font-semibold hover:text-red-700"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              href="/auth/login"
              className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="sm:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-0.5 bg-gray-700 mb-1.5"></div>
          <div className="w-6 h-0.5 bg-gray-700 mb-1.5"></div>
          <div className="w-6 h-0.5 bg-gray-700"></div>
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="sm:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-gray-700 hover:text-gray-900 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link 
                  href={getDashboardLink()}
                  className="text-red-600 font-semibold hover:text-red-700 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-gray-500 hover:text-gray-700 py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                href="/auth/login"
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 text-center"
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
