'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getStoredUser } from '@/lib/auth';
import { districts } from '@/lib/mockData';
import { Users, TrendingUp, AlertTriangle, Sprout, Search, MapPin, Phone, Mail, FileText, Download, Filter } from 'lucide-react';

export default function OfficerDashboard() {
  const [user, setUser] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [farmers, setFarmers] = useState([
    {
      id: 1,
      name: 'Ravi Kumar',
      phone: '9876543210',
      email: 'ravi@example.com',
      location: 'Guntur',
      district: 'Guntur',
      farmSize: '5 acres',
      crops: ['Rice', 'Cotton'],
      lastActive: '2 hours ago',
      alerts: 2,
      status: 'active',
    },
    {
      id: 2,
      name: 'Lakshmi Devi',
      phone: '9876543211',
      email: 'lakshmi@example.com',
      location: 'Tenali',
      district: 'Guntur',
      farmSize: '8 acres',
      crops: ['Chilli', 'Maize'],
      lastActive: '1 day ago',
      alerts: 1,
      status: 'active',
    },
    {
      id: 3,
      name: 'Prasad Reddy',
      phone: '9876543212',
      email: 'prasad@example.com',
      location: 'Vijayawada',
      district: 'Krishna',
      farmSize: '12 acres',
      crops: ['Rice', 'Sugarcane'],
      lastActive: '3 hours ago',
      alerts: 0,
      status: 'active',
    },
    {
      id: 4,
      name: 'Sita Ramulu',
      phone: '9876543213',
      email: 'sita@example.com',
      location: 'Ponnur',
      district: 'Guntur',
      farmSize: '6 acres',
      crops: ['Cotton', 'Groundnut'],
      lastActive: '5 days ago',
      alerts: 3,
      status: 'inactive',
    },
  ]);

  const router = useRouter();

  useEffect(() => {
    const currentUser = getStoredUser();
    if (!currentUser || currentUser.role !== 'officer') {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    setSelectedDistrict(currentUser.district || '');
  }, [router]);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const stats = {
    totalFarmers: farmers.filter(f => !selectedDistrict || f.district === selectedDistrict).length,
    activeFarmers: farmers.filter(f => (!selectedDistrict || f.district === selectedDistrict) && f.status === 'active').length,
    totalAlerts: farmers.filter(f => !selectedDistrict || f.district === selectedDistrict).reduce((sum, f) => sum + f.alerts, 0),
    avgFarmSize: 7.75,
  };

  const filteredFarmers = farmers.filter(farmer => {
    const matchesDistrict = !selectedDistrict || farmer.district === selectedDistrict;
    const matchesSearch = !searchQuery || 
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.phone.includes(searchQuery);
    return matchesDistrict && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <main className="flex-1 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Agricultural Officer Dashboard
            </h1>
            <p className="text-gray-600 text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {user.district} District • Monitoring {stats.totalFarmers} farmers
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-600 text-white p-3 rounded-lg">
                  <Users className="w-6 h-6" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Total Farmers</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalFarmers}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-600 text-white p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Active Farmers</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeFarmers}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-red-600 text-white p-3 rounded-lg">
                  <AlertTriangle className="w-6 h-6" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Active Alerts</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalAlerts}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-yellow-600 text-white p-3 rounded-lg">
                  <Sprout className="w-6 h-6" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">Avg Farm Size</p>
              <p className="text-3xl font-bold text-gray-900">{stats.avgFarmSize} ac</p>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search farmers by name, location, or phone..."
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="w-full md:w-64">
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Districts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Districts</SelectItem>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>

              <Button className="bg-green-600 hover:bg-green-700">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </Card>

          {/* Farmers List */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Registered Farmers</h2>
            
            <div className="space-y-4">
              {filteredFarmers.map((farmer) => (
                <Card key={farmer.id} className="p-6 hover:shadow-lg transition">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-green-100 to-green-200 p-3 rounded-full">
                        <Users className="w-6 h-6 text-green-700" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{farmer.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            farmer.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {farmer.status}
                          </span>
                          {farmer.alerts > 0 && (
                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                              <AlertTriangle className="w-3 h-3" />
                              {farmer.alerts} alerts
                            </span>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{farmer.location}, {farmer.district}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>{farmer.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span>{farmer.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Sprout className="w-4 h-4" />
                            <span>{farmer.farmSize} • {farmer.crops.join(', ')}</span>
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-500 mt-2">
                          Last active: {farmer.lastActive}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              {filteredFarmers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No farmers found matching your criteria</p>
                </div>
              )}
            </div>
          </Card>

          {/* Recent Activities */}
          <Card className="mt-8 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b">
                <div className="bg-green-100 p-2 rounded-full">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">New farmer registration</p>
                  <p className="text-sm text-gray-600">Sita Ramulu registered from Ponnur</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pb-4 border-b">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Weather alert issued</p>
                  <p className="text-sm text-gray-600">Heavy rainfall warning sent to 156 farmers</p>
                  <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Market price update</p>
                  <p className="text-sm text-gray-600">Cotton prices increased by 8.5%</p>
                  <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}