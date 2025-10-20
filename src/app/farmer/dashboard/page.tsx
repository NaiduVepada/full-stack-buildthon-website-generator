'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getStoredUser } from '@/lib/auth';
import { Brain, Bug, TrendingUp, Cloud, MessageSquare, Sprout, AlertTriangle } from 'lucide-react';

export default function FarmerDashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getStoredUser();
    if (!currentUser || currentUser.role !== 'farmer') {
      router.push('/login');
      return;
    }
    setUser(currentUser);
  }, [router]);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const modules = [
    {
      title: 'Crop Recommendation',
      description: 'Get AI-powered crop suggestions based on your soil and location',
      icon: Brain,
      color: 'green',
      href: '/farmer/crop-recommendation',
    },
    {
      title: 'Pest Detection',
      description: 'Upload crop images to detect pests and diseases',
      icon: Bug,
      color: 'red',
      href: '/farmer/pest-detection',
    },
    {
      title: 'Market Prices',
      description: 'View current market prices and trends',
      icon: TrendingUp,
      color: 'blue',
      href: '/farmer/market-prices',
    },
    {
      title: 'Weather Alerts',
      description: 'Get real-time weather updates and advisories',
      icon: Cloud,
      color: 'yellow',
      href: '/farmer/weather-alerts',
    },
    {
      title: 'AI Chatbot',
      description: 'Ask farming questions in English or Telugu',
      icon: MessageSquare,
      color: 'purple',
      href: '/farmer/chatbot',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; icon: string; hover: string }> = {
      green: { bg: 'bg-green-100', icon: 'text-green-600', hover: 'hover:border-green-300' },
      red: { bg: 'bg-red-100', icon: 'text-red-600', hover: 'hover:border-red-300' },
      blue: { bg: 'bg-blue-100', icon: 'text-blue-600', hover: 'hover:border-blue-300' },
      yellow: { bg: 'bg-yellow-100', icon: 'text-yellow-600', hover: 'hover:border-yellow-300' },
      purple: { bg: 'bg-purple-100', icon: 'text-purple-600', hover: 'hover:border-purple-300' },
    };
    return colors[color];
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      
      <main className="flex-1 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-gray-600 text-lg">
              Your farm in {user.location}, {user.district} • Farm Size: {user.farmSize}
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Today's Weather</p>
                  <p className="text-2xl font-bold text-gray-900">28°C</p>
                  <p className="text-sm text-green-600">Partly Cloudy</p>
                </div>
                <Cloud className="w-12 h-12 text-green-600" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Alerts</p>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                  <p className="text-sm text-blue-600">View Details</p>
                </div>
                <AlertTriangle className="w-12 h-12 text-blue-600" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Recommended Crops</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                  <p className="text-sm text-yellow-600">For Your Region</p>
                </div>
                <Sprout className="w-12 h-12 text-yellow-600" />
              </div>
            </Card>
          </div>

          {/* Modules Grid */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => {
                const colors = getColorClasses(module.color);
                const Icon = module.icon;
                
                return (
                  <Link key={module.title} href={module.href}>
                    <Card className={`p-6 h-full transition-all duration-200 cursor-pointer hover:shadow-xl ${colors.hover}`}>
                      <div className={`${colors.bg} w-14 h-14 rounded-full flex items-center justify-center mb-4`}>
                        <Icon className={`w-8 h-8 ${colors.icon}`} />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{module.title}</h3>
                      <p className="text-gray-600 mb-4">{module.description}</p>
                      <Button variant="outline" size="sm" className="w-full">
                        Open Module
                      </Button>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Brain className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Crop recommendation generated</p>
                    <p className="text-sm text-gray-600">Rice recommended for Kharif season</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 pb-4 border-b">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Price alert triggered</p>
                    <p className="text-sm text-gray-600">Cotton prices increased by 8.5%</p>
                    <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Cloud className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Weather alert received</p>
                    <p className="text-sm text-gray-600">Heavy rainfall expected in 48 hours</p>
                    <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}