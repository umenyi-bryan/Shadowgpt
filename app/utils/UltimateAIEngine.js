// Comprehensive Multilingual Knowledge Base
const knowledgeBase = {
  en: {
    casual: {
      greeting: "🛡️ **Hello! I'm ShadowGPT v6.0**\n\nYour ultimate pentesting AI assistant created by **bedusec**.\n\nI speak 6 languages and have advanced cybersecurity capabilities!\n\nWhat would you like to explore today?",
      thanks: "🎯 **You're welcome!**\n\nRemember to always follow ethical guidelines and obtain proper authorization.",
      capabilities: `🔮 **ShadowGPT v6.0 - Ultimate Features**

**Multilingual Support:**
• English 🇺🇸
• Français 🇫🇷  
• Español 🇪🇸
• Русский 🇷🇺
• Pidgin English 🇳🇬
• 中文 🇨🇳

**Advanced Capabilities:**
• Real-time vulnerability intelligence
• AI-powered exploit generation
• Live hacking labs
• CTF challenges
• Automated reporting
• Team collaboration

**What would you like to try?**`
    },
    
    technical: {
      cybersecurity: `**Cybersecurity Fundamentals**:
• CIA Triad: Confidentiality, Integrity, Availability
• Defense in Depth strategy
• Zero Trust Architecture
• Threat modeling techniques
• Risk assessment frameworks`,
      
      pentesting: `**Penetration Testing Methodology**:
1. Reconnaissance & OSINT
2. Scanning & Enumeration
3. Vulnerability Assessment
4. Exploitation
5. Post-Exploitation
6. Reporting & Documentation
7. Remediation Guidance`,
      
      tools: `**Essential Security Tools**:
• **Nmap** - Network discovery & security auditing
• **Metasploit** - Penetration testing framework
• **Burp Suite** - Web application security testing
• **Wireshark** - Network protocol analyzer
• **John the Ripper** - Password security auditing`
    }
  },
  
  fr: {
    casual: {
      greeting: "🛡️ **Bonjour! Je suis ShadowGPT v6.0**\n\nVotre assistant IA de pentesting ultime créé par **bedusec**.\n\nJe parle 6 langues et j'ai des capacités avancées en cybersécurité!\n\nQue souhaitez-vous explorer aujourd'hui?"
    }
  },
  
  es: {
    casual: {
      greeting: "🛡️ **¡Hola! Soy ShadowGPT v6.0**\n\nTu asistente de IA de pentesting definitivo creado por **bedusec**.\n\n¡Hablo 6 idiomas y tengo capacidades avanzadas de ciberseguridad!\n\n¿Qué te gustaría explorar hoy?"
    }
  }
};

// Language detection
const languagePatterns = {
  en: ['hello', 'hi', 'how are', 'cyber', 'security', 'hack', 'pentest'],
  fr: ['bonjour', 'salut', 'comment', 'cyber', 'sécurité', 'piratage', 'test'],
  es: ['hola', 'buenos', 'cómo', 'ciber', 'seguridad', 'hackeo', 'prueba']
};

export class UltimateAIEngine {
  constructor() {
    this.conversationHistory = [];
    this.userPreferences = {
      language: 'en',
      complexity: 'intermediate',
      expertise: 'general'
    };
  }

  detectLanguage(text) {
    const lowerText = text.toLowerCase();
    let detectedLang = 'en';
    
    for (const [lang, patterns] of Object.entries(languagePatterns)) {
      if (patterns.some(pattern => lowerText.includes(pattern))) {
        detectedLang = lang;
        break;
      }
    }
    
    return detectedLang;
  }

  analyzeQuery(query) {
    const lang = this.detectLanguage(query);
    const lowerQuery = query.toLowerCase();
    
    return {
      language: lang,
      type: this.classifyQueryType(lowerQuery, lang),
      category: this.classifyCategory(lowerQuery),
      complexity: this.classifyComplexity(lowerQuery),
      requiresTool: this.checkToolRequest(lowerQuery),
      topics: this.extractTopics(lowerQuery)
    };
  }

  classifyQueryType(query, lang) {
    const casualWords = {
      en: ['hello', 'hi', 'hey', 'how are', 'thank', 'bye', 'good', 'what\'s up'],
      fr: ['bonjour', 'salut', 'ça va', 'merci', 'au revoir'],
      es: ['hola', 'buenos', 'cómo estás', 'gracias', 'adiós']
    };
    
    const patterns = casualWords[lang] || casualWords.en;
    if (patterns.some(word => query.includes(word))) {
      return 'casual';
    }
    
    if (query.includes('create') || query.includes('make') || query.includes('generate')) {
      return 'tool';
    }
    
    return 'technical';
  }

  classifyCategory(query) {
    const categories = {
      cybersecurity: ['cyber', 'security', 'hack', 'attack', 'defense', 'threat'],
      pentesting: ['pentest', 'penetration', 'test', 'audit', 'assessment'],
      network: ['network', 'tcp', 'udp', 'port', 'ip', 'router'],
      web: ['web', 'http', 'html', 'xss', 'csrf', 'sql', 'injection'],
      crypto: ['encrypt', 'decrypt', 'hash', 'crypto', 'ssl', 'tls']
    };
    
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => query.includes(keyword))) {
        return category;
      }
    }
    
    return 'general';
  }

  classifyComplexity(query) {
    if (query.includes('advanced') || query.includes('complex') || query.includes('professional')) {
      return 'advanced';
    }
    if (query.includes('basic') || query.includes('simple') || query.includes('beginner')) {
      return 'beginner';
    }
    return 'intermediate';
  }

  checkToolRequest(query) {
    return query.includes('create') || query.includes('make') || query.includes('generate');
  }

  extractTopics(query) {
    const topics = [];
    const allKeywords = [
      'sql', 'injection', 'xss', 'csrf', 'nmap', 'metasploit',
      'burp', 'wireshark', 'encryption', 'hashing', 'network',
      'web', 'application', 'security', 'vulnerability'
    ];
    
    allKeywords.forEach(keyword => {
      if (query.includes(keyword)) {
        topics.push(keyword);
      }
    });
    
    return topics.slice(0, 3);
  }

  generateResponse(query, analysis) {
    const knowledge = knowledgeBase[analysis.language] || knowledgeBase.en;
    
    switch (analysis.type) {
      case 'casual':
        return this.generateCasualResponse(query, analysis.language, knowledge);
      case 'tool':
        return this.generateToolResponse(query, analysis);
      default:
        return this.generateTechnicalResponse(query, analysis, knowledge);
    }
  }

  generateCasualResponse(query, lang, knowledge) {
    const responses = knowledge.casual;
    
    if (query.includes('hello') || query.includes('hi') || 
        query.includes('bonjour') || query.includes('hola')) {
      return responses.greeting;
    }
    
    if (query.includes('thank') || query.includes('merci') || query.includes('gracias')) {
      return responses.thanks;
    }
    
    if (query.includes('what can') || query.includes('capabilities')) {
      return responses.capabilities || knowledgeBase.en.casual.capabilities;
    }
    
    return responses.greeting;
  }

  generateToolResponse(query, analysis) {
    const tools = {
      port_scanner: `#!/bin/bash
# Advanced Port Scanner v2.0
TARGET=$1
echo "Scanning $TARGET..."
for port in {1..1000}; do
  timeout 1 bash -c "echo >/dev/tcp/$TARGET/$port" 2>/dev/null && echo "✅ Port $port: OPEN"
done
echo "Scan completed!"`,
      
      vulnerability_scanner: `#!/bin/bash
# Web Vulnerability Scanner
URL=$1
echo "Testing $URL for vulnerabilities..."
echo "SQL Injection test:"
curl -s "$URL' OR '1'='1" | grep -i "error" && echo "⚠️ Possible SQL Injection"
echo "XSS test:"
curl -s "$URL<script>alert(1)</script>" | grep -q "<script>" && echo "⚠️ Possible XSS"
echo "Scan completed!"`,
      
      hash_cracker: `#!/bin/bash
# Hash Cracker Tool
HASH=$1
WORDLIST=$2
echo "Cracking hash: $HASH"
while read password; do
  computed=$(echo -n "$password" | md5sum | cut -d' ' -f1)
  [ "$computed" = "$HASH" ] && echo "✅ Password found: $password" && exit 0
done < "$WORDLIST"
echo "❌ Password not found"`
    };
    
    let selectedTool = 'port_scanner';
    if (query.includes('vulnerability') || query.includes('vuln')) {
      selectedTool = 'vulnerability_scanner';
    } else if (query.includes('hash') || query.includes('crack')) {
      selectedTool = 'hash_cracker';
    }
    
    const toolName = selectedTool.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    return `🛠️ **${toolName} - Generated Tool**\n\n\`\`\`bash\n${tools[selectedTool]}\n\`\`\`\n\n**Usage:** Save as .sh file and run: chmod +x tool.sh && ./tool.sh <parameters>\n\n---\n*ShadowGPT v6.0 - Advanced Tool Generation*`;
  }

  generateTechnicalResponse(query, analysis, knowledge) {
    let response = `🔍 **Technical Analysis**\n\n`;
    
    if (analysis.language !== 'en') {
      response += `*Language: ${analysis.language.toUpperCase()}*\n\n`;
    }
    
    if (knowledge.technical[analysis.category]) {
      response += knowledge.technical[analysis.category] + '\n\n';
    }
    
    if (analysis.complexity === 'advanced') {
      response += `**Advanced Insights:**\n`;
      response += this.getAdvancedInsights(analysis.category);
    } else if (analysis.complexity === 'beginner') {
      response += `**Beginner Explanation:**\n`;
      response += this.getBeginnerExplanation(analysis.category);
    }
    
    if (analysis.topics.length > 0) {
      response += `\n**Related Topics:** ${analysis.topics.join(', ')}\n`;
    }
    
    response += `\n---\n*ShadowGPT v6.0 - Ultimate AI Assistant*\n*Created by bedusec - Use responsibly*`;
    
    return response;
  }

  getAdvancedInsights(category) {
    const insights = {
      cybersecurity: `• Advanced threat intelligence techniques\n• Zero-day vulnerability research\n• Red team operations planning\n• Advanced persistence mechanisms\n• Forensic analysis methodologies`,
      
      pentesting: `• Advanced exploitation techniques\n• Post-exploitation frameworks\n• Lateral movement strategies\n• Privilege escalation methods\n• Covering tracks techniques`,
      
      network: `• Advanced network segmentation\n• IDS/IPS evasion techniques\n• Protocol analysis and manipulation\n• Wireless security assessments\n• VoIP security testing`
    };
    
    return insights[category] || 'Advanced techniques and methodologies for comprehensive security assessment.';
  }

  getBeginnerExplanation(category) {
    const explanations = {
      cybersecurity: `Cybersecurity is like protecting your digital home. You need locks (passwords), alarms (firewalls), and good habits (security awareness). Start with basic concepts and build your knowledge gradually.`,
      
      pentesting: `Penetration testing is like being a digital detective. You look for weaknesses in systems to help fix them before bad actors find them. Always get permission first!`,
      
      network: `Think of a network like a city with roads (cables) and buildings (devices). Network security is about controlling who can travel where and making sure no one is doing anything suspicious.`
    };
    
    return explanations[category] || 'Start with the basics and gradually build your knowledge through practice and study.';
  }
}
