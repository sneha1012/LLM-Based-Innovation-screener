'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Loader2, CheckCircle, Presentation, Sparkles } from 'lucide-react';
import { InnovationIdea, EvaluationResult } from '@/types';
import { documentGenerator } from '@/lib/documentGenerator';
import toast from 'react-hot-toast';

interface PowerPointGeneratorProps {
  idea?: InnovationIdea;
  evaluation?: EvaluationResult;
}

export default function PowerPointGenerator({ idea, evaluation }: PowerPointGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGeneratePresentation = async () => {
    console.log('PowerPoint Generator - Idea:', idea);
    console.log('PowerPoint Generator - Evaluation:', evaluation);
    
    if (!idea || !evaluation) {
      console.log('PowerPoint Generator - Missing data:', { idea: !!idea, evaluation: !!evaluation });
      toast.error('Please complete an evaluation first');
      return;
    }

    console.log('PowerPoint Generator - Starting generation...');
    setIsGenerating(true);
    
    try {
      const presentation = await documentGenerator.generateProfessionalDocument(idea, evaluation);
      
      // Create download link
      const url = URL.createObjectURL(presentation);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Professional_Report_${idea.title.replace(/[^a-zA-Z0-9]/g, '_')}.html`;
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
      console.error('PowerPoint Generator - Error generating presentation:', error);
      console.error('PowerPoint Generator - Error details:', {
        message: error.message,
        stack: error.stack,
        idea: idea,
        evaluation: evaluation
      });
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
      className="bg-gradient-to-br from-butterYellow/20 to-darkGreen/10 rounded-2xl shadow-2xl p-8 border border-butterYellow/30"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-darkGreen rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-butterYellow" />
        </div>
        <h3 className="text-3xl font-bold text-darkGreen mb-2 font-serif">Generate Professional Report</h3>
        <p className="text-lg text-gray-600 font-serif">Transform your analysis into a comprehensive business intelligence document</p>
      </div>

      <div className="space-y-6">
        {/* What's Included */}
        <div className="bg-white/60 backdrop-blur-sm border border-darkGreen/20 rounded-2xl p-6">
          <h4 className="font-bold text-darkGreen mb-4 text-xl font-serif flex items-center">
            <Sparkles className="w-5 h-5 mr-2" />
            Document Contents:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="text-gray-700 space-y-2 font-serif">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-darkGreen rounded-full"></div>
                <span>Executive Summary with Innovation Score</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-darkGreen rounded-full"></div>
                <span>Detailed evaluation across 5 criteria</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-darkGreen rounded-full"></div>
                <span>SWOT Analysis with Strategic Insights</span>
              </li>
            </ul>
            <ul className="text-gray-700 space-y-2 font-serif">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-darkGreen rounded-full"></div>
                <span>Market Intelligence & Competitive Analysis</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-darkGreen rounded-full"></div>
                <span>Strategic Recommendations & Next Steps</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-darkGreen rounded-full"></div>
                <span>Technical Analysis & Implementation Metrics</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-butterYellow/20">
          <div className="flex items-center space-x-4">
            <div className={`w-4 h-4 rounded-full ${canGenerate ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-lg font-serif text-gray-700">
              {canGenerate ? 'Ready to generate professional report' : 'Complete evaluation first'}
            </span>
          </div>
          <div className="text-sm text-gray-500 font-serif">
            {idea && evaluation ? 'All data available' : 'Missing evaluation data'}
          </div>
        </div>

        {/* Generate Button */}
        <motion.button
          onClick={handleGeneratePresentation}
          disabled={!canGenerate}
          whileHover={canGenerate ? { scale: 1.02 } : {}}
          whileTap={canGenerate ? { scale: 0.98 } : {}}
          className={`w-full flex items-center justify-center space-x-3 py-6 px-8 rounded-2xl font-bold text-xl transition-all duration-300 font-serif ${
            canGenerate
              ? 'bg-gradient-to-r from-darkGreen to-darkGreen/80 hover:from-darkGreen/90 hover:to-darkGreen/70 text-butterYellow shadow-2xl hover:shadow-3xl transform hover:-translate-y-1'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Generating Professional Report...</span>
            </>
          ) : isGenerated ? (
            <>
              <CheckCircle className="w-6 h-6" />
              <span>Professional Report Generated!</span>
            </>
          ) : (
            <>
              <Download className="w-6 h-6" />
              <span>Generate Professional Report</span>
            </>
          )}
        </motion.button>

        <div className="text-center text-gray-500 font-serif">
          <p className="text-sm">Presentation will be downloaded as an HTML file that can be opened in PowerPoint</p>
          <p className="text-xs mt-1">Perfect for business presentations and investor meetings</p>
        </div>
      </div>
    </motion.div>
  );
}