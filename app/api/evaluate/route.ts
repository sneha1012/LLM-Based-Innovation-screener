import { NextRequest, NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini';
import { InnovationIdea } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const idea: InnovationIdea = await request.json();
    
    // Validate the input
    if (!idea.title || !idea.description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // Check if Gemini API key is configured
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Evaluate the innovation idea
    const result = await geminiService.evaluateInnovation(idea);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in evaluation API:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate innovation idea' },
      { status: 500 }
    );
  }
}
