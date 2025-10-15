'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Shield, 
  Clock, 
  DollarSign,
  Download,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle
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

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleDownloadResults = () => {
    if (evaluationHistory.length > 0) {
      downloadJSON(evaluationHistory, 'evaluation-results.json');
    }
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (score >= 60) return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    return <XCircle className="w-5 h-5 text-red-600" />;
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 border-green-200';
    if (score >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  if (evaluationHistory.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Evaluations Yet</h3>
          <p className="text-gray-600 mb-6">
            Submit an innovation idea to see detailed evaluation results and analysis.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
            <h4 className="text-sm font-medium text-blue-900 mb-2">What You'll Get:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Comprehensive scoring across 5 key criteria</li>
              <li>• Detailed SWOT analysis</li>
              <li>• Actionable recommendations</li>
              <li>• Performance metrics and cost analysis</li>
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
      className="bg-white rounded-xl shadow-lg p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Evaluation Results</h2>
            <p className="text-gray-600">AI-powered analysis and scoring</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleDownloadResults}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={latestResult.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Overall Score */}
          <div className={`rounded-xl p-6 mb-6 border-2 ${getScoreBgColor(latestResult.overallScore)}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getScoreIcon(latestResult.overallScore)}
                <h3 className="text-xl font-semibold text-gray-900">Overall Score</h3>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-bold ${getScoreColor(latestResult.overallScore)}`}>
                  {latestResult.overallScore}/100
                </div>
                <div className="text-sm text-gray-600">{getScoreLabel(latestResult.overallScore)}</div>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ${
                  latestResult.overallScore >= 80 ? 'bg-green-500' :
                  latestResult.overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${latestResult.overallScore}%` }}
              />
            </div>
          </div>

          {/* Detailed Criteria */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Evaluation Criteria</h4>
              
              {Object.entries(latestResult.criteria).map(([key, value]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className={`text-sm font-semibold ${getScoreColor(value)}`}>
                      {value}/100
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        value >= 80 ? 'bg-green-500' :
                        value >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h4>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Response Time</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {latestResult.performanceMetrics.responseTime}ms
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Cost</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    ${latestResult.performanceMetrics.cost.toFixed(4)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Target className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Tokens Used</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {latestResult.performanceMetrics.tokenUsage.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Intelligence */}
          <ProductIntelligence evaluation={latestResult} />

          {/* Detailed Analysis */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-gray-900">Detailed Analysis</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-medium text-green-900 mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Strengths
                  </h5>
                  <ul className="text-sm text-green-800 space-y-1">
                    {latestResult.detailedAnalysis.strengths.map((strength, index) => (
                      <li key={index}>• {strength}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-medium text-blue-900 mb-2 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Opportunities
                  </h5>
                  <ul className="text-sm text-blue-800 space-y-1">
                    {latestResult.detailedAnalysis.opportunities.map((opportunity, index) => (
                      <li key={index}>• {opportunity}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h5 className="font-medium text-red-900 mb-2 flex items-center">
                    <XCircle className="w-4 h-4 mr-2" />
                    Weaknesses
                  </h5>
                  <ul className="text-sm text-red-800 space-y-1">
                    {latestResult.detailedAnalysis.weaknesses.map((weakness, index) => (
                      <li key={index}>• {weakness}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h5 className="font-medium text-orange-900 mb-2 flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Threats
                  </h5>
                  <ul className="text-sm text-orange-800 space-y-1">
                    {latestResult.detailedAnalysis.threats.map((threat, index) => (
                      <li key={index}>• {threat}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h5 className="font-medium text-purple-900 mb-2 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Recommendations
              </h5>
              <ul className="text-sm text-purple-800 space-y-1">
                {latestResult.detailedAnalysis.recommendations.map((recommendation, index) => (
                  <li key={index}>• {recommendation}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Generated on {formatDate(latestResult.generatedAt)}</span>
              <span>Evaluation ID: {latestResult.id}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
