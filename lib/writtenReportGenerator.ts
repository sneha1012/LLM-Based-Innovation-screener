import { EvaluationResult, InnovationIdea } from '@/types';

export class WrittenReportGenerator {
  async generateWrittenReport(idea: InnovationIdea, evaluation: EvaluationResult): Promise<Blob> {
    try {
      console.log('Generating written report for:', idea.title);
      
      const reportContent = this.createWrittenReport(idea, evaluation);
      console.log('Generated written report content length:', reportContent.length);
      
      const blob = new Blob([reportContent], { type: 'text/html' });
      console.log('Created report blob with size:', blob.size);
      
      return blob;
    } catch (error) {
      console.error('Error in generateWrittenReport:', error);
      throw error;
    }
  }

  private createWrittenReport(idea: InnovationIdea, evaluation: EvaluationResult): string {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Innovation Research Report - ${idea.title}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.8;
            color: #2d3748;
            background: #ffffff;
            font-size: 16px;
        }
        
        .document {
            max-width: 8.5in;
            margin: 0 auto;
            padding: 1in;
            background: white;
        }
        
        .header {
            text-align: center;
            margin-bottom: 3rem;
            padding-bottom: 2rem;
            border-bottom: 3px solid #003631;
        }
        
        .title {
            font-family: 'Playfair Display', serif;
            font-size: 2.8rem;
            font-weight: 700;
            color: #003631;
            margin-bottom: 1rem;
            line-height: 1.2;
        }
        
        .subtitle {
            font-size: 1.3rem;
            color: #4a5568;
            font-weight: 400;
            margin-bottom: 1.5rem;
        }
        
        .meta-info {
            display: flex;
            justify-content: space-between;
            margin-top: 1.5rem;
            font-size: 1rem;
            color: #718096;
            background: #f7fafc;
            padding: 1rem;
            border-radius: 8px;
        }
        
        .section {
            margin-bottom: 3rem;
            page-break-inside: avoid;
        }
        
        .section-title {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            font-weight: 600;
            color: #003631;
            margin-bottom: 1.5rem;
            padding-bottom: 0.8rem;
            border-bottom: 2px solid #FFEDA8;
        }
        
        .subsection-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            font-weight: 600;
            color: #2d3748;
            margin: 2rem 0 1rem 0;
        }
        
        .paragraph {
            margin-bottom: 1.5rem;
            text-align: justify;
            font-size: 1.1rem;
            line-height: 1.8;
        }
        
        .highlight-box {
            background: linear-gradient(135deg, #FFEDA8 0%, #fef5e7 100%);
            padding: 2rem;
            border-radius: 12px;
            border-left: 5px solid #003631;
            margin: 2rem 0;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .highlight-box h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.4rem;
            color: #003631;
            margin-bottom: 1rem;
        }
        
        .score-display {
            display: flex;
            align-items: center;
            gap: 2rem;
            margin: 2rem 0;
            padding: 2rem;
            background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
            border-radius: 12px;
            border: 2px solid #e2e8f0;
        }
        
        .score-number {
            font-family: 'Playfair Display', serif;
            font-size: 4rem;
            font-weight: 700;
            color: #003631;
        }
        
        .score-details {
            flex: 1;
        }
        
        .score-label {
            font-size: 1.3rem;
            color: #2d3748;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .score-description {
            font-size: 1.1rem;
            color: #4a5568;
            line-height: 1.6;
        }
        
        .company-list {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 1.5rem;
            margin: 1.5rem 0;
        }
        
        .company-item {
            padding: 1rem 0;
            border-bottom: 1px solid #f1f5f9;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .company-item:last-child {
            border-bottom: none;
        }
        
        .company-name {
            font-weight: 600;
            color: #003631;
            font-size: 1.1rem;
        }
        
        .company-description {
            color: #4a5568;
            font-size: 1rem;
            margin-top: 0.3rem;
        }
        
        .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 0.8rem;
            margin: 1.5rem 0;
        }
        
        .tech-tag {
            background: #003631;
            color: #FFEDA8;
            padding: 0.5rem 1rem;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 500;
        }
        
        .research-paper {
            background: #f8fafc;
            border-left: 4px solid #003631;
            padding: 1.5rem;
            margin: 1.5rem 0;
            border-radius: 0 8px 8px 0;
        }
        
        .research-title {
            font-weight: 600;
            color: #003631;
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
        }
        
        .research-authors {
            color: #4a5568;
            font-size: 0.9rem;
            margin-bottom: 0.8rem;
        }
        
        .research-summary {
            color: #2d3748;
            line-height: 1.6;
        }
        
        .recommendations {
            background: linear-gradient(135deg, #FFEDA8 0%, #fef5e7 100%);
            padding: 2rem;
            border-radius: 12px;
            border-left: 5px solid #003631;
            margin: 2rem 0;
        }
        
        .recommendations h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.4rem;
            color: #003631;
            margin-bottom: 1.5rem;
        }
        
        .recommendations ul {
            list-style: none;
            padding: 0;
        }
        
        .recommendations li {
            padding: 0.8rem 0;
            border-bottom: 1px solid rgba(0, 54, 49, 0.1);
            position: relative;
            padding-left: 2rem;
            font-size: 1.1rem;
            line-height: 1.6;
        }
        
        .recommendations li:before {
            content: "→";
            color: #003631;
            font-weight: bold;
            position: absolute;
            left: 0;
            font-size: 1.2rem;
        }
        
        .footer {
            margin-top: 4rem;
            padding-top: 2rem;
            border-top: 2px solid #e2e8f0;
            text-align: center;
            color: #718096;
            font-size: 0.9rem;
        }
        
        @media print {
            body { font-size: 14px; }
            .document { padding: 0.5in; }
            .section { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="document">
        <!-- Header -->
        <div class="header">
            <h1 class="title">Innovation Research Report</h1>
            <p class="subtitle">Comprehensive Analysis of "${idea.title}"</p>
            <div class="meta-info">
                <span><strong>Innovation Category:</strong> ${idea.category}</span>
                <span><strong>Analysis Date:</strong> ${currentDate}</span>
                <span><strong>Report Type:</strong> Business Intelligence Assessment</span>
            </div>
        </div>

        <!-- Executive Summary -->
        <div class="section">
            <h2 class="section-title">Executive Summary</h2>
            <div class="score-display">
                <div class="score-number">${evaluation.overallScore}</div>
                <div class="score-details">
                    <div class="score-label">Overall Innovation Score</div>
                    <div class="score-description">
                        ${this.getScoreDescription(evaluation.overallScore)} This comprehensive analysis evaluates the innovation potential of "${idea.title}" across multiple business intelligence dimensions, providing strategic insights for decision-making, market positioning, and investment considerations.
                    </div>
                </div>
            </div>
            
            <p class="paragraph">
                The proposed innovation "${idea.title}" represents a significant opportunity in the ${idea.category} sector. This detailed analysis examines the technical feasibility, market potential, competitive landscape, and strategic implications of bringing this concept to market. Our evaluation framework considers multiple dimensions including innovation potential, technical feasibility, market readiness, scalability, and risk assessment.
            </p>
            
            <p class="paragraph">
                Based on our comprehensive analysis, this innovation shows ${this.getRecommendationText(evaluation.overallScore)}. The following sections provide detailed insights into the technical implementation, market opportunities, competitive positioning, and strategic recommendations for successful development and deployment.
            </p>
        </div>

        <!-- Project Description -->
        <div class="section">
            <h2 class="section-title">Project Description & Technical Overview</h2>
            
            <h3 class="subsection-title">Innovation Concept</h3>
            <p class="paragraph">
                ${idea.description}
            </p>
            
            <h3 class="subsection-title">Technical Implementation Approach</h3>
            <p class="paragraph">
                The technical implementation of "${idea.title}" requires a comprehensive approach that balances innovation with practical feasibility. Based on our analysis, the recommended technology stack includes:
            </p>
            
            <div class="tech-stack">
                ${evaluation.technicalAnalysis?.recommendedTechStack.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('') || '<span class="tech-tag">Modern Web Technologies</span><span class="tech-tag">AI/ML Frameworks</span><span class="tech-tag">Cloud Infrastructure</span>'}
            </div>
            
            <p class="paragraph">
                The implementation complexity is rated as <strong>${evaluation.technicalAnalysis?.implementationComplexity || 'Medium'}</strong>, with an estimated development timeline of <strong>${evaluation.technicalAnalysis?.developmentTimeline || '6-12 months'}</strong>. This assessment considers the integration of advanced technologies, scalability requirements, and the need for robust security and performance optimization.
            </p>
            
            <div class="highlight-box">
                <h3>Technical Innovation Highlights</h3>
                <p>The core innovation lies in ${this.getTechnicalInnovation(idea.category)}. This approach addresses current market gaps by ${this.getMarketGap(idea.category)}, positioning the solution as a next-generation platform that can adapt to evolving user needs and market conditions.</p>
            </div>
        </div>

        <!-- Market Analysis -->
        <div class="section">
            <h2 class="section-title">Market Analysis & Competitive Landscape</h2>
            
            <h3 class="subsection-title">Market Opportunity</h3>
            <p class="paragraph">
                The target market for "${idea.title}" represents a significant opportunity in the ${idea.category} sector. Current market analysis indicates ${evaluation.marketData?.marketSize || 'substantial growth potential'}, driven by increasing demand for innovative solutions and technological advancement in the industry.
            </p>
            
            <p class="paragraph">
                Key market trends include ${evaluation.marketData?.trends.slice(0, 3).join(', ') || 'digital transformation, user experience optimization, and automation'}. These trends create favorable conditions for the introduction of new solutions that can address existing pain points and provide enhanced value to end users.
            </p>
            
            <h3 class="subsection-title">Competitive Landscape</h3>
            <p class="paragraph">
                The competitive landscape in the ${idea.category} sector includes several established players and emerging startups. Our analysis identifies the following key competitors and their positioning:
            </p>
            
            <div class="company-list">
                ${evaluation.competitiveIntelligence?.directCompetitors?.slice(0, 3).map(competitor => `
                    <div class="company-item">
                        <div>
                            <div class="company-name">${competitor.name}</div>
                            <div class="company-description">${competitor.description}</div>
                        </div>
                    </div>
                `).join('') || `
                    <div class="company-item">
                        <div>
                            <div class="company-name">Established Market Leaders</div>
                            <div class="company-description">Traditional solutions with strong market presence but limited innovation in user experience and modern technology integration</div>
                        </div>
                    </div>
                    <div class="company-item">
                        <div>
                            <div class="company-name">Emerging Startups</div>
                            <div class="company-description">Innovative approaches but limited resources and market reach, creating opportunities for well-positioned solutions</div>
                        </div>
                    </div>
                `}
            </div>
            
            <p class="paragraph">
                The competitive advantage of "${idea.title}" lies in its ${this.getCompetitiveAdvantage(idea.category)}. This differentiation strategy positions the solution to capture market share by addressing unmet needs and providing superior value proposition compared to existing alternatives.
            </p>
        </div>

        <!-- Research & Innovation -->
        <div class="section">
            <h2 class="section-title">Research Foundation & Innovation Analysis</h2>
            
            <h3 class="subsection-title">Academic Research & Industry Studies</h3>
            <p class="paragraph">
                The development of "${idea.title}" is supported by extensive research in ${idea.category} and related fields. Recent academic studies and industry research provide strong foundation for the technical approach and market validation:
            </p>
            
            ${evaluation.researchIntelligence?.researchPapers?.slice(0, 2).map(paper => `
                <div class="research-paper">
                    <div class="research-title">${paper.title}</div>
                    <div class="research-authors">Authors: ${paper.authors.join(', ')} | Published: ${paper.published}</div>
                    <div class="research-summary">${paper.summary}</div>
                </div>
            `).join('') || `
                <div class="research-paper">
                    <div class="research-title">Recent Advances in ${idea.category} Technology</div>
                    <div class="research-authors">Authors: Industry Research Team | Published: 2024</div>
                    <div class="research-summary">Comprehensive analysis of current technological trends and opportunities in the ${idea.category} sector, highlighting the need for innovative solutions that address modern user requirements and market demands.</div>
                </div>
            `}
            
            <h3 class="subsection-title">Innovation Novelty & Differentiation</h3>
            <p class="paragraph">
                The true novelty of "${idea.title}" lies in its ${this.getNoveltyAspect(idea.category)}. Unlike existing solutions that focus on ${this.getExistingApproach(idea.category)}, this innovation introduces ${this.getInnovationApproach(idea.category)}.
            </p>
            
            <p class="paragraph">
                This approach represents a paradigm shift in how ${idea.category} solutions are designed and implemented. The innovation combines ${this.getCombinationAspect(idea.category)}, creating a unique value proposition that addresses current market limitations while positioning for future growth and adaptation.
            </p>
            
            <div class="highlight-box">
                <h3>Key Innovation Factors</h3>
                <p>The innovation scores ${evaluation.criteria.innovationPotential}/100 for innovation potential, indicating ${this.getInnovationLevel(evaluation.criteria.innovationPotential)}. This assessment considers the uniqueness of the approach, potential for market disruption, and alignment with emerging technological trends.</p>
            </div>
        </div>

        <!-- Strategic Recommendations -->
        <div class="section">
            <h2 class="section-title">Strategic Recommendations & Next Steps</h2>
            
            <p class="paragraph">
                Based on our comprehensive analysis, the following strategic recommendations are provided to maximize the success potential of "${idea.title}":
            </p>
            
            <div class="recommendations">
                <h3>Implementation Roadmap</h3>
                <ul>
                    ${evaluation.detailedAnalysis.recommendations.map(recommendation => `<li>${recommendation}</li>`).join('')}
                </ul>
            </div>
            
            <h3 class="subsection-title">Risk Mitigation Strategy</h3>
            <p class="paragraph">
                The risk assessment indicates a risk level of ${evaluation.criteria.riskLevel}/100, which is ${this.getRiskLevel(evaluation.criteria.riskLevel)}. Key risk factors include ${evaluation.detailedAnalysis.threats.slice(0, 2).join(' and ')}. To mitigate these risks, we recommend:
            </p>
            
            <ul style="margin: 1.5rem 0; padding-left: 2rem;">
                <li style="margin-bottom: 1rem;">Implementing robust market validation processes before full-scale development</li>
                <li style="margin-bottom: 1rem;">Establishing strategic partnerships to reduce competitive threats</li>
                <li style="margin-bottom: 1rem;">Developing flexible technical architecture to adapt to market changes</li>
                <li style="margin-bottom: 1rem;">Creating comprehensive go-to-market strategy with phased rollout approach</li>
            </ul>
            
            <h3 class="subsection-title">Success Metrics & KPIs</h3>
            <p class="paragraph">
                To measure the success of "${idea.title}", we recommend tracking the following key performance indicators:
            </p>
            
            <ul style="margin: 1.5rem 0; padding-left: 2rem;">
                <li style="margin-bottom: 1rem;"><strong>Technical Metrics:</strong> System performance, scalability benchmarks, and user experience scores</li>
                <li style="margin-bottom: 1rem;"><strong>Market Metrics:</strong> User adoption rates, market penetration, and competitive positioning</li>
                <li style="margin-bottom: 1rem;"><strong>Business Metrics:</strong> Revenue growth, customer acquisition cost, and return on investment</li>
                <li style="margin-bottom: 1rem;"><strong>Innovation Metrics:</strong> Patent applications, research publications, and industry recognition</li>
            </ul>
        </div>

        <!-- Conclusion -->
        <div class="section">
            <h2 class="section-title">Conclusion</h2>
            
            <p class="paragraph">
                The analysis of "${idea.title}" reveals a ${this.getOverallAssessment(evaluation.overallScore)} innovation opportunity in the ${idea.category} sector. With an overall score of ${evaluation.overallScore}/100, this project demonstrates ${this.getScoreDescription(evaluation.overallScore)}.
            </p>
            
            <p class="paragraph">
                The combination of ${this.getStrengthsSummary(evaluation.detailedAnalysis.strengths)} positions this innovation for success in the current market environment. However, careful attention must be paid to ${this.getChallengesSummary(evaluation.detailedAnalysis.weaknesses)} to ensure successful implementation and market adoption.
            </p>
            
            <p class="paragraph">
                We recommend ${this.getFinalRecommendation(evaluation.overallScore)}. The strategic approach outlined in this report provides a comprehensive framework for moving forward with confidence while maintaining flexibility to adapt to market feedback and evolving requirements.
            </p>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>Innovation Screener</strong> - AI-Powered Business Intelligence Platform</p>
            <p>Master's Capstone Project | Built with Next.js & Gemini AI | Real-time Web Search Integration</p>
            <p>Generated on ${currentDate} | Comprehensive Research Report</p>
        </div>
    </div>
</body>
</html>`;
  }

  private getScoreDescription(score: number): string {
    if (score >= 80) return 'excellent potential for market success and innovation impact';
    if (score >= 60) return 'strong potential with some areas requiring attention';
    if (score >= 40) return 'moderate potential requiring significant development';
    return 'limited potential requiring substantial re-evaluation';
  }

  private getRecommendationText(score: number): string {
    if (score >= 80) return 'strong potential for immediate development and market entry';
    if (score >= 60) return 'promising potential with recommended further research and validation';
    if (score >= 40) return 'moderate potential requiring careful planning and risk mitigation';
    return 'limited potential requiring significant re-evaluation of the concept';
  }

  private getTechnicalInnovation(category: string): string {
    const innovations = {
      'Technology': 'the integration of cutting-edge AI algorithms with user-centric design principles',
      'Finance': 'the application of machine learning to personalize financial services and decision-making',
      'Healthcare': 'the combination of data analytics with patient-centered care delivery',
      'Education': 'the fusion of adaptive learning technologies with personalized educational experiences',
      'Business': 'the implementation of intelligent automation with human-centered business processes'
    };
    return innovations[category] || 'the innovative combination of modern technologies with user-focused design';
  }

  private getMarketGap(category: string): string {
    const gaps = {
      'Technology': 'providing seamless integration between complex systems and end-user experiences',
      'Finance': 'offering personalized financial guidance that adapts to individual user needs and goals',
      'Healthcare': 'delivering patient-centered care that leverages data insights for better outcomes',
      'Education': 'creating adaptive learning environments that respond to individual learning patterns',
      'Business': 'streamlining business operations while maintaining human touch and decision-making'
    };
    return gaps[category] || 'addressing the gap between advanced technology and practical user needs';
  }

  private getCompetitiveAdvantage(category: string): string {
    const advantages = {
      'Technology': 'superior user experience combined with robust technical architecture',
      'Finance': 'personalized approach to financial services with advanced analytics',
      'Healthcare': 'patient-centered design with data-driven insights',
      'Education': 'adaptive learning technology with personalized content delivery',
      'Business': 'intelligent automation with human-centered design principles'
    };
    return advantages[category] || 'unique combination of technical excellence and user-focused innovation';
  }

  private getNoveltyAspect(category: string): string {
    const novelties = {
      'Technology': 'innovative approach to system integration and user interaction',
      'Finance': 'novel application of AI to personal financial management',
      'Healthcare': 'innovative patient engagement and care coordination methods',
      'Education': 'revolutionary approach to personalized learning and assessment',
      'Business': 'innovative business process optimization and automation'
    };
    return novelties[category] || 'unique approach to solving complex industry challenges';
  }

  private getExistingApproach(category: string): string {
    const approaches = {
      'Technology': 'traditional system-centric design and limited user customization',
      'Finance': 'one-size-fits-all financial products and services',
      'Healthcare': 'provider-centric care models with limited patient engagement',
      'Education': 'standardized curriculum delivery without personalization',
      'Business': 'rigid business processes with limited automation and flexibility'
    };
    return approaches[category] || 'traditional approaches that lack personalization and adaptability';
  }

  private getInnovationApproach(category: string): string {
    const innovations = {
      'Technology': 'user-centric design with intelligent system adaptation',
      'Finance': 'personalized financial solutions that evolve with user needs',
      'Healthcare': 'patient-centered care with predictive health insights',
      'Education': 'adaptive learning systems that respond to individual progress',
      'Business': 'intelligent business processes that balance automation with human insight'
    };
    return innovations[category] || 'innovative solutions that adapt to individual user needs and preferences';
  }

  private getCombinationAspect(category: string): string {
    const combinations = {
      'Technology': 'advanced technical capabilities with intuitive user interfaces',
      'Finance': 'sophisticated financial algorithms with user-friendly presentation',
      'Healthcare': 'comprehensive health data analysis with patient-accessible insights',
      'Education': 'rigorous educational content with engaging delivery methods',
      'Business': 'powerful business intelligence with actionable user guidance'
    };
    return combinations[category] || 'advanced technical capabilities with user-friendly design principles';
  }

  private getInnovationLevel(score: number): string {
    if (score >= 80) return 'exceptional innovation potential with significant market disruption capability';
    if (score >= 60) return 'strong innovation potential with notable market differentiation';
    if (score >= 40) return 'moderate innovation potential with some unique aspects';
    return 'limited innovation potential requiring concept refinement';
  }

  private getRiskLevel(score: number): string {
    if (score <= 30) return 'low risk with manageable challenges';
    if (score <= 50) return 'moderate risk requiring careful planning';
    if (score <= 70) return 'elevated risk requiring significant mitigation strategies';
    return 'high risk requiring comprehensive risk management approach';
  }

  private getOverallAssessment(score: number): string {
    if (score >= 80) return 'highly promising';
    if (score >= 60) return 'promising';
    if (score >= 40) return 'moderate';
    return 'challenging';
  }

  private getStrengthsSummary(strengths: string[]): string {
    return strengths.slice(0, 2).join(' and ') + (strengths.length > 2 ? ' among other advantages' : '');
  }

  private getChallengesSummary(weaknesses: string[]): string {
    return weaknesses.slice(0, 2).join(' and ') + (weaknesses.length > 2 ? ' among other considerations' : '');
  }

  private getFinalRecommendation(score: number): string {
    if (score >= 80) return 'proceeding with full-scale development and market entry strategy';
    if (score >= 60) return 'moving forward with pilot development and market validation';
    if (score >= 40) return 'conducting additional research and concept refinement before proceeding';
    return 're-evaluating the concept and exploring alternative approaches';
  }
}

export const writtenReportGenerator = new WrittenReportGenerator();
