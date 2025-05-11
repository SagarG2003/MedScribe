// It includes a navigation bar, hero section, features section, how it works section, social proof section, and a footer.
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Clock, Brain, Shield, ChevronRight, Play } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Mic className="h-8 w-8 text-blue-600" />
              <span className="ml-1 text-2xl font-bold text-black">MedScribe</span>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... text-white px-4 py-2 rounded-md text-sm font-bold transition-colors"
              >
                Log In
              </button>
              <button 
                onClick={() => navigate('/auth')}
                className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... text-white px-4 py-2 rounded-md text-sm font-bold transition-colors"
              >
                Sign Up Free
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
                AI-Powered Medical Transcription for Modern Healthcare
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Transform your patient interactions with real-time, accurate medical transcription. Save time, reduce costs, and focus on what matters most - your patients.
              </p>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/auth')}
                  className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... text-white px-6 py-3 rounded-md text-lg font-bold transition-colors flex items-center gap-2"
                >
                  Get Started Free
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button className="text-gray-600 hover:text-gray-900 px-6 py-3 rounded-md text-lg font-medium flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="./assets/MedScribeImage.jpg"
                alt="Doctor using MedScribe"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Average Time Saved</p>
                    <p className="text-xl font-semibold text-gray-900">6 hrs/week</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need for Medical Documentation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Streamline your workflow with our comprehensive sets of features designed specifically for healthcare professionals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI-Powered Accuracy
              </h3>
              <p className="text-gray-600">
                Advanced machine learning algorithms ensure precise transcription with medical terminology recognition.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Real-Time Transcription
              </h3>
              <p className="text-gray-600">
                Get instant transcriptions during patient consultations, saving valuable time in your busy schedule.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Medical Report Generation
              </h3>
              <p className="text-gray-600">
                Generate personalized medical report in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Yet Powerful Workflow
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes with our intuitive platform designed for healthcare professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Record Session',
                description: 'Start recording your patient consultation with a single click.'
              },
              {
                step: '02',
                title: 'Real-Time Transcription',
                description: 'Watch as your conversation is transcribed instantly with medical term highlighting.'
              },
              {
                step: '03',
                title: 'Generate Report',
                description: 'Get a complete medical report with key terms and follow-up instructions.'
              }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-5xl font-bold text-blue-100 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ChevronRight className="h-8 w-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Healthcare Professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of medical professionals who trust MedScribe for their documentation needs.
            </p>
          </div>

          <div className="text-center">
            <button 
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ... text-white px-8 py-4 rounded-md text-lg font-bold transition-colors inline-flex items-center gap-2"
            >
              Start Your Free Trial
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Mic className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-semibold">MedScribe</span>
              </div>
              <p className="text-gray-400">
                AI-powered medical transcription for modern healthcare professionals.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">HIPAA</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} MedScribe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;