// Quick test for ShadowGPT
const UltimateAIBrain = require('./app/utils/UltimateAIBrain');

async function testShadowGPT() {
  console.log('🧪 Testing ShadowGPT AI Engine...\n');
  
  const ai = new UltimateAIBrain();
  
  const testQueries = [
    'Explain SQL injection',
    'How to use Nmap for network scanning',
    'What is blockchain technology?',
    'Latest cybersecurity trends',
    'How to secure a Linux server'
  ];
  
  for (const query of testQueries) {
    console.log(`🧠 Query: "${query}"`);
    console.log('━'.repeat(50));
    
    try {
      const response = await ai.generateResponse(query, false);
      console.log(response.substring(0, 200) + '...\n');
      console.log('✓ Response generated successfully\n');
    } catch (error) {
      console.log(`✗ Error: ${error.message}\n`);
    }
    
    // Small delay between queries
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('✅ All tests completed!');
  console.log('\n📊 Stats:');
  console.log(`  Conversation History: ${ai.conversationHistory.length}`);
  console.log(`  Knowledge Cache: ${ai.knowledgeCache.size}`);
}

// Run test
if (require.main === module) {
  testShadowGPT().catch(console.error);
}

module.exports = { testShadowGPT };
