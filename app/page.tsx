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
  Award
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

  const features = [
    {
      icon: <Lightbulb className="w-8 h-8 text-primary-600" />,
      title: "AI-Powered Analysis",
      description: "Advanced language models provide comprehensive innovation assessment"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary-600" />,
      title: "Multiple Evaluation Methods",
      description: "Comprehensive metrics including innovation potential, feasibility, and market readiness"
    },
    {
      icon: <Zap className="w-8 h-8 text-primary-600" />,
      title: "Performance Testing",
      description: "Built-in tools for testing longer prompts and analyzing performance metrics"
    },
    {
      icon: <Target className="w-8 h-8 text-primary-600" />,
      title: "Real-time Results",
      description: "Instant feedback and scoring with detailed analysis and recommendations"
    }
  ];

  const stats = [
    { icon: <TrendingUp className="w-6 h-6" />, label: "Average Score", value: "85.2" },
    { icon: <Clock className="w-6 h-6" />, label: "Response Time", value: "2.3s" },
    { icon: <DollarSign className="w-6 h-6" />, label: "Cost per Analysis", value: "$0.05" },
    { icon: <CheckCircle className="w-6 h-6" />, label: "Accuracy Rate", value: "94.8%" }
  ];

  return (
      <div className="min-h-screen bg-gradient-to-br from-butterYellow/20 via-white to-darkGreen/5">
      {/* Header */}
      <header className="bg-gradient-to-r from-white to-butterYellow/10 shadow-sm border-b border-darkGreen/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-darkGreen rounded-lg flex items-center justify-center shadow-lg">
                <Lightbulb className="w-6 h-6 text-butterYellow" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-darkGreen font-serif">Innovation Screener</h1>
                <p className="text-sm text-gray-600">AI-Powered Innovation Assessment Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6">
                <button
                  onClick={() => setActiveTab('evaluate')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'evaluate'
                      ? 'bg-darkGreen text-butterYellow shadow-lg'
                      : 'text-gray-600 hover:text-darkGreen hover:bg-butterYellow/20'
                  }`}
                >
                  Evaluate Ideas
                </button>
                <button
                  onClick={() => setActiveTab('performance')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'performance'
                      ? 'bg-darkGreen text-butterYellow shadow-lg'
                      : 'text-gray-600 hover:text-darkGreen hover:bg-butterYellow/20'
                  }`}
                >
                  Performance Testing
                </button>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-darkGreen text-butterYellow shadow-lg'
                      : 'text-gray-600 hover:text-darkGreen hover:bg-butterYellow/20'
                  }`}
                >
                  Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {activeTab === 'evaluate' && (
        <section className="py-20 bg-gradient-to-br from-butterYellow/20 via-white to-darkGreen/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-butterYellow/10 via-white to-darkGreen/5 rounded-2xl m-4 shadow-lg p-8">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                  Screen Innovation with
                  <span className="bg-gradient-to-r from-primary-600 via-accent-600 to-purple-600 bg-clip-text text-transparent block">AI Precision</span>
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                  Comprehensive AI-powered platform for evaluating and screening innovative ideas 
                  using advanced language models and evaluation metrics.
                </p>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-sm border">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-3 mx-auto">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Evaluation Platform</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built with advanced AI capabilities and professional evaluation methods
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'evaluate' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <InnovationForm onEvaluationComplete={(result) => {
                  setCurrentEvaluation(result);
                  setCurrentIdea(result.idea);
                }} />
                <EvaluationResults result={currentEvaluation} />
              </div>
              {currentEvaluation && (
                <PowerPointGenerator idea={currentIdea} evaluation={currentEvaluation} />
              )}
            </div>
          )}
          
          {activeTab === 'performance' && <PerformanceTesting />}
          
          {activeTab === 'dashboard' && <Dashboard />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Innovation Screener</span>
              </div>
              <p className="text-gray-400">
                AI-powered platform for comprehensive innovation assessment and evaluation.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>AI-Powered Analysis</li>
                <li>Performance Testing</li>
                <li>Multiple Evaluation Methods</li>
                <li>Real-time Results</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Project Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Master's Capstone Project</li>
                <li>Built with Next.js & Gemini AI</li>
                <li>Professional Evaluation Tools</li>
                <li>Comprehensive Metrics</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Innovation Screener. Built for academic capstone project.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
