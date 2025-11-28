import { NextResponse } from 'next/server';

// Simple AI Engine for initial deployment
class SimpleAIEngine {
  analyzeQuery(query) {
    const lowerQuery = query.toLowerCase();
    
    return {
      type: this.isCasualQuery(lowerQuery) ? 'casual' : 'technical',
      category: 'general',
      topics: []
    };
  }

  isCasualQuery(query) {
    const casualPatterns = [
      'hello', 'hi', 'hey', 'how are you', 'what\'s up', 'good morning',
      'good afternoon', 'good evening', 'thanks', 'thank you', 'bye',
      'goodbye', 'who are you', 'what can you do', 'help'
    ];
    return casualPatterns.some(pattern => query.includes(pattern));
  }

  generateResponse(query, analysis) {
    if (analysis.type === 'casual') {
      return this.generateCasualResponse(query);
    }
    return this.generateTechnicalResponse(query);
  }

  generateCasualResponse(query) {
    if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
      return "🛡️ **Hello! I'm ShadowGPT v4.0**\n\nYour advanced pentesting AI assistant created by **bedusec**. I can help with cybersecurity topics, tool creation, or just chat!";
    }
    
    if (query.includes('how are you')) {
      return "⚡ **I'm operating at peak efficiency!**\n\nReady to assist with advanced cybersecurity topics. What would you like to explore?";
    }
    
    if (query.includes('thank')) {
      return "🎯 **You're welcome!**\n\nRemember to always obtain proper authorization and follow ethical guidelines.";
    }
    
    if (query.includes('what can you do')) {
      return `🔮 **ShadowGPT v4.0 Capabilities**:

• Advanced penetration testing guidance
• Custom security tool creation
• Vulnerability analysis and exploitation
• Network security assessment
• Web application security testing
• Code examples and scripts
• Casual conversation

What would you like me to help you with?`;
    }

    return "🤖 **I'm here to help!**\n\nI can assist with cybersecurity topics, create custom tools, or just have a conversation.";
  }

  generateTechnicalResponse(query) {
    const knowledgeBase = {
      'sql injection': `🔍 **SQL INJECTION - COMPREHENSIVE GUIDE**

**Definition:** SQL Injection is a web security vulnerability that allows attackers to interfere with database queries.

**Types:**
• Classic SQLi
• Blind SQLi  
• Boolean-based Blind
• Time-based Blind
• Out-of-band SQLi

**Testing Methodology:**
1. Identify injection points
2. Test with basic payloads: ' OR 1=1 --
3. Determine database type
4. Extract database structure
5. Retrieve sensitive data

**Prevention:**
• Use parameterized queries
• Implement input validation
• Use ORM frameworks
• Apply principle of least privilege`,

      'nmap': `📡 **NMAP - NETWORK MAPPING MASTER**

**Essential Commands:**
\`\`\`bash
# Stealth SYN Scan
nmap -sS 192.168.1.0/24

# Comprehensive Scan  
nmap -A -T4 target.com

# Version Detection + OS Fingerprinting
nmap -sV -O target.com

# UDP Services Scan
nmap -sU -p 1-1000 target.com

# Script Scanning
nmap --script vuln target.com
\`\`\``,

      'metasploit': `⚡ **METASPLOIT FRAMEWORK**

**Workflow:**
1. Reconnaissance
2. Vulnerability Analysis  
3. Exploitation
4. Post-Exploitation
5. Reporting

**Essential Commands:**
\`\`\`bash
msf6 > search eternalblue
msf6 > use exploit/windows/smb/ms17_010_eternalblue
msf6 > set RHOSTS 192.168.1.100
msf6 > set PAYLOAD windows/x64/meterpreter/reverse_tcp
msf6 > exploit
\`\`\``,

      'burp suite': `🌐 **BURP SUITE - WEB APPLICATION TESTING**

**Core Components:**
• Proxy: Intercept and modify requests
• Scanner: Automated vulnerability detection  
• Intruder: Customized attack automation
• Repeater: Manual request manipulation
• Sequencer: Session token analysis`,

      'owasp top 10': `🛡️ **OWASP TOP 10 2021**

1. Broken Access Control
2. Cryptographic Failures  
3. Injection
4. Insecure Design
5. Security Misconfiguration
6. Vulnerable Components
7. Authentication Failures
8. Software Integrity Failures
9. Security Logging Failures
10. Server-Side Request Forgery`
    };

    const lowerQuery = query.toLowerCase();
    
    // Find matching topic
    for (const [topic, info] of Object.entries(knowledgeBase)) {
      if (lowerQuery.includes(topic)) {
        return `${info}\n\n---\n*ShadowGPT v4.0 - Created by bedusec*\n*For educational purposes only*`;
      }
    }

    // Default technical response
    return `🔮 **SHADOWGPT v4.0 ANALYSIS**

**Query:** "${query}"

**Comprehensive Response:**

I understand you're asking about cybersecurity topics. Here's what I can help you with:

**Pentesting Methodology:**
• Reconnaissance and intelligence gathering
• Vulnerability scanning and analysis
• Exploitation techniques
• Post-exploitation and persistence
• Reporting and documentation

**Common Topics:**
• SQL Injection and prevention
• Nmap network scanning
• Metasploit framework usage
• Burp Suite web testing
• OWASP Top 10 vulnerabilities
• Custom tool creation

**Need something specific?** Try asking about:
- "Create a port scanner tool"
- "Explain SQL injection in detail" 
- "How to use Nmap for stealth scanning"
- "Web application testing methodology"

---
*Created by **bedusec** - Advanced Pentesting AI*
*⚠️ Educational Use Only - Always Obtain Proper Authorization*`;
  }

  generateTool(toolType) {
    const tools = {
      port_scanner: `#!/bin/bash
# Port Scanner by ShadowGPT
# Usage: ./port_scanner.sh <target>

TARGET=$1
echo "🔍 Scanning $TARGET..."

for port in {1..1000}; do
  (echo >/dev/tcp/$TARGET/$port) 2>/dev/null && echo "✅ Port $port - OPEN"
done

echo "🎯 Scan completed!"`,

      vulnerability_scanner: `#!/bin/bash
# Web Vulnerability Scanner by ShadowGPT
# Usage: ./vuln_scanner.sh <target_url>

TARGET=$1
echo "🛡️ Scanning $TARGET..."

echo "🔍 Testing SQL Injection..."
curl -s "$TARGET' OR '1'='1" | grep -i "error\\|sql" && echo "⚠️ Possible SQLi"

echo "🔍 Testing XSS..."
curl -s "$TARGET<script>alert(1)</script>" | grep -q "<script>" && echo "⚠️ Possible XSS"

echo "🎯 Basic scan completed!"`,

      hash_cracker: `#!/bin/bash
# Hash Cracker by ShadowGPT
# Usage: ./hash_cracker.sh <hash> <wordlist>

HASH=$1
WORDLIST=$2

echo "🔓 Cracking hash: $HASH"
while read password; do
  if echo -n "$password" | md5sum | cut -d' ' -f1 | grep -q "$HASH"; then
    echo "✅ Password: $password"
    exit 0
  fi
done < "$WORDLIST"

echo "❌ Password not found"`
    };

    return tools[toolType] || "❌ Tool template not found";
  }
}

export async function POST(request) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }

    // Check for tool requests
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('create tool') || lowerMessage.includes('make tool') || lowerMessage.includes('generate tool')) {
      let tool = '';
      if (lowerMessage.includes('port scan')) {
        tool = 'port_scanner';
      } else if (lowerMessage.includes('vulnerability') || lowerMessage.includes('vuln')) {
        tool = 'vulnerability_scanner';
      } else if (lowerMessage.includes('hash') || lowerMessage.includes('crack')) {
        tool = 'hash_cracker';
      }

      if (tool) {
        const ai = new SimpleAIEngine();
        const toolCode = ai.generateTool(tool);
        return NextResponse.json({ 
          response: `🛠️ **Generated Tool**\n\n\`\`\`bash\n${toolCode}\n\`\`\`\n\n**Usage:** Save as .sh file and run: chmod +x filename.sh && ./filename.sh <parameters>\n\n---\n*Created by ShadowGPT - Use responsibly*`,
          type: 'tool'
        });
      }
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    const ai = new SimpleAIEngine();
    const analysis = ai.analyzeQuery(message);
    const response = ai.generateResponse(message, analysis);

    return NextResponse.json({ 
      response,
      type: analysis.type
    });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
