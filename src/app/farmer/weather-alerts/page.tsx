'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getStoredUser } from '@/lib/auth';
import { weatherAlerts } from '@/lib/mockData';
import { Cloud, CloudRain, Sun, Wind, Droplets, AlertTriangle, ThermometerSun, MapPin, Calendar } from 'lucide-react';

export default function WeatherAlertsPage() {
  const [user, setUser] = useState<any>(null);
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    rainfall: 2,
    forecast: [
      { day: 'Today', temp: 28, condition: 'Partly Cloudy', icon: Cloud },
      { day: 'Tomorrow', temp: 30, condition: 'Sunny', icon: Sun },
      { day: 'Wed', temp: 26, condition: 'Rainy', icon: CloudRain },
      { day: 'Thu', temp: 27, condition: 'Cloudy', icon: Cloud },
      { day: 'Fri', temp: 29, condition: 'Sunny', icon: Sun },
    ],
  });
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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <main className="flex-1 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Cloud className="w-10 h-10 text-blue-600" />
              Weather Alerts & Forecasts
            </h1>
            <p className="text-gray-600 text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {user.location}, {user.district}
            </p>
          </div>

          {/* Current Weather Card */}
          <Card className="p-8 mb-8 bg-gradient-to-br from-blue-500 to-blue-700 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-blue-100 mb-2">Current Weather</p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-6xl font-bold">{currentWeather.temperature}°C</div>
                  <Cloud className="w-16 h-16" />
                </div>
                <p className="text-2xl font-medium mb-2">{currentWeather.condition}</p>
                <p className="text-blue-100 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-5 h-5" />
                    <span className="text-sm">Humidity</span>
                  </div>
                  <p className="text-3xl font-bold">{currentWeather.humidity}%</p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="w-5 h-5" />
                    <span className="text-sm">Wind Speed</span>
                  </div>
                  <p className="text-3xl font-bold">{currentWeather.windSpeed} km/h</p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CloudRain className="w-5 h-5" />
                    <span className="text-sm">Rainfall</span>
                  </div>
                  <p className="text-3xl font-bold">{currentWeather.rainfall} mm</p>
                </div>

                <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <ThermometerSun className="w-5 h-5" />
                    <span className="text-sm">Feels Like</span>
                  </div>
                  <p className="text-3xl font-bold">{currentWeather.temperature + 2}°C</p>
                </div>
              </div>
            </div>
          </Card>

          {/* 5-Day Forecast */}
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">5-Day Forecast</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {currentWeather.forecast.map((day) => {
                const IconComponent = day.icon;
                return (
                  <div key={day.day} className="text-center p-4 rounded-lg bg-gradient-to-b from-blue-50 to-white border border-blue-100">
                    <p className="font-semibold text-gray-900 mb-3">{day.day}</p>
                    <IconComponent className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                    <p className="text-2xl font-bold text-gray-900 mb-1">{day.temp}°C</p>
                    <p className="text-xs text-gray-600">{day.condition}</p>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Active Alerts */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Active Weather Alerts</h2>
            <div className="space-y-4">
              {weatherAlerts.map((alert) => (
                <Card key={alert.id} className={`p-6 border-2 ${getSeverityColor(alert.severity)}`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-full ${
                      alert.severity === 'high' 
                        ? 'bg-red-200' 
                        : alert.severity === 'medium' 
                        ? 'bg-yellow-200' 
                        : 'bg-blue-200'
                    }`}>
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold">{alert.title}</h3>
                        <span className="text-xs font-semibold uppercase px-2 py-1 rounded">
                          {alert.severity} Priority
                        </span>
                      </div>
                      
                      <p className="mb-3">{alert.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {alert.district}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Valid until: {new Date(alert.validUntil).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Agricultural Advisory */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Agricultural Advisory</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">✓ Recommended Actions</h3>
                <ul className="space-y-2 text-sm text-green-800">
                  <li>• Prepare drainage systems before heavy rainfall</li>
                  <li>• Apply pesticides during dry weather windows</li>
                  <li>• Monitor crops daily for pest activity</li>
                  <li>• Harvest mature crops before rain</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-900 mb-2">✗ Avoid These Activities</h3>
                <ul className="space-y-2 text-sm text-red-800">
                  <li>• No irrigation during heavy rainfall period</li>
                  <li>• Postpone fertilizer application</li>
                  <li>• Avoid working in fields during thunderstorms</li>
                  <li>• Don't spray chemicals before rain</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}