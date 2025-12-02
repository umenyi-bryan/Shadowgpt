// Natural Language Processing Engine for ShadowGPT
class AIEngine {
  constructor() {
    this.context = {
      language: 'en',
      expertise: 'advanced',
      tone: 'professional-hacker',
      history: []
    };
  }

  // Natural language understanding
  understandQuery(input) {
    const query = input.toLowerCase().trim();
    
    // Categories for understanding intent
    const categories = {
      greeting: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon'],
      help: ['help', 'what can you do', 'capabilities', 'features'],
      technical: ['how to', 'tutorial', 'explain', 'what is', 'guide'],
      tools: ['tool', 'nmap', 'metasploit', 'burp', 'wireshark', 'scan', 'exploit'],
      coding: ['code', 'script', 'python', 'bash', 'javascript', 'write'],
      security: ['secure', 'protect', 'vulnerability', 'attack', 'defense', 'hack'],
      casual: ['thanks', 'thank you', 'bye', 'goodbye', 'cool', 'awesome']
    };

    // Detect intent
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => query.includes(keyword))) {
        return { category, query };
      }
    }
    
    return { category: 'general', query };
  }

  // Generate natural responses
  generateResponse(userInput) {
    const { category, query } = this.understandQuery(userInput);
    this.context.history.push({ query: userInput, category });
    
    // Keep only last 10 messages for context
    if (this.context.history.length > 10) {
      this.context.history = this.context.history.slice(-10);
    }

    // Natural response generation based on category
    switch(category) {
      case 'greeting':
        return this.greetUser();
      case 'help':
        return this.showCapabilities();
      case 'technical':
        return this.answerTechnical(query);
      case 'tools':
        return this.talkAboutTools(query);
      case 'coding':
        return this.provideCode(query);
      case 'security':
        return this.discussSecurity(query);
      case 'casual':
        return this.casualResponse(query);
      default:
        return this.generalResponse(query);
    }
  }

  // Dynamic greeting based on time
  greetUser() {
    const hour = new Date().getHours();
    let timeGreeting = '';
    
    if (hour < 12) timeGreeting = 'Good morning';
    else if (hour < 18) timeGreeting = 'Good afternoon';
    else timeGreeting = 'Good evening';

    const greetings = [
      `🛡️ **${timeGreeting}!** I'm ShadowGPT v6.0, your advanced pentesting AI. What security challenges are you working on today?`,
      `⚡ **${timeGreeting}, hacker!** ShadowGPT v6.0 here. Ready to assist with cybersecurity operations. What's on your mind?`,
      `🔐 **${timeGreeting}.** ShadowGPT v6.0 activated. I speak 6 languages and have real-time security intelligence. How can I help?`
    ];
    
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // Show capabilities naturally
  showCapabilities() {
    const responses = [
      `🔮 **I'm ShadowGPT v6.0 - Ultimate Pentesting AI**\n\nI can help you with:\n\n• **Real-time vulnerability analysis**\n• **Exploit development guidance**\n• **Security tool automation**\n• **Code review & debugging**\n• **Multi-language support**\n• **CTF challenge solving**\n\n**Try asking me:** "How do I scan for open ports?" or "Show me SQL injection examples"`,
      `💻 **My capabilities include:**\n\n• **Network reconnaissance**\n• **Web app penetration testing**\n• **Reverse engineering basics**\n• **Cryptography concepts**\n• **Incident response**\n• **Security best practices**\n\n**Example questions:** "Explain XSS attacks" or "Help me write a Python scanner"`,
      `🎯 **As your pentesting AI, I can:**\n\n• Analyze your security queries\n• Provide step-by-step guides\n• Generate exploit code\n• Explain complex concepts\n• Recommend security tools\n• Help with CTF solutions\n\n**What would you like to explore first?**`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Answer technical questions
  answerTechnical(query) {
    const technicalTopics = {
      'nmap': `**Nmap Scanning Guide:**\n\nBasic scan: \`nmap target.com\`\nStealth scan: \`nmap -sS target.com\`\nVersion detection: \`nmap -sV target.com\`\nOS detection: \`nmap -O target.com\`\nFull scan: \`nmap -sS -sV -O -p- target.com\``,
      'sql injection': `**SQL Injection Basics:**\n\nTest: \`' OR '1'='1\`\nUnion based: \`' UNION SELECT null, username, password FROM users--\`\nTime-based: \`' OR SLEEP(5)--\`\n\n**Always test on authorized systems only!**`,
      'xss': `**XSS Attack Types:**\n\n1. **Reflected XSS:** \`<script>alert(1)</script>\`\n2. **Stored XSS:** Injects into database\n3. **DOM XSS:** Client-side execution\n\n**Protection:** Use Content Security Policy (CSP) and input validation.`,
      'metasploit': `**Metasploit Basics:**\n\nStart: \`msfconsole\`\nSearch exploits: \`search [service/version]\`\nUse module: \`use exploit/path\`\nSet options: \`set RHOSTS target.com\`\nExecute: \`exploit\`\n\n**For authorized testing only!**`
    };

    for (const [topic, response] of Object.entries(technicalTopics)) {
      if (query.includes(topic)) {
        return response;
      }
    }

    // General technical response
    const generalResponses = [
      `🔍 **Technical Guidance:**\n\nCould you be more specific about what you need help with? I can assist with:\n• Network scanning techniques\n• Vulnerability exploitation\n• Security tool usage\n• Code analysis\n• Security concepts\n\n**Try asking:** "How do I use Nmap?" or "Explain buffer overflow"`,
      `💡 **I need more details to help you properly.**\n\nAre you looking for:\n1. A specific tool tutorial?\n2. Exploit development help?\n3. Security concept explanation?\n4. Code implementation?\n\n**Example:** "Show me how to brute force with Hydra"`,
      `📚 **Let me help you with that technical question.**\n\nPlease specify:\n• What tool are you using?\n• What's your target environment?\n• What have you tried so far?\n• Any error messages?\n\nThis helps me give you precise guidance.`
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  }

  // Talk about security tools
  talkAboutTools(query) {
    const tools = {
      'nmap': `**Nmap (Network Mapper)**\n\nEssential commands:\n• Quick scan: \`nmap -F target.com\`\n• Service detection: \`nmap -sV -sC target.com\`\n• Output to file: \`nmap -oN scan.txt target.com\`\n• Aggressive scan: \`nmap -A target.com\``,
      'metasploit': `**Metasploit Framework**\n\nWorkflow:\n1. \`msfconsole\` - Start framework\n2. \`search [vulnerability]\` - Find exploits\n3. \`use [exploit]\` - Load module\n4. \`show options\` - Configure\n5. \`set [option] [value]\` - Set parameters\n6. \`exploit\` - Run\n\n**Ethical use only!**`,
      'burp': `**Burp Suite**\n\nFeatures:\n• Proxy for traffic interception\n• Scanner for vulnerabilities\n• Intruder for fuzzing\n• Repeater for request manipulation\n• Decoder for data transformation\n\n**Tip:** Always configure your browser proxy to 127.0.0.1:8080`,
      'wireshark': `**Wireshark**\n\nUsage:\n• Capture on interface: Select interface → Start\n• Filter: \`tcp.port == 80\` or \`ip.addr == x.x.x.x\`\n• Follow TCP stream: Right-click → Follow → TCP Stream\n• Export objects: File → Export Objects → HTTP`
    };

    for (const [tool, response] of Object.entries(tools)) {
      if (query.includes(tool)) {
        return response;
      }
    }

    return `🔧 **Security Tools**\n\nI can help you with:\n• **Nmap** - Network scanning\n• **Metasploit** - Exploit framework\n• **Burp Suite** - Web app testing\n• **Wireshark** - Packet analysis\n• **Hydra** - Password cracking\n• **John the Ripper** - Hash cracking\n\n**Ask about a specific tool** for detailed guidance.`;
  }

  // Provide code examples
  provideCode(query) {
    const codeExamples = {
      'python port scanner': `**Python Port Scanner:**
\`\`\`python
import socket
from concurrent.futures import ThreadPoolExecutor

def scan_port(host, port):
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.settimeout(1)
            if s.connect_ex((host, port)) == 0:
                print(f"Port {port} is OPEN")
                return port
    except:
        pass
    return None

def main():
    host = "127.0.0.1"  # Replace with target
    ports = range(1, 1025)
    
    with ThreadPoolExecutor(max_workers=100) as executor:
        results = executor.map(lambda p: scan_port(host, p), ports)
    
    open_ports = [p for p in results if p]
    print(f"Found {len(open_ports)} open ports")

if __name__ == "__main__":
    main()
\`\`\``,
      'bash automation': `**Bash Automation Script:**
\`\`\`bash
#!/bin/bash

# Simple security automation script
TARGET="$1"
OUTPUT_DIR="scan_results_$(date +%Y%m%d_%H%M%S)"

# Create output directory
mkdir -p "$OUTPUT_DIR"

echo "[*] Starting security assessment of $TARGET"
echo "[*] Results will be saved to: $OUTPUT_DIR"

# Nmap scan
echo "[*] Running Nmap scan..."
nmap -sS -sV -O -p- -T4 -oN "$OUTPUT_DIR/nmap_full.txt" "$TARGET"

# Check for web servers
echo "[*] Checking for web services..."
if grep -q "80/tcp\|443/tcp" "$OUTPUT_DIR/nmap_full.txt"; then
    echo "[*] Web server detected, running Nikto..."
    nikto -h "http://$TARGET" -output "$OUTPUT_DIR/nikto_scan.txt"
fi

echo "[+] Assessment complete!"
echo "[+] Results in: $OUTPUT_DIR"
\`\`\``
    };

    for (const [topic, code] of Object.entries(codeExamples)) {
      if (query.includes('python') || query.includes('port scan')) {
        return codeExamples['python port scanner'];
      }
      if (query.includes('bash') || query.includes('script') || query.includes('automation')) {
        return codeExamples['bash automation'];
      }
    }

    return `💻 **I can help you write security scripts in:**\n\n• **Python** - Port scanners, exploit scripts\n• **Bash** - Automation, tool chaining\n• **JavaScript** - Web security testing\n• **SQL** - Database security queries\n\n**Try asking:** "Show me a Python port scanner" or "Help me write a bash automation script"`;
  }

  // Discuss security topics
  discussSecurity(query) {
    if (query.includes('protect') || query.includes('secure') || query.includes('defense')) {
      return `🛡️ **Security Best Practices:**\n\n1. **Network Security:**\n   • Use firewalls (iptables/nftables)\n   • Implement IDS/IPS (Snort/Suricata)\n   • Regular vulnerability scans\n\n2. **System Security:**\n   • Keep systems updated\n   • Use strong authentication (2FA)\n   • Principle of least privilege\n\n3. **Application Security:**\n   • Input validation\n   • Output encoding\n   • Secure session management\n\n4. **Monitoring:**\n   • Log analysis\n   • SIEM implementation\n   • Regular audits`;
    }

    if (query.includes('vulnerability') || query.includes('weakness')) {
      return `🔓 **Common Vulnerabilities:**\n\n1. **OWASP Top 10:**\n   • Injection flaws\n   • Broken authentication\n   • Sensitive data exposure\n   • XML external entities\n   • Broken access control\n   • Security misconfiguration\n   • Cross-site scripting\n   • Insecure deserialization\n   • Using components with known vulnerabilities\n   • Insufficient logging\n\n**Always test ethically with proper authorization!**`;
    }

    return `🔐 **Cybersecurity Topics:**\n\nI can discuss:\n• **Attack vectors** and mitigation\n• **Security frameworks** (NIST, ISO 27001)\n• **Incident response** procedures\n• **Risk assessment** methodologies\n• **Compliance requirements**\n\n**What specific security topic interests you?**`;
  }

  // Casual responses
  casualResponse(query) {
    if (query.includes('thank') || query.includes('thanks')) {
      const thanksResponses = [
        "🎯 **You're welcome!** Always happy to help with cybersecurity challenges.",
        "⚡ **Anytime!** Remember to follow ethical guidelines in all security testing.",
        "🛡️ **Glad I could help!** Stay curious, stay secure.",
        "💻 **No problem!** Let me know if you need anything else."
      ];
      return thanksResponses[Math.floor(Math.random() * thanksResponses.length)];
    }

    if (query.includes('bye') || query.includes('goodbye')) {
      return `🔐 **Stay secure out there!**\n\nRemember:\n• Always get proper authorization\n• Document your findings\n• Follow responsible disclosure\n\n**ShadowGPT v6.0 signing off!**`;
    }

    const casualResponses = [
      "⚡ **Got it!** What's next on your security journey?",
      "🔍 **Interesting!** Want to dive deeper into that topic?",
      "💻 **Cool!** Ready for the next challenge?",
      "🎯 **Awesome!** What security concept should we explore next?"
    ];
    
    return casualResponses[Math.floor(Math.random() * casualResponses.length)];
  }

  // General fallback response
  generalResponse(query) {
    const generalResponses = [
      `🤔 **I want to make sure I understand correctly.**\n\nAre you asking about:\n• A specific security tool?\n• How to perform a certain test?\n• Explaining a security concept?\n• Help with writing code?\n\n**Try rephrasing or asking:** "How do I..." or "Explain..."`,
      `🔮 **Let me help you better.** Could you provide more context?\n\nExamples:\n• "How do I scan a network with Nmap?"\n• "Explain SQL injection with examples"\n• "Show me Python code for port scanning"\n• "What's the best way to secure a web server?"`,
      `💡 **I'm here to help with cybersecurity topics.**\n\nI specialize in:\n• Penetration testing guidance\n• Security tool tutorials\n• Code review and debugging\n• Security concept explanations\n• CTF challenge solutions\n\n**What specific help do you need?**`
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  }

  // Change language
  setLanguage(lang) {
    const validLanguages = ['en', 'fr', 'es', 'ru', 'pidgin', 'zh'];
    if (validLanguages.includes(lang)) {
      this.context.language = lang;
      return `🌐 **Language switched to ${this.getLanguageName(lang)}**`;
    }
    return `⚠️ **Unsupported language.** Available: English, Français, Español, Русский, Pidgin, 中文`;
  }

  getLanguageName(code) {
    const languages = {
      'en': 'English 🇺🇸',
      'fr': 'Français 🇫🇷',
      'es': 'Español 🇪🇸',
      'ru': 'Русский 🇷🇺',
      'pidgin': 'Pidgin English 🇳🇬',
      'zh': '中文 🇨🇳'
    };
    return languages[code] || 'English';
  }
}

// Export instance
export const aiEngine = new AIEngine();
export default AIEngine;
