'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getStoredUser } from '@/lib/auth';
import { crops, soilTypes, districts } from '@/lib/mockData';
import { Brain, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

export default function CropRecommendationPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    soilType: '',
    rainfall: '',
    district: '',
    season: '',
  });
  const router = useRouter();

  useEffect(() => {
    const currentUser = getStoredUser();
    if (!currentUser || currentUser.role !== 'farmer') {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    setFormData({ ...formData, district: currentUser.district || '' });
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const soilTypeLower = formData.soilType.toLowerCase();
      const rainfallAmount = parseInt(formData.rainfall);
      
      // AI Algorithm: Filter crops based on input
      const recommendations = crops
        .filter(crop => {
          // Match soil type
          const soilMatch = crop.soilTypes.some(type => 
            type.toLowerCase().includes(soilTypeLower) || 
            soilTypeLower.includes(type.toLowerCase())
          );
          
          // Match rainfall
          const rainfallMatch = rainfallAmount >= crop.minRainfall && 
                               rainfallAmount <= crop.maxRainfall;
          
          // Match season if provided
          const seasonMatch = !formData.season || 
                             crop.season === formData.season || 
                             crop.season === 'Year-round';
          
          return soilMatch && rainfallMatch && seasonMatch;
        })
        .map(crop => ({
          ...crop,
          confidence: Math.floor(Math.random() * 15 + 85), // 85-100% confidence
          expectedYield: `${Math.floor(Math.random() * 20 + 20)} quintals/acre`,
          profitPotential: Math.floor(Math.random() * 30000 + 40000),
        }))
        .sort((a, b) => b.confidence - a.confidence);
      
      setResults(recommendations);
      setLoading(false);
    }, 1500);
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      
      <main className="flex-1 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Brain className="w-10 h-10 text-green-600" />
              Crop Recommendation System
            </h1>
            <p className="text-gray-600 text-lg">
              Get AI-powered crop suggestions tailored to your farm conditions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Enter Your Farm Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="soilType" className="mb-2 block">Soil Type</Label>
                  <Select
                    value={formData.soilType}
                    onValueChange={(value) => setFormData({ ...formData, soilType: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      {soilTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="rainfall" className="mb-2 block">
                    Expected Rainfall (cm/month)
                  </Label>
                  <Input
                    id="rainfall"
                    type="number"
                    value={formData.rainfall}
                    onChange={(e) => setFormData({ ...formData, rainfall: e.target.value })}
                    placeholder="e.g., 75"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="district" className="mb-2 block">District</Label>
                  <Select
                    value={formData.district}
                    onValueChange={(value) => setFormData({ ...formData, district: value })}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="season" className="mb-2 block">Season (Optional)</Label>
                  <Select
                    value={formData.season}
                    onValueChange={(value) => setFormData({ ...formData, season: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select season" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kharif">Kharif (Monsoon)</SelectItem>
                      <SelectItem value="Rabi">Rabi (Winter)</SelectItem>
                      <SelectItem value="Year-round">Year-round</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-spin" />
                      Analyzing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      Get Recommendations
                    </span>
                  )}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Pro Tip:</strong> Our AI considers soil type, rainfall patterns, and regional climate to suggest the most suitable crops for your farm.
                </p>
              </div>
            </Card>

            {/* Results */}
            <div>
              <h2 className="text-xl font-bold mb-6 text-gray-900">Recommended Crops</h2>
              
              {results.length === 0 ? (
                <Card className="p-12 text-center">
                  <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Enter your farm details to get AI-powered crop recommendations
                  </p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {results.map((crop, index) => (
                    <Card key={crop.name} className="p-6 hover:shadow-lg transition">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {index === 0 && (
                            <div className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded">
                              TOP PICK
                            </div>
                          )}
                          <h3 className="text-xl font-bold text-gray-900">{crop.name}</h3>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">
                            {crop.confidence}%
                          </div>
                          <div className="text-xs text-gray-500">Confidence</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Season</p>
                          <p className="font-medium text-gray-900">{crop.season}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Expected Yield</p>
                          <p className="font-medium text-gray-900">{crop.expectedYield}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <p className="text-sm text-gray-600">
                          Suitable for {crop.soilTypes.join(', ')} soil
                        </p>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <p className="text-sm font-medium text-green-800 mb-1">
                          Estimated Profit Potential
                        </p>
                        <p className="text-2xl font-bold text-green-600">
                          ₹{crop.profitPotential.toLocaleString()}/acre
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}