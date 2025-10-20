'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Sprout, Brain, Cloud, TrendingUp, Bug, MessageSquare, Shield, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Sprout className="w-20 h-20" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Smart Crop Advisory System
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
            Empowering farmers with AI-driven insights for better crop decisions, pest management, and market intelligence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 text-white border-white hover:bg-white hover:text-green-700">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Our Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:shadow-lg transition cursor-pointer">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Brain className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Crop Recommendation</h3>
              <p className="text-gray-600">
                AI-powered crop suggestions based on soil type, rainfall, and location
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition cursor-pointer">
              <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Bug className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Pest Detection</h3>
              <p className="text-gray-600">
                Upload crop images for instant pest and disease identification
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition cursor-pointer">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Market Prices</h3>
              <p className="text-gray-600">
                Real-time crop prices and forecasting to maximize profits
              </p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition cursor-pointer">
              <div className="bg-yellow-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Cloud className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Weather Alerts</h3>
              <p className="text-gray-600">
                Get timely weather updates and agricultural advisories
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Chatbot Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto text-center">
          <MessageSquare className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            AI Assistant with Voice Support
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Get instant answers to your farming questions in English or Telugu. Use voice input for hands-free assistance while working in your fields.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                To empower Indian farmers with cutting-edge technology and data-driven insights that help them make informed decisions about crop selection, pest management, and market timing.
              </p>
              <p className="text-lg text-gray-600">
                We bridge the gap between traditional farming wisdom and modern agricultural science, ensuring sustainable and profitable farming practices.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 text-center">
                <Users className="w-12 h-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900">10,000+</h3>
                <p className="text-gray-600">Active Farmers</p>
              </Card>
              <Card className="p-6 text-center">
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900">95%</h3>
                <p className="text-gray-600">Accuracy Rate</p>
              </Card>
              <Card className="p-6 text-center">
                <Sprout className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900">50+</h3>
                <p className="text-gray-600">Crop Varieties</p>
              </Card>
              <Card className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-red-600 mx-auto mb-3" />
                <h3 className="text-2xl font-bold text-gray-900">30%</h3>
                <p className="text-gray-600">Avg. Yield Increase</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of farmers already using Smart Crop Advisory System
          </p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Register Now - It's Free
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}