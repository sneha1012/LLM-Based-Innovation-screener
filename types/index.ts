export interface InnovationIdea {
  id: string;
  title: string;
  description: string;
  category: string;
  submittedAt: Date;
  status: 'pending' | 'analyzing' | 'completed' | 'error';
}

export interface EvaluationCriteria {
  innovationPotential: number; // 0-100
  feasibility: number; // 0-100
  marketReadiness: number; // 0-100
  scalability: number; // 0-100
  riskLevel: number; // 0-100 (lower is better)
}

export interface EvaluationResult {
  id: string;
  ideaId: string;
  overallScore: number; // 0-100
  criteria: EvaluationCriteria;
  detailedAnalysis: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
    recommendations: string[];
  };
  performanceMetrics: {
    responseTime: number; // milliseconds
    promptLength: number; // characters
    tokenUsage: number;
    cost: number;
  };
  generatedAt: Date;
  marketData?: {
    marketSize: string;
    competitors: string[];
    trends: string[];
    risks: string[];
    opportunities: string[];
    lastUpdated: string;
    source?: string;
  };
  technicalAnalysis?: {
    recommendedTechStack: string[];
    similarTechStacks: TechStack[];
    openSourceProjects: GitHubProject[];
    popularLanguages: string[];
    popularFrameworks: string[];
    developmentTools: string[];
    implementationComplexity: 'Low' | 'Medium' | 'High';
    developmentTimeline: string;
    requiredSkills: string[];
    source: string;
  };
  researchIntelligence?: {
    researchPapers: ResearchPaper[];
    recentPapers: ResearchPaper[];
    researchTrends: string[];
    keyResearchers: string[];
    source: string;
  };
  competitiveIntelligence?: {
    directCompetitors: Company[];
    indirectCompetitors: Company[];
    startups: Company[];
    marketLeaders: Company[];
    fundingLandscape: FundingRound[];
    marketGaps: string[];
    source: string;
  };
  patentIntelligence?: {
    relevantPatents: Patent[];
    patentLandscape: PatentLandscape;
    ipRisks: string[];
    patentOpportunities: string[];
    source: string;
  };
}

export interface TechStack {
  name: string;
  techStack: string[];
  stars: number;
  description: string;
}

export interface GitHubProject {
  name: string;
  fullName: string;
  description: string;
  stars: number;
  language: string;
  url: string;
  topics: string[];
}

export interface ResearchPaper {
  title: string;
  summary: string;
  authors: string[];
  published: string;
  link: string;
}

export interface Company {
  name: string;
  description: string;
  website: string;
  funding?: string;
  employees?: string;
  founded?: string;
}

export interface FundingRound {
  company: string;
  amount: string;
  stage: string;
  date: string;
  investors: string[];
}

export interface Patent {
  title: string;
  description: string;
  url: string;
  status: string;
  filingDate: string;
}

export interface PatentLandscape {
  totalPatents: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  opportunities: 'Low' | 'Medium' | 'High';
}

export interface PerformanceTest {
  id: string;
  promptLength: number;
  responseTime: number;
  accuracy: number;
  cost: number;
  timestamp: Date;
}

export interface EvaluationMethod {
  id: string;
  name: string;
  description: string;
  weight: number; // 0-1
  enabled: boolean;
}

export interface AppConfig {
  evaluationMethods: EvaluationMethod[];
  performanceTesting: {
    enabled: boolean;
    testPromptLengths: number[];
    maxConcurrentTests: number;
  };
  geminiConfig: {
    model: string;
    temperature: number;
    maxTokens: number;
  };
}

export interface PromptTestResult {
  promptLength: number;
  responseTime: number;
  accuracy: number;
  cost: number;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  timestamp: Date;
}

export interface DashboardStats {
  totalIdeas: number;
  completedEvaluations: number;
  averageScore: number;
  performanceTests: number;
  totalCost: number;
  averageResponseTime: number;
}
