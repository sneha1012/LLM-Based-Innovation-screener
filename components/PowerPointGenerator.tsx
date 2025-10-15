'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Loader2, CheckCircle } from 'lucide-react';
import { InnovationIdea, EvaluationResult } from '@/types';
import { powerpointGenerator } from '@/lib/powerpointGenerator';
import toast from 'react-hot-toast';

interface PowerPointGeneratorProps {
  idea?: InnovationIdea;
  evaluation?: EvaluationResult;
}

export default function PowerPointGenerator({ idea, evaluation }: PowerPointGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGeneratePresentation = async () => {
    if (!idea || !evaluation) {
      toast.error('Please complete an evaluation first');
      return;
    }

    setIsGenerating(true);
    
    try {
      const presentation = await powerpointGenerator.generatePresentation(idea, evaluation);
      
      // Create download link
      const url = URL.createObjectURL(presentation);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Innovation_Assessment_${idea.title.replace(/[^a-zA-Z0-9]/g, '_')}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setIsGenerated(true);
      toast.success('Presentation generated successfully!');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsGenerated(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error generating presentation:', error);
      toast.error('Failed to generate presentation');
    } finally {
      setIsGenerating(false);
    }
  };

  const canGenerate = idea && evaluation && !isGenerating;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Generate Presentation</h3>
          <p className="text-sm text-gray-600">Create professional PowerPoint slides</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 border border-primary-200 rounded-lg p-4">
          <h4 className="font-medium text-primary-900 mb-2">What's Included:</h4>
          <ul className="text-sm text-primary-800 space-y-1">
            <li>• Executive Summary with key metrics</li>
            <li>• Detailed evaluation across 5 criteria</li>
            <li>• SWOT analysis with visual charts</li>
            <li>• Market data and competitive analysis</li>
            <li>• Actionable recommendations</li>
            <li>• Performance metrics and cost analysis</li>
          </ul>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${canGenerate ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-sm text-gray-700">
              {canGenerate ? 'Ready to generate' : 'Complete evaluation first'}
            </span>
          </div>
          <div className="text-sm text-gray-500">
            {idea && evaluation ? 'All data available' : 'Missing evaluation data'}
          </div>
        </div>

        <button
          onClick={handleGeneratePresentation}
          disabled={!canGenerate}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            canGenerate
              ? 'bg-gradient-to-r from-primary-600 to-accent-600 hover:from-primary-700 hover:to-accent-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Generating Presentation...</span>
            </>
          ) : isGenerated ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Presentation Generated!</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>Generate PowerPoint</span>
            </>
          )}
        </button>

        <div className="text-xs text-gray-500 text-center">
          Presentation will be downloaded as an HTML file that can be opened in PowerPoint
        </div>
      </div>
    </motion.div>
  );
}
