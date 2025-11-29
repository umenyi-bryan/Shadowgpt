import { NextResponse } from 'next/server';
import { AdvancedAIEngine } from '../../utils/AdvancedAIEngine.js';

export async function POST(request) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));

    const aiEngine = new AdvancedAIEngine();
    const analysis = aiEngine.analyzeQuery(message);
    const response = aiEngine.generateResponse(message, analysis);

    return NextResponse.json({ 
      response,
      type: analysis.type,
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
