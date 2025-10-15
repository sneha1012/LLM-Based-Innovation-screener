import { InnovationIdea } from '@/types';

export class RealWebSearchService {
  private readonly GOOGLE_SEARCH_API_KEY = process.env.GOOGLE_SEARCH_API_KEY || '';
  private readonly GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
  private readonly SERP_API_KEY = process.env.SERP_API_KEY || '';

  async searchComprehensiveProductData(idea: InnovationIdea): Promise<any> {
    try {
      const [
        marketData,
        techStackData,
        researchPapers,
        competitiveData,
        patentData
      ] = await Promise.all([
        this.searchMarketData(idea),
        this.searchTechStackData(idea),
        this.searchResearchPapers(idea),
        this.searchCompetitiveData(idea),
        this.searchPatentData(idea)
      ]);

      return {
        marketData,
        techStackData,
        researchPapers,
        competitiveData,
        patentData,
        lastUpdated: new Date().toISOString(),
        source: 'real_web_search'
      };
    } catch (error) {
      console.error('Real web search error:', error);
      return this.getFallbackData(idea);
    }
  }

  private async searchMarketData(idea: InnovationIdea): Promise<any> {
    // Use Google Custom Search API for real market data
    const searchQueries = [
      `${idea.title} market size 2024`,
      `${idea.category} industry trends`,
      `${idea.title} market analysis`,
      `${idea.title} industry report`
    ];

    const results = await Promise.all(
      searchQueries.map(query => this.performGoogleSearch(query))
    );

    return this.aggregateMarketData(results, idea);
  }

  private async searchTechStackData(idea: InnovationIdea): Promise<any> {
    // Search GitHub for similar projects and tech stacks
    const techQueries = [
      `${idea.title} github`,
      `${idea.category} tech stack`,
      `${idea.title} open source`,
      `${idea.category} technology stack`
    ];

    const results = await Promise.all(
      techQueries.map(query => this.searchGitHub(query))
    );

    return this.aggregateTechStackData(results, idea);
  }

  private async searchResearchPapers(idea: InnovationIdea): Promise<any> {
    // Search ArXiv for relevant research papers
    const researchQueries = [
      `${idea.title}`,
      `${idea.category} AI`,
      `${idea.category} machine learning`,
      `${idea.category} technology`
    ];

    const results = await Promise.all(
      researchQueries.map(query => this.searchArXiv(query))
    );

    return this.aggregateResearchData(results, idea);
  }

  private async searchCompetitiveData(idea: InnovationIdea): Promise<any> {
    // Search for competitors and similar products
    const competitiveQueries = [
      `${idea.title} competitors`,
      `${idea.title} similar products`,
      `${idea.category} startups`,
      `${idea.title} companies`
    ];

    const results = await Promise.all(
      competitiveQueries.map(query => this.performGoogleSearch(query))
    );

    return this.aggregateCompetitiveData(results, idea);
  }

  private async searchPatentData(idea: InnovationIdea): Promise<any> {
    // Search for relevant patents
    const patentQueries = [
      `${idea.title} patent`,
      `${idea.category} patent`,
      `${idea.title} intellectual property`
    ];

    const results = await Promise.all(
      patentQueries.map(query => this.performGoogleSearch(query))
    );

    return this.aggregatePatentData(results, idea);
  }

  private async performGoogleSearch(query: string): Promise<any> {
    try {
      if (!this.GOOGLE_SEARCH_API_KEY) {
        return this.getFallbackSearchResult(query);
      }

      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${this.GOOGLE_SEARCH_API_KEY}&cx=${process.env.GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}&num=5`
      );

      if (!response.ok) {
        throw new Error('Google Search API failed');
      }

      const data = await response.json();
      console.log(`Google Search for "${query}" returned ${data.items?.length || 0} results`);
      return this.parseGoogleSearchResults(data);
    } catch (error) {
      console.error('Google Search error:', error);
      return this.getFallbackSearchResult(query);
    }
  }

  private async searchGitHub(query: string): Promise<any> {
    try {
      if (!this.GITHUB_TOKEN) {
        return this.getFallbackGitHubResult(query);
      }

      const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=10`,
        {
          headers: {
            'Authorization': `token ${this.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      if (!response.ok) {
        throw new Error('GitHub API failed');
      }

      const data = await response.json();
      return this.parseGitHubResults(data);
    } catch (error) {
      console.error('GitHub Search error:', error);
      return this.getFallbackGitHubResult(query);
    }
  }

  private async searchArXiv(query: string): Promise<any> {
    try {
      const response = await fetch(
        `https://export.arxiv.org/api/query?search_query=${encodeURIComponent(query)}&start=0&max_results=10&sortBy=relevance&sortOrder=descending`
      );

      if (!response.ok) {
        throw new Error('ArXiv API failed');
      }

      const data = await response.text();
      console.log(`ArXiv search for "${query}" completed`);
      return this.parseArXivResults(data);
    } catch (error) {
      console.error('ArXiv Search error:', error);
      return this.getFallbackArXivResult(query);
    }
  }

  private parseGoogleSearchResults(data: any): any {
    return {
      items: data.items?.slice(0, 5) || [],
      totalResults: data.searchInformation?.totalResults || '0',
      searchTime: data.searchInformation?.searchTime || '0'
    };
  }

  private parseGitHubResults(data: any): any {
    return {
      repositories: data.items?.map((repo: any) => ({
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        stars: repo.stargazers_count,
        language: repo.language,
        url: repo.html_url,
        topics: repo.topics || []
      })) || [],
      totalCount: data.total_count || 0
    };
  }

  private parseArXivResults(data: string): any {
    // Parse ArXiv XML response
    const papers = [];
    const entries = data.match(/<entry>[\s\S]*?<\/entry>/g) || [];
    
    entries.forEach(entry => {
      const title = entry.match(/<title>([^<]*)<\/title>/)?.[1] || '';
      const summary = entry.match(/<summary>([^<]*)<\/summary>/)?.[1] || '';
      const authors = entry.match(/<author>[\s\S]*?<name>([^<]*)<\/name>[\s\S]*?<\/author>/g)?.map(author => 
        author.match(/<name>([^<]*)<\/name>/)?.[1] || ''
      ) || [];
      const published = entry.match(/<published>([^<]*)<\/published>/)?.[1] || '';
      const link = entry.match(/<id>([^<]*)<\/id>/)?.[1] || '';

      papers.push({
        title,
        summary,
        authors,
        published,
        link
      });
    });

    return { papers };
  }

  private aggregateMarketData(results: any[], idea: InnovationIdea): any {
    const marketSize = this.extractMarketSize(results);
    const competitors = this.extractCompetitors(results);
    const trends = this.extractTrends(results);
    const opportunities = this.extractOpportunities(results);
    const risks = this.extractRisks(results);

    return {
      marketSize,
      competitors,
      trends,
      opportunities,
      risks,
      source: 'google_search'
    };
  }

  private aggregateTechStackData(results: any[], idea: InnovationIdea): any {
    const repositories = results.flatMap(r => r.repositories || []);
    const languages = this.extractLanguages(repositories);
    const frameworks = this.extractFrameworks(repositories);
    const tools = this.extractTools(repositories);
    const similarProjects = this.findSimilarProjects(repositories, idea);

    return {
      recommendedTechStack: this.recommendTechStack(idea, languages, frameworks),
      similarTechStacks: this.findSimilarTechStacks(repositories),
      openSourceProjects: similarProjects,
      popularLanguages: languages,
      popularFrameworks: frameworks,
      developmentTools: tools,
      source: 'github_search'
    };
  }

  private aggregateResearchData(results: any[], idea: InnovationIdea): any {
    const papers = results.flatMap(r => r.papers || []);
    const recentPapers = papers.filter(p => this.isRecentPaper(p.published));
    const relevantPapers = this.filterRelevantPapers(papers, idea);

    return {
      researchPapers: relevantPapers,
      recentPapers,
      researchTrends: this.extractResearchTrends(papers),
      keyResearchers: this.extractKeyResearchers(papers),
      source: 'arxiv_search'
    };
  }

  private aggregateCompetitiveData(results: any[], idea: InnovationIdea): any {
    const competitors = this.extractCompetitors(results);
    const startups = this.extractStartups(results);
    const companies = this.extractCompanies(results);
    const funding = this.extractFundingData(results);

    return {
      directCompetitors: competitors,
      indirectCompetitors: this.findIndirectCompetitors(competitors, idea),
      startups: startups,
      marketLeaders: companies,
      fundingLandscape: funding,
      marketGaps: this.identifyMarketGaps(competitors, idea),
      source: 'competitive_search'
    };
  }

  private aggregatePatentData(results: any[], idea: InnovationIdea): any {
    const patents = this.extractPatents(results);
    const patentLandscape = this.analyzePatentLandscape(patents, idea);

    return {
      relevantPatents: patents,
      patentLandscape,
      ipRisks: this.assessIPRisks(patents, idea),
      patentOpportunities: this.identifyPatentOpportunities(patents, idea),
      source: 'patent_search'
    };
  }

  // Helper methods for data extraction and analysis
  private extractMarketSize(results: any[]): string {
    for (const result of results) {
      for (const item of result.items || []) {
        const text = `${item.title} ${item.snippet}`.toLowerCase();
        const marketMatch = text.match(/\$[\d.]+[BbMmKk]?/g);
        if (marketMatch) {
          return marketMatch[0];
        }
      }
    }
    return 'Market size data not available';
  }

  private extractCompetitors(results: any[]): any[] {
    const competitors = [];
    
    for (const result of results) {
      for (const item of result.items || []) {
        const text = `${item.title} ${item.snippet}`;
        
        // Look for specific competitor patterns
        if (text.toLowerCase().includes('competitor') || 
            text.toLowerCase().includes('alternative') ||
            text.toLowerCase().includes('similar to') ||
            text.toLowerCase().includes('like')) {
          
          // Extract company names and descriptions
          const companyMatches = text.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g);
          if (companyMatches) {
            companyMatches.forEach(company => {
              if (company.length > 3 && company.length < 50 && 
                  !company.toLowerCase().includes('the') &&
                  !company.toLowerCase().includes('and') &&
                  !company.toLowerCase().includes('for')) {
                competitors.push({
                  name: company,
                  description: item.snippet?.substring(0, 150) + '...' || 'Competitor in the market',
                  website: item.link || ''
                });
              }
            });
          }
        }
      }
    }
    
    // Remove duplicates and return top 5
    const uniqueCompetitors = competitors.filter((comp, index, self) => 
      index === self.findIndex(c => c.name === comp.name)
    );
    
    return uniqueCompetitors.slice(0, 5);
  }

  private extractTrends(results: any[]): string[] {
    const trends = [];
    for (const result of results) {
      for (const item of result.items || []) {
        const text = item.snippet || '';
        if (text.toLowerCase().includes('trend') || text.toLowerCase().includes('growth')) {
          trends.push(text.substring(0, 200));
        }
      }
    }
    return trends.slice(0, 5);
  }

  private extractOpportunities(results: any[]): string[] {
    const opportunities = [];
    for (const result of results) {
      for (const item of result.items || []) {
        const text = item.snippet || '';
        if (text.toLowerCase().includes('opportunity') || text.toLowerCase().includes('potential')) {
          opportunities.push(text.substring(0, 200));
        }
      }
    }
    return opportunities.slice(0, 5);
  }

  private extractRisks(results: any[]): string[] {
    const risks = [];
    for (const result of results) {
      for (const item of result.items || []) {
        const text = item.snippet || '';
        if (text.toLowerCase().includes('risk') || text.toLowerCase().includes('challenge')) {
          risks.push(text.substring(0, 200));
        }
      }
    }
    return risks.slice(0, 5);
  }

  private extractLanguages(repositories: any[]): string[] {
    const languages = new Map<string, number>();
    
    repositories.forEach(repo => {
      if (repo.language) {
        languages.set(repo.language, (languages.get(repo.language) || 0) + 1);
      }
    });
    
    return Array.from(languages.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([lang]) => lang);
  }

  private extractFrameworks(repositories: any[]): string[] {
    const frameworks = new Set<string>();
    
    repositories.forEach(repo => {
      if (repo.topics) {
        repo.topics.forEach((topic: string) => {
          if (this.isFramework(topic)) {
            frameworks.add(topic);
          }
        });
      }
    });
    
    return Array.from(frameworks).slice(0, 10);
  }

  private extractTools(repositories: any[]): string[] {
    const tools = new Set<string>();
    
    repositories.forEach(repo => {
      if (repo.topics) {
        repo.topics.forEach((topic: string) => {
          if (this.isTool(topic)) {
            tools.add(topic);
          }
        });
      }
    });
    
    return Array.from(tools).slice(0, 10);
  }

  private findSimilarProjects(repositories: any[], idea: InnovationIdea): any[] {
    return repositories
      .filter(repo => this.isSimilarProject(repo, idea))
      .slice(0, 5);
  }

  private recommendTechStack(idea: InnovationIdea, languages: string[], frameworks: string[]): string[] {
    const recommendations = [];
    
    // AI/ML projects
    if (idea.title.toLowerCase().includes('ai') || idea.title.toLowerCase().includes('machine learning')) {
      recommendations.push('Python', 'TensorFlow', 'PyTorch', 'scikit-learn');
    }
    
    // Web applications
    if (idea.category === 'Technology' || idea.title.toLowerCase().includes('app')) {
      recommendations.push('React', 'Node.js', 'TypeScript', 'PostgreSQL');
    }
    
    // Mobile apps
    if (idea.title.toLowerCase().includes('mobile') || idea.title.toLowerCase().includes('app')) {
      recommendations.push('React Native', 'Flutter', 'Swift', 'Kotlin');
    }
    
    // Add popular languages and frameworks
    recommendations.push(...languages.slice(0, 3));
    recommendations.push(...frameworks.slice(0, 3));
    
    return [...new Set(recommendations)].slice(0, 10);
  }

  private findSimilarTechStacks(repositories: any[]): any[] {
    return repositories
      .map(repo => ({
        name: repo.name,
        techStack: [repo.language, ...(repo.topics || [])].filter(Boolean),
        stars: repo.stars,
        description: repo.description
      }))
      .slice(0, 5);
  }

  private filterRelevantPapers(papers: any[], idea: InnovationIdea): any[] {
    return papers
      .filter(paper => this.isRelevantPaper(paper, idea))
      .slice(0, 5);
  }

  private isRecentPaper(published: string): boolean {
    const publishedDate = new Date(published);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return publishedDate > oneYearAgo;
  }

  private extractResearchTrends(papers: any[]): string[] {
    const trends = new Map<string, number>();
    
    papers.forEach(paper => {
      const words = paper.title.toLowerCase().split(' ');
      words.forEach(word => {
        if (word.length > 4) {
          trends.set(word, (trends.get(word) || 0) + 1);
        }
      });
    });
    
    return Array.from(trends.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([trend]) => trend);
  }

  private extractKeyResearchers(papers: any[]): string[] {
    const researchers = new Map<string, number>();
    
    papers.forEach(paper => {
      paper.authors.forEach((author: string) => {
        researchers.set(author, (researchers.get(author) || 0) + 1);
      });
    });
    
    return Array.from(researchers.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([researcher]) => researcher);
  }

  private extractStartups(results: any[]): string[] {
    const startups = new Set<string>();
    
    for (const result of results) {
      for (const item of result.items || []) {
        const text = `${item.title} ${item.snippet}`;
        if (text.toLowerCase().includes('startup') || text.toLowerCase().includes('founded')) {
          const companyMatches = text.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g);
          if (companyMatches) {
            companyMatches.forEach(company => {
              if (company.length > 3 && company.length < 50) {
                startups.add(company);
              }
            });
          }
        }
      }
    }
    
    return Array.from(startups).slice(0, 5);
  }

  private extractCompanies(results: any[]): string[] {
    const companies = new Set<string>();
    
    for (const result of results) {
      for (const item of result.items || []) {
        const text = `${item.title} ${item.snippet}`;
        if (text.toLowerCase().includes('company') || text.toLowerCase().includes('corporation')) {
          const companyMatches = text.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g);
          if (companyMatches) {
            companyMatches.forEach(company => {
              if (company.length > 3 && company.length < 50) {
                companies.add(company);
              }
            });
          }
        }
      }
    }
    
    return Array.from(companies).slice(0, 5);
  }

  private extractFundingData(results: any[]): any[] {
    const funding = [];
    
    for (const result of results) {
      for (const item of result.items || []) {
        const text = `${item.title} ${item.snippet}`;
        if (text.toLowerCase().includes('funding') || text.toLowerCase().includes('investment')) {
          const amountMatch = text.match(/\$[\d.]+[BbMmKk]?/g);
          if (amountMatch) {
            funding.push({
              amount: amountMatch[0],
              description: text.substring(0, 200)
            });
          }
        }
      }
    }
    
    return funding.slice(0, 5);
  }

  private findIndirectCompetitors(competitors: string[], idea: InnovationIdea): string[] {
    // Simple logic to find indirect competitors
    return competitors.slice(3, 8);
  }

  private identifyMarketGaps(competitors: string[], idea: InnovationIdea): string[] {
    return [
      'Underserved market segments',
      'Technology gaps in current solutions',
      'User experience improvements needed',
      'Integration opportunities',
      'Pricing model innovations'
    ];
  }

  private extractPatents(results: any[]): any[] {
    const patents = [];
    
    for (const result of results) {
      for (const item of result.items || []) {
        const text = `${item.title} ${item.snippet}`;
        if (text.toLowerCase().includes('patent') || text.toLowerCase().includes('intellectual property')) {
          patents.push({
            title: item.title,
            description: item.snippet,
            url: item.link
          });
        }
      }
    }
    
    return patents.slice(0, 5);
  }

  private analyzePatentLandscape(patents: any[], idea: InnovationIdea): any {
    return {
      totalPatents: patents.length,
      riskLevel: patents.length > 3 ? 'High' : 'Low',
      opportunities: patents.length < 2 ? 'High' : 'Low'
    };
  }

  private assessIPRisks(patents: any[], idea: InnovationIdea): string[] {
    return [
      'Patent infringement risks',
      'Trademark conflicts',
      'Trade secret protection needed',
      'Licensing requirements'
    ];
  }

  private identifyPatentOpportunities(patents: any[], idea: InnovationIdea): string[] {
    return [
      'Novel technology patent opportunities',
      'Process improvement patents',
      'Design patent possibilities',
      'Defensive patent strategy'
    ];
  }

  // Helper methods for classification
  private isFramework(topic: string): boolean {
    const frameworks = ['react', 'vue', 'angular', 'django', 'flask', 'express', 'spring', 'laravel'];
    return frameworks.includes(topic.toLowerCase());
  }

  private isTool(topic: string): boolean {
    const tools = ['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'jenkins', 'gitlab', 'github'];
    return tools.includes(topic.toLowerCase());
  }

  private isSimilarProject(repo: any, idea: InnovationIdea): boolean {
    const title = idea.title.toLowerCase();
    const description = repo.description?.toLowerCase() || '';
    const name = repo.name.toLowerCase();
    
    return title.includes(name) || 
           name.includes(title.split(' ')[0]) || 
           description.includes(title.split(' ')[0]);
  }

  private isRelevantPaper(paper: any, idea: InnovationIdea): boolean {
    const title = idea.title.toLowerCase();
    const paperTitle = paper.title.toLowerCase();
    const paperSummary = paper.summary.toLowerCase();
    
    return paperTitle.includes(title.split(' ')[0]) || 
           paperSummary.includes(title.split(' ')[0]) ||
           paperTitle.includes(idea.category.toLowerCase());
  }

  // Fallback methods
  private getFallbackData(idea: InnovationIdea): any {
    return {
      marketData: {
        marketSize: '$2.5T',
        competitors: ['Competitor 1', 'Competitor 2', 'Competitor 3'],
        trends: ['AI integration', 'Digital transformation', 'Market growth'],
        opportunities: ['Market expansion', 'Innovation potential', 'Customer demand'],
        risks: ['Competition', 'Regulatory challenges', 'Technology adoption'],
        source: 'fallback'
      },
      techStackData: {
        recommendedTechStack: ['Python', 'React', 'Node.js', 'PostgreSQL'],
        similarTechStacks: [],
        openSourceProjects: [],
        popularLanguages: ['Python', 'JavaScript', 'TypeScript'],
        popularFrameworks: ['React', 'Django', 'Express'],
        developmentTools: ['Docker', 'Git', 'VS Code'],
        source: 'fallback'
      },
      researchPapers: {
        researchPapers: [],
        recentPapers: [],
        researchTrends: ['AI', 'Machine Learning', 'Deep Learning'],
        keyResearchers: ['Researcher 1', 'Researcher 2'],
        source: 'fallback'
      },
      competitiveData: {
        directCompetitors: ['Competitor 1', 'Competitor 2'],
        indirectCompetitors: ['Competitor 3', 'Competitor 4'],
        startups: ['Startup 1', 'Startup 2'],
        marketLeaders: ['Company 1', 'Company 2'],
        fundingLandscape: [],
        marketGaps: ['Gap 1', 'Gap 2'],
        source: 'fallback'
      },
      patentData: {
        relevantPatents: [],
        patentLandscape: { totalPatents: 0, riskLevel: 'Low', opportunities: 'High' },
        ipRisks: ['Low risk'],
        patentOpportunities: ['High opportunity'],
        source: 'fallback'
      },
      lastUpdated: new Date().toISOString(),
      source: 'fallback'
    };
  }

  private getFallbackSearchResult(query: string): any {
    return {
      items: [],
      totalResults: '0',
      searchTime: '0'
    };
  }

  private getFallbackGitHubResult(query: string): any {
    return {
      repositories: [],
      totalCount: 0
    };
  }

  private getFallbackArXivResult(query: string): any {
    return {
      papers: []
    };
  }
}

export const realWebSearchService = new RealWebSearchService();
