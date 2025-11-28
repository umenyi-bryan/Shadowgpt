import { NextResponse } from 'next/server';

class AdvancedPentestingAI {
  constructor() {
    this.knowledgeBase = this.initializeKnowledge();
    this.toolTemplates = this.initializeToolTemplates();
  }

  initializeKnowledge() {
    return {
      // Pentesting Methodology
      "methodology": {
        "reconnaissance": "Passive & active information gathering: WHOIS, DNS enumeration, subdomain discovery, OSINT",
        "scanning": "Network scanning (Nmap), vulnerability scanning (Nessus), web app scanning (Burp Suite)",
        "exploitation": "Metasploit, custom exploits, social engineering, password attacks",
        "post_exploitation": "Privilege escalation, persistence, lateral movement, data exfiltration",
        "reporting": "Vulnerability documentation, risk assessment, remediation guidance"
      },

      // Tools Database
      "tools": {
        "nmap": "Network mapping and security auditing",
        "metasploit": "Penetration testing framework",
        "burpsuite": "Web application security testing",
        "wireshark": "Network protocol analyzer",
        "sqlmap": "Automatic SQL injection tool",
        "john": "Password cracking tool",
        "hashcat": "Advanced password recovery",
        "aircrack": "WiFi security auditing",
        "nessus": "Vulnerability scanner",
        "metasploit": "Exploitation framework"
      },

      // Vulnerability Database
      "vulnerabilities": {
        "sql_injection": "Injection attack that allows execution of malicious SQL statements",
        "xss": "Cross-site scripting - client-side code injection",
        "csrf": "Cross-site request forgery - unauthorized commands transmission",
        "rce": "Remote code execution - arbitrary code execution on target",
        "lfi": "Local file inclusion - reading local files",
        "rfi": "Remote file inclusion - including remote files",
        "xxe": "XML external entity - XML processor vulnerability",
        "ssrf": "Server-side request forgery - making requests from server",
        "idor": "Insecure direct object reference - unauthorized access to objects"
      },

      // Programming & Scripting
      "programming": {
        "python": "Best for automation, exploit development, and tool creation",
        "bash": "System administration, automation, and quick scripts",
        "powershell": "Windows administration and exploitation",
        "javascript": "Web exploitation and Node.js security",
        "sql": "Database manipulation and injection testing"
      }
    };
  }

  initializeToolTemplates() {
    return {
      "port_scanner": `#!/bin/bash
# Advanced Port Scanner by ShadowGPT
# Usage: ./port_scanner.sh <target> <start_port> <end_port>

TARGET=$1
START=$2
END=$3

echo "🔍 Scanning $TARGET from port $START to $END"
echo "=========================================="

for port in $(seq $START $END); do
  (echo >/dev/tcp/$TARGET/$port) >/dev/null 2>&1 && echo "✅ Port $port - OPEN" &
done

wait
echo "🎯 Scan completed!"`,

      "vulnerability_scanner": `#!/bin/bash
# Basic Web Vulnerability Scanner by ShadowGPT
# Usage: ./vuln_scanner.sh <target_url>

TARGET=$1

echo "🛡️ Scanning $TARGET for common vulnerabilities"
echo "=============================================="

# Check for SQL injection points
echo "🔍 Testing for SQL Injection..."
curl -s "$TARGET" | grep -i "error\\|exception\\|sql" && echo "⚠️ Possible SQL injection vector"

# Check for XSS
echo "🔍 Testing for XSS vulnerabilities..."
curl -s "$TARGET" | grep -i "script\\|alert\\|document.cookie" && echo "⚠️ Possible XSS vector"

# Check directory listing
echo "🔍 Checking for directory listing..."
curl -s "$TARGET/admin/" | grep -i "index of" && echo "⚠️ Directory listing enabled"

echo "🎯 Basic scan completed!"`,

      "hash_cracker": `#!/bin/bash
# Hash Cracker by ShadowGPT
# Usage: ./hash_cracker.sh <hash> <wordlist>

HASH=$1
WORDLIST=$2

echo "🔓 Attempting to crack hash: $HASH"
echo "=================================="

while read password; do
  if echo -n "$password" | md5sum | cut -d' ' -f1 | grep -q "$HASH"; then
    echo "✅ Password found: $password"
    exit 0
  fi
done < "$WORDLIST"

echo "❌ Password not found in wordlist"`,

      "network_monitor": `#!/bin/python3
# Network Traffic Monitor by ShadowGPT
import socket
import struct
import textwrap

def main():
    conn = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.ntohs(3))
    
    while True:
        raw_data, addr = conn.recvfrom(65536)
        dest_mac, src_mac, eth_proto, data = ethernet_frame(raw_data)
        print(f'📡 Ethernet Frame:')
        print(f'   Destination: {dest_mac}, Source: {src_mac}, Protocol: {eth_proto}')

def ethernet_frame(data):
    dest_mac, src_mac, proto = struct.unpack('! 6s 6s H', data[:14])
    return get_mac_addr(dest_mac), get_mac_addr(src_mac), socket.htons(proto), data[14:]

def get_mac_addr(bytes_addr):
    return ':'.join(map('{:02x}'.format, bytes_addr)).upper()

if __name__ == "__main__":
    main()`
    };
  }

  generateTool(toolType, parameters = {}) {
    let template = this.toolTemplates[toolType];
    
    if (!template) {
      return "❌ Tool template not found. Available tools: " + Object.keys(this.toolTemplates).join(", ");
    }

    // Replace placeholders with actual parameters
    Object.keys(parameters).forEach(key => {
      template = template.replace(new RegExp(`{{${key}}}`, 'g'), parameters[key]);
    });

    return template;
  }

  analyzeQuestion(question) {
    const lowerQuestion = question.toLowerCase();
    
    // Tool creation requests
    if (lowerQuestion.includes('create tool') || lowerQuestion.includes('make tool') || lowerQuestion.includes('generate tool')) {
      if (lowerQuestion.includes('port scan')) {
        return {
          type: 'tool',
          tool: 'port_scanner',
          parameters: { target: '192.168.1.1', start_port: '1', end_port: '1000' }
        };
      }
      if (lowerQuestion.includes('vulnerability') || lowerQuestion.includes('vuln')) {
        return {
          type: 'tool',
          tool: 'vulnerability_scanner',
          parameters: { target_url: 'http://example.com' }
        };
      }
      if (lowerQuestion.includes('hash') || lowerQuestion.includes('crack')) {
        return {
          type: 'tool',
          tool: 'hash_cracker',
          parameters: { hash: '5d41402abc4b2a76b9719d911017c592', wordlist: 'passwords.txt' }
        };
      }
      if (lowerQuestion.includes('network') || lowerQuestion.includes('monitor')) {
        return {
          type: 'tool',
          tool: 'network_monitor',
          parameters: {}
        };
      }
    }

    // Casual conversation
    if (this.isCasualQuestion(lowerQuestion)) {
      return { type: 'casual', question: lowerQuestion };
    }

    // Technical questions
    return { type: 'technical', question: lowerQuestion };
  }

  isCasualQuestion(question) {
    const casualKeywords = [
      'hello', 'hi', 'hey', 'how are you', 'what\'s up', 'good morning',
      'good afternoon', 'good evening', 'thanks', 'thank you', 'bye',
      'goodbye', 'who are you', 'what can you do', 'help'
    ];
    
    return casualKeywords.some(keyword => question.includes(keyword));
  }

  generateCasualResponse(question) {
    const responses = {
      greeting: "🛡️ Hello! I'm ShadowGPT, your advanced pentesting AI assistant created by **bedusec**. How can I help you with cybersecurity today?",
      how_are_you: "⚡ I'm functioning at optimal capacity! Ready to assist with pentesting, tool creation, or security analysis. What's on your mind?",
      thanks: "🎯 You're welcome! Remember to always use these skills ethically and with proper authorization.",
      goodbye: "🔒 Stay secure! Feel free to return anytime you need assistance with ethical hacking or cybersecurity.",
      capabilities: `🔮 **My Capabilities:**

• **Pentesting Guidance** - Full methodology from reconnaissance to reporting
• **Tool Creation** - Generate custom security tools in Bash, Python, etc.
• **Vulnerability Analysis** - Detailed explanations of security flaws
• **Code Review** - Security analysis of code snippets
• **Casual Chat** - Normal conversation alongside technical topics
• **Educational Resources** - Learning paths and best practices

What would you like to explore?`,
      help: `🆘 **Available Commands:**

**Technical:**
- "Create a port scanner"
- "Explain SQL injection"
- "How to use Metasploit"
- "Generate hash cracker tool"
- "Web app testing methodology"

**Casual:**
- "Hello" / "Hi"
- "How are you?"
- "What can you do?"
- "Thank you"
- "Goodbye"

**Tool Generation:**
- "Make a vulnerability scanner"
- "Create network monitor"
- "Generate password cracker"

Ask me anything!`
    };

    if (question.includes('hello') || question.includes('hi') || question.includes('hey')) {
      return responses.greeting;
    }
    if (question.includes('how are you')) {
      return responses.how_are_you;
    }
    if (question.includes('thank')) {
      return responses.thanks;
    }
    if (question.includes('bye') || question.includes('goodbye')) {
      return responses.goodbye;
    }
    if (question.includes('what can you do') || question.includes('capabilities')) {
      return responses.capabilities;
    }
    if (question.includes('help')) {
      return responses.help;
    }

    return "🤖 I'm here to help with pentesting, tool creation, or casual conversation! What would you like to know?";
  }

  generateTechnicalResponse(question) {
    let response = "";
    
    // Comprehensive response based on question type
    if (question.includes('sql') && question.includes('injection')) {
      response = this.getSQLInjectionGuide();
    } else if (question.includes('nmap') || question.includes('port scan')) {
      response = this.getNmapGuide();
    } else if (question.includes('metasploit')) {
      response = this.getMetasploitGuide();
    } else if (question.includes('burp') || question.includes('burp suite')) {
      response = this.getBurpSuiteGuide();
    } else if (question.includes('xss')) {
      response = this.getXSSGuide();
    } else if (question.includes('csrf')) {
      response = this.getCSRFGuide();
    } else {
      // General pentesting knowledge
      response = this.getGeneralPentestingResponse(question);
    }

    return response;
  }

  getSQLInjectionGuide() {
    return `🔍 **ADVANCED SQL INJECTION MASTER GUIDE**

**Types of SQL Injection:**
1. **Classic SQLi** - Union-based attacks
2. **Blind SQLi** - No direct output, infer from behavior
3. **Boolean-based Blind** - True/False responses
4. **Time-based Blind** - Timing delays
5. **Out-of-band** - External channel data exfiltration

**Advanced Payloads:**
\`\`\`sql
-- Union-based
' UNION SELECT 1,2,3-- 
' UNION SELECT username,password,NULL FROM users--

-- Boolean-based
' AND 1=1-- 
' AND SUBSTRING(@@version,1,1)='5'

-- Time-based
'; IF SYSTEM_USER='sa' WAITFOR DELAY '0:0:5'--

-- Error-based
' AND GTID_SUBSET(@@version,1)-- 
\`\`\`

**Automation with SQLmap:**
\`\`\`bash
sqlmap -u "http://site.com/page?id=1" --dbs
sqlmap -u "http://site.com/page?id=1" -D database --tables
sqlmap -u "http://site.com/page?id=1" -D database -T users --dump
\`\`\`

**Prevention:**
• Parameterized queries
• Input validation
• Web Application Firewall (WAF)
• Regular security testing`;
  }

  getNmapGuide() {
    return `📡 **NMAP - PROFESSIONAL NETWORK SCANNING**

**Comprehensive Scanning:**
\`\`\`bash
# Stealth Scanning
nmap -sS -T4 -A -O target.com

# UDP Scanning  
nmap -sU -p 1-1000 target.com

# Version Detection
nmap -sV --version-intensity 9 target.com

# NSE Scripting
nmap --script vuln,safe,discovery target.com
nmap --script http-* target.com

# Firewall Evasion
nmap -f -D RND:10 --data-length 50 target.com
\`\`\`

**Advanced Techniques:**
• **Idle Scan** (-sI) - Use zombie host for scanning
• **Fragment Packets** (-f) - Bypass packet inspection
• **Spoof MAC** (-spoof-mac) - MAC address randomization
• **Timing Templates** (-T0 to -T5) - Scan speed control

**Output Formats:**
\`\`\`bash
nmap -oN normal.txt target.com
nmap -oX xml_output.xml target.com  
nmap -oG grepable.txt target.com
\`\`\``;
  }

  getGeneralPentestingResponse(question) {
    return `🔮 **SHADOWGPT ANALYSIS**

**Query:** "${question}"

**Comprehensive Response:**

Based on your question, here's detailed guidance:

**Pentesting Methodology:**
1. **Reconnaissance** - Gather intelligence about target
2. **Scanning** - Discover vulnerabilities and services  
3. **Gaining Access** - Exploit vulnerabilities
4. **Maintaining Access** - Establish persistence
5. **Covering Tracks** - Remove evidence of presence

**Essential Tools:**
• **Nmap** - Network discovery and security auditing
• **Metasploit** - Penetration testing framework
• **Burp Suite** - Web application security testing
• **Wireshark** - Network protocol analysis
• **John the Ripper** - Password cracking

**Common Vulnerabilities:**
• SQL Injection
• Cross-Site Scripting (XSS)
• Cross-Site Request Forgery (CSRF)
• Remote Code Execution (RCE)
• Insecure Direct Object References (IDOR)

**Need something specific?** Ask about:
- Creating custom security tools
- Specific vulnerability explanations  
- Tool usage guides
- Methodology deep dives
- Code examples and scripts

---
*Created by **bedusec** - Advanced Pentesting AI*
*⚠️ Educational Use Only - Always Obtain Proper Authorization*`;
  }

  async processMessage(message) {
    const analysis = this.analyzeQuestion(message);
    
    let response = "";

    switch (analysis.type) {
      case 'tool':
        response = `🛠️ **TOOL GENERATED - ${analysis.tool.toUpperCase()}**\n\n` +
                  this.generateTool(analysis.tool, analysis.parameters) +
                  `\n\n---\n*Save as .sh/.py file and make executable: chmod +x scriptname*\n*Usage instructions included in comments*`;
        break;
      
      case 'casual':
        response = this.generateCasualResponse(analysis.question);
        break;
      
      case 'technical':
        response = this.generateTechnicalResponse(analysis.question);
        break;
      
      default:
        response = this.generateTechnicalResponse(message);
    }

    return response;
  }
}

export async function POST(request) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    const ai = new AdvancedPentestingAI();
    const response = await ai.processMessage(message);

    return NextResponse.json({ 
      response,
      type: message.toLowerCase().includes('tool') ? 'tool' : 'response'
    });
    
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
