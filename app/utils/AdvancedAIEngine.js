// Comprehensive Training Data for ShadowGPT
const trainingData = {
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
    }
  },

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
response = requests.get('http://target.com', headers={'User-Agent': 'Mozilla'})`,

      exploitation: `**Basic Exploit Template**:
#!/usr/bin/env python3
import socket

def exploit(target, port):
    buffer = b"A" * 1000
    payload = buffer
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((target, port))
        s.send(payload)
        return s.recv(1024)
    except Exception as e:
        return str(e)`
    },

    bash: {
      automation: `**Bash Automation**:
#!/bin/bash
# Network Scanner
for ip in {1..254}; do
    ping -c 1 192.168.1.$ip | grep "64 bytes" &
done`,

      system_info: `**System Information**:
#!/bin/bash
echo "Hostname: $(hostname)"
echo "Kernel: $(uname -r)"
echo "Users: $(who | wc -l)"
ip addr show | grep inet`
    }
  },

  web_security: {
    owasp_top_10: {
      a01: `**A01: Broken Access Control**
- Vertical/horizontal privilege escalation
- Insecure direct object references (IDOR)
- Missing function level access control`,

      a03: `**A03: Injection**
- SQL Injection
- NoSQL Injection
- Command Injection
- LDAP Injection`,

      a07: `**A07: Identification and Authentication Failures**
- Weak password policies
- Session fixation
- Vulnerable forgot password functionality`
    }
  },

  network_security: {
    protocols: {
      tcp_ip: `**TCP/IP Stack**:
- Application Layer (HTTP, FTP, DNS)
- Transport Layer (TCP, UDP)
- Internet Layer (IP, ICMP)
- Network Access Layer (Ethernet, WiFi)`,

      http_https: `**HTTP/HTTPS**:
- HTTP Methods: GET, POST, PUT, DELETE
- Status Codes: 200, 301, 404, 500
- Headers: Cookies, User-Agent, Referer
- HTTPS: TLS/SSL encryption`
    }
  }
};

export class AdvancedAIEngine {
  constructor() {
    this.knowledgeBase = trainingData;
    this.conversationHistory = [];
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

  detectCategory(query) {
    const categories = {
      web: ['web', 'http', 'html', 'css', 'javascript', 'xss', 'csrf', 'sql', 'injection'],
      network: ['network', 'tcp', 'udp', 'port', 'scan', 'nmap', 'wireshark'],
      system: ['windows', 'linux', 'os', 'system', 'registry', 'process'],
      crypto: ['encrypt', 'decrypt', 'hash', 'crypto', 'ssl', 'tls'],
      social: ['phishing', 'social', 'engineering', 'human']
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
    const complexIndicators = ['advanced', 'complex', 'detailed', 'comprehensive'];
    const simpleIndicators = ['basic', 'simple', 'quick', 'easy', 'fundamental'];

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
      case 'technical':
        return this.generateTechnicalResponse(query, analysis);
      default:
        return this.generateTechnicalResponse(query, analysis);
    }
  }

  generateCasualResponse(query) {
    if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
      return `🛡️ **Hello! I'm ShadowGPT v4.0**\n\nYour advanced pentesting AI assistant created by **bedusec**. 

I now have enhanced capabilities including:
• Advanced query analysis
• Multi-domain cybersecurity knowledge
• Smart tool generation
• Context-aware responses

What would you like to explore today?`;
    }
    
    if (query.includes('how are you')) {
      return "⚡ **I'm operating with enhanced AI capabilities!**\n\nMy advanced engine is now processing queries with better context understanding and comprehensive knowledge. Ready to assist!";
    }
    
    if (query.includes('thank')) {
      return "🎯 **You're welcome!**\n\nThe advanced features are now active. Remember to always:\n• Obtain proper authorization\n• Follow ethical guidelines\n• Document your findings\n• Continuously learn and improve";
    }
    
    if (query.includes('what can you do') || query.includes('capabilities')) {
      return `🔮 **ShadowGPT v4.0 - Enhanced Capabilities**

**Advanced AI Features:**
• Smart query analysis and categorization
• Context-aware response generation
• Multi-domain cybersecurity knowledge
• Advanced tool creation with templates

**Technical Expertise:**
• Comprehensive pentesting methodologies (PTES, OSSTMM, OWASP)
• Advanced vulnerability analysis
• Custom security tool development
• Network and web application security

**Tool Generation:**
• Port scanners with advanced features
• Vulnerability assessment tools
• Hash cracking utilities
• Network monitoring scripts
• Web application crawlers

**Knowledge Domains:**
• Cybersecurity fundamentals
• Programming (Python, Bash, PowerShell)
• Web security (OWASP Top 10)
• Network protocols and security
• Social engineering
• Digital forensics basics

What specific area would you like to explore?`;
    }

    return "🤖 **Advanced AI Assistant Active**\n\nI'm now equipped with enhanced capabilities for cybersecurity analysis and tool creation. How can I assist you today?";
  }

  generateToolResponse(query, analysis) {
    const tools = {
      port_scanner: this.generatePortScanner(),
      vulnerability_scanner: this.generateVulnerabilityScanner(),
      hash_cracker: this.generateHashCracker(),
      network_monitor: this.generateNetworkMonitor(),
      web_crawler: this.generateWebCrawler(),
      password_analyzer: this.generatePasswordAnalyzer()
    };

    let selectedTool = 'port_scanner';
    
    if (query.includes('vulnerability') || query.includes('vuln')) {
      selectedTool = 'vulnerability_scanner';
    } else if (query.includes('hash') || query.includes('crack')) {
      selectedTool = 'hash_cracker';
    } else if (query.includes('network') || query.includes('monitor')) {
      selectedTool = 'network_monitor';
    } else if (query.includes('web') || query.includes('crawl')) {
      selectedTool = 'web_crawler';
    } else if (query.includes('password') || query.includes('analyze')) {
      selectedTool = 'password_analyzer';
    }

    const tool = tools[selectedTool];
    const toolName = selectedTool.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    return `🛠️ **${toolName} - Advanced Tool Generated**\n\n\`\`\`bash\n${tool}\n\`\`\`\n\n**Usage Instructions:**\n1. Save as appropriate file (.sh, .py)\n2. Make executable: \`chmod +x filename\`\n3. Review and customize parameters\n4. Test in controlled environment\n5. Use responsibly and ethically\n\n---\n*Created by ShadowGPT Advanced AI - Enhanced Tool Generation*\n*⚠️ For authorized testing only*`;
  }

  generateTechnicalResponse(query, analysis) {
    let response = "🔍 **Advanced Technical Analysis**\n\n";
    
    // Add category-specific knowledge
    if (analysis.category !== 'general') {
      const categoryKnowledge = this.getCategoryKnowledge(analysis.category);
      response += categoryKnowledge + '\n\n';
    }

    // Add topic-specific information
    if (analysis.topics.length > 0) {
      response += "**Relevant Topics:**\n";
      analysis.topics.forEach(topic => {
        const topicInfo = this.getTopicInformation(topic);
        if (topicInfo) {
          response += `\n${topicInfo}\n`;
        }
      });
    }

    // Add practical guidance based on complexity
    if (analysis.complexity === 'high') {
      response += `\n**Advanced Guidance:**\nBased on the complexity of your query, here's in-depth information:\n\n`;
      response += this.getAdvancedGuidance(analysis.topics[0] || 'general');
    } else if (analysis.complexity === 'low') {
      response += `\n**Beginner-Friendly Explanation:**\nLet me break this down for better understanding:\n\n`;
      response += this.getSimpleExplanation(analysis.topics[0] || 'general');
    }

    response += `\n\n---\n*ShadowGPT v4.0 - Advanced AI Analysis*\n*Query Category: ${analysis.category} | Complexity: ${analysis.complexity}*\n*Always ensure proper authorization before testing*`;

    return response;
  }

  getCategoryKnowledge(category) {
    const knowledge = this.knowledgeBase[category];
    if (!knowledge) return '';

    let response = `**${category.toUpperCase()} SECURITY OVERVIEW**\n\n`;
    
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
      'sql injection': `**Advanced SQL Injection Techniques:**\n\n• **Time-Based Blind SQLi:** Use timing attacks to extract data\n• **Out-of-Band SQLi:** Use DNS or HTTP requests to exfiltrate data\n• **Second-Order SQLi:** Store malicious input for later execution\n• **NoSQL Injection:** Target MongoDB, CouchDB databases\n\n**Advanced Tools:**\n- SQLMap with tamper scripts\n- Custom Python scripts for specific DBMS\n- Burp Suite with custom extensions`,

      'nmap': `**Advanced Nmap Techniques:**\n\n• **Firewall Evasion:** \`nmap -f -D RND:10 --data-length 50\`\n• **Idle Scan:** \`nmap -sI zombie_host target\`\n• **Service Version Detection:** \`nmap -sV --version-intensity 9\`\n• **NSE Scripting:** \`nmap --script vuln,safe,discovery\`\n• **Timing Templates:** \`-T0\` (paranoid) to \`-T5\` (insane)\n\n**Advanced Use Cases:**\n- Network topology mapping\n- Vulnerability correlation\n- Service fingerprinting`,

      'general': `**Advanced Pentesting Methodology:**\n\n1. **Threat Modeling:** Identify potential threats and attack vectors\n2. **Attack Surface Analysis:** Map all possible entry points\n3. **Vulnerability Correlation:** Combine multiple vulnerabilities\n4. **Lateral Movement:** Pivot through network segments\n5. **Persistence Mechanisms:** Maintain access post-exploitation\n6. **Covering Tracks:** Remove evidence of presence\n\n**Advanced Tools Integration:**\n- Combine multiple tools for comprehensive assessment\n- Custom script development for specific scenarios\n- Automated reporting and documentation`
    };

    return advancedGuidance[topic] || advancedGuidance['general'];
  }

  getSimpleExplanation(topic) {
    const simpleExplanations = {
      'sql injection': `**SQL Injection Simple Explanation:**\n\nImagine a library where you can ask for books. Normally you'd say "I want books about science". With SQL injection, you could say "I want books about science OR give me ALL books".\n\n**Simple Prevention:**\n- Use special "prepared statements" in code\n- Don't let users input direct database commands\n- Always check and clean user input`,

      'nmap': `**Nmap Simple Explanation:**\n\nNmap is like a detective that knocks on every door (port) in a building (computer) to see which ones are open and what's behind them.\n\n**Basic Usage:**\n- \`nmap google.com\` - Basic scan\n- \`nmap -p 80,443 target.com\` - Scan specific ports\n- \`nmap -A target.com\` - Advanced scan with more info`,

      'general': `**Cybersecurity Basics:**\n\nThink of cybersecurity like protecting your house:\n- **Locks** = Passwords and authentication\n- **Alarm system** = Firewalls and monitoring\n- **Safe** = Encryption for important data\n- **Neighborhood watch** = Network security\n\n**Start Simple:**\n1. Use strong, unique passwords\n2. Keep software updated\n3. Be careful with email links\n4. Use antivirus software\n5. Learn basic security concepts`
    };

    return simpleExplanations[topic] || simpleExplanations['general'];
  }

  // Enhanced Tool Generation Methods
  generatePortScanner() {
    return `#!/bin/bash
# Advanced Port Scanner by ShadowGPT AI
# Enhanced with parallel processing and service detection

TARGET=$1
START_PORT=${2:-1}
END_PORT=${3:-1000}
THREADS=50

echo "🔍 Advanced Port Scanner v2.0"
echo "============================="
echo "Target: $TARGET"
echo "Port Range: $START_PORT-$END_PORT"
echo "Threads: $THREADS"
echo ""

# Color codes for output
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
NC='\\033[0m' # No Color

# Function to check TCP port with service detection
check_tcp_port() {
    local port=$1
    if (echo >/dev/tcp/$TARGET/$port) 2>/dev/null; then
        # Try to grab banner
        local banner=$(echo "HEAD / HTTP/1.0\\r\\n\\r\\n" | timeout 2 nc $TARGET $port 2>/dev/null | head -1)
        if [ ! -z "$banner" ]; then
            echo -e "${GREEN}✅ TCP $port - OPEN${NC} - $banner"
        else
            echo -e "${GREEN}✅ TCP $port - OPEN${NC}"
        fi
    fi
}

# Function to check UDP port (basic)
check_udp_port() {
    local port=$1
    if (echo >/dev/udp/$TARGET/$port) 2>/dev/null; then
        echo -e "${YELLOW}🔵 UDP $port - OPEN${NC}"
    fi
}

export -f check_tcp_port
export -f check_udp_port
export TARGET RED GREEN YELLOW NC

echo "🚀 Starting advanced TCP scan..."
seq $START_PORT $END_PORT | xargs -I {} -P $THREADS bash -c 'check_tcp_port "$@"' _ {}

echo ""
echo "🎯 Scan completed!"
echo ""
echo "📊 Summary:"
echo "• Use -sV with nmap for service version detection"
echo "• Consider using masscan for very large ranges"
echo "• Always ensure proper authorization"`;
  }

  generateVulnerabilityScanner() {
    return `#!/bin/bash
# Advanced Web Vulnerability Scanner by ShadowGPT AI
# Comprehensive security assessment tool

TARGET=$1
OUTPUT_DIR="./scan_results_$(date +%Y%m%d_%H%M%S)"

echo "🛡️ Advanced Vulnerability Scanner v2.0"
echo "======================================"
echo "Target: $TARGET"
echo "Output: $OUTPUT_DIR"
echo ""

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Color codes
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
NC='\\033[0m'

# Headers for different user agents
USER_AGENTS=(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
    "curl/7.68.0"
)

vuln_test() {
    local test_name=$1
    local payload=$2
    local description=$3
    
    echo -e "\\n🧪 Testing: $test_name"
    echo "Description: $description"
    
    for ua in "${USER_AGENTS[@]}"; do
        response=$(curl -s -k -A "$ua" -G "$TARGET" --data-urlencode "input=$payload" --connect-timeout 5)
        
        # Check for various indicators
        if echo "$response" | grep -i -E "error|sql|mysql|oracle|syntax" | grep -v "<!--" > /dev/null; then
            echo -e "${RED}⚠️  VULNERABLE - SQL Injection detected with: $payload${NC}"
            echo "User Agent: $ua" >> "$OUTPUT_DIR/sql_injection.txt"
            echo "Payload: $payload" >> "$OUTPUT_DIR/sql_injection.txt"
            echo "Response snippet: $(echo "$response" | grep -i -E "error|sql" | head -1)" >> "$OUTPUT_DIR/sql_injection.txt"
            echo "---" >> "$OUTPUT_DIR/sql_injection.txt"
        fi
    done
}

# SQL Injection Tests
vuln_test "SQL Injection - Basic" "' OR '1'='1" "Basic boolean-based SQL injection"
vuln_test "SQL Injection - Union" "' UNION SELECT 1,2,3--" "Union-based SQL injection"
vuln_test "SQL Injection - Time-based" "'; WAITFOR DELAY '0:0:5'--" "Time-based blind SQL injection"

# XSS Tests
echo -e "\\n🧪 Testing: XSS Vulnerabilities"
xss_payloads=("<script>alert('XSS')</script>" "<img src=x onerror=alert(1)>" "<svg onload=alert(1)>")
for payload in "${xss_payloads[@]}"; do
    response=$(curl -s -k -G "$TARGET" --data-urlencode "input=$payload")
    if echo "$response" | grep -q "$payload"; then
        echo -e "${YELLOW}⚠️  Possible XSS with: $payload${NC}"
        echo "Payload: $payload" >> "$OUTPUT_DIR/xss.txt"
    fi
done

# Directory Traversal
echo -e "\\n🧪 Testing: Directory Traversal"
traversal_payloads=(
    "../../../etc/passwd"
    "..\\\\..\\\\..\\\\windows\\\\system32\\\\drivers\\\\etc\\\\hosts"
    "....//....//....//etc/passwd"
)
for payload in "${traversal_payloads[@]}"; do
    response=$(curl -s -k "$TARGET/$payload")
    if echo "$response" | grep -q "root:"; then
        echo -e "${RED}🚨 CRITICAL - Directory Traversal: $payload${NC}"
        echo "Payload: $payload" >> "$OUTPUT_DIR/directory_traversal.txt"
    fi
done

echo -e "\\n🎯 Advanced scan completed!"
echo -e "📁 Results saved to: $OUTPUT_DIR"
echo -e "\\n📋 Next Steps:"
echo "1. Review all findings in output directory"
echo "2. Manual verification of all potential vulnerabilities"
echo "3. Consider using specialized tools like SQLMap, Nikto"
echo "4. Always obtain proper authorization before testing"`;
  }

  generateHashCracker() {
    return `#!/bin/bash
# Advanced Hash Cracker by ShadowGPT AI
# Supports multiple hash types with performance optimization

HASH=$1
WORDLIST=$2
HASH_TYPE=${3:-md5}

echo "🔓 Advanced Hash Cracker v2.0"
echo "============================="
echo "Hash: $HASH"
echo "Type: $HASH_TYPE"
echo "Wordlist: $WORDLIST"
echo ""

# Supported hash types
declare -A HASH_COMMANDS
HASH_COMMANDS[md5]="md5sum"
HASH_COMMANDS[sha1]="sha1sum"
HASH_COMMANDS[sha256]="sha256sum"
HASH_COMMANDS[sha512]="sha512sum"

if [ -z "$HASH" ] || [ -z "$WORDLIST" ]; then
    echo "❌ Usage: $0 <hash> <wordlist> [hash_type]"
    echo "Supported types: md5, sha1, sha256, sha512"
    exit 1
fi

if [ ! -f "$WORDLIST" ]; then
    echo "❌ Wordlist file not found: $WORDLIST"
    exit 1
fi

if [ -z "${HASH_COMMANDS[$HASH_TYPE]}" ]; then
    echo "❌ Unsupported hash type: $HASH_TYPE"
    exit 1
fi

echo "🚀 Starting advanced hash cracking..."
echo "Mode: $HASH_TYPE"
echo ""

counter=0
start_time=$(date +%s)
found=0

# Progress tracking
total_lines=$(wc -l < "$WORDLIST" 2>/dev/null || echo "unknown")
echo "Total passwords to try: $total_lines"
echo ""

while read password; do
    ((counter++))
    
    # Show progress
    if [ $((counter % 10000)) -eq 0 ]; then
        current_time=$(date +%s)
        elapsed=$((current_time - start_time))
        rate=$((counter / (elapsed + 1)))
        echo "🔍 Attempted: $counter passwords | Rate: $rate/sec | Elapsed: ${elapsed}s"
    fi
    
    # Compute hash based on type
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
    esac

    if [ "$computed_hash" = "$HASH" ]; then
        end_time=$(date +%s)
        duration=$((end_time - start_time))
        echo ""
        echo "🎉 CRACKED SUCCESSFULLY!"
        echo "======================="
        echo "🔑 Password: $password"
        echo "📊 Attempts: $counter"
        echo "⏱️  Time: ${duration} seconds"
        echo "⚡ Rate: $((counter / (duration + 1))) passwords/second"
        found=1
        break
    fi
done < "$WORDLIST"

end_time=$(date +%s)
duration=$((end_time - start_time))

if [ $found -eq 0 ]; then
    echo ""
    echo "❌ Password not found in wordlist"
    echo "📊 Attempts: $counter"
    echo "⏱️  Time: ${duration} seconds"
    echo ""
    echo "💡 Suggestions:"
    echo "• Try a different wordlist"
    echo "• Consider using rules-based attacks"
    echo "• Use GPU acceleration for larger wordlists"
    echo "• Verify the hash type is correct"
fi`;
  }

  generateNetworkMonitor() {
    return `#!/usr/bin/env python3
"""
Advanced Network Traffic Monitor by ShadowGPT AI
Real-time network analysis with protocol decoding
"""

import socket
import struct
import textwrap
from datetime import datetime
import argparse
import sys

class AdvancedNetworkMonitor:
    def __init__(self, interface=None, output_file=None):
        self.interface = interface
        self.output_file = output_file
        self.packet_count = 0
        self.protocol_stats = {}
        
    def start_monitoring(self):
        """Start advanced network monitoring"""
        print("🕵️  Advanced Network Traffic Monitor v2.0")
        print("==========================================")
        print(f"Starting monitoring at {datetime.now()}")
        if self.output_file:
            print(f"Output file: {self.output_file}")
        print("")
        
        # Create raw socket
        try:
            conn = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.ntohs(3))
        except PermissionError:
            print("❌ Error: Root privileges required for raw socket access")
            sys.exit(1)
        except OSError as e:
            print(f"❌ Error creating socket: {e}")
            sys.exit(1)
        
        print("📡 Monitoring network traffic... (Press Ctrl+C to stop)")
        print("")
        
        try:
            while True:
                raw_data, addr = conn.recvfrom(65536)
                self.packet_count += 1
                self.process_packet(raw_data)
                
        except KeyboardInterrupt:
            print(f"\\n🛑 Monitoring stopped. Processed {self.packet_count} packets.")
            self.generate_report()
    
    def process_packet(self, data):
        """Process and analyze individual packet"""
        dest_mac, src_mac, eth_proto, payload = self.ethernet_frame(data)
        
        # Update protocol statistics
        self.protocol_stats[eth_proto] = self.protocol_stats.get(eth_proto, 0) + 1
        
        # Only process IPv4 packets for simplicity
        if eth_proto == 8:
            version, header_length, ttl, proto, src, target, data = self.ipv4_packet(payload)
            
            timestamp = datetime.now().strftime("%H:%M:%S.%f")[:-3]
            
            # Protocol mapping
            proto_names = {1: 'ICMP', 6: 'TCP', 17: 'UDP', 2: 'IGMP'}
            proto_name = proto_names.get(proto, f'Unknown({proto})')
            
            output = f"[{timestamp}] {src}:{self.get_port(data, proto)} -> {target}:{self.get_dest_port(data, proto)} | {proto_name} | TTL: {ttl}"
            
            print(output)
            
            if self.output_file:
                with open(self.output_file, 'a') as f:
                    f.write(output + '\\n')
            
            # Detailed analysis for specific protocols
            if proto == 6:  # TCP
                src_port, dest_port, sequence, acknowledgment, flags = self.tcp_segment(data)
                flag_info = self.decode_tcp_flags(flags)
                print(f"    TCP Flags: {flag_info}")
            
            elif proto == 17:  # UDP
                src_port, dest_port, length = self.udp_segment(data)
                print(f"    UDP Length: {length} bytes")
    
    def get_port(self, data, proto):
        """Extract source port based on protocol"""
        if proto == 6:  # TCP
            return struct.unpack('! H', data[:2])[0]
        elif proto == 17:  # UDP
            return struct.unpack('! H', data[:2])[0]
        return 'N/A'
    
    def get_dest_port(self, data, proto):
        """Extract destination port based on protocol"""
        if proto == 6:  # TCP
            return struct.unpack('! H', data[2:4])[0]
        elif proto == 17:  # UDP
            return struct.unpack('! H', data[2:4])[0]
        return 'N/A'
    
    def decode_tcp_flags(self, flags):
        """Decode TCP flags into human-readable format"""
        flag_names = []
        if flags & 0x01: flag_names.append("FIN")
        if flags & 0x02: flag_names.append("SYN")
        if flags & 0x04: flag_names.append("RST")
        if flags & 0x08: flag_names.append("PSH")
        if flags & 0x10: flag_names.append("ACK")
        if flags & 0x20: flag_names.append("URG")
        return ', '.join(flag_names) if flag_names else 'None'
    
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
    
    def generate_report(self):
        """Generate monitoring report"""
        print("")
        print("📊 MONITORING REPORT")
        print("====================")
        print(f"Total packets processed: {self.packet_count}")
        print(f"Monitoring duration: Generated on {datetime.now()}")
        print("")
        print("Protocol Statistics:")
        for proto, count in self.protocol_stats.items():
            proto_name = {1: 'ICMP', 6: 'TCP', 8: 'IPv4', 17: 'UDP'}.get(proto, f'Unknown({proto})')
            percentage = (count / self.packet_count) * 100
            print(f"  {proto_name}: {count} packets ({percentage:.1f}%)")

def main():
    parser = argparse.ArgumentParser(description='Advanced Network Traffic Monitor')
    parser.add_argument('-o', '--output', help='Output file to save traffic log')
    parser.add_argument('-i', '--interface', help='Network interface to monitor')
    
    args = parser.parse_args()
    
    monitor = AdvancedNetworkMonitor(interface=args.interface, output_file=args.output)
    monitor.start_monitoring()

if __name__ == "__main__":
    main()`;
  }

  generateWebCrawler() {
    return `#!/usr/bin/env python3
"""
Advanced Web Crawler by ShadowGPT AI
Comprehensive website mapping and resource discovery
"""

import requests
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
import time
import argparse
import sys
from collections import deque

class AdvancedWebCrawler:
    def __init__(self, base_url, delay=1, user_agent=None):
        self.base_url = base_url
        self.delay = delay
        self.visited_urls = set()
        self.discovered_urls = set()
        self.forms_found = []
        self.js_files = set()
        self.css_files = set()
        
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': user_agent or 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (ShadowGPT-Crawler)'
        })
        
        # Statistics
        self.stats = {
            'pages_crawled': 0,
            'forms_found': 0,
            'js_files': 0,
            'css_files': 0,
            'errors': 0
        }
    
    def crawl(self, max_pages=100):
        """Start advanced web crawling"""
        print(f"🕸️  Advanced Web Crawler v2.0")
        print("=============================")
        print(f"Target: {self.base_url}")
        print(f"Max pages: {max_pages}")
        print(f"Delay: {self.delay}s between requests")
        print("")
        
        queue = deque([self.base_url])
        
        while queue and self.stats['pages_crawled'] < max_pages:
            url = queue.popleft()
            
            if url in self.visited_urls:
                continue
                
            try:
                print(f"🔍 Crawling: {url}")
                response = self.session.get(url, timeout=10, allow_redirects=True)
                self.visited_urls.add(url)
                self.stats['pages_crawled'] += 1
                
                if response.status_code == 200:
                    self.parse_page(response.text, url)
                    self.discover_resources(response.text, url)
                
                time.sleep(self.delay)
                
            except Exception as e:
                print(f"❌ Error crawling {url}: {e}")
                self.stats['errors'] += 1
            
            # Add new URLs to queue
            new_urls = list(self.discovered_urls - self.visited_urls)
            queue.extend(new_urls[:10])  # Limit queue growth
        
        self.generate_report()
    
    def parse_page(self, html, url):
        """Parse HTML content and extract valuable information"""
        soup = BeautifulSoup(html, 'html.parser')
        
        # Extract all links
        for link in soup.find_all('a', href=True):
            absolute_url = urljoin(url, link['href'])
            if self.is_valid_url(absolute_url):
                self.discovered_urls.add(absolute_url)
        
        # Extract forms with details
        forms = soup.find_all('form')
        for form in forms:
            form_info = {
                'action': urljoin(url, form.get('action', '')),
                'method': form.get('method', 'GET').upper(),
                'inputs': []
            }
            
            # Extract input fields
            for input_tag in form.find_all('input'):
                input_info = {
                    'name': input_tag.get('name', ''),
                    'type': input_tag.get('type', 'text'),
                    'value': input_tag.get('value', '')
                }
                form_info['inputs'].append(input_info)
            
            self.forms_found.append(form_info)
            self.stats['forms_found'] += 1
            
            print(f"   📝 Form found: {form_info['method']} {form_info['action']}")
            print(f"      Inputs: {[inp['name'] for inp in form_info['inputs']]}")
    
    def discover_resources(self, html, url):
        """Discover additional resources"""
        soup = BeautifulSoup(html, 'html.parser')
        
        # JavaScript files
        scripts = soup.find_all('script', src=True)
        for script in scripts:
            script_url = urljoin(url, script['src'])
            if self.is_valid_url(script_url):
                self.js_files.add(script_url)
                self.stats['js_files'] += 1
                print(f"   📜 JS: {script_url}")
        
        # CSS files
        stylesheets = soup.find_all('link', rel='stylesheet')
        for css in stylesheets:
            css_url = urljoin(url, css.get('href', ''))
            if self.is_valid_url(css_url):
                self.css_files.add(css_url)
                self.stats['css_files'] += 1
                print(f"   🎨 CSS: {css_url}")
        
        # Images (potential information disclosure)
        images = soup.find_all('img', src=True)
        for img in images[:5]:  # Limit output
            img_src = urljoin(url, img['src'])
            if 'admin' in img_src.lower() or 'test' in img_src.lower():
                print(f"   🖼️  Interesting image: {img_src}")
    
    def is_valid_url(self, url):
        """Check if URL is valid and within scope"""
        parsed = urlparse(url)
        base_parsed = urlparse(self.base_url)
        
        # Only crawl same domain
        if parsed.netloc != base_parsed.netloc:
            return False
        
        # Avoid common non-content URLs
        excluded_extensions = ['.pdf', '.jpg', '.jpeg', '.png', '.gif', '.zip', '.exe', '.doc', '.docx']
        if any(url.lower().endswith(ext) for ext in excluded_extensions):
            return False
        
        return True
    
    def generate_report(self):
        """Generate comprehensive crawl report"""
        print("")
        print("📊 COMPREHENSIVE CRAWL REPORT")
        print("=============================")
        print(f"Base URL: {self.base_url}")
        print(f"Pages crawled: {self.stats['pages_crawled']}")
        print(f"URLs discovered: {len(self.discovered_urls)}")
        print(f"Forms found: {self.stats['forms_found']}")
        print(f"JavaScript files: {self.stats['js_files']}")
        print(f"CSS files: {self.stats['css_files']}")
        print(f"Errors encountered: {self.stats['errors']}")
        print("")
        
        if self.forms_found:
            print("🔍 INTERESTING FORMS FOUND:")
            for form in self.forms_found[:5]:  # Show first 5 forms
                print(f"  • {form['method']} {form['action']}")
                print(f"    Inputs: {[inp['name'] for inp in form['inputs']]}")
        
        print("")
        print("🌐 TOP DISCOVERED URLS:")
        for url in list(self.discovered_urls)[:10]:
            print(f"  • {url}")
        
        print("")
        print("💡 SECURITY ASSESSMENT NOTES:")
        print("• Review all forms for potential vulnerabilities")
        print("• Check JavaScript files for sensitive information")
        print("• Verify all input validation mechanisms")
        print("• Test for authentication and authorization flaws")

def main():
    parser = argparse.ArgumentParser(description='Advanced Web Crawler')
    parser.add_argument('url', help='Target URL to crawl')
    parser.add_argument('-m', '--max-pages', type=int, default=50, help='Maximum pages to crawl')
    parser.add_argument('-d', '--delay', type=float, default=1, help='Delay between requests')
    parser.add_argument('-u', '--user-agent', help='Custom User-Agent string')
    
    args = parser.parse_args()
    
    crawler = AdvancedWebCrawler(args.url, delay=args.delay, user_agent=args.user_agent)
    crawler.crawl(max_pages=args.max_pages)

if __name__ == "__main__":
    main()`;
  }

  generatePasswordAnalyzer() {
    return `#!/usr/bin/env python3
"""
Advanced Password Analyzer by ShadowGPT AI
Comprehensive password strength assessment and analysis
"""

import re
import math
import argparse
from datetime import datetime

class PasswordAnalyzer:
    def __init__(self):
        self.common_passwords = [
            'password', '123456', '12345678', '1234', 'qwerty', '12345',
            'dragon', 'baseball', 'football', 'letmein', 'monkey', 'abc123'
        ]
        
        self.character_sets = {
            'lowercase': 'abcdefghijklmnopqrstuvwxyz',
            'uppercase': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            'digits': '0123456789',
            'special': '!@#$%^&*()_+-=[]{}|;:,.<>?'
        }
    
    def analyze_password(self, password):
        """Comprehensive password analysis"""
        analysis = {
            'password': password,
            'length': len(password),
            'entropy': self.calculate_entropy(password),
            'strength': '',
            'score': 0,
            'issues': [],
            'recommendations': [],
            'character_composition': self.analyze_composition(password),
            'common_patterns': self.check_common_patterns(password)
        }
        
        # Calculate score (0-100)
        analysis['score'] = self.calculate_score(analysis)
        analysis['strength'] = self.get_strength_label(analysis['score'])
        
        return analysis
    
    def calculate_entropy(self, password):
        """Calculate password entropy in bits"""
        char_pool = 0
        
        if any(c in self.character_sets['lowercase'] for c in password):
            char_pool += 26
        if any(c in self.character_sets['uppercase'] for c in password):
            char_pool += 26
        if any(c in self.character_sets['digits'] for c in password):
            char_pool += 10
        if any(c in self.character_sets['special'] for c in password):
            char_pool += 32
        
        if char_pool == 0:
            return 0
        
        entropy = len(password) * math.log2(char_pool)
        return round(entropy, 2)
    
    def analyze_composition(self, password):
        """Analyze character composition"""
        composition = {
            'lowercase': sum(1 for c in password if c in self.character_sets['lowercase']),
            'uppercase': sum(1 for c in password if c in self.character_sets['uppercase']),
            'digits': sum(1 for c in password if c in self.character_sets['digits']),
            'special': sum(1 for c in password if c in self.character_sets['special']),
            'sequential': self.check_sequential_chars(password),
            'repeated': self.check_repeated_chars(password)
        }
        return composition
    
    def check_common_patterns(self, password):
        """Check for common patterns and weaknesses"""
        patterns = []
        lower_pass = password.lower()
        
        # Common passwords
        if lower_pass in self.common_passwords:
            patterns.append("Very common password")
        
        # Sequential characters
        if self.check_sequential_chars(password):
            patterns.append("Contains sequential characters")
        
        # Repeated characters
        if self.check_repeated_chars(password):
            patterns.append("Contains repeated character patterns")
        
        # Keyboard patterns
        keyboard_patterns = ['qwerty', 'asdfgh', 'zxcvbn', '123456']
        for pattern in keyboard_patterns:
            if pattern in lower_pass:
                patterns.append(f"Keyboard pattern detected: {pattern}")
        
        # Date patterns
        if re.search(r'\\d{4,}', password):
            patterns.append("Possible date or year pattern")
        
        return patterns
    
    def check_sequential_chars(self, password):
        """Check for sequential characters"""
        sequences = ['abc', 'bcd', 'cde', 'def', 'efg', 'fgh', 'ghi', 'hij', 'ijk',
                    'jkl', 'klm', 'lmn', 'mno', 'nop', 'opq', 'pqr', 'qrs', 'rst',
                    'stu', 'tuv', 'uvw', 'vwx', 'wxy', 'xyz', '012', '123', '234',
                    '345', '456', '567', '678', '789']
        
        lower_pass = password.lower()
        for seq in sequences:
            if seq in lower_pass:
                return True
        return False
    
    def check_repeated_chars(self, password):
        """Check for repeated character patterns"""
        # Check for repeated characters (3 or more of the same)
        for i in range(len(password) - 2):
            if password[i] == password[i+1] == password[i+2]:
                return True
        
        # Check for repeated patterns
        for pattern_length in range(2, len(password)//2 + 1):
            for i in range(len(password) - pattern_length * 2 + 1):
                pattern = password[i:i+pattern_length]
                if password[i+pattern_length:i+pattern_length*2] == pattern:
                    return True
        
        return False
    
    def calculate_score(self, analysis):
        """Calculate comprehensive password score (0-100)"""
        score = 0
        
        # Length score (up to 30 points)
        length = analysis['length']
        if length >= 12:
            score += 30
        elif length >= 8:
            score += 20
        elif length >= 6:
            score += 10
        
        # Character variety score (up to 40 points)
        comp = analysis['character_composition']
        variety_bonus = 0
        if comp['lowercase'] > 0: variety_bonus += 1
        if comp['uppercase'] > 0: variety_bonus += 1
        if comp['digits'] > 0: variety_bonus += 1
        if comp['special'] > 0: variety_bonus += 1
        score += variety_bonus * 10  # 10 points per character type
        
        # Entropy score (up to 30 points)
        entropy = analysis['entropy']
        if entropy >= 80:
            score += 30
        elif entropy >= 60:
            score += 25
        elif entropy >= 40:
            score += 20
        elif entropy >= 20:
            score += 10
        
        # Penalties for common patterns
        if analysis['common_patterns']:
            score = max(0, score - len(analysis['common_patterns']) * 5)
        
        return min(100, score)
    
    def get_strength_label(self, score):
        """Get password strength label"""
        if score >= 80:
            return "Very Strong"
        elif score >= 60:
            return "Strong"
        elif score >= 40:
            return "Moderate"
        elif score >= 20:
            return "Weak"
        else:
            return "Very Weak"
    
    def generate_report(self, analysis):
        """Generate comprehensive password analysis report"""
        report = []
        report.append("🔐 ADVANCED PASSWORD ANALYSIS REPORT")
        report.append("====================================")
        report.append(f"Password: {'*' * len(analysis['password'])}")
        report.append(f"Length: {analysis['length']} characters")
        report.append(f"Entropy: {analysis['entropy']} bits")
        report.append(f"Strength: {analysis['strength']} ({analysis['score']}/100)")
        report.append("")
        
        # Character composition
        comp = analysis['character_composition']
        report.append("CHARACTER COMPOSITION:")
        report.append(f"  • Lowercase letters: {comp['lowercase']}")
        report.append(f"  • Uppercase letters: {comp['uppercase']}")
        report.append(f"  • Digits: {comp['digits']}")
        report.append(f"  • Special characters: {comp['special']}")
        report.append("")
        
        # Issues and recommendations
        if analysis['common_patterns']:
            report.append("⚠️  SECURITY ISSUES DETECTED:")
            for issue in analysis['common_patterns']:
                report.append(f"  • {issue}")
            report.append("")
        
        report.append("💡 RECOMMENDATIONS:")
        if analysis['score'] < 60:
            report.append("  • Increase password length to at least 12 characters")
            report.append("  • Use a mix of character types (upper, lower, digits, special)")
            report.append("  • Avoid common words and patterns")
            report.append("  • Consider using a passphrase")
        else:
            report.append("  ✓ Good password strength")
            report.append("  • Consider using a password manager")
            report.append("  • Enable two-factor authentication")
            report.append("  • Use unique passwords for different services")
        
        report.append("")
        report.append("📊 SECURITY METRICS:")
        report.append(f"  • Crack time estimation: {self.estimate_crack_time(analysis['entropy'])}")
        report.append(f"  • Character pool size: {self.get_pool_size(analysis)}")
        
        return '\\n'.join(report)
    
    def estimate_crack_time(self, entropy):
        """Estimate password cracking time"""
        if entropy < 20:
            return "Instantly"
        elif entropy < 40:
            return "Minutes to hours"
        elif entropy < 60:
            return "Days to weeks"
        elif entropy < 80:
            return "Months to years"
        else:
            return "Centuries or more"
    
    def get_pool_size(self, analysis):
        """Calculate character pool size"""
        comp = analysis['character_composition']
        pool = 0
        if comp['lowercase'] > 0: pool += 26
        if comp['uppercase'] > 0: pool += 26
        if comp['digits'] > 0: pool += 10
        if comp['special'] > 0: pool += 32
        return pool

def main():
    parser = argparse.ArgumentParser(description='Advanced Password Analyzer')
    parser.add_argument('password', help='Password to analyze')
    
    args = parser.parse_args()
    
    analyzer = PasswordAnalyzer()
    analysis = analyzer.analyze_password(args.password)
    report = analyzer.generate_report(analysis)
    
    print(report)

if __name__ == "__main__":
    main()`;
  }
}
