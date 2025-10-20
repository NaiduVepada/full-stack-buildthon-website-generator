'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, User, LogOut, Sprout } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getStoredUser, logout } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
  };

  return (
    <nav className="bg-green-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Sprout className="w-8 h-8" />
            <span className="hidden sm:inline">Smart Crop Advisory</span>
            <span className="sm:hidden">SCA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link href={user.role === 'farmer' ? '/farmer/dashboard' : '/officer/dashboard'} className="hover:text-green-200 transition">
                  Dashboard
                </Link>
                {user.role === 'farmer' && (
                  <>
                    <Link href="/farmer/crop-recommendation" className="hover:text-green-200 transition">
                      Crop Advisor
                    </Link>
                    <Link href="/farmer/market-prices" className="hover:text-green-200 transition">
                      Market Prices
                    </Link>
                    <Link href="/farmer/chatbot" className="hover:text-green-200 transition">
                      AI Assistant
                    </Link>
                  </>
                )}
                <div className="flex items-center gap-3 ml-4 border-l border-green-500 pl-4">
                  <div className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    <span className="text-sm">{user.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-white hover:bg-green-600"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-green-200 transition">
                  Login
                </Link>
                <Link href="/register">
                  <Button variant="secondary" size="sm">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-green-600"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {user ? (
              <>
                <Link
                  href={user.role === 'farmer' ? '/farmer/dashboard' : '/officer/dashboard'}
                  className="block py-2 hover:bg-green-600 px-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                {user.role === 'farmer' && (
                  <>
                    <Link
                      href="/farmer/crop-recommendation"
                      className="block py-2 hover:bg-green-600 px-2 rounded"
                      onClick={() => setIsOpen(false)}
                    >
                      Crop Advisor
                    </Link>
                    <Link
                      href="/farmer/market-prices"
                      className="block py-2 hover:bg-green-600 px-2 rounded"
                      onClick={() => setIsOpen(false)}
                    >
                      Market Prices
                    </Link>
                    <Link
                      href="/farmer/chatbot"
                      className="block py-2 hover:bg-green-600 px-2 rounded"
                      onClick={() => setIsOpen(false)}
                    >
                      AI Assistant
                    </Link>
                  </>
                )}
                <div className="border-t border-green-500 mt-2 pt-2">
                  <div className="flex items-center gap-2 px-2 py-2">
                    <User className="w-5 h-5" />
                    <span>{user.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-white hover:bg-green-600 w-full justify-start"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block py-2 hover:bg-green-600 px-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block py-2 hover:bg-green-600 px-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}