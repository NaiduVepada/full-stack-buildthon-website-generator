'use client';

import { Sprout, Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="w-8 h-8" />
              <h3 className="text-xl font-bold">Smart Crop Advisory</h3>
            </div>
            <p className="text-green-200">
              Empowering farmers with AI-driven insights for better crop decisions and sustainable farming.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-green-200 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-green-200 hover:text-white transition">
                  Farmer Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-green-200 hover:text-white transition">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-green-200">
                <Mail className="w-4 h-4" />
                <span>farmercropadvisory@gmail.com</span>
              </li>
              <li className="flex items-center gap-2 text-green-200">
                <Phone className="w-4 h-4" />
                <span>1800-XXX-XXXX (Farmer Toll Free)</span>
              </li>
              <li className="flex items-center gap-2 text-green-200">
                <MapPin className="w-4 h-4" />
                <span>Andhra Pradesh, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
          <p>&copy; 2024 Smart Crop Advisory System. All rights reserved.</p>
          <p className="mt-2 text-sm">Developed for Buildathon Competition</p>
        </div>
      </div>
    </footer>
  );
}