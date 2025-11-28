// Comprehensive Training Data for ShadowGPT
const trainingData = {
  // Cybersecurity Fundamentals
  cybersecurity: {
    basics: {
      cia_triad: "**CIA Triad**: Confidentiality (data privacy), Integrity (data accuracy), Availability (system access)",
      authentication: "**Authentication**: Verifying identity (passwords, 2FA, biometrics)",
      authorization: "**Authorization**: Determining access rights and permissions",
      encryption: "**Encryption**: Converting data to secure format using algorithms like AES, RSA"
    },
    threats: {
      malware: "**Malware Types**: Viruses, Worms, Trojans, Ransomware, Spyware, Rootkits",
      phishing: "**Phishing**: Social engineering attacks via email, SMS, or phone",
      ddos: "**DDoS**: Distributed Denial of Service - overwhelming target with traffic",
      mitm: "**Man-in-the-Middle**: Intercepting communication between two parties"
    }
  },

  // Advanced Pentesting Methodology
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
- Telecommunications`,

      owasp: `**OWASP Testing Guide**:
- Information Gathering
- Configuration Management
- Identity Management
- Authentication Testing
- Authorization Testing
- Session Management
- Input Validation
- Error Handling
- Cryptography
- Business Logic
- Client-side`
    },

    frameworks: {
      metasploit: `**Metasploit Framework Structure**:
- Exploits: Code that uses vulnerabilities
- Payloads: Code that runs after exploitation
- Auxiliary: Scanning, fuzzing, sniffing modules
- Encoders: Evade detection
- NOPs: Keep payload sizes consistent`,

      burp_suite: `**Burp Suite Modules**:
- Target: Site map and scope
- Proxy: Intercept and modify traffic
- Intruder: Customizable attacks
- Repeater: Manual request manipulation
- Sequencer: Analyze token randomness
- Decoder: Encode/decode data
- Comparer: Compare responses
- Extender: Add functionality`,

      nmap: `**Nmap Scanning Techniques**:
- TCP SYN Scan (-sS): Stealth half-open scanning
- TCP Connect Scan (-sT): Full TCP connection
- UDP Scan (-sU): UDP port scanning
- ACK Scan (-sA): Firewall mapping
- Window Scan (-sW): TCP window size analysis
- Maimon Scan (-sM): FIN/ACK scanning`
    }
  },

  // Programming & Scripting
  programming: {
    python: {
      basics: `**Python for Pentesting**:
import socket
import requests
import subprocess
import base64
import hashlib`,

      networking: `**Network Operations**:
# TCP Client
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect(('target.com', 80))

# HTTP Requests
response = requests.get('http://target.com', headers={'User-Agent': 'Mozilla'})

# Subprocess Execution
result = subprocess.check_output(['nmap', '-sS', 'target.com'])`,

      exploitation: `**Basic Exploit Template**:
#!/usr/bin/env python3
import socket
import struct

def exploit(target, port):
    # Create payload
    buffer = b"A" * 1000
    payload = buffer
    
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((target, port))
        s.send(payload)
        response = s.recv(1024)
        return response
    except Exception as e:
        return str(e)`
    },

    bash: {
      automation: `**Bash Automation Scripts**:
#!/bin/bash
# Automated Network Scanner
echo "Starting network reconnaissance..."

# Ping sweep
for ip in {1..254}; do
    ping -c 1 192.168.1.$ip | grep "64 bytes" &
done

# Port scanning function
scan_ports() {
    target=$1
    for port in {1..1000}; do
        (echo >/dev/tcp/$target/$port) 2>/dev/null && echo "Port $port: OPEN"
    done
}`,

      system_info: `**System Information Gathering**:
#!/bin/bash
echo "=== SYSTEM INFORMATION ==="
echo "Hostname: $(hostname)"
echo "Kernel: $(uname -r)"
echo "Users: $(who | wc -l)"
echo "Processes: $(ps aux | wc -l)"
echo "Network Interfaces:"
ip addr show | grep inet
echo "Open Ports:"
netstat -tuln | grep LISTEN`
    },

    powershell: {
      windows: `**PowerShell for Windows Pentesting**:
# System Information
Get-WmiObject -Class Win32_ComputerSystem
Get-Process | Where-Object {$_.CPU -gt 50}

# Network Information
Get-NetTCPConnection | Where-Object {$_.State -eq "Listen"}

# User Management
Get-LocalUser | Where-Object {$_.Enabled -eq $True}

# Service Enumeration
Get-Service | Where-Object {$_.Status -eq "Running"}`,

      active_directory: `**Active Directory Enumeration**:
# Get Domain Information
Get-ADDomain
Get-ADForest

# User Enumeration
Get-ADUser -Filter * -Properties *

# Group Enumeration  
Get-ADGroup -Filter * -Properties *

# Computer Enumeration
Get-ADComputer -Filter * -Properties *`
    }
  },

  // Web Application Security
  web_security: {
    owasp_top_10: {
      a01: `**A01: Broken Access Control**
- Vertical privilege escalation
- Horizontal privilege escalation  
- Insecure direct object references (IDOR)
- Missing function level access control`,

      a02: `**A02: Cryptographic Failures**
- Weak encryption algorithms
- Improper key management
- Clear text transmission of sensitive data
- Weak random number generation`,

      a03: `**A03: Injection**
- SQL Injection
- NoSQL Injection
- Command Injection
- LDAP Injection
- XPath Injection`,

      a07: `**A07: Identification and Authentication Failures**
- Weak password policies
- Session fixation
- Vulnerable forgot password functionality
- Use of default credentials`
    },

    testing_techniques: {
      sql_injection: `**SQL Injection Testing**:
1. Basic: ' OR '1'='1
2. Union-based: ' UNION SELECT 1,2,3--
3. Error-based: ' AND 1=CONVERT(int,(SELECT @@version))--
4. Blind: ' AND SUBSTRING((SELECT password FROM users),1,1)='a
5. Time-based: '; WAITFOR DELAY '0:0:5'--`,

      xss: `**XSS Testing Payloads**:
// Basic XSS
<script>alert('XSS')</script>

// Image XSS
<img src=x onerror=alert('XSS')>

// SVG XSS
<svg onload=alert('XSS')>

// Event Handler
<body onload=alert('XSS')>`,

      csrf: `**CSRF Testing**:
1. Check for CSRF tokens
2. Test token validation
3. Attempt token prediction/reuse
4. Test with missing tokens
5. Verify SameSite cookie attributes`
    }
  },

  // Network Security
  network_security: {
    protocols: {
      tcp_ip: `**TCP/IP Stack**:
- Application Layer (HTTP, FTP, DNS)
- Transport Layer (TCP, UDP)
- Internet Layer (IP, ICMP)
- Network Access Layer (Ethernet, WiFi)`,

      dns: `**DNS Security**:
- DNS Cache Poisoning
- DNS Tunneling
- DNSSEC validation
- DNS over HTTPS/TLS`,

      http_https: `**HTTP/HTTPS**:
- HTTP Methods: GET, POST, PUT, DELETE
- Status Codes: 200, 301, 404, 500
- Headers: Cookies, User-Agent, Referer
- HTTPS: TLS/SSL encryption`
    },

    wireless: {
      wifi_security: `**WiFi Security Types**:
- WEP: Broken, easily crackable
- WPA: Vulnerable to KRACK attacks
- WPA2: Current standard
- WPA3: Latest, most secure`,

      attacks: `**Wireless Attacks**:
- Evil Twin: Rogue access point
- Deauthentication: Force reconnection
- KRACK: Key reinstallation attacks
- WPS PIN: Brute force WPS pins`
    }
  },

  // Operating System Security
  os_security: {
    windows: {
      hardening: `**Windows Hardening**:
- Disable unnecessary services
- Configure Windows Firewall
- Enable BitLocker encryption
- Implement AppLocker policies
- Regular patch management`,

      enumeration: `**Windows Enumeration**:
systeminfo
net user
net localgroup administrators
net share
tasklist /svc`
    },

    linux: {
      security: `**Linux Security**:
- SELinux/AppArmor mandatory access control
- iptables/nftables firewall
- fail2ban for SSH protection
- Regular updates with apt/yum
- File integrity monitoring with AIDE`,

      commands: `**Linux Security Commands**:
# Process monitoring
ps aux | grep suspicious
lsof -i :80

# File permissions
find / -perm -4000 2>/dev/null  # SUID files
find / -writable 2>/dev/null    # World-writable files

# Network monitoring
netstat -tuln
ss -tuln`
    }
  },

  // Social Engineering
  social_engineering: {
    techniques: {
      phishing: `**Phishing Techniques**:
- Spear Phishing: Targeted attacks
- Whaling: Targeting executives
- Vishing: Voice call phishing
- Smishing: SMS phishing
- Clone Phishing: Replicating legitimate emails`,

      prevention: `**Phishing Prevention**:
- Employee training and awareness
- Email filtering solutions
- Multi-factor authentication
- Regular phishing simulations
- Incident response planning`
    }
  },

  // Digital Forensics & Incident Response
  forensics: {
    methodology: {
      dfir: `**Digital Forensics & Incident Response**:
1. Preparation: Tools and training
2. Identification: Detect incident
3. Containment: Limit damage
4. Eradication: Remove threat
5. Recovery: Restore systems
6. Lessons Learned: Improve processes`,

      acquisition: `**Evidence Acquisition**:
- Memory dumping with Volatility
- Disk imaging with FTK Imager/dd
- Network traffic capture with Wireshark
- Log collection and analysis`
    }
  },

  // Cryptography
  cryptography: {
    algorithms: {
      symmetric: `**Symmetric Encryption**:
- AES (Advanced Encryption Standard)
- DES/3DES (Legacy)
- Blowfish, Twofish
- ChaCha20 (Modern, fast)`,

      asymmetric: `**Asymmetric Encryption**:
- RSA (Rivest-Shamir-Adleman)
- ECC (Elliptic Curve Cryptography)
- Diffie-Hellman Key Exchange
- DSA (Digital Signature Algorithm)`,

      hashing: `**Hashing Algorithms**:
- MD5 (Insecure, 128-bit)
- SHA-1 (Insecure, 160-bit)
- SHA-256/512 (Secure)
- bcrypt (Password hashing)
- Argon2 (Modern password hashing)`
    }
  }
};

// Response templates for different query types
const responseTemplates = {
  technical: {
    introduction: "🔍 **Technical Analysis**\n\n",
    conclusion: "\n\n---\n*ShadowGPT v4.0 - Advanced Technical Analysis*\n*Always ensure proper authorization before testing*"
  },
  
  tool: {
    introduction: "🛠️ **Generated Tool**\n\n",
    instructions: "\n\n**Usage Instructions:**\n1. Save as appropriate file extension\n2. Make executable: `chmod +x filename`\n3. Review and customize parameters\n4. Test in controlled environment",
    conclusion: "\n\n---\n*Created by ShadowGPT - Use responsibly and ethically*"
  },
  
  casual: {
    greeting: "🛡️ **Hello! I'm ShadowGPT v4.0**\n\n",
    capabilities: "I can help with:\n• Advanced pentesting techniques\n• Custom tool creation\n• Security analysis\n• Code review\n• Casual conversation\n\nWhat would you like to explore today?",
    farewell: "🔒 **Stay secure!** Feel free to return for any cybersecurity assistance."
  }
};

export class AdvancedAIEngine {
  constructor() {
    this.knowledgeBase = trainingData;
    this.conversationHistory = [];
  }

  // Advanced query analysis
  analyzeQuery(query) {
    const lowerQuery = query.toLowerCase();
    
    const analysis = {
      type: 'technical',
      category: 'general',
      urgency: 'normal',
      complexity: 'medium',
      requiresCode: false,
      requiresTool: false,
      topics: []
    };

    // Query type detection
    if (this.isCasualQuery(lowerQuery)) {
      analysis.type = 'casual';
    } else if (this.isToolRequest(lowerQuery)) {
      analysis.type = 'tool';
      analysis.requiresTool = true;
    } else if (this.isCodeRequest(lowerQuery)) {
      analysis.type = 'technical';
      analysis.requiresCode = true;
    }

    // Category detection
    analysis.category = this.detectCategory(lowerQuery);
    analysis.topics = this.extractTopics(lowerQuery);
    
    // Complexity assessment
    analysis.complexity = this.assessComplexity(lowerQuery);
    
    return analysis;
  }

  isCasualQuery(query) {
    const casualPatterns = [
      'hello', 'hi', 'hey', 'how are you', 'what\'s up', 'good morning',
      'good afternoon', 'good evening', 'thanks', 'thank you', 'bye',
      'goodbye', 'who are you', 'what can you do', 'help', 'nice to meet you'
    ];
    return casualPatterns.some(pattern => query.includes(pattern));
  }

  isToolRequest(query) {
    const toolPatterns = [
      'create', 'make', 'generate', 'build', 'write', 'script',
      'tool', 'automate', 'scanner', 'cracker', 'monitor'
    ];
    return toolPatterns.some(pattern => query.includes(pattern));
  }

  isCodeRequest(query) {
    const codePatterns = [
      'code', 'script', 'program', 'function', 'method', 'class',
      'example', 'sample', 'snippet', 'how to code', 'write a'
    ];
    return codePatterns.some(pattern => query.includes(pattern));
  }

  detectCategory(query) {
    const categories = {
      web: ['web', 'http', 'html', 'css', 'javascript', 'xss', 'csrf', 'sql', 'injection'],
      network: ['network', 'tcp', 'udp', 'port', 'scan', 'nmap', 'wireshark'],
      system: ['windows', 'linux', 'os', 'system', 'registry', 'process'],
      crypto: ['encrypt', 'decrypt', 'hash', 'crypto', 'ssl', 'tls'],
      social: ['phishing', 'social', 'engineering', 'human'],
      forensics: ['forensic', 'incident', 'response', 'evidence', 'log'],
      methodology: ['methodology', 'framework', 'process', 'approach']
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
    
    // Flatten all keywords from knowledge base
    Object.values(this.knowledgeBase).forEach(category => {
      Object.values(category).forEach(subcategory => {
        if (typeof subcategory === 'object') {
          Object.keys(subcategory).forEach(key => {
            allKeywords.push(key);
          });
        }
      });
    });

    // Find matching topics
    allKeywords.forEach(keyword => {
      if (query.includes(keyword) && !topics.includes(keyword)) {
        topics.push(keyword);
      }
    });

    return topics;
  }

  assessComplexity(query) {
    const complexIndicators = [
      'advanced', 'complex', 'detailed', 'comprehensive', 'in-depth',
      'methodology', 'framework', 'architecture', 'enterprise'
    ];
    
    const simpleIndicators = [
      'basic', 'simple', 'quick', 'easy', 'fundamental', 'intro'
    ];

    if (complexIndicators.some(indicator => query.includes(indicator))) {
      return 'high';
    } else if (simpleIndicators.some(indicator => query.includes(indicator))) {
      return 'low';
    }
    
    return 'medium';
  }

  // Enhanced response generation
  generateResponse(query, analysis) {
    let response = '';

    switch (analysis.type) {
      case 'casual':
        response = this.generateCasualResponse(query);
        break;
      case 'tool':
        response = this.generateToolResponse(query, analysis);
        break;
      case 'technical':
        response = this.generateTechnicalResponse(query, analysis);
        break;
      default:
        response = this.generateTechnicalResponse(query, analysis);
    }

    // Add to conversation history
    this.conversationHistory.push({
      query,
      analysis,
      response: response.substring(0, 100) + '...' // Store summary
    });

    return response;
  }

  generateCasualResponse(query) {
    if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
      return `${responseTemplates.casual.greeting}${responseTemplates.casual.capabilities}`;
    }
    
    if (query.includes('how are you')) {
      return "⚡ **I'm operating at peak efficiency!**\n\nReady to assist with advanced cybersecurity topics, tool creation, or technical analysis. What specific area would you like to explore?";
    }
    
    if (query.includes('thank')) {
      return "🎯 **You're welcome!**\n\nRemember to always:\n• Obtain proper authorization\n• Follow ethical guidelines\n• Document your findings\n• Continuously learn and improve\n\nNeed anything else?";
    }
    
    if (query.includes('bye') || query.includes('goodbye')) {
      return responseTemplates.casual.farewell;
    }
    
    if (query.includes('what can you do') || query.includes('capabilities')) {
      return `🔮 **ShadowGPT v4.0 Capabilities**:

**Technical Expertise:**
• Advanced penetration testing methodologies
• Custom security tool development
• Vulnerability analysis and exploitation
• Network security assessment
• Web application security testing

**Tool Creation:**
• Bash scripts for automation
• Python tools for exploitation
• PowerShell for Windows environments
• Custom scanners and monitors

**Knowledge Domains:**
• OWASP Top 10 vulnerabilities
• Network protocols and security
• Cryptography and encryption
• Digital forensics and incident response
• Social engineering techniques

**Additional Features:**
• Code review and analysis
• Security architecture guidance
• Compliance and best practices
• Training and awareness content

What would you like me to help you with?`;
    }

    return "🤖 **I'm here to help!**\n\nI can assist with cybersecurity topics, create custom tools, or just have a conversation. What would you like to know?";
  }

  generateToolResponse(query, analysis) {
    const tools = {
      port_scanner: this.generatePortScanner(),
      vulnerability_scanner: this.generateVulnerabilityScanner(),
      hash_cracker: this.generateHashCracker(),
      network_monitor: this.generateNetworkMonitor(),
      web_crawler: this.generateWebCrawler(),
      password_generator: this.generatePasswordGenerator()
    };

    // Determine which tool to generate
    let selectedTool = 'port_scanner';
    
    if (query.includes('vulnerability') || query.includes('vuln')) {
      selectedTool = 'vulnerability_scanner';
    } else if (query.includes('hash') || query.includes('crack')) {
      selectedTool = 'hash_cracker';
    } else if (query.includes('network') || query.includes('monitor')) {
      selectedTool = 'network_monitor';
    } else if (query.includes('web') || query.includes('crawl')) {
      selectedTool = 'web_crawler';
    } else if (query.includes('password') || query.includes('generate')) {
      selectedTool = 'password_generator';
    }

    const tool = tools[selectedTool];
    
    return `${responseTemplates.tool.introduction}${tool}${responseTemplates.tool.instructions}${responseTemplates.tool.conclusion}`;
  }

  generateTechnicalResponse(query, analysis) {
    let response = responseTemplates.technical.introduction;
    
    // Add category-specific knowledge
    if (analysis.category !== 'general') {
      const categoryKnowledge = this.getCategoryKnowledge(analysis.category, analysis.topics);
      response += categoryKnowledge + '\n\n';
    }

    // Add topic-specific information
    if (analysis.topics.length > 0) {
      analysis.topics.forEach(topic => {
        const topicInfo = this.getTopicInformation(topic);
        if (topicInfo) {
          response += topicInfo + '\n\n';
        }
      });
    }

    // Add practical examples if requested
    if (analysis.requiresCode) {
      const codeExample = this.generateCodeExample(analysis.topics[0] || 'general');
      response += `**Practical Example:**\n\`\`\`${codeExample.language}\n${codeExample.code}\n\`\`\`\n\n`;
    }

    response += responseTemplates.technical.conclusion;
    
    return response;
  }

  getCategoryKnowledge(category, topics) {
    const knowledge = this.knowledgeBase[category];
    if (!knowledge) return '';

    let response = `**${category.toUpperCase()} SECURITY OVERVIEW**\n\n`;
    
    // Add general category knowledge
    if (knowledge.basics) {
      response += knowledge.basics + '\n\n';
    }

    // Add specific topic knowledge
    topics.forEach(topic => {
      if (knowledge[topic]) {
        response += knowledge[topic] + '\n\n';
      }
    });

    return response;
  }

  getTopicInformation(topic) {
    // Search through all knowledge base for the topic
    for (const [category, data] of Object.entries(this.knowledgeBase)) {
      for (const [subcategory, content] of Object.entries(data)) {
        if (typeof content === 'object' && content[topic]) {
          return content[topic];
        }
      }
    }
    return null;
  }

  generateCodeExample(topic) {
    const examples = {
      'sql_injection': {
        language: 'python',
        code: `# SQL Injection Test Script\nimport requests\n\ndef test_sql_injection(url, param):\n    payloads = [\"' OR '1'='1\", \"' UNION SELECT 1,2,3--\", \"'; DROP TABLE users--\"]\n    \n    for payload in payloads:\n        test_url = f\"{url}?{param}={payload}\"\n        response = requests.get(test_url)\n        \n        if \"error\" in response.text.lower() or \"sql\" in response.text.lower():\n            print(f\"Possible SQL Injection: {payload}\")`
      },
      'port_scanning': {
        language: 'python',
        code: `# Basic Port Scanner\nimport socket\n\ndef port_scan(target, ports):\n    for port in ports:\n        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n        sock.settimeout(1)\n        \n        result = sock.connect_ex((target, port))\n        if result == 0:\n            print(f\"Port {port}: OPEN\")\n        sock.close()\n\n# Usage\nport_scan('192.168.1.1', range(1, 1000))`
      },
      'xss_testing': {
        language: 'javascript',
        code: `// XSS Testing Payloads\nconst xssPayloads = [\n  \"<script>alert('XSS')</script>\",\n  \"<img src=x onerror=alert(1)>\",\n  \"<svg onload=alert(1)>\",\n  \"javascript:alert('XSS')\"\n];\n\n// Test each payload\nxssPayloads.forEach(payload => {\n  // Inject into vulnerable parameter\n  console.log(\"Testing:\", payload);\n});`
      }
    };

    return examples[topic] || {
      language: 'python',
      code: '# Basic Security Script Template\n# Replace with your specific functionality\nprint("Security tool template")'
    };
  }

  // Tool generation methods
  generatePortScanner() {
    return `#!/bin/bash
# Advanced Port Scanner by ShadowGPT
# Usage: ./port_scanner.sh <target> [start_port] [end_port]

TARGET=$1
START_PORT=${2:-1}
END_PORT=${3:-1000}

echo "🔍 Starting advanced port scan on $TARGET"
echo "=========================================="
echo "Scanning ports $START_PORT to $END_PORT"
echo ""

# Function to check TCP port
check_tcp_port() {
    (echo >/dev/tcp/$TARGET/$1) >/dev/null 2>&1 && echo "✅ TCP Port $1 - OPEN"
}

# Function to check UDP port (basic)
check_udp_port() {
    (echo >/dev/udp/$TARGET/$1) >/dev/null 2>&1 && echo "✅ UDP Port $1 - OPEN"
}

export -f check_tcp_port
export -f check_udp_port
export TARGET

# Scan TCP ports
echo "🔧 Scanning TCP ports..."
seq $START_PORT $END_PORT | xargs -I {} -P 100 bash -c 'check_tcp_port "$@"' _ {}

# Uncomment for UDP scanning (slower)
# echo "🔧 Scanning UDP ports..."
# seq $START_PORT $END_PORT | xargs -I {} -P 50 bash -c 'check_udp_port "$@"' _ {}

echo ""
echo "🎯 Port scan completed!"`;
  }

  generateVulnerabilityScanner() {
    return `#!/bin/bash
# Web Vulnerability Scanner by ShadowGPT
# Usage: ./vuln_scanner.sh <target_url>

TARGET=$1

echo "🛡️ Advanced Vulnerability Scan: $TARGET"
echo "========================================"

# Check if target is provided
if [ -z "$TARGET" ]; then
    echo "❌ Usage: $0 <target_url>"
    exit 1
fi

echo "🔍 Testing for common web vulnerabilities..."

# SQL Injection testing
echo ""
echo "🧪 Testing SQL Injection..."
sql_payloads=("' OR '1'='1" "'; DROP TABLE users--" "' UNION SELECT 1,2,3--")
for payload in "${sql_payloads[@]}"; do
    response=$(curl -s -G "$TARGET" --data-urlencode "input=$payload")
    if echo "$response" | grep -i -E "error|sql|mysql|oracle"; then
        echo "⚠️  Possible SQL Injection with: $payload"
    fi
done

# XSS testing
echo ""
echo "🧪 Testing XSS vulnerabilities..."
xss_payloads=("<script>alert('XSS')</script>" "<img src=x onerror=alert(1)>")
for payload in "${xss_payloads[@]}"; do
    response=$(curl -s -G "$TARGET" --data-urlencode "input=$payload")
    if echo "$response" | grep -q "$payload"; then
        echo "⚠️  Possible XSS with: $payload"
    fi
done

# Directory traversal
echo ""
echo "🧪 Testing Directory Traversal..."
traversal_payloads=("../../../etc/passwd" "..\\\\windows\\\\system32\\\\drivers\\\\etc\\\\hosts")
for payload in "${traversal_payloads[@]}"; do
    response=$(curl -s "$TARGET/$payload")
    if echo "$response" | grep -q "root:"; then
        echo "⚠️  Possible Directory Traversal with: $payload"
    fi
done

echo ""
echo "🎯 Basic vulnerability scan completed!"`;
  }

  generateHashCracker() {
    return `#!/bin/bash
# Advanced Hash Cracker by ShadowGPT
# Usage: ./hash_cracker.sh <hash> <wordlist> [hash_type]

HASH=$1
WORDLIST=$2
HASH_TYPE=${3:-md5}

echo "🔓 Advanced Hash Cracking"
echo "========================"
echo "Hash: $HASH"
echo "Type: $HASH_TYPE"
echo "Wordlist: $WORDLIST"
echo ""

if [ -z "$HASH" ] || [ -z "$WORDLIST" ]; then
    echo "❌ Usage: $0 <hash> <wordlist> [hash_type]"
    echo "Supported types: md5, sha1, sha256, sha512"
    exit 1
fi

if [ ! -f "$WORDLIST" ]; then
    echo "❌ Wordlist file not found: $WORDLIST"
    exit 1
fi

echo "🚀 Starting hash cracking..."
echo ""

counter=0
start_time=$(date +%s)

while read password; do
    ((counter++))
    
    # Show progress every 1000 attempts
    if [ $((counter % 1000)) -eq 0 ]; then
        echo "🔍 Attempted $counter passwords..."
    fi
    
    case $HASH_TYPE in
        md5)
            computed_hash=$(echo -n "$password" | md5sum | cut -d' ' -f1)
            ;;
        sha1)
            computed_hash=$(echo -n "$password" | sha1sum | cut -d' ' -f1)
            ;;
        sha256)
            computed_hash=$(echo -n "$password" | sha256sum | cut -d' ' -f1)
            ;;
        sha512)
            computed_hash=$(echo -n "$password" | sha512sum | cut -d' ' -f1)
            ;;
        *)
            echo "❌ Unsupported hash type: $HASH_TYPE"
            exit 1
            ;;
    esac

    if [ "$computed_hash" = "$HASH" ]; then
        end_time=$(date +%s)
        duration=$((end_time - start_time))
        echo ""
        echo "✅ CRACKED!"
        echo "==========="
        echo "Password: $password"
        echo "Attempts: $counter"
        echo "Time: ${duration}s"
        exit 0
    fi
done < "$WORDLIST"

end_time=$(date +%s)
duration=$((end_time - start_time))

echo ""
echo "❌ Password not found in wordlist"
echo "Attempts: $counter"
echo "Time: ${duration}s"`;
  }

  generateNetworkMonitor() {
    return `#!/usr/bin/env python3
"""
Advanced Network Traffic Monitor by ShadowGPT
Monitor and analyze network traffic in real-time
"""

import socket
import struct
import textwrap
from datetime import datetime

class NetworkMonitor:
    def __init__(self, interface=None):
        self.interface = interface
        self.packet_count = 0
        
    def start_monitoring(self):
        """Start monitoring network traffic"""
        print("🕵️  Starting Network Traffic Monitor")
        print("===================================")
        
        # Create raw socket
        try:
            if socket.has_ipv6:
                conn = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.ntohs(3))
            else:
                conn = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_IP)
        except PermissionError:
            print("❌ Root privileges required for raw socket access")
            return
        
        print("📡 Monitoring network traffic... (Press Ctrl+C to stop)")
        print("")
        
        try:
            while True:
                raw_data, addr = conn.recvfrom(65536)
                self.packet_count += 1
                self.process_packet(raw_data)
                
        except KeyboardInterrupt:
            print(f"\\n🛑 Monitoring stopped. Processed {self.packet_count} packets.")
    
    def process_packet(self, data):
        """Process individual packet"""
        dest_mac, src_mac, eth_proto, payload = self.ethernet_frame(data)
        
        # Only process IPv4 packets for simplicity
        if eth_proto == 8:
            version, header_length, ttl, proto, src, target, data = self.ipv4_packet(payload)
            
            timestamp = datetime.now().strftime("%H:%M:%S")
            print(f"[{timestamp}] {src} -> {target} | Proto: {proto} | TTL: {ttl}")
            
            # TCP
            if proto == 6:
                src_port, dest_port, sequence, acknowledgment, flags = self.tcp_segment(data)
                print(f"    TCP: {src_port} -> {dest_port} | Flags: {flags}")
            
            # UDP
            elif proto == 17:
                src_port, dest_port, length = self.udp_segment(data)
                print(f"    UDP: {src_port} -> {dest_port} | Length: {length}")
    
    def ethernet_frame(self, data):
        """Parse Ethernet frame"""
        dest_mac, src_mac, proto = struct.unpack('! 6s 6s H', data[:14])
        return self.get_mac_addr(dest_mac), self.get_mac_addr(src_mac), socket.htons(proto), data[14:]
    
    def get_mac_addr(self, bytes_addr):
        """Format MAC address"""
        return ':'.join(map('{:02x}'.format, bytes_addr)).upper()
    
    def ipv4_packet(self, data):
        """Parse IPv4 packet"""
        version_header_length = data[0]
        version = version_header_length >> 4
        header_length = (version_header_length & 15) * 4
        ttl, proto, src, target = struct.unpack('! 8x B B 2x 4s 4s', data[:20])
        return version, header_length, ttl, proto, self.ipv4(src), self.ipv4(target), data[header_length:]
    
    def ipv4(self, addr):
        """Format IPv4 address"""
        return '.'.join(map(str, addr))
    
    def tcp_segment(self, data):
        """Parse TCP segment"""
        (src_port, dest_port, sequence, acknowledgment, offset_reserved_flags) = struct.unpack('! H H L L H', data[:14])
        offset = (offset_reserved_flags >> 12) * 4
        flags = offset_reserved_flags & 0x1FF
        return src_port, dest_port, sequence, acknowledgment, flags
    
    def udp_segment(self, data):
        """Parse UDP segment"""
        src_port, dest_port, size = struct.unpack('! H H 2x H', data[:8])
        return src_port, dest_port, size

if __name__ == "__main__":
    monitor = NetworkMonitor()
    monitor.start_monitoring()`;
  }

  generateWebCrawler() {
    return `#!/usr/bin/env python3
"""
Advanced Web Crawler by ShadowGPT
Crawl websites and discover resources
"""

import requests
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
import time

class AdvancedWebCrawler:
    def __init__(self, base_url, delay=1):
        self.base_url = base_url
        self.delay = delay
        self.visited_urls = set()
        self.discovered_urls = set()
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
    
    def crawl(self, max_pages=50):
        """Start crawling from base URL"""
        print(f"🕸️  Starting web crawl: {self.base_url}")
        print("================================")
        
        queue = [self.base_url]
        
        while queue and len(self.visited_urls) < max_pages:
            url = queue.pop(0)
            
            if url in self.visited_urls:
                continue
                
            try:
                print(f"🔍 Crawling: {url}")
                response = self.session.get(url, timeout=10)
                self.visited_urls.add(url)
                
                if response.status_code == 200:
                    self.parse_page(response.text, url)
                    self.discover_resources(response.text, url)
                
                time.sleep(self.delay)
                
            except Exception as e:
                print(f"❌ Error crawling {url}: {e}")
            
            # Add new URLs to queue
            new_urls = self.discovered_urls - self.visited_urls
            queue.extend(list(new_urls)[:10])  # Limit queue growth
        
        self.generate_report()
    
    def parse_page(self, html, url):
        """Parse HTML content and extract links"""
        soup = BeautifulSoup(html, 'html.parser')
        
        # Extract all links
        for link in soup.find_all('a', href=True):
            absolute_url = urljoin(url, link['href'])
            if self.is_valid_url(absolute_url):
                self.discovered_urls.add(absolute_url)
        
        # Extract forms
        forms = soup.find_all('form')
        if forms:
            print(f"   📝 Found {len(forms)} forms")
    
    def discover_resources(self, html, url):
        """Discover additional resources"""
        soup = BeautifulSoup(html, 'html.parser')
        
        # JavaScript files
        scripts = soup.find_all('script', src=True)
        for script in scripts:
            script_url = urljoin(url, script['src'])
            if self.is_valid_url(script_url):
                print(f"   📜 JS: {script_url}")
        
        # CSS files
        stylesheets = soup.find_all('link', rel='stylesheet')
        for css in stylesheets:
            css_url = urljoin(url, css.get('href', ''))
            if self.is_valid_url(css_url):
                print(f"   🎨 CSS: {css_url}")
    
    def is_valid_url(self, url):
        """Check if URL is valid and within scope"""
        parsed = urlparse(url)
        base_parsed = urlparse(self.base_url)
        
        # Only crawl same domain
        if parsed.netloc != base_parsed.netloc:
            return False
        
        # Avoid common non-content URLs
        excluded_extensions = ['.pdf', '.jpg', '.png', '.gif', '.zip', '.exe']
        if any(url.lower().endswith(ext) for ext in excluded_extensions):
            return False
        
        return True
    
    def generate_report(self):
        """Generate crawl report"""
        print("")
        print("📊 CRAWL REPORT")
        print("===============")
        print(f"Base URL: {self.base_url}")
        print(f"Pages visited: {len(self.visited_urls)}")
        print(f"URLs discovered: {len(self.discovered_urls)}")
        print("")
        print("Top discovered URLs:")
        for url in list(self.discovered_urls)[:10]:
            print(f"  • {url}")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) != 2:
        print("Usage: python3 web_crawler.py <target_url>")
        sys.exit(1)
    
    crawler = AdvancedWebCrawler(sys.argv[1])
    crawler.crawl()`;
  }

  generatePasswordGenerator() {
    return `#!/usr/bin/env python3
"""
Advanced Password Generator by ShadowGPT
Generate secure passwords with various patterns
"""

import random
import string
import argparse
import secrets

class PasswordGenerator:
    def __init__(self):
        self.character_sets = {
            'lower': string.ascii_lowercase,
            'upper': string.ascii_uppercase,
            'digits': string.digits,
            'symbols': '!@#$%^&*()_+-=[]{}|;:,.<>?',
            'hex': '0123456789abcdef'
        }
    
    def generate_password(self, length=16, use_upper=True, use_digits=True, use_symbols=True):
        """Generate a secure random password"""
        characters = self.character_sets['lower']
        
        if use_upper:
            characters += self.character_sets['upper']
        if use_digits:
            characters += self.character_sets['digits']
        if use_symbols:
            characters += self.character_sets['symbols']
        
        # Ensure minimum requirements
        password = [
            secrets.choice(self.character_sets['lower']),
            secrets.choice(self.character_sets['upper']),
            secrets.choice(self.character_sets['digits']),
            secrets.choice(self.character_sets['symbols'])
        ] if use_upper and use_digits and use_symbols else [secrets.choice(characters)]
        
        # Fill remaining length
        password += [secrets.choice(characters) for _ in range(length - len(password))]
        
        # Shuffle the password
        random.shuffle(password)
        
        return ''.join(password)
    
    def generate_passphrase(self, word_count=4, separator='-'):
        """Generate a memorable passphrase"""
        # Common word list (in practice, use a larger word list)
        words = [
            'apple', 'brave', 'cloud', 'dragon', 'eagle', 'flame', 'globe', 'heart',
            'ice', 'jazz', 'king', 'light', 'moon', 'night', 'ocean', 'peace',
            'queen', 'river', 'star', 'tree', 'unity', 'vivid', 'water', 'xray',
            'young', 'zenith'
        ]
        
        passphrase = [secrets.choice(words) for _ in range(word_count)]
        return separator.join(passphrase)
    
    def generate_pattern_password(self, pattern):
        """Generate password based on pattern"""
        pattern_map = {
            'L': self.character_sets['lower'],
            'U': self.character_sets['upper'],
            'D': self.character_sets['digits'],
            'S': self.character_sets['symbols'],
            'H': self.character_sets['hex']
        }
        
        password = []
        for char_type in pattern:
            if char_type in pattern_map:
                password.append(secrets.choice(pattern_map[char_type]))
            else:
                password.append(char_type)  # Keep literal characters
        
        return ''.join(password)

def main():
    parser = argparse.ArgumentParser(description='Advanced Password Generator')
    parser.add_argument('-l', '--length', type=int, default=16, help='Password length')
    parser.add_argument('-n', '--count', type=int, default=5, help='Number of passwords to generate')
    parser.add_argument('--no-symbols', action='store_true', help='Exclude symbols')
    parser.add_argument('--passphrase', action='store_true', help='Generate passphrase')
    parser.add_argument('--pattern', help='Generate using pattern (L=lower, U=upper, D=digit, S=symbol)')
    
    args = parser.parse_args()
    generator = PasswordGenerator()
    
    print("🔐 Advanced Password Generator")
    print("==============================")
    
    for i in range(args.count):
        if args.passphrase:
            password = generator.generate_passphrase()
        elif args.pattern:
            password = generator.generate_pattern_password(args.pattern)
        else:
            password = generator.generate_password(
                length=args.length,
                use_symbols=not args.no_symbols
            )
        
        print(f"Password {i+1}: {password}")

if __name__ == "__main__":
    main()`;
  }
}
