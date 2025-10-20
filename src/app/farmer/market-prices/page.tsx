'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getStoredUser } from '@/lib/auth';
import { marketPrices, priceHistory } from '@/lib/mockData';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

export default function MarketPricesPage() {
  const [user, setUser] = useState<any>(null);
  const [selectedCrop, setSelectedCrop] = useState('Rice');
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

  // Prepare chart data
  const chartData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => ({
    day,
    price: priceHistory[selectedCrop as keyof typeof priceHistory]?.[index] || 0,
  }));

  // Prepare comparison data
  const comparisonData = marketPrices.map(item => ({
    name: item.crop,
    price: item.price,
  }));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <main className="flex-1 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <TrendingUp className="w-10 h-10 text-blue-600" />
              Market Prices & Forecasting
            </h1>
            <p className="text-gray-600 text-lg">
              Real-time market prices and trends to help you make informed selling decisions
            </p>
          </div>

          {/* Price Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {marketPrices.map((item) => (
              <Card
                key={item.crop}
                className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                  selectedCrop === item.crop ? 'ring-2 ring-blue-500 shadow-lg' : ''
                }`}
                onClick={() => setSelectedCrop(item.crop)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-gray-900">{item.crop}</h3>
                  <div className={`p-1 rounded-full ${
                    item.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {item.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
                
                <div className="mb-2">
                  <p className="text-2xl font-bold text-gray-900">₹{item.price}</p>
                  <p className="text-xs text-gray-500">per {item.unit}</p>
                </div>
                
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{Math.abs(item.change)}%</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Price Trend Chart */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {selectedCrop} - 7 Day Price Trend
                </h2>
                <p className="text-sm text-gray-600">Track price movements over the past week</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="day" 
                  stroke="#666"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#666"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                  }}
                  formatter={(value: any) => [`₹${value}`, 'Price']}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ fill: '#2563eb', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Price Comparison Chart */}
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Crop Price Comparison
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="name" 
                  stroke="#666"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#666"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                  }}
                  formatter={(value: any) => [`₹${value}`, 'Price']}
                />
                <Legend />
                <Bar dataKey="price" fill="#10b981" name="Price per Quintal" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Market Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Top Gainers (Last 7 Days)
              </h3>
              <div className="space-y-3">
                {marketPrices
                  .filter(item => item.trend === 'up')
                  .sort((a, b) => b.change - a.change)
                  .slice(0, 5)
                  .map((item) => (
                    <div key={item.crop} className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{item.crop}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-green-600 font-medium">+{item.change}%</span>
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                  ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                Market Insights
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-blue-900 mb-1">Best Time to Sell</p>
                  <p className="text-xs text-blue-700">
                    Cotton and Chilli prices are at peak. Consider selling within next 2 weeks.
                  </p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-yellow-900 mb-1">Price Alert</p>
                  <p className="text-xs text-yellow-700">
                    Rice prices expected to increase by 5-7% next month due to increased demand.
                  </p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-green-900 mb-1">Market Forecast</p>
                  <p className="text-xs text-green-700">
                    Overall market trend is positive. Good time for farmers to plan harvest sales.
                  </p>
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