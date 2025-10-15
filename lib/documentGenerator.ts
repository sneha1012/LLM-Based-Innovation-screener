import { EvaluationResult, InnovationIdea } from '@/types';

export class DocumentGenerator {
  async generateProfessionalDocument(idea: InnovationIdea, evaluation: EvaluationResult): Promise<Blob> {
    try {
      console.log('Generating professional document for:', idea.title);
      
      const documentContent = this.createDocumentContent(idea, evaluation);
      console.log('Generated document content length:', documentContent.length);
      
      const blob = new Blob([documentContent], { type: 'text/html' });
      console.log('Created document blob with size:', blob.size);
      
      return blob;
    } catch (error) {
      console.error('Error in generateProfessionalDocument:', error);
      throw error;
    }
  }

  private createDocumentContent(idea: InnovationIdea, evaluation: EvaluationResult): string {
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
    <title>Innovation Assessment Report - ${idea.title}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #2d3748;
            background: #ffffff;
            font-size: 14px;
        }
        
        .document {
            max-width: 8.5in;
            margin: 0 auto;
            padding: 1in;
            background: white;
        }
        
        .header {
            text-align: center;
            margin-bottom: 2rem;
            padding-bottom: 1.5rem;
            border-bottom: 3px solid #003631;
        }
        
        .title {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            font-weight: 700;
            color: #003631;
            margin-bottom: 0.5rem;
        }
        
        .subtitle {
            font-size: 1.2rem;
            color: #4a5568;
            font-weight: 400;
        }
        
        .meta-info {
            display: flex;
            justify-content: space-between;
            margin-top: 1rem;
            font-size: 0.9rem;
            color: #718096;
        }
        
        .section {
            margin-bottom: 2rem;
            page-break-inside: avoid;
        }
        
        .section-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
            font-weight: 600;
            color: #003631;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #FFEDA8;
        }
        
        .subsection-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.3rem;
            font-weight: 600;
            color: #2d3748;
            margin: 1.5rem 0 0.8rem 0;
        }
        
        .score-display {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin: 1rem 0;
            padding: 1rem;
            background: linear-gradient(135deg, #FFEDA8 0%, #FFEDA8 100%);
            border-radius: 8px;
            border-left: 5px solid #003631;
        }
        
        .score-number {
            font-family: 'Playfair Display', serif;
            font-size: 3rem;
            font-weight: 700;
            color: #003631;
        }
        
        .score-label {
            font-size: 1.1rem;
            color: #2d3748;
            font-weight: 500;
        }
        
        .criteria-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin: 1rem 0;
        }
        
        .criterion-card {
            background: #f7fafc;
            padding: 1rem;
            border-radius: 8px;
            border-left: 4px solid #003631;
            text-align: center;
        }
        
        .criterion-score {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            font-weight: 600;
            color: #003631;
            margin-bottom: 0.5rem;
        }
        
        .criterion-name {
            font-size: 0.9rem;
            color: #4a5568;
            font-weight: 500;
        }
        
        .analysis-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin: 1rem 0;
        }
        
        .analysis-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 1.5rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .analysis-card h4 {
            font-family: 'Playfair Display', serif;
            font-size: 1.2rem;
            color: #003631;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #FFEDA8;
        }
        
        .analysis-card ul {
            list-style: none;
            padding: 0;
        }
        
        .analysis-card li {
            padding: 0.5rem 0;
            border-bottom: 1px solid #f1f5f9;
            position: relative;
            padding-left: 1.5rem;
        }
        
        .analysis-card li:before {
            content: "•";
            color: #003631;
            font-weight: bold;
            position: absolute;
            left: 0;
        }
        
        .market-data {
            background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
            padding: 1.5rem;
            border-radius: 8px;
            border: 1px solid #e2e8f0;
            margin: 1rem 0;
        }
        
        .market-size {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            font-weight: 700;
            color: #003631;
            text-align: center;
            margin-bottom: 1rem;
        }
        
        .tech-stack {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin: 1rem 0;
        }
        
        .tech-tag {
            background: #003631;
            color: #FFEDA8;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        .recommendations {
            background: linear-gradient(135deg, #FFEDA8 0%, #fef5e7 100%);
            padding: 1.5rem;
            border-radius: 8px;
            border-left: 5px solid #003631;
            margin: 1rem 0;
        }
        
        .recommendations h4 {
            color: #003631;
            margin-bottom: 1rem;
        }
        
        .performance-metrics {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            margin: 1rem 0;
        }
        
        .metric-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 1rem;
            text-align: center;
        }
        
        .metric-value {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            font-weight: 600;
            color: #003631;
            margin-bottom: 0.5rem;
        }
        
        .metric-label {
            font-size: 0.8rem;
            color: #718096;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .footer {
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 2px solid #e2e8f0;
            text-align: center;
            color: #718096;
            font-size: 0.9rem;
        }
        
        @media print {
            body { font-size: 12px; }
            .document { padding: 0.5in; }
            .section { page-break-inside: avoid; }
            .analysis-grid { grid-template-columns: 1fr; }
            .criteria-grid { grid-template-columns: repeat(2, 1fr); }
        }
    </style>
</head>
<body>
    <div class="document">
        <!-- Header -->
        <div class="header">
            <h1 class="title">Innovation Assessment Report</h1>
            <p class="subtitle">Comprehensive Business Intelligence Analysis</p>
            <div class="meta-info">
                <span><strong>Innovation:</strong> ${idea.title}</span>
                <span><strong>Category:</strong> ${idea.category}</span>
                <span><strong>Generated:</strong> ${currentDate}</span>
            </div>
        </div>

        <!-- Executive Summary -->
        <div class="section">
            <h2 class="section-title">Executive Summary</h2>
            <div class="score-display">
                <div class="score-number">${evaluation.overallScore}</div>
                <div class="score-label">
                    <strong>Overall Innovation Score</strong><br>
                    ${this.getScoreLabel(evaluation.overallScore)} - ${this.getRecommendation(evaluation.overallScore)}
                </div>
            </div>
            <p style="font-size: 1.1rem; line-height: 1.8; color: #4a5568; margin-top: 1rem;">
                This comprehensive analysis evaluates the innovation potential of <strong>"${idea.title}"</strong> 
                across multiple business intelligence dimensions. The assessment provides strategic insights 
                for decision-making, market positioning, and investment considerations.
            </p>
        </div>

        <!-- Detailed Evaluation -->
        <div class="section">
            <h2 class="section-title">Detailed Evaluation Criteria</h2>
            <div class="criteria-grid">
                <div class="criterion-card">
                    <div class="criterion-score">${evaluation.criteria.innovationPotential}</div>
                    <div class="criterion-name">Innovation Potential</div>
                </div>
                <div class="criterion-card">
                    <div class="criterion-score">${evaluation.criteria.feasibility}</div>
                    <div class="criterion-name">Technical Feasibility</div>
                </div>
                <div class="criterion-card">
                    <div class="criterion-score">${evaluation.criteria.marketReadiness}</div>
                    <div class="criterion-name">Market Readiness</div>
                </div>
                <div class="criterion-card">
                    <div class="criterion-score">${evaluation.criteria.scalability}</div>
                    <div class="criterion-name">Scalability</div>
                </div>
                <div class="criterion-card">
                    <div class="criterion-score">${100 - evaluation.criteria.riskLevel}</div>
                    <div class="criterion-name">Risk Mitigation</div>
                </div>
            </div>
        </div>

        <!-- SWOT Analysis -->
        <div class="section">
            <h2 class="section-title">Strategic Analysis (SWOT)</h2>
            <div class="analysis-grid">
                <div class="analysis-card">
                    <h4>Strengths</h4>
                    <ul>
                        ${evaluation.detailedAnalysis.strengths.map(strength => `<li>${strength}</li>`).join('')}
                    </ul>
                </div>
                <div class="analysis-card">
                    <h4>Opportunities</h4>
                    <ul>
                        ${evaluation.detailedAnalysis.opportunities.map(opportunity => `<li>${opportunity}</li>`).join('')}
                    </ul>
                </div>
                <div class="analysis-card">
                    <h4>Weaknesses</h4>
                    <ul>
                        ${evaluation.detailedAnalysis.weaknesses.map(weakness => `<li>${weakness}</li>`).join('')}
                    </ul>
                </div>
                <div class="analysis-card">
                    <h4>Threats</h4>
                    <ul>
                        ${evaluation.detailedAnalysis.threats.map(threat => `<li>${threat}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>

        <!-- Market Intelligence -->
        ${evaluation.marketData ? `
        <div class="section">
            <h2 class="section-title">Market Intelligence</h2>
            <div class="market-data">
                <div class="market-size">${evaluation.marketData.marketSize}</div>
                <p style="text-align: center; color: #4a5568; margin-bottom: 1.5rem;">Total Addressable Market</p>
                
                <h3 class="subsection-title">Market Trends</h3>
                <ul style="margin-bottom: 1.5rem;">
                    ${evaluation.marketData.trends.map(trend => `<li>${trend}</li>`).join('')}
                </ul>
                
                <h3 class="subsection-title">Growth Opportunities</h3>
                <ul style="margin-bottom: 1.5rem;">
                    ${evaluation.marketData.opportunities.map(opportunity => `<li>${opportunity}</li>`).join('')}
                </ul>
                
                <h3 class="subsection-title">Risk Factors</h3>
                <ul>
                    ${evaluation.marketData.risks.map(risk => `<li>${risk}</li>`).join('')}
                </ul>
            </div>
        </div>
        ` : ''}

        <!-- Technical Analysis -->
        ${evaluation.technicalAnalysis ? `
        <div class="section">
            <h2 class="section-title">Technical Analysis</h2>
            <h3 class="subsection-title">Recommended Technology Stack</h3>
            <div class="tech-stack">
                ${evaluation.technicalAnalysis.recommendedTechStack.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('')}
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
                <div class="metric-card">
                    <div class="metric-value">${evaluation.technicalAnalysis.implementationComplexity}</div>
                    <div class="metric-label">Implementation Complexity</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">${evaluation.technicalAnalysis.developmentTimeline}</div>
                    <div class="metric-label">Development Timeline</div>
                </div>
            </div>
        </div>
        ` : ''}

        <!-- Strategic Recommendations -->
        <div class="section">
            <h2 class="section-title">Strategic Recommendations</h2>
            <div class="recommendations">
                <h4>Action Items for Implementation</h4>
                <ul>
                    ${evaluation.detailedAnalysis.recommendations.map(recommendation => `<li>${recommendation}</li>`).join('')}
                </ul>
            </div>
        </div>

        <!-- Performance Metrics -->
        <div class="section">
            <h2 class="section-title">Analysis Performance Metrics</h2>
            <div class="performance-metrics">
                <div class="metric-card">
                    <div class="metric-value">${evaluation.performanceMetrics.responseTime}ms</div>
                    <div class="metric-label">Response Time</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">$${Number(evaluation.performanceMetrics.cost).toFixed(4)}</div>
                    <div class="metric-label">Analysis Cost</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">${Number(evaluation.performanceMetrics.tokenUsage).toLocaleString()}</div>
                    <div class="metric-label">Tokens Used</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">${evaluation.performanceMetrics.promptLength}</div>
                    <div class="metric-label">Prompt Length</div>
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <p><strong>Innovation Screener</strong> - AI-Powered Business Intelligence Platform</p>
            <p>Master's Capstone Project | Built with Next.js & Gemini AI | Real-time Web Search Integration</p>
            <p>Generated on ${currentDate} | Professional Document Version</p>
        </div>
    </div>
</body>
</html>`;
  }

  private getScoreLabel(score: number): string {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  }

  private getRecommendation(score: number): string {
    if (score >= 80) return 'Proceed with development';
    if (score >= 60) return 'Further research recommended';
    if (score >= 40) return 'Significant improvements needed';
    return 'Not recommended for development';
  }
}

export const documentGenerator = new DocumentGenerator();
