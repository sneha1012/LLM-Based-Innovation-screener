import { NextRequest, NextResponse } from 'next/server';
import { geminiService } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { promptLength } = await request.json();
    
    // Validate the input
    if (!promptLength || typeof promptLength !== 'number') {
      return NextResponse.json(
        { error: 'Prompt length is required and must be a number' },
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

    // Test performance with the specified prompt length
    const result = await geminiService.testPromptPerformance(promptLength);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in performance testing API:', error);
    return NextResponse.json(
      { error: 'Failed to test prompt performance' },
      { status: 500 }
    );
  }
}
