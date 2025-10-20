'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getStoredUser } from '@/lib/auth';
import { MessageSquare, Send, Mic, MicOff, Volume2, User, Bot, Languages } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  language: 'en' | 'te';
}

export default function ChatbotPage() {
  const [user, setUser] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI farming assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
      language: 'en',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [language, setLanguage] = useState<'en' | 'te'>('en');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = getStoredUser();
    if (!currentUser || currentUser.role !== 'farmer') {
      router.push('/login');
      return;
    }
    setUser(currentUser);
  }, [router]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const teluguResponses: Record<string, string> = {
    'crop': 'మీ నేల రకం మరియు వాతావరణ పరిస్థితుల ఆధారంగా వరి, పత్తి లేదా మొక్కజొన్న పండించడం మంచిది.',
    'pest': 'పురుగుల నివారణకు సహజ పురుగుమందులను ఉపయోగించండి. పంటలను రోజూ పరిశీలించండి.',
    'price': 'ఈ రోజు మార్కెట్ ధరలు బాగున్నాయి. వరి ధర క్వింటల్‌కు ₹2200, పత్తి ₹6500.',
    'weather': 'రేపు భారీ వర్షాలు కురిసే అవకాశం ఉంది. దయచేసి జాగ్రత్తగా ఉండండి.',
    'fertilizer': 'యూరియా ఎరువులు ఎకరానికి 50 కిలోలు వేయండి. వర్షం తర్వాత వేయడం మంచిది.',
    'default': 'క్షమించండి, నేను మీ ప్రశ్నను అర్థం చేసుకోలేకపోయాను. దయచేసి మళ్ళీ ప్రయత్నించండి.',
  };

  const getAIResponse = (userMessage: string, lang: 'en' | 'te'): string => {
    const messageLower = userMessage.toLowerCase();

    if (lang === 'te') {
      if (messageLower.includes('పంట') || messageLower.includes('crop')) {
        return teluguResponses.crop;
      }
      if (messageLower.includes('తెగులు') || messageLower.includes('pest')) {
        return teluguResponses.pest;
      }
      if (messageLower.includes('ధర') || messageLower.includes('price')) {
        return teluguResponses.price;
      }
      if (messageLower.includes('వాతావరణ') || messageLower.includes('weather')) {
        return teluguResponses.weather;
      }
      if (messageLower.includes('ఎరువు') || messageLower.includes('fertilizer')) {
        return teluguResponses.fertilizer;
      }
      return teluguResponses.default;
    }

    // English responses
    if (messageLower.includes('crop') || messageLower.includes('recommend')) {
      return 'Based on your location and soil type, I recommend Rice, Cotton, or Maize for the current season. Would you like detailed information about any specific crop?';
    }
    if (messageLower.includes('pest') || messageLower.includes('disease')) {
      return 'For pest management, I recommend regular monitoring and using organic pesticides. You can upload crop images in the Pest Detection module for detailed analysis. Common pests in your area include aphids and stem borers.';
    }
    if (messageLower.includes('price') || messageLower.includes('market')) {
      return 'Current market prices: Rice ₹2200/quintal (+5.2%), Cotton ₹6500/quintal (+8.5%). Cotton prices are at peak, good time to sell!';
    }
    if (messageLower.includes('weather') || messageLower.includes('rain')) {
      return 'Heavy rainfall is expected in the next 48 hours. Please ensure proper drainage and avoid field operations during rain. Check the Weather Alerts module for detailed forecasts.';
    }
    if (messageLower.includes('fertilizer') || messageLower.includes('nutrients')) {
      return 'For optimal growth, apply Urea @ 50kg/acre, DAP @ 40kg/acre before sowing. For top dressing, use Urea @ 25kg/acre after 30 days. Always apply fertilizers after rainfall or irrigation.';
    }
    if (messageLower.includes('irrigation') || messageLower.includes('water')) {
      return 'For Rice: Maintain 2-3 inches water level. For Cotton: Irrigate at 7-10 day intervals. Avoid overwatering which can lead to root diseases.';
    }
    if (messageLower.includes('loan') || messageLower.includes('subsidy')) {
      return 'You can apply for Kisan Credit Card for crop loans. PM-KISAN provides ₹6000/year direct benefit. Contact your local agriculture office for subsidy schemes.';
    }
    if (messageLower.includes('hello') || messageLower.includes('hi')) {
      return `Hello ${user?.name || 'Farmer'}! How can I assist you with your farming needs today?`;
    }
    if (messageLower.includes('thank')) {
      return 'You\'re welcome! Feel free to ask if you have more questions. Happy farming!';
    }

    return 'I can help you with crop recommendations, pest management, market prices, weather alerts, fertilizers, irrigation, and government schemes. What would you like to know?';
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
      language,
    };

    setMessages([...messages, userMessage]);
    setInputText('');

    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText, language),
        sender: 'bot',
        timestamp: new Date(),
        language,
      };
      setMessages(prev => [...prev, botResponse]);

      // Auto speak response if enabled
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(botResponse.text);
        utterance.lang = language === 'te' ? 'te-IN' : 'en-IN';
        // window.speechSynthesis.speak(utterance);
      }
    }, 1000);
  };

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice recognition is not supported in your browser. Please use Chrome.');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = language === 'te' ? 'te-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert('Voice recognition error. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'te' ? 'te-IN' : 'en-IN';
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const quickQuestions = language === 'en' 
    ? [
        'What crops should I plant?',
        'Show current market prices',
        'How to manage pests?',
        'Weather forecast?',
      ]
    : [
        'ఏ పంటలు పండించాలి?',
        'మార్కెట్ ధరలు చూపించు',
        'తెగుళ్ళను ఎలా నిర్వహించాలి?',
        'వాతావరణ సమాచారం?',
      ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <Navbar />
      
      <main className="flex-1 px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <MessageSquare className="w-10 h-10 text-purple-600" />
              AI Farming Assistant
            </h1>
            <p className="text-gray-600 text-lg">
              Ask questions in English or Telugu • Voice input supported
            </p>
          </div>

          <Card className="h-[600px] flex flex-col">
            {/* Language Selector */}
            <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-blue-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Languages className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-gray-900">Language:</span>
              </div>
              <Select value={language} onValueChange={(value: 'en' | 'te') => setLanguage(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'bot' && (
                    <div className="bg-purple-100 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-6 h-6 text-purple-600" />
                    </div>
                  )}
                  
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      message.sender === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className={`text-xs ${
                        message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      {message.sender === 'bot' && (
                        <button
                          onClick={() => speakText(message.text)}
                          className="ml-2 p-1 hover:bg-gray-200 rounded"
                          disabled={isSpeaking}
                        >
                          <Volume2 className="w-4 h-4 text-gray-600" />
                        </button>
                      )}
                    </div>
                  </div>

                  {message.sender === 'user' && (
                    <div className="bg-green-100 p-2 rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-green-600" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-6 py-3 border-t bg-gray-50">
              <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question) => (
                  <Button
                    key={question}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInputText(question);
                      setTimeout(() => handleSend(), 100);
                    }}
                    className="text-xs"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={startVoiceRecognition}
                  disabled={isListening}
                  className={isListening ? 'bg-red-100 border-red-300' : ''}
                >
                  {isListening ? (
                    <MicOff className="w-5 h-5 text-red-600 animate-pulse" />
                  ) : (
                    <Mic className="w-5 h-5 text-gray-600" />
                  )}
                </Button>

                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={
                    language === 'en'
                      ? 'Type your question...'
                      : 'మీ ప్రశ్నను టైప్ చేయండి...'
                  }
                  className="flex-1"
                  disabled={isListening}
                />

                <Button
                  onClick={handleSend}
                  disabled={!inputText.trim() || isListening}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              
              {isListening && (
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                  <span className="animate-pulse">●</span>
                  Listening... Speak now
                </p>
              )}
            </div>
          </Card>

          {/* Features Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 bg-gradient-to-br from-purple-50 to-white">
              <Languages className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Bilingual Support</h3>
              <p className="text-sm text-gray-600">Chat in English or Telugu</p>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-blue-50 to-white">
              <Mic className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Voice Input</h3>
              <p className="text-sm text-gray-600">Speak your questions hands-free</p>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-green-50 to-white">
              <Volume2 className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-gray-900 mb-1">Voice Output</h3>
              <p className="text-sm text-gray-600">Listen to AI responses</p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}