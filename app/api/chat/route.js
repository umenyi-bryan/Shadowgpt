import { NextResponse } from 'next/server';
import { MultilingualAIEngine } from '../../utils/MultilingualAIEngine.js';

export async function POST(request) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 200));

    const aiEngine = new MultilingualAIEngine();
    const analysis = aiEngine.analyzeQuery(message);
    const response = aiEngine.generateResponse(message, analysis);

    return NextResponse.json({ 
      response,
      type: analysis.type,
      language: analysis.language,
      analysis: {
        category: analysis.category,
        complexity: analysis.complexity,
        topics: analysis.topics,
        requiresTool: analysis.requiresTool,
        requiresCode: analysis.requiresCode
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
