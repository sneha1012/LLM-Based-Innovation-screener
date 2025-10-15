import { InnovationIdea } from '@/types';

// Free web search APIs we can use
export class WebSearchService {
  private readonly DUCKDUCKGO_API = 'https://api.duckduckgo.com/';
  private readonly NEWS_API_KEY = process.env.NEWS_API_KEY || '';
  private readonly SERP_API_KEY = process.env.SERP_API_KEY || '';

  async searchMarketData(idea: InnovationIdea): Promise<any> {
    try {
      // Simulate web search with realistic market data
      return this.generateRealisticMarketData(idea);
    } catch (error) {
      console.error('Web search error:', error);
      return this.getFallbackData(idea);
    }
  }

  private generateRealisticMarketData(idea: InnovationIdea): any {
    const marketData = {
      marketSize: this.generateMarketSize(idea.category),
      competitors: this.generateCompetitors(idea.category),
      trends: this.generateTrends(idea.category),
      risks: this.generateRisks(idea.category),
      opportunities: this.generateOpportunities(idea.category),
      lastUpdated: new Date().toISOString(),
      source: 'simulated_web_search'
    };

    return marketData;
  }

  private generateMarketSize(category: string): string {
    const marketSizes = {
      'Technology': '$2.5T',
      'Healthcare': '$4.2T',
      'Finance': '$1.8T',
      'Education': '$6.2T',
      'Sustainability': '$1.1T',
      'Entertainment': '$2.3T',
      'Manufacturing': '$3.7T',
      'Transportation': '$1.9T',
      'Other': '$1.5T'
    };
    return marketSizes[category as keyof typeof marketSizes] || '$2.0T';
  }

  private generateCompetitors(category: string): string[] {
    const competitors = {
      'Technology': ['Microsoft', 'Google', 'Amazon', 'Apple', 'Meta'],
      'Healthcare': ['Johnson & Johnson', 'Pfizer', 'Roche', 'Novartis', 'Merck'],
      'Finance': ['JPMorgan Chase', 'Bank of America', 'Wells Fargo', 'Goldman Sachs', 'Morgan Stanley'],
      'Education': ['Coursera', 'Udemy', 'Khan Academy', 'edX', 'LinkedIn Learning'],
      'Sustainability': ['Tesla', 'First Solar', 'Vestas', 'Siemens Gamesa', 'Enphase'],
      'Entertainment': ['Netflix', 'Disney', 'Warner Bros', 'Universal', 'Sony'],
      'Manufacturing': ['General Electric', 'Siemens', 'Honeywell', '3M', 'Caterpillar'],
      'Transportation': ['Tesla', 'Uber', 'Lyft', 'Waymo', 'Cruise'],
      'Other': ['Industry Leader 1', 'Industry Leader 2', 'Industry Leader 3', 'Startup A', 'Startup B']
    };
    return competitors[category as keyof typeof competitors] || ['Competitor 1', 'Competitor 2', 'Competitor 3'];
  }

  private generateTrends(category: string): string[] {
    const trends = {
      'Technology': [
        'AI and machine learning integration',
        'Cloud computing adoption',
        'Cybersecurity focus',
        'Edge computing growth',
        'Quantum computing development'
      ],
      'Healthcare': [
        'Telemedicine expansion',
        'AI-powered diagnostics',
        'Personalized medicine',
        'Digital health platforms',
        'Precision medicine advances'
      ],
      'Finance': [
        'Digital banking transformation',
        'Cryptocurrency adoption',
        'Fintech innovation',
        'Regulatory technology (RegTech)',
        'Open banking initiatives'
      ],
      'Education': [
        'Online learning platforms',
        'AI-powered tutoring',
        'Virtual reality in education',
        'Microlearning trends',
        'Gamification in learning'
      ],
      'Sustainability': [
        'Renewable energy growth',
        'Carbon neutrality goals',
        'Circular economy models',
        'Green technology innovation',
        'ESG investing focus'
      ],
      'Entertainment': [
        'Streaming platform growth',
        'Virtual reality experiences',
        'AI-generated content',
        'Interactive entertainment',
        'Cross-platform integration'
      ],
      'Manufacturing': [
        'Industry 4.0 adoption',
        'Smart manufacturing',
        'IoT integration',
        'Automation and robotics',
        'Sustainable manufacturing'
      ],
      'Transportation': [
        'Electric vehicle adoption',
        'Autonomous vehicle development',
        'Mobility as a Service (MaaS)',
        'Smart transportation systems',
        'Sustainable mobility solutions'
      ],
      'Other': [
        'Digital transformation',
        'Customer experience focus',
        'Data-driven decision making',
        'Automation trends',
        'Innovation acceleration'
      ]
    };
    return trends[category as keyof typeof trends] || ['Trend 1', 'Trend 2', 'Trend 3'];
  }

  private generateRisks(category: string): string[] {
    const risks = {
      'Technology': [
        'Cybersecurity threats and data breaches',
        'Rapid technological obsolescence',
        'Regulatory compliance challenges',
        'Talent acquisition and retention',
        'Intellectual property disputes'
      ],
      'Healthcare': [
        'Regulatory approval delays',
        'Patient data privacy concerns',
        'High development costs',
        'Clinical trial failures',
        'Market access challenges'
      ],
      'Finance': [
        'Regulatory compliance burden',
        'Cybersecurity vulnerabilities',
        'Market volatility impact',
        'Competition from fintech',
        'Economic downturn sensitivity'
      ],
      'Education': [
        'Technology adoption barriers',
        'Quality assurance challenges',
        'Digital divide concerns',
        'Regulatory compliance',
        'Competition from traditional institutions'
      ],
      'Sustainability': [
        'High initial investment costs',
        'Regulatory uncertainty',
        'Technology scalability challenges',
        'Market adoption barriers',
        'Supply chain dependencies'
      ],
      'Entertainment': [
        'Content piracy and copyright issues',
        'Platform competition',
        'Changing consumer preferences',
        'Regulatory content restrictions',
        'Technology infrastructure costs'
      ],
      'Manufacturing': [
        'Supply chain disruptions',
        'Labor shortage challenges',
        'Technology integration costs',
        'Regulatory compliance',
        'Market demand volatility'
      ],
      'Transportation': [
        'Safety and liability concerns',
        'Regulatory approval delays',
        'Infrastructure requirements',
        'Public acceptance challenges',
        'Technology reliability issues'
      ],
      'Other': [
        'Market competition',
        'Regulatory changes',
        'Technology disruption',
        'Economic uncertainty',
        'Customer adoption challenges'
      ]
    };
    return risks[category as keyof typeof risks] || ['Risk 1', 'Risk 2', 'Risk 3'];
  }

  private generateOpportunities(category: string): string[] {
    const opportunities = {
      'Technology': [
        'AI and automation integration',
        'Cloud computing expansion',
        'IoT device proliferation',
        '5G network deployment',
        'Edge computing growth'
      ],
      'Healthcare': [
        'Telemedicine market expansion',
        'AI-powered diagnostic tools',
        'Personalized medicine development',
        'Digital health platform growth',
        'Precision medicine advances'
      ],
      'Finance': [
        'Digital banking transformation',
        'Cryptocurrency mainstream adoption',
        'Fintech innovation opportunities',
        'Open banking ecosystem',
        'RegTech solutions demand'
      ],
      'Education': [
        'Online learning platform growth',
        'AI-powered personalized learning',
        'Virtual reality education tools',
        'Microlearning content creation',
        'Corporate training market expansion'
      ],
      'Sustainability': [
        'Renewable energy market growth',
        'Carbon credit trading opportunities',
        'Green technology innovation',
        'Sustainable business model adoption',
        'ESG investment growth'
      ],
      'Entertainment': [
        'Streaming platform expansion',
        'Virtual reality entertainment',
        'AI-generated content creation',
        'Interactive media experiences',
        'Cross-platform content distribution'
      ],
      'Manufacturing': [
        'Smart manufacturing adoption',
        'IoT integration opportunities',
        'Automation and robotics growth',
        'Sustainable manufacturing practices',
        'Supply chain optimization'
      ],
      'Transportation': [
        'Electric vehicle market growth',
        'Autonomous vehicle development',
        'Mobility as a Service expansion',
        'Smart city transportation',
        'Sustainable mobility solutions'
      ],
      'Other': [
        'Digital transformation opportunities',
        'Customer experience innovation',
        'Data analytics applications',
        'Process automation potential',
        'Market expansion possibilities'
      ]
    };
    return opportunities[category as keyof typeof opportunities] || ['Opportunity 1', 'Opportunity 2', 'Opportunity 3'];
  }

  private async performSearch(query: string): Promise<any> {
    try {
      // Using DuckDuckGo Instant Answer API (free)
      const response = await fetch(
        `${this.DUCKDUCKGO_API}?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`
      );
      
      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      return this.parseDuckDuckGoResults(data);
    } catch (error) {
      console.error('Search error:', error);
      return null;
    }
  }

  private parseDuckDuckGoResults(data: any): any {
    return {
      abstract: data.Abstract || '',
      definition: data.Definition || '',
      relatedTopics: data.RelatedTopics?.slice(0, 5) || [],
      answer: data.Answer || '',
      infobox: data.Infobox || null
    };
  }

  private aggregateSearchResults(results: any[], idea: InnovationIdea): any {
    const marketData = {
      marketSize: this.extractMarketSize(results),
      competitors: this.extractCompetitors(results),
      trends: this.extractTrends(results),
      risks: this.extractRisks(results),
      opportunities: this.extractOpportunities(results),
      lastUpdated: new Date().toISOString()
    };

    return marketData;
  }

  private extractMarketSize(results: any[]): string {
    for (const result of results) {
      if (result?.abstract) {
        const marketMatch = result.abstract.match(/\$[\d.]+[BbMmKk]?/g);
        if (marketMatch) {
          return marketMatch[0];
        }
      }
    }
    return 'Market size data not available';
  }

  private extractCompetitors(results: any[]): string[] {
    const competitors = new Set<string>();
    
    for (const result of results) {
      if (result?.relatedTopics) {
        result.relatedTopics.forEach((topic: any) => {
          if (topic.Text && topic.Text.length < 50) {
            competitors.add(topic.Text);
          }
        });
      }
    }
    
    return Array.from(competitors).slice(0, 5);
  }

  private extractTrends(results: any[]): string[] {
    const trends = [];
    for (const result of results) {
      if (result?.abstract && result.abstract.includes('trend')) {
        trends.push(result.abstract.substring(0, 200));
      }
    }
    return trends.slice(0, 3);
  }

  private extractRisks(results: any[]): string[] {
    const risks = [];
    for (const result of results) {
      if (result?.abstract && (result.abstract.includes('risk') || result.abstract.includes('challenge'))) {
        risks.push(result.abstract.substring(0, 200));
      }
    }
    return risks.slice(0, 3);
  }

  private extractOpportunities(results: any[]): string[] {
    const opportunities = [];
    for (const result of results) {
      if (result?.abstract && (result.abstract.includes('opportunity') || result.abstract.includes('growth'))) {
        opportunities.push(result.abstract.substring(0, 200));
      }
    }
    return opportunities.slice(0, 3);
  }

  private getFallbackData(idea: InnovationIdea): any {
    return {
      marketSize: 'Data not available',
      competitors: ['Competitor analysis pending'],
      trends: ['Market trends analysis pending'],
      risks: ['Risk assessment pending'],
      opportunities: ['Opportunity analysis pending'],
      lastUpdated: new Date().toISOString(),
      source: 'fallback'
    };
  }
}

export const webSearchService = new WebSearchService();
