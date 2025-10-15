'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Shield, 
  CheckCircle,
  AlertTriangle,
  XCircle,
  Star,
  Award,
  Brain,
  Download
} from 'lucide-react';
import { EvaluationResult } from '@/types';
import { formatDate, getScoreColor, getScoreLabel, downloadJSON } from '@/lib/utils';
import ProductIntelligence from './ProductIntelligence';

interface EvaluationResultsProps {
  result?: EvaluationResult;
  onNewEvaluation?: () => void;
}

export default function EvaluationResults({ result, onNewEvaluation }: EvaluationResultsProps) {
  const [evaluationHistory, setEvaluationHistory] = useState<EvaluationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (result) {
      setEvaluationHistory(prev => [result, ...prev]);
    }
  }, [result]);

  const handleDownloadResults = () => {
    if (evaluationHistory.length > 0) {
      downloadJSON(evaluationHistory, 'evaluation-results.json');
    }
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <Award className="w-6 h-6 text-butterYellow" />;
    if (score >= 60) return <Star className="w-6 h-6 text-butterYellow" />;
    return <AlertTriangle className="w-6 h-6 text-butterYellow" />;
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-400 to-green-600';
    if (score >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-red-600';
  };

  if (evaluationHistory.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-butterYellow/10 to-darkGreen/5 rounded-2xl shadow-xl p-12 border border-butterYellow/20"
      >
        <div className="text-center">
          <div className="w-20 h-20 bg-darkGreen rounded-full flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="w-10 h-10 text-butterYellow" />
          </div>
          <h3 className="text-3xl font-bold text-darkGreen mb-4 font-serif">Ready for Analysis</h3>
          <p className="text-lg text-gray-600 mb-8 font-serif leading-relaxed">
            Submit your innovation idea to receive comprehensive AI-powered evaluation and strategic insights.
          </p>
          <div className="bg-white/60 backdrop-blur-sm border border-darkGreen/20 rounded-2xl p-6 text-left max-w-md mx-auto">
            <h4 className="text-lg font-bold text-darkGreen mb-4 font-serif">What You'll Discover:</h4>
            <ul className="text-gray-700 space-y-2 font-serif">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-darkGreen rounded-full"></div>
                <span>Innovation potential & market viability</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-darkGreen rounded-full"></div>
                <span>Technical feasibility analysis</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-darkGreen rounded-full"></div>
                <span>Competitive landscape insights</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-darkGreen rounded-full"></div>
                <span>Strategic recommendations</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    );
  }

  const latestResult = evaluationHistory[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-butterYellow/10 to-darkGreen/5 rounded-2xl shadow-xl p-8 border border-butterYellow/20"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-darkGreen rounded-2xl flex items-center justify-center">
            <BarChart3 className="w-7 h-7 text-butterYellow" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-darkGreen font-serif">AI Analysis Results</h2>
            <p className="text-gray-600 font-serif">Comprehensive innovation assessment</p>
          </div>
        </div>
        <button
          onClick={handleDownloadResults}
          className="p-3 bg-darkGreen text-butterYellow rounded-xl hover:bg-darkGreen/90 transition-colors"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={latestResult.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* ML & Algorithms Section */}
          <div className="bg-gradient-to-r from-darkGreen to-darkGreen/80 rounded-2xl p-8 mb-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-butterYellow/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Brain className="w-8 h-8 text-butterYellow" />
                <h3 className="text-2xl font-bold text-butterYellow font-serif">AI & Machine Learning Analysis</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                <div className="bg-butterYellow/10 rounded-xl p-6">
                  <h4 className="font-bold text-butterYellow mb-3 font-serif">Deep Learning Models</h4>
                  <ul className="text-butterYellow/90 space-y-2 text-sm font-serif">
                    <li>• Neural Networks for pattern recognition</li>
                    <li>• CNN for image/3D model processing</li>
                    <li>• RNN/LSTM for sequence analysis</li>
                    <li>• Transformer models for NLP</li>
                  </ul>
                </div>
                <div className="bg-butterYellow/10 rounded-xl p-6">
                  <h4 className="font-bold text-butterYellow mb-3 font-serif">3D & Computer Vision</h4>
                  <ul className="text-butterYellow/90 space-y-2 text-sm font-serif">
                    <li>• 3D reconstruction algorithms</li>
                    <li>• Point cloud processing</li>
                    <li>• Mesh generation & optimization</li>
                    <li>• Real-time rendering pipelines</li>
                  </ul>
                </div>
                <div className="bg-butterYellow/10 rounded-xl p-6">
                  <h4 className="font-bold text-butterYellow mb-3 font-serif">Business Intelligence</h4>
                  <ul className="text-butterYellow/90 space-y-2 text-sm font-serif">
                    <li>• Predictive analytics models</li>
                    <li>• Market trend analysis</li>
                    <li>• Risk assessment algorithms</li>
                    <li>• Recommendation systems</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Criteria Scores - Elegant Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Object.entries(latestResult.criteria).map(([key, value]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-butterYellow/20 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-darkGreen font-serif capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <div className="text-2xl font-bold text-darkGreen">
                    {value}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full bg-gradient-to-r ${getScoreGradient(value)} transition-all duration-1000`}
                    style={{ width: `${value}%` }}
                  />
                </div>
                <div className="mt-2 text-sm text-gray-600 font-serif">
                  {value >= 80 ? 'Excellent' : value >= 60 ? 'Good' : 'Needs Improvement'}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Product Intelligence */}
          <ProductIntelligence evaluation={latestResult} />

          {/* Strategic Analysis */}
          <div className="space-y-8">
            <h4 className="text-2xl font-bold text-darkGreen font-serif text-center">Strategic Analysis</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6"
              >
                <h5 className="font-bold text-green-900 mb-4 flex items-center text-lg font-serif">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  Key Strengths
                </h5>
                <ul className="text-green-800 space-y-2 font-serif">
                  {latestResult.detailedAnalysis.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6"
              >
                <h5 className="font-bold text-blue-900 mb-4 flex items-center text-lg font-serif">
                  <TrendingUp className="w-5 h-5 mr-3" />
                  Growth Opportunities
                </h5>
                <ul className="text-blue-800 space-y-2 font-serif">
                  {latestResult.detailedAnalysis.opportunities.map((opportunity, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{opportunity}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-r from-darkGreen to-darkGreen/80 rounded-2xl p-8 text-center"
            >
              <h5 className="font-bold text-butterYellow mb-6 flex items-center justify-center text-xl font-serif">
                <Brain className="w-6 h-6 mr-3" />
                AI-Powered Recommendations
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {latestResult.detailedAnalysis.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-butterYellow/10 rounded-xl">
                    <div className="w-6 h-6 bg-butterYellow text-darkGreen rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <span className="text-butterYellow font-serif">{recommendation}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="mt-8 pt-6 border-t border-butterYellow/20">
            <div className="flex items-center justify-between text-sm text-gray-500 font-serif">
              <span>Generated on {formatDate(latestResult.generatedAt)}</span>
              <span>Analysis ID: {latestResult.id}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}