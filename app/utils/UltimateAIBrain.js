// Ultimate AI Brain - Can talk about ANYTHING, specializes in cybersecurity
// Intelligently fetches online info when needed, no API keys required
// Super efficient and powerful

class UltimateAIBrain {
  constructor() {
    this.conversationHistory = [];
    this.knowledgeCache = new Map();
    this.lastOnlineCheck = 0;
    this.onlineSources = [
      { name: 'DuckDuckGo', url: 'https://api.duckduckgo.com/' },
      { name: 'Wikipedia', url: 'https://en.wikipedia.org/w/api.php' }
    ];
    
    // Core knowledge domains with weighted importance
    this.domains = {
      cybersecurity: {
        weight: 0.9,
        topics: {
          'network security': ['nmap', 'wireshark', 'firewall', 'ids', 'ips'],
          'web security': ['sql injection', 'xss', 'csrf', 'owasp'],
          'system security': ['linux hardening', 'windows security', 'malware'],
          'cryptography': ['encryption', 'hashing', 'ssl', 'tls'],
          'red teaming': ['pentesting', 'exploitation', 'post-exploitation'],
          'blue teaming': ['defense', 'monitoring', 'incident response']
        }
      },
      technology: {
        weight: 0.7,
        topics: {
          'programming': ['python', 'javascript', 'java', 'c++', 'bash'],
          'ai/ml': ['machine learning', 'neural networks', 'deep learning'],
          'cloud': ['aws', 'azure', 'google cloud', 'docker', 'kubernetes'],
          'blockchain': ['bitcoin', 'ethereum', 'smart contracts', 'defi'],
          'iot': ['internet of things', 'embedded systems', 'sensors']
        }
      },
      general: {
        weight: 0.5,
        topics: {
          'science': ['physics', 'chemistry', 'biology', 'astronomy'],
          'philosophy': ['ethics', 'logic', 'metaphysics', 'epistemology'],
          'arts': ['music', 'movies', 'literature', 'painting'],
          'history': ['ancient', 'medieval', 'modern', 'world wars'],
          'entertainment': ['games', 'sports', 'celebrities', 'trends']
        }
      }
    };
  }

  // Main response generator - handles ANY conversation
  async generateResponse(userMessage, forceOnline = false) {
    try {
      // Add to conversation history
      this.conversationHistory.push({
        role: 'user',
        content: userMessage,
        timestamp: Date.now()
      });
      
      if (this.conversationHistory.length > 20) {
        this.conversationHistory = this.conversationHistory.slice(-20);
      }
      
      // Analyze the query deeply
      const analysis = this.deepAnalyzeQuery(userMessage);
      
      // Check cache first
      const cacheKey = userMessage.toLowerCase().trim();
      if (this.knowledgeCache.has(cacheKey)) {
        const cached = this.knowledgeCache.get(cacheKey);
        if (Date.now() - cached.timestamp < 3600000) { // 1 hour cache
          return this.enhanceResponse(cached.response, analysis);
        }
      }
      
      // Determine if we need online information
      const needsOnline = this.shouldFetchOnline(analysis, forceOnline);
      
      let response;
      if (needsOnline) {
        response = await this.fetchOnlineInformation(userMessage, analysis);
      } else {
        response = this.generateLocalResponse(userMessage, analysis);
      }
      
      // Enhance and cache the response
      const enhancedResponse = this.enhanceResponse(response, analysis);
      this.knowledgeCache.set(cacheKey, {
        response: enhancedResponse,
        timestamp: Date.now()
      });
      
      return enhancedResponse;
      
    } catch (error) {
      console.error('AI Error:', error);
      return this.generateFallbackResponse(userMessage);
    }
  }

  // Deep query analysis
  deepAnalyzeQuery(query) {
    const text = query.toLowerCase();
    const words = text.split(/\s+/);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim());
    
    // Detect primary domain
    let primaryDomain = 'general';
    let domainScore = 0;
    
    for (const [domain, data] of Object.entries(this.domains)) {
      let score = 0;
      
      // Check topics in this domain
      for (const [topic, keywords] of Object.entries(data.topics)) {
        for (const keyword of keywords) {
          if (text.includes(keyword)) {
            score += data.weight * 10;
            if (text.includes(keyword + ' ') || text.includes(' ' + keyword)) {
              score += 5; // Exact match bonus
            }
          }
        }
      }
      
      // Check for domain-specific patterns
      if (domain === 'cybersecurity') {
        if (/\b(hack|security|cyber|pentest|exploit|vulnerability|attack|defense)\b/i.test(query)) {
          score += 20;
        }
      } else if (domain === 'technology') {
        if (/\b(tech|computer|software|hardware|code|program|algorithm)\b/i.test(query)) {
          score += 15;
        }
      }
      
      if (score > domainScore) {
        domainScore = score;
        primaryDomain = domain;
      }
    }
    
    // Detect question type
    const questionType = this.detectQuestionType(query);
    
    // Detect sentiment
    const sentiment = this.analyzeSentiment(text);
    
    // Detect complexity
    const complexity = this.assessComplexity(words, sentences);
    
    // Detect if it needs current information
    const needsCurrent = this.needsCurrentInfo(text);
    
    return {
      text: query,
      words,
      sentences,
      primaryDomain,
      domainScore,
      questionType,
      sentiment,
      complexity,
      needsCurrent,
      topics: this.extractTopics(text),
      entities: this.extractEntities(text)
    };
  }

  detectQuestionType(query) {
    if (query.includes('?')) {
      if (/^(what|who|where|when|why|how)\s+/i.test(query)) return 'specific';
      if (/^(can|could|would|should|will|shall|do|does|did|is|are|was|were)\s+/i.test(query)) return 'yesno';
      if (/^(explain|describe|tell me about|what is|define)\s+/i.test(query)) return 'explanatory';
    }
    return 'statement';
  }

  analyzeSentiment(text) {
    const positive = ['good', 'great', 'awesome', 'excellent', 'love', 'like', 'thanks', 'helpful'];
    const negative = ['bad', 'terrible', 'awful', 'hate', 'dislike', 'problem', 'error', 'wrong'];
    
    let score = 0;
    positive.forEach(word => { if (text.includes(word)) score++; });
    negative.forEach(word => { if (text.includes(word)) score--; });
    
    return score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral';
  }

  assessComplexity(words, sentences) {
    const wordCount = words.length;
    const sentenceCount = sentences.length;
    const avgSentenceLength = sentenceCount > 0 ? wordCount / sentenceCount : 0;
    
    // Count technical/specialized words
    const technicalWords = words.filter(word => 
      /^(nmap|metasploit|encryption|algorithm|blockchain|quantum|neural|api|sql|xss|csrf|ddos)$/i.test(word)
    ).length;
    
    if (technicalWords > 3 || avgSentenceLength > 15) return 'high';
    if (technicalWords > 1 || avgSentenceLength > 10) return 'medium';
    return 'low';
  }

  needsCurrentInfo(text) {
    const currentIndicators = [
      'current', 'latest', 'recent', 'today', 'now', '2024', '2025',
      'new', 'update', 'breaking', 'live', 'trending', 'stock', 'price',
      'weather', 'news', 'score', 'today\'s', 'this week', 'this month'
    ];
    
    // Also check for topics that typically need current info
    const timeSensitiveTopics = [
      'price', 'news', 'update', 'score', 'weather', 'election', 'covid',
      'crypto', 'bitcoin', 'stock', 'market', 'sports', 'game'
    ];
    
    const hasIndicator = currentIndicators.some(indicator => 
      new RegExp(`\\b${indicator}\\b`, 'i').test(text)
    );
    
    const hasTimeSensitive = timeSensitiveTopics.some(topic => 
      new RegExp(`\\b${topic}\\b`, 'i').test(text)
    );
    
    // If query asks about something that changes frequently
    if (hasIndicator || hasTimeSensitive) {
      return true;
    }
    
    // Check if it's asking about something that evolves (like AI, tech)
    const evolvingTopics = ['ai', 'artificial intelligence', 'machine learning', 'quantum'];
    if (evolvingTopics.some(topic => text.includes(topic))) {
      // Only fetch online occasionally for these
      return Math.random() > 0.7;
    }
    
    return false;
  }

  extractTopics(text) {
    const topics = [];
    
    // Check all domains
    for (const [domain, data] of Object.entries(this.domains)) {
      for (const [topic, keywords] of Object.entries(data.topics)) {
        for (const keyword of keywords) {
          if (text.includes(keyword)) {
            topics.push({ topic, domain, keyword });
            break;
          }
        }
      }
    }
    
    return topics.slice(0, 5); // Return top 5 topics
  }

  extractEntities(text) {
    const entities = {
      people: [],
      places: [],
      organizations: [],
      technologies: [],
      concepts: []
    };
    
    // Simple entity extraction (in a real system, this would be much more sophisticated)
    const techTerms = ['python', 'javascript', 'react', 'node.js', 'docker', 'kubernetes'];
    const securityTools = ['nmap', 'metasploit', 'burp', 'wireshark', 'john'];
    
    techTerms.forEach(tech => {
      if (text.includes(tech)) entities.technologies.push(tech);
    });
    
    securityTools.forEach(tool => {
      if (text.includes(tool)) entities.technologies.push(tool);
    });
    
    return entities;
  }

  shouldFetchOnline(analysis, forceOnline) {
    if (forceOnline) return true;
    
    // Always try online for current information
    if (analysis.needsCurrent) {
      return true;
    }
    
    // For high complexity questions in cybersecurity/tech
    if (analysis.complexity === 'high' && 
        (analysis.primaryDomain === 'cybersecurity' || analysis.primaryDomain === 'technology')) {
      return Math.random() > 0.3; // 70% chance for online
    }
    
    // For explanatory questions that might need references
    if (analysis.questionType === 'explanatory' && analysis.domainScore > 15) {
      return Math.random() > 0.5; // 50% chance
    }
    
    // Occasionally fetch online to keep responses fresh
    const timeSinceLastOnline = Date.now() - this.lastOnlineCheck;
    if (timeSinceLastOnline > 300000) { // 5 minutes
      return Math.random() > 0.8; // 20% chance
    }
    
    return false;
  }

  async fetchOnlineInformation(query, analysis) {
    try {
      this.lastOnlineCheck = Date.now();
      
      // Try multiple sources
      const sources = [
        this.tryDuckDuckGo.bind(this, query),
        this.tryWikipedia.bind(this, query)
      ];
      
      for (const source of sources) {
        try {
          const result = await source();
          if (result && result.content) {
            return this.formatOnlineResponse(result, analysis);
          }
        } catch (error) {
          console.log(`Source failed: ${error.message}`);
          continue;
        }
      }
      
      throw new Error('All online sources failed');
      
    } catch (error) {
      console.log('Online fetch failed, using enhanced local response');
      return this.generateEnhancedLocalResponse(query, analysis);
    }
  }

  async tryDuckDuckGo(query) {
    try {
      const response = await fetch(
        `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`,
        { signal: AbortSignal.timeout(5000) }
      );
      
      if (!response.ok) throw new Error('Network response not ok');
      
      const data = await response.json();
      
      if (data.Abstract && data.Abstract.length > 50) {
        return {
          source: 'DuckDuckGo',
          content: data.Abstract,
          url: data.AbstractURL,
          related: data.RelatedTopics?.slice(0, 3) || []
        };
      }
    } catch (error) {
      throw new Error(`DuckDuckGo: ${error.message}`);
    }
    return null;
  }

  async tryWikipedia(query) {
    try {
      // First search
      const searchResponse = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*&srlimit=1`,
        { signal: AbortSignal.timeout(5000) }
      );
      
      if (!searchResponse.ok) throw new Error('Wikipedia search failed');
      
      const searchData = await searchResponse.json();
      
      if (searchData.query.search.length > 0) {
        const pageId = searchData.query.search[0].pageid;
        
        // Get extract
        const pageResponse = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&explaintext=true&pageids=${pageId}&format=json&origin=*`,
          { signal: AbortSignal.timeout(5000) }
        );
        
        const pageData = await pageResponse.json();
        const page = pageData.query.pages[pageId];
        
        if (page.extract) {
          return {
            source: 'Wikipedia',
            content: page.extract.substring(0, 800) + (page.extract.length > 800 ? '...' : ''),
            url: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, '_'))}`,
            title: page.title
          };
        }
      }
    } catch (error) {
      throw new Error(`Wikipedia: ${error.message}`);
    }
    return null;
  }

  formatOnlineResponse(data, analysis) {
    let response = `🌐 **Online Information** | *Source: ${data.source}*\n\n`;
    
    if (data.source === 'Wikipedia') {
      response += `**${data.title}**\n\n`;
    }
    
    response += `${data.content}\n\n`;
    
    if (data.url) {
      response += `🔗 **Source:** [${data.source}](${data.url})\n\n`;
    }
    
    if (data.related && data.related.length > 0) {
      response += `📚 **Related:**\n`;
      data.related.forEach((rel, i) => {
        if (rel.Text && i < 3) {
          response += `• ${rel.Text}\n`;
        }
      });
      response += `\n`;
    }
    
    // Add cybersecurity context if relevant
    if (analysis.primaryDomain === 'cybersecurity') {
      response += `\n🔐 **Cybersecurity Perspective:**\n`;
      response += this.addSecurityContext(data.content, analysis.topics);
    }
    
    response += `\n---\n*Information fetched in real-time • Updated: ${new Date().toLocaleTimeString()}*`;
    
    return response;
  }

  generateLocalResponse(query, analysis) {
    // Generate comprehensive local response
    let response = '';
    
    // Add domain-specific header
    switch(analysis.primaryDomain) {
      case 'cybersecurity':
        response += `🔐 **Cybersecurity Expert Analysis**\n\n`;
        response += this.generateCybersecurityResponse(query, analysis);
        break;
      case 'technology':
        response += `💻 **Technology Insight**\n\n`;
        response += this.generateTechnologyResponse(query, analysis);
        break;
      default:
        response += `🧠 **Analysis**\n\n`;
        response += this.generateGeneralResponse(query, analysis);
    }
    
    // Add thoughtful conclusion
    response += `\n\n💡 **Key Takeaway:** `;
    response += this.generateTakeaway(analysis);
    
    return response;
  }

  generateEnhancedLocalResponse(query, analysis) {
    // Even better local response when online fails
    let response = `⚡ **Enhanced Local Intelligence**\n\n`;
    
    response += `**Understanding:** "${query.substring(0, 100)}${query.length > 100 ? '...' : ''}"\n\n`;
    
    // Add domain expertise
    if (analysis.primaryDomain === 'cybersecurity') {
      response += `**Cybersecurity Framework:**\n`;
      response += `1. **Assessment:** ${this.assessSecurityAspect(query)}\n`;
      response += `2. **Tools:** ${this.recommendSecurityTools(query)}\n`;
      response += `3. **Methodology:** ${this.suggestMethodology(query)}\n`;
      response += `4. **Best Practices:** ${this.securityBestPractices(query)}\n\n`;
    }
    
    // Add detailed explanation
    response += `**Comprehensive Explanation:**\n\n`;
    response += this.generateDetailedExplanation(query, analysis);
    
    // Add examples if relevant
    if (analysis.questionType === 'explanatory' || analysis.complexity === 'medium') {
      response += `\n**Example:**\n`;
      response += this.generateExample(query, analysis);
    }
    
    // Add follow-up suggestions
    response += `\n**Further Exploration:**\n`;
    response += this.suggestFollowUps(query, analysis);
    
    return response;
  }

  generateCybersecurityResponse(query, analysis) {
    // Comprehensive cybersecurity knowledge
    const responses = {
      'nmap': this.getNmapGuide(),
      'metasploit': this.getMetasploitGuide(),
      'sql injection': this.getSQLInjectionGuide(),
      'xss': this.getXSSGuide(),
      'firewall': this.getFirewallGuide(),
      'encryption': this.getEncryptionGuide(),
      'pentesting': this.getPentestingGuide(),
      'malware': this.getMalwareGuide()
    };
    
    // Check for specific topics first
    for (const [topic, guide] of Object.entries(responses)) {
      if (query.toLowerCase().includes(topic)) {
        return guide;
      }
    }
    
    // General cybersecurity response
    return `**Cybersecurity involves protecting systems, networks, and programs from digital attacks.**\n\n` +
           `**Key Areas:**\n` +
           `• **Network Security:** Protecting network infrastructure\n` +
           `• **Application Security:** Securing software and applications\n` +
           `• **Information Security:** Protecting data integrity and privacy\n` +
           `• **Operational Security:** Processes and decisions for handling data\n` +
           `• **Disaster Recovery:** Business continuity planning\n\n` +
           `**Essential Tools:** Nmap, Wireshark, Metasploit, Burp Suite, John the Ripper\n\n` +
           `**Best Practices:** Regular updates, strong passwords, 2FA, employee training, backups`;
  }

  getNmapGuide() {
    return `**Nmap (Network Mapper) - Ultimate Network Scanning Tool**\n\n` +
           `**Common Commands:**\n` +
           `\`\`\`bash\n` +
           `# Basic TCP SYN scan (stealth)\n` +
           `nmap -sS target.com\n\n` +
           `# Comprehensive scan with version detection\n` +
           `nmap -sS -sV -sC -O target.com\n\n` +
           `# Fast scan of top ports\n` +
           `nmap -F target.com\n\n` +
           `# Aggressive scan with timing template\n` +
           `nmap -A -T4 target.com\n\n` +
           `# Specific port range\n` +
           `nmap -p 1-1000 target.com\n` +
           `\`\`\`\n\n` +
           `**Advanced Techniques:**\n` +
           `• **OS Detection:** \`-O\` flag\n` +
           `• **Script Scanning:** \`--script\` for vulnerability detection\n` +
           `• **Output Formats:** \`-oN\` (normal), \`-oX\` (XML), \`-oG\` (grepable)\n` +
           `• **Firewall Evasion:** \`-f\` (fragment packets), \`--mtu\`\n\n` +
           `**Ethical Use:** Always obtain proper authorization before scanning!`;
  }

  getMetasploitGuide() {
    return `**Metasploit Framework - Penetration Testing Platform**\n\n` +
           `**Workflow:**\n` +
           `\`\`\`bash\n` +
           `# Start the framework\n` +
           `msfconsole\n\n` +
           `# Search for exploits\n` +
           `search type:exploit platform:windows\n\n` +
           `# Use an exploit module\n` +
           `use exploit/windows/smb/ms17_010_eternalblue\n\n` +
           `# Show available options\n` +
           `show options\n\n` +
           `# Set required parameters\n` +
           `set RHOSTS target.com\n` +
           `set PAYLOAD windows/x64/meterpreter/reverse_tcp\n\n` +
           `# Execute the exploit\n` +
           `exploit\n` +
           `\`\`\`\n\n` +
           `**Key Modules:**\n` +
           `• **Exploits:** Code that takes advantage of vulnerabilities\n` +
           `• **Payloads:** Code that runs after successful exploitation\n` +
           `• **Auxiliary:** Scanning, fuzzing, and other supporting modules\n` +
           `• **Post:** Post-exploitation modules for maintaining access\n\n` +
           `**Best Practices:**\n` +
           `1. Always use in authorized environments\n` +
           `2. Test payloads in isolated labs first\n` +
           `3. Document all steps for reporting\n` +
           `4. Clean up after testing`;
  }

  // Add other specialized guides...
  getSQLInjectionGuide() {
    return `**SQL Injection - Web Application Vulnerability**\n\n` +
           `**How it works:** Attackers inject malicious SQL code into input fields.\n\n` +
           `**Common Payloads (for authorized testing):**\n` +
           `\`\`\`sql\n` +
           `' OR '1'='1\n` +
           `' UNION SELECT username, password FROM users--\n` +
           `' OR IF(1=1,SLEEP(5),0)--\n` +
           `\`\`\`\n\n` +
           `**Prevention Methods:**\n` +
           `1. **Parameterized Queries:** Always use prepared statements\n` +
           `2. **Input Validation:** Whitelist acceptable characters\n` +
           `3. **Stored Procedures:** With proper validation\n` +
           `4. **Least Privilege:** Database user permissions\n` +
           `5. **WAF:** Web Application Firewall rules\n\n` +
           `**Testing Tools:** SQLMap, Burp Suite, manual testing`;
  }

  enhanceResponse(baseResponse, analysis) {
    // Enhance the response based on analysis
    let enhanced = baseResponse;
    
    // Add contextual header based on domain
    const headers = {
      cybersecurity: '🔐',
      technology: '💻',
      general: '🧠'
    };
    
    if (!enhanced.startsWith(headers[analysis.primaryDomain])) {
      enhanced = `${headers[analysis.primaryDomain]} **${analysis.primaryDomain.toUpperCase()} MODE**\n\n${enhanced}`;
    }
    
    // Add conversation context if we have history
    if (this.conversationHistory.length > 1) {
      const prevContext = this.conversationHistory[this.conversationHistory.length - 2];
      if (prevContext && prevContext.role === 'user') {
        enhanced += `\n\n*Continuing from your previous question about "${prevContext.content.substring(0, 50)}..."*`;
      }
    }
    
    // Add relevant tips based on complexity
    if (analysis.complexity === 'high') {
      enhanced += `\n\n📚 **Deep Dive Available:** Want more technical details or practical examples?`;
    } else if (analysis.complexity === 'low') {
      enhanced += `\n\n💡 **Want to go deeper?** I can provide advanced insights on this topic.`;
    }
    
    // Add ethical reminder for security topics
    if (analysis.primaryDomain === 'cybersecurity') {
      enhanced += `\n\n🔒 **Ethical Reminder:** Always obtain proper authorization for security testing.`;
    }
    
    return enhanced;
  }

  generateFallbackResponse(query) {
    return `🤖 **ShadowGPT Ultimate AI**\n\n` +
           `I encountered a technical issue while processing your query. Let me provide my analysis:\n\n` +
           `**Query:** "${query}"\n\n` +
           `**Based on my cybersecurity expertise:**\n` +
           `• This appears to be a valid query that deserves attention\n` +
           `• I recommend approaching this topic with proper research methodology\n` +
           `• Consider both offensive and defensive security perspectives\n\n` +
           `**Suggested Next Steps:**\n` +
           `1. Research the topic using multiple reliable sources\n` +
           `2. Test any techniques in controlled, authorized environments\n` +
           `3. Document findings and implement appropriate security measures\n\n` +
           `*Try rephrasing your question or ask about a specific aspect!*`;
  }

  // Helper methods for response generation
  assessSecurityAspect(query) {
    const aspects = [
      'Vulnerability assessment and management',
      'Attack surface analysis',
      'Risk assessment and mitigation',
      'Security architecture review',
      'Compliance requirements analysis'
    ];
    return aspects[Math.floor(Math.random() * aspects.length)];
  }

  recommendSecurityTools(query) {
    const tools = [
      'Nmap for network scanning, Wireshark for traffic analysis',
      'Metasploit for exploitation, Burp Suite for web testing',
      'John the Ripper for password cracking, Hashcat for GPU acceleration',
      'SQLMap for SQL injection testing, OWASP ZAP for web security'
    ];
    return tools[Math.floor(Math.random() * tools.length)];
  }

  suggestMethodology(query) {
    const methods = [
      'OWASP Testing Guide methodology',
      'PTES (Penetration Testing Execution Standard)',
      'NIST Cybersecurity Framework approach',
      'MITRE ATT&CK framework for threat modeling'
    ];
    return methods[Math.floor(Math.random() * methods.length)];
  }

  securityBestPractices(query) {
    const practices = [
      'Defense in depth with multiple security layers',
      'Least privilege principle for access control',
      'Regular security awareness training',
      'Continuous monitoring and incident response planning'
    ];
    return practices[Math.floor(Math.random() * practices.length)];
  }

  generateDetailedExplanation(query, analysis) {
    const explanations = [
      `This topic involves multiple layers of understanding, from basic concepts to advanced implementations. ` +
      `In cybersecurity context, we must consider both theoretical foundations and practical applications.`,
      
      `Understanding this requires examining it through different security lenses: confidentiality, integrity, ` +
      `and availability (CIA triad). Each aspect reveals different considerations and potential vulnerabilities.`,
      
      `From a technical perspective, this intersects with several security domains including network security, ` +
      `application security, and human factors. A comprehensive approach addresses all these areas.`
    ];
    
    return explanations[Math.floor(Math.random() * explanations.length)];
  }

  generateExample(query, analysis) {
    if (analysis.primaryDomain === 'cybersecurity') {
      return `**Scenario:** A company wants to test their web application security.\n` +
             `**Approach:**\n` +
             `1. Reconnaissance: Identify all endpoints and technologies\n` +
             `2. Scanning: Use automated tools like Burp Suite\n` +
             `3. Manual Testing: Validate findings and explore edge cases\n` +
             `4. Reporting: Document vulnerabilities with proof of concepts\n` +
             `5. Remediation: Work with developers to fix issues`;
    }
    
    return `**Example:** Consider a real-world implementation where this concept is applied, ` +
           `analyzing both successful cases and common pitfalls encountered.`;
  }

  suggestFollowUps(query, analysis) {
    const followUps = [
      `• "Can you provide a step-by-step guide for implementation?"`,
      `• "What are the common mistakes to avoid with this?"`,
      `• "How does this compare to alternative approaches?"`,
      `• "What tools would you recommend for practical application?"`,
      `• "Could you explain the security implications in detail?"`
    ];
    
    // Select 2-3 relevant follow-ups
    const selected = [];
    while (selected.length < 3 && followUps.length > 0) {
      const index = Math.floor(Math.random() * followUps.length);
      selected.push(followUps.splice(index, 1)[0]);
    }
    
    return selected.join('\n');
  }

  generateTakeaway(analysis) {
    const takeaways = {
      cybersecurity: 'Security is a process, not a product. Continuous assessment and improvement are key.',
      technology: 'Understanding fundamentals enables effective application of advanced concepts.',
      general: 'Critical thinking and verification from multiple sources lead to better understanding.'
    };
    
    return takeaways[analysis.primaryDomain] || 
           'Knowledge grows through exploration and practical application.';
  }

  // Clean up method
  clearCache() {
    this.knowledgeCache.clear();
    return '🧹 Cache cleared successfully!';
  }

  // Get conversation summary
  getConversationSummary() {
    if (this.conversationHistory.length === 0) {
      return 'No conversation history yet.';
    }
    
    const userMessages = this.conversationHistory
      .filter(msg => msg.role === 'user')
      .slice(-5)
      .map(msg => msg.content.substring(0, 50) + (msg.content.length > 50 ? '...' : ''));
    
    return `**Recent Topics:**\n${userMessages.map((msg, i) => `${i + 1}. ${msg}`).join('\n')}`;
  }
}

// Export singleton instance
export const ultimateAI = new UltimateAIBrain();
export default UltimateAIBrain;
