'use client';

import React from 'react';
import { EvaluationResult } from '@/types';
import { 
  Code2, 
  GitBranch, 
  FileText, 
  Building2, 
  Shield, 
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  ExternalLink,
  Star,
  AlertTriangle,
  CheckCircle,
  Lightbulb
} from 'lucide-react';

interface ProductIntelligenceProps {
  evaluation: EvaluationResult;
}

export default function ProductIntelligence({ evaluation }: ProductIntelligenceProps) {
  if (!evaluation.technicalAnalysis && !evaluation.researchIntelligence && !evaluation.competitiveIntelligence) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Technical Analysis */}
      {evaluation.technicalAnalysis && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Code2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Technical Intelligence</h3>
              <p className="text-gray-600">Technology stack, implementation complexity, and development insights</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recommended Tech Stack */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-blue-600" />
                Recommended Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {evaluation.technicalAnalysis.recommendedTechStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Implementation Complexity */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Implementation Complexity
              </h4>
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  evaluation.technicalAnalysis.implementationComplexity === 'Low' 
                    ? 'bg-green-100 text-green-800'
                    : evaluation.technicalAnalysis.implementationComplexity === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {evaluation.technicalAnalysis.implementationComplexity}
                </div>
                <span className="text-gray-600 text-sm">
                  {evaluation.technicalAnalysis.developmentTimeline}
                </span>
              </div>
            </div>

            {/* Popular Languages */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Popular Languages</h4>
              <div className="flex flex-wrap gap-2">
                {evaluation.technicalAnalysis.popularLanguages.map((lang, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Development Tools */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Development Tools</h4>
              <div className="flex flex-wrap gap-2">
                {evaluation.technicalAnalysis.developmentTools.map((tool, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Similar Tech Stacks */}
          {evaluation.technicalAnalysis.similarTechStacks.length > 0 && (
            <div className="mt-6 space-y-4">
              <h4 className="font-semibold text-gray-900">Similar Projects</h4>
              <div className="space-y-3">
                {evaluation.technicalAnalysis.similarTechStacks.map((project, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{project.name}</h5>
                      <div className="flex items-center gap-1 text-yellow-600">
                        <Star className="h-4 w-4" />
                        <span className="text-sm">{project.stars}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-white text-gray-700 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Research Intelligence */}
      {evaluation.researchIntelligence && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Research Intelligence</h3>
              <p className="text-gray-600">Academic papers, research trends, and key researchers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Research Trends */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Research Trends</h4>
              <div className="flex flex-wrap gap-2">
                {evaluation.researchIntelligence.researchTrends.map((trend, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                  >
                    {trend}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Researchers */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Key Researchers</h4>
              <div className="space-y-2">
                {evaluation.researchIntelligence.keyResearchers.map((researcher, index) => (
                  <div key={index} className="text-sm text-gray-700">
                    {researcher}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Research Papers */}
          {evaluation.researchIntelligence.researchPapers.length > 0 && (
            <div className="mt-6 space-y-4">
              <h4 className="font-semibold text-gray-900">Relevant Research Papers</h4>
              <div className="space-y-3">
                {evaluation.researchIntelligence.researchPapers.map((paper, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">{paper.title}</h5>
                    <p className="text-gray-600 text-sm mb-2">{paper.summary}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Authors: {paper.authors.join(', ')}</span>
                      <span>{new Date(paper.published).toLocaleDateString()}</span>
                    </div>
                    {paper.link && (
                      <a
                        href={paper.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm mt-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Paper
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Competitive Intelligence */}
      {evaluation.competitiveIntelligence && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Building2 className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Competitive Intelligence</h3>
              <p className="text-gray-600">Market landscape, competitors, and business opportunities</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Direct Competitors */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Users className="h-5 w-5 text-red-600" />
                Direct Competitors
              </h4>
              <div className="space-y-2">
                {evaluation.competitiveIntelligence.directCompetitors.map((competitor, index) => (
                  <div key={index} className="p-3 bg-red-50 rounded-lg">
                    <div className="font-medium text-gray-900">{competitor.name}</div>
                    <div className="text-sm text-gray-600">{competitor.description}</div>
                    {competitor.website && (
                      <a
                        href={competitor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm mt-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Visit Website
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Startups */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Emerging Startups
              </h4>
              <div className="space-y-2">
                {evaluation.competitiveIntelligence.startups.map((startup, index) => (
                  <div key={index} className="p-3 bg-green-50 rounded-lg">
                    <div className="font-medium text-gray-900">{startup.name}</div>
                    <div className="text-sm text-gray-600">{startup.description}</div>
                    {startup.funding && (
                      <div className="text-sm text-green-600 mt-1">
                        <DollarSign className="h-4 w-4 inline mr-1" />
                        {startup.funding}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Market Gaps */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                Market Opportunities
              </h4>
              <div className="space-y-2">
                {evaluation.competitiveIntelligence.marketGaps.map((gap, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{gap}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Funding Landscape */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Funding Landscape
              </h4>
              <div className="space-y-2">
                {evaluation.competitiveIntelligence.fundingLandscape.map((funding, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-gray-900">{funding.company}</div>
                    <div className="text-sm text-gray-600">
                      {funding.amount} • {funding.stage}
                    </div>
                    <div className="text-xs text-gray-500">{funding.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Patent Intelligence */}
      {evaluation.patentIntelligence && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Shield className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Patent Intelligence</h3>
              <p className="text-gray-600">Intellectual property landscape and patent opportunities</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Patent Landscape */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Patent Landscape</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Patents:</span>
                  <span className="font-medium">{evaluation.patentIntelligence.patentLandscape.totalPatents}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk Level:</span>
                  <span className={`font-medium ${
                    evaluation.patentIntelligence.patentLandscape.riskLevel === 'Low' 
                      ? 'text-green-600'
                      : evaluation.patentIntelligence.patentLandscape.riskLevel === 'Medium'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}>
                    {evaluation.patentIntelligence.patentLandscape.riskLevel}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Opportunities:</span>
                  <span className={`font-medium ${
                    evaluation.patentIntelligence.patentLandscape.opportunities === 'High' 
                      ? 'text-green-600'
                      : evaluation.patentIntelligence.patentLandscape.opportunities === 'Medium'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}>
                    {evaluation.patentIntelligence.patentLandscape.opportunities}
                  </span>
                </div>
              </div>
            </div>

            {/* IP Risks */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">IP Risks</h4>
              <div className="space-y-2">
                {evaluation.patentIntelligence.ipRisks.map((risk, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{risk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Patent Opportunities */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900">Patent Opportunities</h4>
              <div className="space-y-2">
                {evaluation.patentIntelligence.patentOpportunities.map((opportunity, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{opportunity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Relevant Patents */}
          {evaluation.patentIntelligence.relevantPatents.length > 0 && (
            <div className="mt-6 space-y-4">
              <h4 className="font-semibold text-gray-900">Relevant Patents</h4>
              <div className="space-y-3">
                {evaluation.patentIntelligence.relevantPatents.map((patent, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">{patent.title}</h5>
                    <p className="text-gray-600 text-sm mb-2">{patent.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Status: {patent.status}</span>
                      <span>Filed: {patent.filingDate}</span>
                    </div>
                    {patent.url && (
                      <a
                        href={patent.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm mt-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View Patent
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
