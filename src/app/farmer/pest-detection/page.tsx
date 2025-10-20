'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getStoredUser } from '@/lib/auth';
import { pests } from '@/lib/mockData';
import { Bug, Upload, Camera, Sparkles, AlertTriangle, CheckCircle, X } from 'lucide-react';

export default function PestDetectionPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const currentUser = getStoredUser();
    if (!currentUser || currentUser.role !== 'farmer') {
      router.push('/login');
      return;
    }
    setUser(currentUser);
  }, [router]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setLoading(true);
    setResult(null);

    // Simulate AI analysis
    setTimeout(() => {
      const randomPest = pests[Math.floor(Math.random() * pests.length)];
      const confidence = Math.floor(Math.random() * 15 + 85);
      
      setResult({
        ...randomPest,
        confidence,
        severity: confidence > 90 ? 'high' : confidence > 80 ? 'medium' : 'low',
        detectedDate: new Date().toISOString(),
        recommendation: 'Immediate action required. Apply recommended treatment within 48 hours.',
      });
      setLoading(false);
    }, 2000);
  };

  const clearResults = () => {
    setResult(null);
    setImagePreview('');
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-red-50 to-white">
      <Navbar />
      
      <main className="flex-1 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Bug className="w-10 h-10 text-red-600" />
              Pest & Disease Detection
            </h1>
            <p className="text-gray-600 text-lg">
              Upload crop images for instant AI-powered pest identification
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Upload Crop Image</h2>
              
              {!imagePreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-red-400 transition cursor-pointer">
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center">
                      <div className="bg-red-100 p-4 rounded-full mb-4">
                        <Camera className="w-12 h-12 text-red-600" />
                      </div>
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        Click to upload image
                      </p>
                      <p className="text-sm text-gray-600 mb-4">
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden border-2 border-gray-200">
                    <img
                      src={imagePreview}
                      alt="Uploaded crop"
                      className="w-full h-64 object-cover"
                    />
                    <button
                      onClick={clearResults}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {loading && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-blue-600 animate-spin" />
                        <div>
                          <p className="font-medium text-blue-900">Analyzing image...</p>
                          <p className="text-sm text-blue-700">This may take a few seconds</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <label htmlFor="image-upload-new">
                    <Button variant="outline" className="w-full" disabled={loading}>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Different Image
                    </Button>
                    <input
                      id="image-upload-new"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Tips for best results:</strong> Take clear photos in good lighting, focus on affected areas, and capture multiple angles if possible.
                </p>
              </div>
            </Card>

            {/* Results Section */}
            <div>
              <h2 className="text-xl font-bold mb-6 text-gray-900">Detection Results</h2>
              
              {!result ? (
                <Card className="p-12 text-center">
                  <Bug className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Upload a crop image to detect pests and diseases
                  </p>
                </Card>
              ) : (
                <Card className="p-6">
                  {/* Confidence Score */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Detection Confidence</span>
                      <span className="text-2xl font-bold text-red-600">{result.confidence}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-red-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>
                  </div>

                  {/* Detected Pest */}
                  <div className="mb-6 pb-6 border-b">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{result.name}</h3>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                      result.severity === 'high' 
                        ? 'bg-red-100 text-red-800'
                        : result.severity === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      <AlertTriangle className="w-4 h-4" />
                      {result.severity.toUpperCase()} SEVERITY
                    </div>
                  </div>

                  {/* Affected Crops */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Commonly Affects:</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.crops.map((crop: string) => (
                        <span
                          key={crop}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Symptoms */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Symptoms:</h4>
                    <ul className="space-y-2">
                      {result.symptoms.map((symptom: string) => (
                        <li key={symptom} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Treatment */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Recommended Treatment
                    </h4>
                    <p className="text-green-800 mb-3">{result.treatment}</p>
                    <p className="text-sm text-green-700">{result.recommendation}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <Button variant="outline" onClick={clearResults}>
                      New Analysis
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Save Report
                    </Button>
                  </div>
                </Card>
              )}

              {/* Recent Detections */}
              {result && (
                <Card className="mt-6 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Prevention Tips</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Regular monitoring of crops (at least twice a week)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Maintain proper field hygiene and remove affected plants</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Use certified seeds and disease-free planting material</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Implement crop rotation to break pest cycles</span>
                    </li>
                  </ul>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}