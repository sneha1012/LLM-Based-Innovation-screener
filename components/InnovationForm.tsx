'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Send, Loader2, Brain, Sparkles } from 'lucide-react';
import { InnovationIdea } from '@/types';
import { generateId } from '@/lib/utils';
import toast from 'react-hot-toast';

interface InnovationFormProps {
  onEvaluationComplete?: (result: any, idea: InnovationIdea) => void;
}

export default function InnovationForm({ onEvaluationComplete }: InnovationFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technology'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'Technology',
    'Healthcare',
    'Finance',
    'Education',
    'Sustainability',
    'Entertainment',
    'Manufacturing',
    'Transportation',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const idea: InnovationIdea = {
        id: generateId(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category,
        submittedAt: new Date(),
        status: 'analyzing'
      };

      // Simulate API call
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(idea),
      });

      if (!response.ok) {
        throw new Error('Failed to evaluate idea');
      }

      const result = await response.json();
      
      toast.success('Innovation idea evaluated successfully!');
      
      if (onEvaluationComplete) {
        onEvaluationComplete(result, idea);
      }

      // Reset form
      setFormData({
        title: '',
        description: '',
        category: 'Technology'
      });

    } catch (error) {
      console.error('Error evaluating idea:', error);
      toast.error('Failed to evaluate idea. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-butterYellow/10 to-darkGreen/5 rounded-2xl shadow-2xl p-8 border border-butterYellow/20"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-darkGreen rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Lightbulb className="w-8 h-8 text-butterYellow" />
        </div>
        <h2 className="text-3xl font-bold text-darkGreen mb-2 font-serif">Submit Your Innovation</h2>
        <p className="text-lg text-gray-600 font-serif">Describe your idea for comprehensive AI analysis</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="title" className="block text-lg font-bold text-darkGreen mb-3 font-serif">
            Innovation Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter a compelling title for your innovation"
            className="w-full px-6 py-4 rounded-xl border-2 border-butterYellow/30 focus:border-darkGreen focus:ring-2 focus:ring-darkGreen/20 transition-all duration-300 font-serif text-lg bg-white/60 backdrop-blur-sm"
            disabled={isSubmitting}
            maxLength={100}
          />
          <p className="text-sm text-gray-500 mt-2 font-serif">
            {formData.title.length}/100 characters
          </p>
        </div>

        <div>
          <label htmlFor="category" className="block text-lg font-bold text-darkGreen mb-3 font-serif">
            Industry Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-6 py-4 rounded-xl border-2 border-butterYellow/30 focus:border-darkGreen focus:ring-2 focus:ring-darkGreen/20 transition-all duration-300 font-serif text-lg bg-white/60 backdrop-blur-sm"
            disabled={isSubmitting}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-bold text-darkGreen mb-3 font-serif">
            Detailed Description *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Provide a detailed description of your innovation idea. Include the problem it solves, how it works, target market, and potential impact..."
            className="w-full px-6 py-4 rounded-xl border-2 border-butterYellow/30 focus:border-darkGreen focus:ring-2 focus:ring-darkGreen/20 transition-all duration-300 font-serif text-lg bg-white/60 backdrop-blur-sm resize-none"
            rows={6}
            disabled={isSubmitting}
            maxLength={2000}
          />
          <p className="text-sm text-gray-500 mt-2 font-serif">
            {formData.description.length}/2000 characters
          </p>
        </div>

        {/* AI Analysis Preview */}
        <div className="bg-gradient-to-r from-darkGreen to-darkGreen/80 rounded-2xl p-6 text-center">
          <h4 className="text-xl font-bold text-butterYellow mb-4 font-serif flex items-center justify-center">
            <Brain className="w-6 h-6 mr-2" />
            AI Analysis Preview
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-butterYellow/90 font-serif">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-butterYellow rounded-full"></div>
              <span>Market Opportunity Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-butterYellow rounded-full"></div>
              <span>Customer Demand Forecasting</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-butterYellow rounded-full"></div>
              <span>Competitive Landscape Intelligence</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-butterYellow rounded-full"></div>
              <span>Investment Risk Assessment</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-butterYellow rounded-full"></div>
              <span>Business Model Validation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-butterYellow rounded-full"></div>
              <span>Strategic Decision Support</span>
            </div>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting || !formData.title.trim() || !formData.description.trim()}
          whileHover={!isSubmitting && formData.title.trim() && formData.description.trim() ? { scale: 1.02 } : {}}
          whileTap={!isSubmitting && formData.title.trim() && formData.description.trim() ? { scale: 0.98 } : {}}
          className={`w-full flex items-center justify-center space-x-3 py-6 px-8 rounded-2xl font-bold text-xl transition-all duration-300 font-serif ${
            !isSubmitting && formData.title.trim() && formData.description.trim()
              ? 'bg-gradient-to-r from-darkGreen to-darkGreen/80 hover:from-darkGreen/90 hover:to-darkGreen/70 text-butterYellow shadow-2xl hover:shadow-3xl transform hover:-translate-y-1'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>AI Analyzing Innovation...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              <span>Evaluate Innovation</span>
            </>
          )}
        </motion.button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-600 font-serif text-lg">
          Your idea will be analyzed using advanced machine learning models and comprehensive evaluation metrics
        </p>
      </div>
    </motion.div>
  );
}