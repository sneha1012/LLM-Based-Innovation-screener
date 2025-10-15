'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Play, 
  BarChart3, 
  Clock, 
  DollarSign, 
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Download,
  RefreshCw
} from 'lucide-react';
import { PromptTestResult } from '@/types';
import { downloadJSON, downloadCSV } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function PerformanceTesting() {
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<PromptTestResult[]>([]);
  const [selectedPromptLengths, setSelectedPromptLengths] = useState<number[]>([500, 1000, 2000, 5000]);
  const [maxConcurrentTests, setMaxConcurrentTests] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const promptLengthOptions = [100, 500, 1000, 2000, 5000, 10000, 20000];

  const runPerformanceTests = async () => {
    if (selectedPromptLengths.length === 0) {
      toast.error('Please select at least one prompt length to test');
      return;
    }

    setIsRunning(true);
    setIsLoading(true);

    try {
      const results: PromptTestResult[] = [];
      
      // Run tests in batches to respect concurrency limits
      for (let i = 0; i < selectedPromptLengths.length; i += maxConcurrentTests) {
        const batch = selectedPromptLengths.slice(i, i + maxConcurrentTests);
        
        const batchPromises = batch.map(async (length) => {
          const startTime = Date.now();
          
          try {
            const response = await fetch('/api/test-performance', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ promptLength: length }),
            });

            if (!response.ok) {
              throw new Error(`Test failed for length ${length}`);
            }

            const result = await response.json();
            return result;
          } catch (error) {
            console.error(`Error testing prompt length ${length}:`, error);
            return {
              promptLength: length,
              responseTime: 0,
              accuracy: 0,
              cost: 0,
              quality: 'poor' as const,
              timestamp: new Date(),
              error: true
            };
          }
        });

        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
        
        // Update results incrementally
        setTestResults(prev => [...prev, ...batchResults]);
        
        // Small delay between batches
        if (i + maxConcurrentTests < selectedPromptLengths.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      toast.success(`Performance tests completed! Tested ${results.length} prompt lengths.`);
    } catch (error) {
      console.error('Error running performance tests:', error);
      toast.error('Failed to run performance tests. Please try again.');
    } finally {
      setIsRunning(false);
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setTestResults([]);
    toast.success('Test results cleared');
  };

  const downloadResults = () => {
    if (testResults.length === 0) {
      toast.error('No test results to download');
      return;
    }
    downloadJSON(testResults, 'performance-test-results.json');
  };

  const downloadCSVResults = () => {
    if (testResults.length === 0) {
      toast.error('No test results to download');
      return;
    }
    downloadCSV(testResults, 'performance-test-results.csv');
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'fair': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getQualityIcon = (quality: string) => {
    switch (quality) {
      case 'excellent': return <CheckCircle className="w-4 h-4" />;
      case 'good': return <CheckCircle className="w-4 h-4" />;
      case 'fair': return <AlertTriangle className="w-4 h-4" />;
      case 'poor': return <AlertTriangle className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const averageResponseTime = testResults.length > 0 
    ? testResults.reduce((sum, result) => sum + result.responseTime, 0) / testResults.length 
    : 0;

  const averageAccuracy = testResults.length > 0 
    ? testResults.reduce((sum, result) => sum + result.accuracy, 0) / testResults.length 
    : 0;

  const totalCost = testResults.reduce((sum, result) => sum + result.cost, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Performance Testing</h2>
            <p className="text-gray-600">Test longer prompts and analyze performance metrics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Test Configuration</h4>
            <div className="space-y-2">
              <div className="text-sm text-blue-800">
                <strong>Prompt Lengths:</strong> {selectedPromptLengths.length} selected
              </div>
              <div className="text-sm text-blue-800">
                <strong>Max Concurrent:</strong> {maxConcurrentTests}
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-green-900 mb-2">Test Results</h4>
            <div className="space-y-2">
              <div className="text-sm text-green-800">
                <strong>Tests Run:</strong> {testResults.length}
              </div>
              <div className="text-sm text-green-800">
                <strong>Avg Response:</strong> {averageResponseTime.toFixed(0)}ms
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-purple-900 mb-2">Cost Analysis</h4>
            <div className="space-y-2">
              <div className="text-sm text-purple-800">
                <strong>Total Cost:</strong> ${totalCost.toFixed(4)}
              </div>
              <div className="text-sm text-purple-800">
                <strong>Avg Accuracy:</strong> {averageAccuracy.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Test Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-8"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Test Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Prompt Lengths to Test
            </label>
            <div className="space-y-2">
              {promptLengthOptions.map((length) => (
                <label key={length} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedPromptLengths.includes(length)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedPromptLengths(prev => [...prev, length]);
                      } else {
                        setSelectedPromptLengths(prev => prev.filter(l => l !== length));
                      }
                    }}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">
                    {length.toLocaleString()} characters
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Max Concurrent Tests
            </label>
            <select
              value={maxConcurrentTests}
              onChange={(e) => setMaxConcurrentTests(Number(e.target.value))}
              className="input-field"
            >
              <option value={1}>1 (Sequential)</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Higher values run tests faster but may hit rate limits
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-8">
          <button
            onClick={runPerformanceTests}
            disabled={isRunning || selectedPromptLengths.length === 0}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Running Tests...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                <span>Start Performance Tests</span>
              </>
            )}
          </button>
          
          {testResults.length > 0 && (
            <>
              <button
                onClick={clearResults}
                className="btn-secondary"
              >
                Clear Results
              </button>
              <button
                onClick={downloadResults}
                className="btn-secondary flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download JSON</span>
              </button>
              <button
                onClick={downloadCSVResults}
                className="btn-secondary flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download CSV</span>
              </button>
            </>
          )}
        </div>
      </motion.div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Test Results</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prompt Length
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Response Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Accuracy
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quality
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {testResults.map((result, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {result.promptLength.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{result.responseTime}ms</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-gray-400" />
                        <span>{result.accuracy.toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getQualityColor(result.quality)}`}>
                        {getQualityIcon(result.quality)}
                        <span className="ml-1 capitalize">{result.quality}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span>${result.cost.toFixed(4)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {result.timestamp.toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Performance Insights */}
      {testResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Performance Insights</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-blue-900">Best Performance</h4>
              </div>
              <p className="text-sm text-blue-800">
                {testResults.length > 0 
                  ? `${Math.min(...testResults.map(r => r.responseTime))}ms`
                  : 'N/A'
                }
              </p>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-green-900">Highest Accuracy</h4>
              </div>
              <p className="text-sm text-green-800">
                {testResults.length > 0 
                  ? `${Math.max(...testResults.map(r => r.accuracy)).toFixed(1)}%`
                  : 'N/A'
                }
              </p>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5 text-purple-600" />
                <h4 className="font-medium text-purple-900">Total Cost</h4>
              </div>
              <p className="text-sm text-purple-800">
                ${totalCost.toFixed(4)}
              </p>
            </div>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="w-5 h-5 text-orange-600" />
                <h4 className="font-medium text-orange-900">Tests Completed</h4>
              </div>
              <p className="text-sm text-orange-800">
                {testResults.length}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
