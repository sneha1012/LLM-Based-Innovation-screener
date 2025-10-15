'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Send, Loader2 } from 'lucide-react';
import { InnovationIdea } from '@/types';
import { generateId } from '@/lib/utils';
import toast from 'react-hot-toast';

interface InnovationFormProps {
  onEvaluationComplete?: (result: any) => void;
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
        onEvaluationComplete(result);
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
      className="bg-white rounded-xl shadow-lg p-8"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
          <Lightbulb className="w-6 h-6 text-primary-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Submit Innovation Idea</h2>
          <p className="text-gray-600">Describe your innovative idea for AI-powered evaluation</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Innovation Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter a compelling title for your innovation"
            className="input-field"
            disabled={isSubmitting}
            maxLength={100}
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.title.length}/100 characters
          </p>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="input-field"
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Detailed Description *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Provide a detailed description of your innovation idea. Include the problem it solves, how it works, target market, and potential impact..."
            className="textarea-field"
            rows={6}
            disabled={isSubmitting}
            maxLength={2000}
          />
          <p className="text-xs text-gray-500 mt-1">
            {formData.description.length}/2000 characters
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Evaluation Criteria</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Innovation Potential:</strong> Novelty and groundbreaking nature</li>
            <li>• <strong>Feasibility:</strong> Technical and practical achievability</li>
            <li>• <strong>Market Readiness:</strong> Market timing and demand</li>
            <li>• <strong>Scalability:</strong> Growth and expansion potential</li>
            <li>• <strong>Risk Assessment:</strong> Potential challenges and mitigation</li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !formData.title.trim() || !formData.description.trim()}
          className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing Innovation...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Evaluate Innovation</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Your idea will be analyzed using advanced AI models and comprehensive evaluation metrics
        </p>
      </div>
    </motion.div>
  );
}
