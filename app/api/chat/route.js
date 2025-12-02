import { NextResponse } from 'next/server';
import { UltimateAIEngine } from '../../utils/UltimateAIEngine.js';

export async function POST(request) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }

    await new Promise(resolve => setTimeout(resolve, 300));

    const aiEngine = new UltimateAIEngine();
    const analysis = aiEngine.analyzeQuery(message);
    const response = aiEngine.generateResponse(message, analysis);

    return NextResponse.json({ 
      response,
      type: analysis.type,
      language: analysis.language,
      analysis: {
        category: analysis.category,
        complexity: analysis.complexity,
        topics: analysis.topics
      }
    });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
