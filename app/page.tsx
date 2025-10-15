'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  BarChart3, 
  Zap, 
  Target, 
  TrendingUp, 
  Shield,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Award,
  Brain,
  Database,
  FileText,
  Download
} from 'lucide-react';
import InnovationForm from '@/components/InnovationForm';
import EvaluationResults from '@/components/EvaluationResults';
import PerformanceTesting from '@/components/PerformanceTesting';
import Dashboard from '@/components/Dashboard';
import PowerPointGenerator from '@/components/PowerPointGenerator';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'evaluate' | 'performance' | 'dashboard'>('evaluate');
  const [currentIdea, setCurrentIdea] = useState<any>(null);
  const [currentEvaluation, setCurrentEvaluation] = useState<any>(null);

  const mlAlgorithms = [
    "Neural Network Analysis",
    "Natural Language Processing",
    "Sentiment Analysis",
    "Market Prediction Models",
    "Patent Landscape Mapping",
    "Competitive Intelligence AI"
  ];

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-butterYellow" />,
      title: "Advanced AI Models",
      description: "Sophisticated machine learning algorithms analyze innovation potential across multiple dimensions"
    },
    {
      icon: <Database className="w-8 h-8 text-butterYellow" />,
      title: "Real-time Intelligence",
      description: "Live market data, patent analysis, and competitive landscape insights"
    },
    {
      icon: <FileText className="w-8 h-8 text-butterYellow" />,
      title: "Strategic Reports",
      description: "Generate professional PowerPoint presentations with actionable insights"
    },
    {
      icon: <Target className="w-8 h-8 text-butterYellow" />,
      title: "Precision Scoring",
      description: "Multi-criteria evaluation with detailed breakdowns and recommendations"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Half and Half Design */}
      <section className="relative min-h-screen flex">
        {/* Left Half - Dark Green */}
        <div className="w-1/2 bg-darkGreen flex flex-col justify-center items-center p-16 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-32 h-32 border border-butterYellow/30 rounded-full"></div>
            <div className="absolute bottom-32 right-16 w-24 h-24 border border-butterYellow/20 rounded-full"></div>
            <div className="absolute top-1/2 right-8 w-16 h-16 border border-butterYellow/25 rounded-full"></div>
          </div>
          
          <div className="text-center max-w-lg relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8">
                <div className="bg-butterYellow/20 p-6 rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center backdrop-blur-sm">
                  <Lightbulb className="w-12 h-12 text-butterYellow" />
                </div>
                <h1 className="text-6xl font-bold text-butterYellow mb-6 font-serif leading-tight">
                  Innovation Screener
                </h1>
                <p className="text-2xl text-butterYellow/90 mb-8 font-serif leading-relaxed">
                  AI-Powered Intelligence for Tomorrow's Breakthroughs
                </p>
              </div>
              
              <div className="space-y-6 text-butterYellow/80">
                {mlAlgorithms.map((algorithm, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-3 h-3 bg-butterYellow rounded-full flex-shrink-0"></div>
                    <span className="font-serif text-lg">{algorithm}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Half - Butter Yellow */}
        <div className="w-1/2 bg-butterYellow flex flex-col justify-center items-center p-16 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-16 right-20 w-40 h-40 border border-darkGreen/20 rounded-full"></div>
            <div className="absolute bottom-20 left-12 w-28 h-28 border border-darkGreen/15 rounded-full"></div>
            <div className="absolute top-1/3 left-8 w-20 h-20 border border-darkGreen/25 rounded-full"></div>
          </div>
          
          <div className="text-center max-w-lg relative z-10">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold text-darkGreen mb-8 font-serif leading-tight">
                Transform Ideas into Impact
              </h2>
              <p className="text-xl text-darkGreen/80 mb-12 font-serif leading-relaxed">
                Our sophisticated AI algorithms analyze your innovation across multiple dimensions, 
                providing deep insights into market potential, technical feasibility, and competitive landscape.
              </p>
              
              {/* Navigation */}
              <div className="space-y-6">
                <button
                  onClick={() => setActiveTab('evaluate')}
                  className={`w-full px-8 py-6 rounded-2xl font-medium transition-all duration-300 font-serif text-xl ${
                    activeTab === 'evaluate'
                      ? 'bg-darkGreen text-butterYellow shadow-2xl transform scale-105'
                      : 'bg-white/60 text-darkGreen hover:bg-white hover:shadow-xl backdrop-blur-sm'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-4">
                    <BarChart3 className="w-6 h-6" />
                    <span>Evaluate Ideas</span>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('performance')}
                  className={`w-full px-8 py-6 rounded-2xl font-medium transition-all duration-300 font-serif text-xl ${
                    activeTab === 'performance'
                      ? 'bg-darkGreen text-butterYellow shadow-2xl transform scale-105'
                      : 'bg-white/60 text-darkGreen hover:bg-white hover:shadow-xl backdrop-blur-sm'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-4">
                    <Zap className="w-6 h-6" />
                    <span>Performance Testing</span>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full px-8 py-6 rounded-2xl font-medium transition-all duration-300 font-serif text-xl ${
                    activeTab === 'dashboard'
                      ? 'bg-darkGreen text-butterYellow shadow-2xl transform scale-105'
                      : 'bg-white/60 text-darkGreen hover:bg-white hover:shadow-xl backdrop-blur-sm'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-4">
                    <TrendingUp className="w-6 h-6" />
                    <span>Dashboard</span>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-darkGreen mb-6 font-serif">Intelligent Innovation Analysis</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-serif">
              Powered by cutting-edge machine learning and comprehensive market intelligence
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-butterYellow/10 to-darkGreen/5 border border-butterYellow/20"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-darkGreen p-4 rounded-2xl">
                    {feature.icon}
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-darkGreen mb-4 font-serif">{feature.title}</h4>
                <p className="text-gray-600 font-serif leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16 bg-gradient-to-br from-butterYellow/5 to-darkGreen/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'evaluate' && (
            <div className="space-y-12">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-darkGreen mb-4 font-serif">AI-Powered Innovation Evaluation</h2>
                <p className="text-xl text-gray-600 font-serif">Submit your idea and receive comprehensive analysis</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <InnovationForm onEvaluationComplete={(result) => {
                  setCurrentEvaluation(result);
                  setCurrentIdea(result.idea);
                }} />
                <EvaluationResults result={currentEvaluation} />
              </div>
              
              {currentEvaluation && (
                <div className="mt-12">
                  <PowerPointGenerator idea={currentIdea} evaluation={currentEvaluation} />
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'performance' && <PerformanceTesting />}
          
          {activeTab === 'dashboard' && <Dashboard />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-darkGreen text-butterYellow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-butterYellow rounded-2xl flex items-center justify-center">
                  <Lightbulb className="w-7 h-7 text-darkGreen" />
                </div>
                <span className="text-2xl font-bold font-serif">Innovation Screener</span>
              </div>
              <p className="text-butterYellow/80 font-serif text-lg leading-relaxed">
                AI-powered platform for comprehensive innovation assessment and strategic evaluation.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-6 font-serif">AI Capabilities</h4>
              <ul className="space-y-3 text-butterYellow/80 font-serif">
                <li>Machine Learning Analysis</li>
                <li>Natural Language Processing</li>
                <li>Market Intelligence</li>
                <li>Patent Landscape Mapping</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-6 font-serif">Project Details</h4>
              <ul className="space-y-3 text-butterYellow/80 font-serif">
                <li>Master's Capstone Project</li>
                <li>Built with Next.js & Gemini AI</li>
                <li>Real-time Web Search Integration</li>
                <li>Professional Presentation Generation</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-butterYellow/20 mt-12 pt-8 text-center text-butterYellow/60 font-serif">
            <p>&copy; 2024 Innovation Screener. Built for academic capstone project.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}