// Comprehensive Training Data for ShadowGPT
const trainingData = {
  cybersecurity: {
    basics: {
      cia_triad: "**CIA Triad**: Confidentiality (data privacy), Integrity (data accuracy), Availability (system access)",
      authentication: "**Authentication**: Verifying identity (passwords, 2FA, biometrics)",
      authorization: "**Authorization**: Determining access rights and permissions",
      encryption: "**Encryption**: Converting data to secure format using algorithms like AES, RSA"
    }
  },

  pentesting: {
    methodology: {
      ptess: `**PTES (Penetration Testing Execution Standard)**:
1. Pre-engagement Interactions
2. Intelligence Gathering
3. Threat Modeling
4. Vulnerability Analysis
5. Exploitation
6. Post-Exploitation
7. Reporting`,

      ostmm: `**OSSTMM (Open Source Security Testing Methodology)**:
- Operational Security
- Data Networks
- Physical Security
- Human Psychology
- Wireless Communications
- Telecommunications`
    }
  },

  programming: {
    python: {
      basics: `**Python for Pentesting**:
import socket
import requests
import subprocess`,

      networking: `**Network Operations**:
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('target.com', 80))`
    },

    bash: {
      automation: `**Bash Automation**:
for ip in {1..254}; do
    ping -c 1 192.168.1.$ip | grep "64 bytes" &
done`
    }
  },

  web_security: {
    owasp_top_10: {
      a01: `**A01: Broken Access Control**
- Vertical/horizontal privilege escalation
- Insecure direct object references (IDOR)`,

      a03: `**A03: Injection**
- SQL Injection
- NoSQL Injection
- Command Injection`,

      a07: `**A07: Identification and Authentication Failures**
- Weak password policies
- Session fixation`
    }
  }
};

export class AdvancedAIEngine {
  constructor() {
    this.knowledgeBase = trainingData;
  }

  analyzeQuery(query) {
    const lowerQuery = query.toLowerCase();
    
    return {
      type: this.isCasualQuery(lowerQuery) ? 'casual' : 
            this.isToolRequest(lowerQuery) ? 'tool' : 'technical',
      category: this.detectCategory(lowerQuery),
      topics: this.extractTopics(lowerQuery),
      complexity: this.assessComplexity(lowerQuery)
    };
  }

  isCasualQuery(query) {
    const casualPatterns = [
      'hello', 'hi', 'hey', 'how are you', 'what\'s up',
      'thanks', 'thank you', 'bye', 'goodbye', 'who are you'
    ];
    return casualPatterns.some(pattern => query.includes(pattern));
  }

  isToolRequest(query) {
    const toolPatterns = [
      'create', 'make', 'generate', 'build', 'write',
      'tool', 'scanner', 'cracker', 'monitor'
    ];
    return toolPatterns.some(pattern => query.includes(pattern));
  }

  detectCategory(query) {
    const categories = {
      web: ['web', 'http', 'xss', 'csrf', 'sql', 'injection'],
      network: ['network', 'tcp', 'udp', 'port', 'scan', 'nmap'],
      system: ['windows', 'linux', 'os', 'system'],
      crypto: ['encrypt', 'decrypt', 'hash', 'crypto']
    };

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => query.includes(keyword))) {
        return category;
      }
    }
    return 'general';
  }

  extractTopics(query) {
    const topics = [];
    const allKeywords = [];
    
    Object.values(this.knowledgeBase).forEach(category => {
      Object.values(category).forEach(subcategory => {
        if (typeof subcategory === 'object') {
          Object.keys(subcategory).forEach(key => {
            allKeywords.push(key);
          });
        }
      });
    });

    allKeywords.forEach(keyword => {
      if (query.includes(keyword) && !topics.includes(keyword)) {
        topics.push(keyword);
      }
    });

    return topics;
  }

  assessComplexity(query) {
    const complexIndicators = ['advanced', 'complex', 'detailed'];
    const simpleIndicators = ['basic', 'simple', 'easy'];

    if (complexIndicators.some(indicator => query.includes(indicator))) {
      return 'high';
    } else if (simpleIndicators.some(indicator => query.includes(indicator))) {
      return 'low';
    }
    return 'medium';
  }

  generateResponse(query, analysis) {
    switch (analysis.type) {
      case 'casual':
        return this.generateCasualResponse(query);
      case 'tool':
        return this.generateToolResponse(query, analysis);
      default:
        return this.generateTechnicalResponse(query, analysis);
    }
  }

  generateCasualResponse(query) {
    if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
      return "🛡️ **Hello! I'm ShadowGPT v4.0**\n\nYour advanced pentesting AI assistant with enhanced capabilities!\n\nWhat would you like to explore today?";
    }
    
    if (query.includes('how are you')) {
      return "⚡ **I'm operating with advanced AI capabilities!**\n\nReady to assist with cybersecurity topics and tool creation.";
    }
    
    if (query.includes('thank')) {
      return "🎯 **You're welcome!**\n\nRemember to always obtain proper authorization and follow ethical guidelines.";
    }
    
    if (query.includes('what can you do')) {
      return `🔮 **ShadowGPT v4.0 Capabilities**

• Advanced pentesting guidance
• Custom security tool generation
• Vulnerability analysis
• Network security assessment
• Web application testing
• Code examples and scripts

What would you like me to help you with?`;
    }

    return "🤖 **Advanced AI Assistant Active**\n\nHow can I assist you with cybersecurity today?";
  }

  generateToolResponse(query, analysis) {
    const tools = {
      port_scanner: this.generatePortScanner(),
      vulnerability_scanner: this.generateVulnerabilityScanner(),
      hash_cracker: this.generateHashCracker()
    };

    let selectedTool = 'port_scanner';
    
    if (query.includes('vulnerability') || query.includes('vuln')) {
      selectedTool = 'vulnerability_scanner';
    } else if (query.includes('hash') || query.includes('crack')) {
      selectedTool = 'hash_cracker';
    }

    const tool = tools[selectedTool];
    const toolName = selectedTool.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    return `🛠️ **${toolName} - Advanced Tool**\n\n\`\`\`bash\n${tool}\n\`\`\`\n\n**Usage:**\n1. Save as .sh file\n2. Run: chmod +x filename.sh\n3. Execute with parameters\n\n---\n*Created by ShadowGPT Advanced AI*`;
  }

  generateTechnicalResponse(query, analysis) {
    let response = "🔍 **Technical Analysis**\n\n";
    
    if (analysis.category !== 'general') {
      const categoryKnowledge = this.getCategoryKnowledge(analysis.category);
      response += categoryKnowledge + '\n\n';
    }

    if (analysis.topics.length > 0) {
      response += "**Relevant Topics:**\n";
      analysis.topics.forEach(topic => {
        const topicInfo = this.getTopicInformation(topic);
        if (topicInfo) {
          response += `\n${topicInfo}\n`;
        }
      });
    }

    if (analysis.complexity === 'high') {
      response += `\n**Advanced Guidance:**\n`;
      response += this.getAdvancedGuidance(analysis.topics[0] || 'general');
    }

    response += `\n\n---\n*ShadowGPT v4.0 - AI Analysis*`;

    return response;
  }

  getCategoryKnowledge(category) {
    const knowledge = this.knowledgeBase[category];
    if (!knowledge) return '';

    let response = `**${category.toUpperCase()} OVERVIEW**\n\n`;
    
    if (knowledge.basics) {
      response += knowledge.basics + '\n';
    }

    return response;
  }

  getTopicInformation(topic) {
    for (const [category, data] of Object.entries(this.knowledgeBase)) {
      for (const [subcategory, content] of Object.entries(data)) {
        if (typeof content === 'object' && content[topic]) {
          return content[topic];
        }
      }
    }
    return null;
  }

  getAdvancedGuidance(topic) {
    const advancedGuidance = {
      'sql injection': `**Advanced SQL Injection:**\n• Time-Based Blind SQLi\n• Out-of-Band SQLi\n• Second-Order SQLi\n\n**Tools:** SQLMap, Burp Suite`,

      'nmap': `**Advanced Nmap:**\n• Firewall Evasion\n• Service Detection\n• NSE Scripting\n\n**Commands:** nmap -sS -A target`,

      'general': `**Advanced Pentesting:**\n1. Threat Modeling\n2. Attack Surface Analysis\n3. Vulnerability Correlation\n4. Lateral Movement`
    };

    return advancedGuidance[topic] || advancedGuidance['general'];
  }

  // Tool Generation Methods
  generatePortScanner() {
    return `#!/bin/bash
TARGET=$1
echo "Scanning $TARGET"
for port in {1..1000}; do
  (echo >/dev/tcp/$TARGET/$port) 2>/dev/null && echo "Port $port: OPEN"
done
echo "Scan completed!"`;
  }

  generateVulnerabilityScanner() {
    return `#!/bin/bash
TARGET=$1
echo "Testing $TARGET"
echo "SQL Injection test..."
curl -s "$TARGET' OR '1'='1" | grep -i "error" && echo "Possible SQLi"
echo "XSS test..."
curl -s "$TARGET<script>alert(1)</script>" | grep -q "<script>" && echo "Possible XSS"
echo "Scan completed!"`;
  }

  generateHashCracker() {
    return `#!/bin/bash
HASH=$1
WORDLIST=$2
echo "Cracking hash: $HASH"
while read password; do
  computed=$(echo -n "$password" | md5sum | cut -d' ' -f1)
  [ "$computed" = "$HASH" ] && echo "Found: $password" && exit
done < "$WORDLIST"
echo "Not found"`;
  }
}
