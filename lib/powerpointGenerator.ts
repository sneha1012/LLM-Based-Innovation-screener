import { EvaluationResult, InnovationIdea } from '@/types';

export class PowerPointGenerator {
  async generatePresentation(idea: InnovationIdea, evaluation: EvaluationResult): Promise<Blob> {
    try {
      console.log('Generating presentation for:', idea.title);
      console.log('Evaluation data:', evaluation);
      
      const slides = this.createSlides(idea, evaluation);
      console.log('Created slides:', slides.length);
      
      const blob = await this.generatePPTX(slides);
      console.log('Generated blob:', blob);
      
      return blob;
    } catch (error) {
      console.error('Error in generatePresentation:', error);
      throw error;
    }
  }

  private createSlides(idea: InnovationIdea, evaluation: EvaluationResult): any[] {
    return [
      {
        title: 'Innovation Assessment Report',
        subtitle: idea.title,
        content: [
          { type: 'text', text: `Category: ${idea.category}` },
          { type: 'text', text: `Overall Score: ${evaluation.overallScore}/100` },
          { type: 'text', text: `Generated: ${new Date(evaluation.generatedAt).toLocaleDateString()}` }
        ]
      },
      {
        title: 'Executive Summary',
        content: [
          { type: 'text', text: `Innovation: ${idea.title}` },
          { type: 'text', text: `Overall Assessment: ${this.getScoreLabel(evaluation.overallScore)}` },
          { type: 'text', text: `Key Recommendation: ${this.getRecommendation(evaluation.overallScore)}` }
        ]
      },
      {
        title: 'Detailed Evaluation',
        content: [
          { type: 'chart', data: this.createEvaluationChart(evaluation.criteria) },
          { type: 'text', text: 'Comprehensive analysis across 5 key criteria' }
        ]
      },
      {
        title: 'Strengths & Opportunities',
        content: [
          { type: 'list', items: evaluation.detailedAnalysis.strengths, title: 'Strengths' },
          { type: 'list', items: evaluation.detailedAnalysis.opportunities, title: 'Opportunities' }
        ]
      },
      {
        title: 'Challenges & Risks',
        content: [
          { type: 'list', items: evaluation.detailedAnalysis.weaknesses, title: 'Weaknesses' },
          { type: 'list', items: evaluation.detailedAnalysis.threats, title: 'Threats' }
        ]
      },
      {
        title: 'Recommendations',
        content: [
          { type: 'list', items: evaluation.detailedAnalysis.recommendations, title: 'Action Items' },
          { type: 'text', text: 'Next Steps for Implementation' }
        ]
      },
      {
        title: 'Performance Metrics',
        content: [
          { type: 'text', text: `Response Time: ${evaluation.performanceMetrics.responseTime}ms` },
          { type: 'text', text: `Cost: $${evaluation.performanceMetrics.cost.toFixed(4)}` },
          { type: 'text', text: `Tokens Used: ${evaluation.performanceMetrics.tokenUsage.toLocaleString()}` }
        ]
      }
    ];
  }

  private createEvaluationChart(criteria: any): any {
    return {
      type: 'radar',
      data: {
        labels: Object.keys(criteria).map(key => 
          key.replace(/([A-Z])/g, ' $1').trim()
        ),
        datasets: [{
          label: 'Score',
          data: Object.values(criteria),
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 2
        }]
      }
    };
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

  private async generatePPTX(slides: any[]): Promise<Blob> {
    try {
      console.log('Generating HTML presentation with', slides.length, 'slides');
      
      // For now, we'll create a simple HTML presentation that can be exported to PowerPoint
      // In a production environment, you'd use a library like 'pptxgenjs'
      
      const htmlContent = this.generateHTMLPresentation(slides);
      console.log('Generated HTML content length:', htmlContent.length);
      
      const blob = new Blob([htmlContent], { type: 'text/html' });
      console.log('Created blob with size:', blob.size);
      
      return blob;
    } catch (error) {
      console.error('Error in generatePPTX:', error);
      throw error;
    }
  }

  private generateHTMLPresentation(slides: any[]): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Innovation Assessment Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .slide { background: white; margin: 20px 0; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); page-break-after: always; }
        .slide h1 { color: #1e40af; font-size: 28px; margin-bottom: 10px; }
        .slide h2 { color: #374151; font-size: 24px; margin-bottom: 20px; }
        .slide h3 { color: #6b7280; font-size: 18px; margin-bottom: 15px; }
        .slide p { color: #374151; line-height: 1.6; margin-bottom: 10px; }
        .slide ul { color: #374151; line-height: 1.6; }
        .slide li { margin-bottom: 8px; }
        .score { font-size: 48px; font-weight: bold; color: #1e40af; text-align: center; margin: 20px 0; }
        .criteria { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .criterion { background: #f8fafc; padding: 15px; border-radius: 6px; text-align: center; }
        .criterion-score { font-size: 24px; font-weight: bold; color: #1e40af; }
        @media print { .slide { page-break-after: always; } }
    </style>
</head>
<body>
    ${slides.map(slide => this.generateSlideHTML(slide)).join('')}
</body>
</html>`;
  }

  private generateSlideHTML(slide: any): string {
    let content = '';
    
    slide.content.forEach((item: any) => {
      if (item.type === 'text') {
        content += `<p>${item.text}</p>`;
      } else if (item.type === 'list') {
        content += `<h3>${item.title}</h3><ul>`;
        item.items.forEach((listItem: string) => {
          content += `<li>${listItem}</li>`;
        });
        content += '</ul>';
      } else if (item.type === 'chart') {
        content += `<div class="criteria">`;
        Object.entries(item.data.data.datasets[0].data).forEach(([index, value]) => {
          const label = item.data.labels[index];
          content += `
            <div class="criterion">
              <div class="criterion-score">${value}/100</div>
              <div>${label}</div>
            </div>
          `;
        });
        content += '</div>';
      }
    });

    return `
      <div class="slide">
        <h1>${slide.title}</h1>
        ${slide.subtitle ? `<h2>${slide.subtitle}</h2>` : ''}
        ${content}
      </div>
    `;
  }
}

export const powerpointGenerator = new PowerPointGenerator();
