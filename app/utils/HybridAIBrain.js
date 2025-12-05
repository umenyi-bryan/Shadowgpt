// Hybrid AI Brain - Works offline by default, can fetch online info when needed
// 100% Free • Smart Web Integration • Real-time Information

class HybridAIBrain {
  constructor() {
    this.mode = 'hybrid'; // 'offline', 'hybrid', 'online'
    this.conversationHistory = [];
    this.onlineSources = {
      wikipedia: true,
      duckduckgo: true,
      news: false,
      cybersecurity: true
    };
    
    // Local knowledge base (expanded)
    this.localKnowledge = {
      cybersecurity: {
        tools: ['nmap', 'metasploit', 'burp suite', 'wireshark', 'john', 'sqlmap', 'hydra', 'aircrack', 'nikto', 'nessus'],
        concepts: ['sql injection', 'xss', 'csrf', 'ddos', 'phishing', 'malware', 'ransomware', 'firewall', 'ids', 'ips'],
        techniques: ['port scanning', 'vulnerability assessment', 'exploit development', 'post-exploitation', 'privilege escalation']
      },
      programming: {
        languages: ['python', 'javascript', 'java', 'c++', 'bash', 'powershell', 'go', 'rust'],
        concepts: ['oop', 'functional programming', 'data structures', 'algorithms', 'apis', 'databases']
      },
      general: {
        topics: ['science', 'history', 'technology', 'philosophy', 'art', 'music', 'movies', 'books', 'gaming']
      }
    };
  }

  // Main response generator with hybrid capabilities
  async generateResponse(userMessage, useOnline = false) {
    const message = userMessage.toLowerCase().trim();
    
    // Update conversation history
    this.conversationHistory.push({ user: userMessage, time: new Date() });
    if (this.conversationHistory.length > 10) {
      this.conversationHistory = this.conversationHistory.slice(-10);
    }
    
    // Check if we need online information
    const needsOnlineInfo = this.requiresOnlineInfo(message);
    
    if (useOnline && needsOnlineInfo && this.mode !== 'offline') {
      try {
        return await this.generateOnlineResponse(userMessage);
      } catch (error) {
        console.log('Online fetch failed, using offline:', error);
        return this.generateOfflineResponse(userMessage);
      }
    } else {
      return this.generateOfflineResponse(userMessage);
    }
  }

  // Determine if query needs online information
  requiresOnlineInfo(query) {
    const onlineKeywords = [
      'latest', 'recent', 'today', 'current', 'news', 'update',
      '2024', '2025', 'new', 'trending', 'breaking',
      'stock', 'price', 'weather', 'live', 'score',
      'wiki', 'wikipedia', 'search', 'find', 'lookup'
    ];
    
    const complexTopics = [
      'quantum computing', 'artificial general intelligence',
      'latest vulnerability', 'zero-day', 'cve-2024',
      'cryptocurrency price', 'bitcoin', 'ethereum',
      'space launch', 'nasa', 'spacex'
    ];
    
    // Check for online keywords
    if (onlineKeywords.some(keyword => query.includes(keyword))) {
      return true;
    }
    
    // Check for complex topics that need current info
    if (complexTopics.some(topic => query.includes(topic))) {
      return true;
    }
    
    // If query asks for current/latest information
    if (query.includes('current') || query.includes('latest') || query.includes('recent')) {
      return true;
    }
    
    return false;
  }

  // Generate response using online information
  async generateOnlineResponse(query) {
    // Try multiple free APIs
    try {
      // First try DuckDuckGo Instant Answer API (free)
      const ddgResponse = await this.fetchDuckDuckGo(query);
      if (ddgResponse && ddgResponse.Abstract) {
        return this.formatOnlineResponse(query, ddgResponse, 'duckduckgo');
      }
      
      // Try Wikipedia API (free)
      const wikiResponse = await this.fetchWikipedia(query);
      if (wikiResponse) {
        return this.formatOnlineResponse(query, wikiResponse, 'wikipedia');
      }
      
      // Try Hacker News API for tech/security topics
      if (this.isTechRelated(query)) {
        const hnResponse = await this.fetchHackerNews(query);
        if (hnResponse) {
          return this.formatOnlineResponse(query, hnResponse, 'hackernews');
        }
      }
      
      // Fallback to offline if all APIs fail
      throw new Error('All online sources failed');
      
    } catch (error) {
      // If online fails, use enhanced offline response
      return this.generateEnhancedOfflineResponse(query, true);
    }
  }

  // Fetch from DuckDuckGo Instant Answer API (FREE)
  async fetchDuckDuckGo(query) {
    try {
      const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1`);
      const data = await response.json();
      
      if (data.Abstract) {
        return {
          abstract: data.Abstract,
          source: data.AbstractSource,
          url: data.AbstractURL,
          related: data.RelatedTopics?.slice(0, 3) || []
        };
      }
      return null;
    } catch (error) {
      console.error('DuckDuckGo fetch error:', error);
      return null;
    }
  }

  // Fetch from Wikipedia API (FREE)
  async fetchWikipedia(query) {
    try {
      // Get search results
      const searchResponse = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`
      );
      const searchData = await searchResponse.json();
      
      if (searchData.query.search.length > 0) {
        const firstResult = searchData.query.search[0];
        const pageId = firstResult.pageid;
        
        // Get page content
        const pageResponse = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=true&explaintext=true&pageids=${pageId}&format=json&origin=*`
        );
        const pageData = await pageResponse.json();
        
        const page = pageData.query.pages[pageId];
        if (page.extract) {
          return {
            title: page.title,
            extract: page.extract.substring(0, 500) + '...',
            url: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title.replace(/ /g, '_'))}`,
            searchResults: searchData.query.search.slice(0, 3)
          };
        }
      }
      return null;
    } catch (error) {
      console.error('Wikipedia fetch error:', error);
      return null;
    }
  }

  // Fetch from Hacker News API (FREE)
  async fetchHackerNews(query) {
    try {
      // Get latest stories
      const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      const storyIds = await response.json();
      
      // Get first 5 story details
      const stories = [];
      for (let i = 0; i < Math.min(5, storyIds.length); i++) {
        const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyIds[i]}.json`);
        const story = await storyResponse.json();
        if (story && story.title) {
          stories.push({
            title: story.title,
            url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
            score: story.score || 0,
            time: story.time
          });
        }
      }
      
      return {
        stories: stories.slice(0, 3),
        query: query,
        source: 'Hacker News'
      };
    } catch (error) {
      console.error('Hacker News fetch error:', error);
      return null;
    }
  }

  // Format online response
  formatOnlineResponse(query, data, source) {
    let response = `🌐 **Online Information Found**\n\n`;
    response += `**Query:** "${query}"\n\n`;
    
    switch(source) {
      case 'duckduckgo':
        response += `**From ${data.source}:**\n\n${data.abstract}\n\n`;
        if (data.url) {
          response += `🔗 **Source:** [${data.source}](${data.url})\n\n`;
        }
        if (data.related.length > 0) {
          response += `📚 **Related Topics:**\n`;
          data.related.forEach(topic => {
            if (topic.FirstURL && topic.Text) {
              response += `• [${topic.Text}](${topic.FirstURL})\n`;
            }
          });
        }
        break;
        
      case 'wikipedia':
        response += `**📖 Wikipedia: ${data.title}**\n\n${data.extract}\n\n`;
        response += `🔗 **Full Article:** [Read on Wikipedia](${data.url})\n\n`;
        if (data.searchResults && data.searchResults.length > 0) {
          response += `🔍 **Related Articles:**\n`;
          data.searchResults.forEach(result => {
            response += `• ${result.title}\n`;
          });
        }
        break;
        
      case 'hackernews':
        response += `**🚀 Latest Tech/Security News**\n\n`;
        data.stories.forEach((story, index) => {
          response += `${index + 1}. **[${story.title}](${story.url})**\n`;
          if (story.score) response += `   ⭐ ${story.score} points\n`;
        });
        response += `\n🔗 **Source:** [Hacker News](https://news.ycombinator.com/)`;
        break;
    }
    
    response += `\n\n---\n`;
    response += `*Information fetched from ${source} • Updated in real-time*`;
    response += `\n*💡 Tip: Ask for updates on any topic!*`;
    
    return response;
  }

  // Generate enhanced offline response
  generateEnhancedOfflineResponse(query, onlineFailed = false) {
    let response = '';
    
    if (onlineFailed) {
      response += `⚠️ **Could not fetch online information**\n\n`;
      response += `I tried to get current information but encountered an issue.\n\n`;
      response += `**Here's what I can tell you based on my knowledge:**\n\n`;
    }
    
    // Enhanced offline response generation
    const category = this.categorizeQuery(query);
    
    switch(category) {
      case 'cybersecurity':
        response += this.generateCybersecurityResponse(query);
        break;
      case 'programming':
        response += this.generateProgrammingResponse(query);
        break;
      case 'technology':
        response += this.generateTechnologyResponse(query);
        break;
      case 'general':
        response += this.generateGeneralResponse(query);
        break;
      default:
        response += this.generateCreativeResponse(query);
    }
    
    if (onlineFailed) {
      response += `\n\n🔌 **Offline Mode Active**\n`;
      response += `• Try rephrasing your question\n`;
      response += `• Ask about general concepts instead of current events\n`;
      response += `• Enable online mode for real-time information\n`;
    }
    
    return response;
  }

  // Categorize query
  categorizeQuery(query) {
    const cybersecurityTerms = this.localKnowledge.cybersecurity.tools
      .concat(this.localKnowledge.cybersecurity.concepts)
      .concat(this.localKnowledge.cybersecurity.techniques);
    
    const programmingTerms = this.localKnowledge.programming.languages
      .concat(this.localKnowledge.programming.concepts);
    
    if (cybersecurityTerms.some(term => query.includes(term))) {
      return 'cybersecurity';
    } else if (programmingTerms.some(term => query.includes(term))) {
      return 'programming';
    } else if (query.includes('tech') || query.includes('computer') || query.includes('ai')) {
      return 'technology';
    } else {
      return 'general';
    }
  }

  // Response generators (similar to previous but enhanced)
  generateCybersecurityResponse(query) {
    const response = `🔐 **Cybersecurity Analysis**\n\n`;
    
    if (query.includes('nmap') || query.includes('scan')) {
      return response + this.generateNmapGuide();
    } else if (query.includes('metasploit')) {
      return response + this.generateMetasploitGuide();
    } else if (query.includes('sql') || query.includes('injection')) {
      return response + this.generateSQLInjectionGuide();
    } else {
      return response + this.generateGeneralSecurityGuide();
    }
  }

  generateProgrammingResponse(query) {
    const language = this.detectProgrammingLanguage(query);
    return `💻 **${language.toUpperCase()} Programming**\n\n` + 
           this.generateLanguageGuide(language) + 
           `\n\n**Example Code:**\n\`\`\`${language}\n` + 
           this.generateCodeExample(language) + 
           `\n\`\`\``;
  }

  generateTechnologyResponse(query) {
    const topics = ['Artificial Intelligence', 'Blockchain', 'Cloud Computing', 'IoT', 'Quantum Computing'];
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    return `⚡ **Technology: ${randomTopic}**\n\n` +
           this.generateTechExplanation(randomTopic) +
           `\n\n**Security Implications:**\n` +
           this.generateSecurityImplications(randomTopic);
  }

  generateGeneralResponse(query) {
    return `🤔 **Analysis of:** "${query.substring(0, 50)}${query.length > 50 ? '...' : ''}"\n\n` +
           `This appears to be about **${this.extractMainTopic(query)}**.\n\n` +
           `**Key Points:**\n` +
           `• Consider multiple perspectives\n` +
           `• Research from reliable sources\n` +
           `• Understand the context\n` +
           `• Apply critical thinking\n\n` +
           `**For more specific information, try:**\n` +
           `• Asking about a particular aspect\n` +
           `• Requesting examples\n` +
           `• Enabling online mode for current data`;
  }

  generateCreativeResponse(query) {
    return `🎭 **Interesting Question!**\n\n` +
           `"${query}"\n\n` +
           `This could be approached from different angles:\n\n` +
           `1. **Practical perspective:** How this applies in real-world scenarios\n` +
           `2. **Theoretical perspective:** Underlying principles and concepts\n` +
           `3. **Historical perspective:** Evolution and development over time\n` +
           `4. **Future perspective:** Potential developments and implications\n\n` +
           `**What aspect interests you most?**`;
  }

  // Helper methods
  generateNmapGuide() {
    return `**Nmap Network Scanner** is essential for:\n\n` +
           `• Network discovery and inventory\n` +
           `• Security auditing and compliance\n` +
           `• Service version detection\n` +
           `• Operating system fingerprinting\n\n` +
           `**Common Commands:**\n\`\`\`bash\n` +
           `nmap -sS target.com              # Stealth scan\n` +
           `nmap -sV -sC target.com          # Version detection + scripts\n` +
           `nmap -O target.com               # OS detection\n` +
           `nmap -A -T4 target.com           # Aggressive scan\n` +
           `nmap -p 80,443,22 target.com     # Specific ports\n\`\`\``;
  }

  generateMetasploitGuide() {
    return `**Metasploit Framework** workflow:\n\n` +
           `1. \`msfconsole\` - Start framework\n` +
           `2. \`search [exploit]\` - Find modules\n` +
           `3. \`use [module]\` - Select module\n` +
           `4. \`show options\` - Configure\n` +
           `5. \`set RHOSTS target.com\` - Set target\n` +
           `6. \`exploit\` - Execute\n\n` +
           `**Ethical use requires proper authorization!**`;
  }

  generateSQLInjectionGuide() {
    return `**SQL Injection Prevention:**\n\n` +
           `**Critical Measures:**\n` +
           `1. **Parameterized Queries** - Always use prepared statements\n` +
           `2. **Input Validation** - Whitelist acceptable characters\n` +
           `3. **Stored Procedures** - With proper validation\n` +
           `4. **Least Privilege** - Database user permissions\n` +
           `5. **Web Application Firewall** - Additional protection layer\n\n` +
           `**Testing (Authorized Only):**\n\`\`\`sql\n` +
           `' OR '1'='1                     # Basic test\n` +
           `' UNION SELECT null,username,password FROM users--  # Union-based\n` +
           `' OR IF(1=1,SLEEP(5),0)--      # Time-based blind\n\`\`\``;
  }

  generateGeneralSecurityGuide() {
    return `**Cybersecurity Fundamentals:**\n\n` +
           `**Core Principles:**\n` +
           `• **Confidentiality** - Protect sensitive information\n` +
           `• **Integrity** - Ensure data accuracy and consistency\n` +
           `• **Availability** - Maintain access to systems and data\n\n` +
           `**Essential Practices:**\n` +
           `• Regular software updates and patches\n` +
           `• Strong password policies and 2FA\n` +
           `• Employee security awareness training\n` +
           `• Regular backups and disaster recovery planning\n` +
           `• Continuous monitoring and logging\n\n` +
           `**Remember:** Security is a process, not a product!`;
  }

  detectProgrammingLanguage(query) {
    const languages = ['python', 'javascript', 'java', 'c++', 'bash', 'go', 'rust'];
    for (const lang of languages) {
      if (query.includes(lang)) return lang;
    }
    return 'python'; // default
  }

  generateLanguageGuide(language) {
    const guides = {
      python: `Python is great for:\n• Rapid prototyping\n• Data analysis and visualization\n• Automation and scripting\n• Web development (Django/Flask)\n• Machine learning and AI`,
      javascript: `JavaScript is essential for:\n• Web development (frontend/backend)\n• Browser automation\n• Real-time applications\n• Mobile apps (React Native)\n• Serverless functions`,
      bash: `Bash is perfect for:\n• System administration\n• Automation and scripting\n• File manipulation\n• Process management\n• Tool chaining`
    };
    return guides[language] || `Learn ${language} for various programming tasks.`;
  }

  generateCodeExample(language) {
    const examples = {
      python: `def check_security(url):\n    """Basic security check"""\n    import requests\n    try:\n        response = requests.get(url, timeout=5)\n        return f"Status: {response.status_code}"\n    except Exception as e:\n        return f"Error: {str(e)}"`,
      javascript: `async function fetchData(url) {\n    try {\n        const response = await fetch(url);\n        const data = await response.json();\n        return data;\n    } catch (error) {\n        console.error('Fetch error:', error);\n        return null;\n    }\n}`,
      bash: `#!/bin/bash\n\n# Security check script\ncheck_system() {\n    echo "Checking system security..."\n    # Add security checks here\n    echo "Check complete!"\n}\n\ncheck_system`
    };
    return examples[language] || `# ${language} code example\n# Implement your logic here`;
  }

  generateTechExplanation(topic) {
    const explanations = {
      'Artificial Intelligence': 'AI involves creating systems that can perform tasks requiring human intelligence, like learning and problem-solving. Current applications include machine learning, natural language processing, and computer vision.',
      'Blockchain': 'Blockchain is a decentralized digital ledger that records transactions across multiple computers securely. It\'s the technology behind cryptocurrencies and enables transparent, tamper-proof record keeping.',
      'Cloud Computing': 'Cloud computing delivers computing services over the internet, providing on-demand access to resources like servers, storage, and applications without direct management.',
      'Quantum Computing': 'Quantum computing uses quantum bits (qubits) that can exist in multiple states simultaneously, potentially solving complex problems exponentially faster than classical computers.'
    };
    return explanations[topic] || `${topic} represents significant advancement in technology with broad applications.`;
  }

  generateSecurityImplications(topic) {
    const implications = {
      'Artificial Intelligence': '• AI-powered security tools\n• Adversarial machine learning attacks\n• Privacy concerns with data collection\n• AI-generated phishing attacks',
      'Blockchain': '• Immutable transaction records\n• Smart contract vulnerabilities\n• Cryptocurrency theft risks\n• Regulatory compliance challenges',
      'Cloud Computing': '• Shared responsibility model\n• Data breaches in multi-tenant environments\n• Configuration errors and misalignment\n• Compliance across jurisdictions',
      'Quantum Computing': '• Breaking current encryption (post-quantum crypto needed)\n• New cryptographic algorithms\n• Security implications for blockchain\n• Long-term data protection strategies'
    };
    return implications[topic] || `• New attack vectors\n• Privacy considerations\n• Regulatory requirements\n• Security best practices evolution`;
  }

  extractMainTopic(query) {
    const words = query.split(' ');
    if (words.length > 2) {
      return words.slice(-2).join(' ');
    }
    return query.substring(0, 30);
  }

  isTechRelated(query) {
    const techTerms = ['hack', 'security', 'cyber', 'tech', 'programming', 'code', 'software', 'computer', 'ai', 'machine learning'];
    return techTerms.some(term => query.includes(term));
  }

  // Set mode
  setMode(newMode) {
    this.mode = newMode;
    return `🔄 **Mode changed to: ${newMode.toUpperCase()}**\n\n` +
           (newMode === 'online' ? 
            'I will try to fetch real-time information when needed.' :
            newMode === 'hybrid' ?
            'I will use local knowledge first, then fetch online if needed.' :
            'I will use only local knowledge (works offline).');
  }
}

// Export instance
export const hybridAI = new HybridAIBrain();
export default HybridAIBrain;
