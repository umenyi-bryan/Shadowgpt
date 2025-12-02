// Comprehensive Multilingual Training Data
const multilingualKnowledge = {
  // English (Primary)
  en: {
    cybersecurity: {
      basics: "**Cybersecurity Fundamentals**:\n• CIA Triad: Confidentiality, Integrity, Availability\n• Authentication vs Authorization\n• Encryption types: Symmetric, Asymmetric\n• Defense in Depth strategy\n• Zero Trust Architecture",
      
      threats: "**Common Threats**:\n• Malware: Viruses, Worms, Trojans, Ransomware\n• Phishing: Email, SMS, Voice attacks\n• DDoS: Distributed Denial of Service\n• MITM: Man-in-the-Middle attacks\n• SQL Injection, XSS, CSRF",
      
      prevention: "**Prevention Strategies**:\n• Regular software updates\n• Strong password policies\n• Multi-factor authentication\n• Network segmentation\n• Security awareness training"
    },
    
    pentesting: {
      methodology: "**Pentesting Methodology**:\n1. Reconnaissance\n2. Scanning & Enumeration\n3. Vulnerability Assessment\n4. Exploitation\n5. Post-Exploitation\n6. Reporting\n7. Remediation Guidance",
      
      tools: "**Essential Tools**:\n• Nmap: Network scanning\n• Metasploit: Exploitation framework\n• Burp Suite: Web testing\n• Wireshark: Traffic analysis\n• John the Ripper: Password cracking",
      
      frameworks: "**Testing Frameworks**:\n• PTES: Penetration Testing Execution Standard\n• OSSTMM: Open Source Security Testing Methodology\n• OWASP: Web Application Security Project\n• NIST: Cybersecurity Framework"
    },
    
    programming: {
      python: "**Python for Security**:\n```python\nimport socket\nimport requests\nimport hashlib\nimport base64\nfrom cryptography.fernet import Fernet\n```",
      
      bash: "**Bash Automation**:\n```bash\n#!/bin/bash\n# Network scanner\nfor ip in {1..254}; do\n    ping -c 1 192.168.1.$ip &\ndone\n```",
      
      web: "**Web Security**:\n• Input validation\n• Output encoding\n• Secure session management\n• HTTPS enforcement\n• CORS configuration"
    }
  },
  
  // French
  fr: {
    cybersecurity: {
      basics: "**Fondamentaux de la Cybersécurité**:\n• Triade CIA: Confidentialité, Intégrité, Disponibilité\n• Authentification vs Autorisation\n• Types de chiffrement: Symétrique, Asymétrique\n• Stratégie de défense en profondeur\n• Architecture Zero Trust",
      
      threats: "**Menaces Courantes**:\n• Logiciels malveillants: Virus, Vers, Chevaux de Troie, Rançongiciels\n• Hameçonnage: Attaques par email, SMS, voix\n• DDoS: Déni de service distribué\n• MITM: Attaques de l'homme du milieu\n• Injection SQL, XSS, CSRF",
      
      prevention: "**Stratégies de Prévention**:\n• Mises à jour régulières des logiciels\n• Politiques de mots de passe forts\n• Authentification multifacteur\n• Segmentation du réseau\n• Formation à la sensibilisation à la sécurité"
    },
    
    pentesting: {
      methodology: "**Méthodologie de Test d'Intrusion**:\n1. Reconnaissance\n2. Analyse et Énumération\n3. Évaluation des Vulnérabilités\n4. Exploitation\n5. Post-Exploitation\n6. Rapport\n7. Guide de Correction",
      
      tools: "**Outils Essentiels**:\n• Nmap: Analyse réseau\n• Metasploit: Framework d'exploitation\n• Burp Suite: Test web\n• Wireshark: Analyse du trafic\n• John the Ripper: Craquage de mots de passe"
    }
  },
  
  // Spanish
  es: {
    cybersecurity: {
      basics: "**Fundamentos de Ciberseguridad**:\n• Tríada CIA: Confidencialidad, Integridad, Disponibilidad\n• Autenticación vs Autorización\n• Tipos de cifrado: Simétrico, Asimétrico\n• Estrategia de defensa en profundidad\n• Arquitectura Zero Trust",
      
      threats: "**Amenazas Comunes**:\n• Malware: Virus, Gusanos, Troyanos, Ransomware\n• Phishing: Ataques por correo, SMS, voz\n• DDoS: Denegación de servicio distribuida\n• MITM: Ataques de hombre en el medio\n• Inyección SQL, XSS, CSRF",
      
      prevention: "**Estrategias de Prevención**:\n• Actualizaciones regulares de software\n• Políticas de contraseñas fuertes\n• Autenticación multifactor\n• Segmentación de red\n• Capacitación en conciencia de seguridad"
    },
    
    pentesting: {
      methodology: "**Metodología de Pentesting**:\n1. Reconocimiento\n2. Escaneo y Enumeración\n3. Evaluación de Vulnerabilidades\n4. Explotación\n5. Post-Explotación\n6. Informe\n7. Guía de Remedio"
    }
  },
  
  // Russian
  ru: {
    cybersecurity: {
      basics: "**Основы Кибербезопасности**:\n• Триада CIA: Конфиденциальность, Целостность, Доступность\n• Аутентификация против Авторизации\n• Типы шифрования: Симметричное, Асимметричное\n• Стратегия защиты в глубину\n• Архитектура Zero Trust",
      
      threats: "**Распространенные Угрозы**:\n• Вредоносное ПО: Вирусы, Черви, Трояны, Рансомизация\n• Фишинг: Атаки по email, SMS, голосу\n• DDoS: Распределенный отказ в обслуживании\n• MITM: Атаки человека посередине\n• SQL-инъекции, XSS, CSRF"
    },
    
    pentesting: {
      methodology: "**Методология Пентестинга**:\n1. Разведка\n2. Сканирование и Перечисление\n3. Оценка Уязвимостей\n4. Эксплуатация\n5. Пост-Эксплуатация\n6. Отчет\n7. Руководство по Исправлению"
    }
  },
  
  // Pidgin English
  pcm: {
    cybersecurity: {
      basics: "**Cybersecurity Basics**:\n• CIA Three: Keep secret, No change, Always available\n• Prove say na you vs Give permission\n• Lock methods: Same key, Different key\n• Many-many protection\n• Trust nobody style",
      
      threats: "**Bad Things Wey Dey Happen**:\n• Bad software: Virus, Worm, Trojan, Lock-computer\n• Fake message: Email, SMS, Phone call trick\n• Too-many traffic attack\n• Middle-man attack\n• Database attack, Web page attack"
    },
    
    pentesting: {
      methodology: "**How to Test Security**:\n1. Look around\n2. Check everything\n3. Find weak points\n4. Enter system\n5. Stay inside\n6. Write report\n7. Teach how to fix"
    }
  },
  
  // Chinese
  zh: {
    cybersecurity: {
      basics: "**网络安全基础**:\n• CIA三要素：机密性、完整性、可用性\n• 认证 vs 授权\n• 加密类型：对称、非对称\n• 深度防御策略\n• 零信任架构",
      
      threats: "**常见威胁**:\n• 恶意软件：病毒、蠕虫、木马、勒索软件\n• 网络钓鱼：邮件、短信、语音攻击\n• DDoS：分布式拒绝服务攻击\n• 中间人攻击\n• SQL注入、跨站脚本、跨站请求伪造"
    },
    
    pentesting: {
      methodology: "**渗透测试方法论**:\n1. 信息收集\n2. 扫描与枚举\n3. 漏洞评估\n4. 漏洞利用\n5. 后渗透\n6. 报告\n7. 修复指导"
    }
  }
};

// Language detection patterns
const languagePatterns = {
  en: ['hello', 'hi', 'how are', 'cyber', 'security', 'hack', 'pentest'],
  fr: ['bonjour', 'salut', 'comment', 'cyber', 'sécurité', 'piratage', 'test'],
  es: ['hola', 'buenos', 'cómo', 'ciber', 'seguridad', 'hackeo', 'prueba'],
  ru: ['привет', 'здравствуйте', 'как', 'кибер', 'безопасность', 'взлом', 'тест'],
  pcm: ['how you', 'wetin', 'na you', 'hack', 'security', 'check', 'test'],
  zh: ['你好', '您好', '怎么样', '网络', '安全', '黑客', '测试']
};

// Language names for display
const languageNames = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  ru: 'Русский',
  pcm: 'Pidgin English',
  zh: '中文'
};

export class MultilingualAIEngine {
  constructor() {
    this.knowledgeBase = multilingualKnowledge;
    this.detectedLanguage = 'en';
    this.userLanguagePreference = 'en';
    this.conversationContext = [];
  }

  // Advanced language detection
  detectLanguage(text) {
    const lowerText = text.toLowerCase();
    let scores = {};
    
    // Score each language based on pattern matches
    for (const [lang, patterns] of Object.entries(languagePatterns)) {
      scores[lang] = patterns.reduce((score, pattern) => {
        return score + (lowerText.includes(pattern) ? 1 : 0);
      }, 0);
    }
    
    // Find language with highest score
    let detectedLang = 'en';
    let highestScore = 0;
    
    for (const [lang, score] of Object.entries(scores)) {
      if (score > highestScore) {
        highestScore = score;
        detectedLang = lang;
      }
    }
    
    // If no clear detection, check for specific language indicators
    if (highestScore === 0) {
      if (lowerText.includes('français') || lowerText.includes('french')) detectedLang = 'fr';
      else if (lowerText.includes('español') || lowerText.includes('spanish')) detectedLang = 'es';
      else if (lowerText.includes('русский') || lowerText.includes('russian')) detectedLang = 'ru';
      else if (lowerText.includes('pidgin') || lowerText.includes('naija')) detectedLang = 'pcm';
      else if (lowerText.includes('中文') || lowerText.includes('chinese')) detectedLang = 'zh';
    }
    
    this.detectedLanguage = detectedLang;
    return detectedLang;
  }

  // Set user language preference
  setLanguagePreference(lang) {
    if (this.knowledgeBase[lang]) {
      this.userLanguagePreference = lang;
      return true;
    }
    return false;
  }

  // Get current language knowledge
  getCurrentKnowledge() {
    return this.knowledgeBase[this.userLanguagePreference] || this.knowledgeBase.en;
  }

  // Advanced query analysis
  analyzeQuery(query) {
    const detectedLang = this.detectLanguage(query);
    const lowerQuery = query.toLowerCase();
    
    // Update context
    this.conversationContext.push({
      query,
      language: detectedLang,
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 10 messages
    if (this.conversationContext.length > 10) {
      this.conversationContext.shift();
    }
    
    const analysis = {
      language: detectedLang,
      type: this.classifyQueryType(lowerQuery, detectedLang),
      category: this.classifyCategory(lowerQuery),
      complexity: this.assessComplexity(lowerQuery),
      requiresTool: this.requiresToolGeneration(lowerQuery),
      requiresCode: this.requiresCodeExample(lowerQuery),
      topics: this.extractTopics(lowerQuery, detectedLang)
    };
    
    return analysis;
  }

  classifyQueryType(query, lang) {
    // Casual conversation patterns per language
    const casualPatterns = {
      en: ['hello', 'hi', 'hey', 'how are', 'thank', 'bye', 'good', 'what\'s up'],
      fr: ['bonjour', 'salut', 'ça va', 'merci', 'au revoir', 'bon', 'quoi de neuf'],
      es: ['hola', 'buenos', 'cómo estás', 'gracias', 'adiós', 'buen', 'qué tal'],
      ru: ['привет', 'здравствуйте', 'как дела', 'спасибо', 'до свидания', 'хорошо'],
      pcm: ['how you', 'wetin dey', 'thank you', 'bye', 'good', 'how bodi'],
      zh: ['你好', '您好', '怎么样', '谢谢', '再见', '好', '最近如何']
    };
    
    const patterns = casualPatterns[lang] || casualPatterns.en;
    if (patterns.some(pattern => query.includes(pattern))) {
      return 'casual';
    }
    
    // Tool request patterns
    const toolPatterns = ['create', 'make', 'generate', 'build', 'write', 'tool', 'script', 'code'];
    if (toolPatterns.some(pattern => query.includes(pattern))) {
      return 'tool';
    }
    
    return 'technical';
  }

  classifyCategory(query) {
    const categories = {
      cybersecurity: ['cyber', 'security', 'hack', 'attack', 'defense', 'threat', 'vulnerability'],
      pentesting: ['pentest', 'penetration', 'test', 'audit', 'assessment', 'scan', 'exploit'],
      network: ['network', 'tcp', 'udp', 'port', 'ip', 'router', 'switch', 'firewall'],
      web: ['web', 'http', 'html', 'javascript', 'xss', 'csrf', 'sql', 'injection'],
      programming: ['code', 'program', 'script', 'python', 'bash', 'java', 'c++', 'function'],
      crypto: ['encrypt', 'decrypt', 'hash', 'crypto', 'ssl', 'tls', 'certificate']
    };
    
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => query.includes(keyword))) {
        return category;
      }
    }
    
    return 'general';
  }

  assessComplexity(query) {
    const advancedPatterns = ['advanced', 'complex', 'detailed', 'comprehensive', 'professional', 'enterprise'];
    const beginnerPatterns = ['basic', 'simple', 'easy', 'beginner', 'fundamental', 'intro'];
    
    if (advancedPatterns.some(pattern => query.includes(pattern))) {
      return 'advanced';
    } else if (beginnerPatterns.some(pattern => query.includes(pattern))) {
      return 'beginner';
    }
    
    return 'intermediate';
  }

  requiresToolGeneration(query) {
    const toolPatterns = ['create', 'make', 'generate', 'build', 'write', 'tool'];
    return toolPatterns.some(pattern => query.includes(pattern));
  }

  requiresCodeExample(query) {
    const codePatterns = ['code', 'example', 'sample', 'snippet', 'program', 'function'];
    return codePatterns.some(pattern => query.includes(pattern));
  }

  extractTopics(query, lang) {
    const topics = [];
    const knowledge = this.getCurrentKnowledge();
    
    // Flatten knowledge base for this language
    const allKeywords = [];
    Object.values(knowledge).forEach(category => {
      Object.values(category).forEach(content => {
        if (typeof content === 'string') {
          // Extract key terms from content
          const terms = content.toLowerCase().match(/\b\w+\b/g) || [];
          allKeywords.push(...terms);
        }
      });
    });
    
    // Find matching topics
    const uniqueKeywords = [...new Set(allKeywords)];
    uniqueKeywords.forEach(keyword => {
      if (query.includes(keyword) && keyword.length > 3) {
        topics.push(keyword);
      }
    });
    
    return topics.slice(0, 5); // Return top 5 topics
  }

  // Generate response based on analysis
  generateResponse(query, analysis) {
    const knowledge = this.getCurrentKnowledge();
    
    switch (analysis.type) {
      case 'casual':
        return this.generateCasualResponse(query, analysis.language);
      case 'tool':
        return this.generateToolResponse(query, analysis);
      default:
        return this.generateTechnicalResponse(query, analysis, knowledge);
    }
  }

  generateCasualResponse(query, lang) {
    const responses = {
      en: {
        greeting: "🛡️ **Hello! I'm ShadowGPT v5.0**\n\nYour multilingual pentesting AI assistant created by **bedusec**.\n\nI can communicate in English, French, Spanish, Russian, Pidgin English, and Chinese!\n\nHow can I assist you with cybersecurity today?",
        thanks: "🎯 **You're welcome!**\n\nRemember to always follow ethical guidelines and obtain proper authorization.",
        farewell: "🔒 **Stay secure!** Feel free to return anytime you need assistance.",
        capabilities: `🔮 **Multilingual Capabilities**:

**Supported Languages:**
• English (EN)
• Français (FR)
• Español (ES)
• Русский (RU)
• Pidgin English (PCM)
• 中文 (ZH)

**Technical Expertise:**
• Advanced cybersecurity analysis
• Pentesting methodology guidance
• Custom tool generation
• Vulnerability assessment
• Network security
• Web application security

**Ask me anything in your preferred language!**`
      },
      
      fr: {
        greeting: "🛡️ **Bonjour! Je suis ShadowGPT v5.0**\n\nVotre assistant IA de test d'intrusion multilingue créé par **bedusec**.\n\nJe peux communiquer en français, anglais, espagnol, russe, pidgin et chinois!\n\nComment puis-je vous aider avec la cybersécurité aujourd'hui?",
        thanks: "🎯 **De rien!**\n\nN'oubliez pas de toujours suivre les lignes directrices éthiques et d'obtenir l'autorisation appropriée.",
        capabilities: "🔮 **Je parle plusieurs langues et je peux vous aider avec la cybersécurité!**"
      },
      
      es: {
        greeting: "🛡️ **¡Hola! Soy ShadowGPT v5.0**\n\nTu asistente de IA de pentesting multilingüe creado por **bedusec**.\n\n¡Puedo comunicarme en español, inglés, francés, ruso, pidgin y chino!\n\n¿Cómo puedo ayudarte con ciberseguridad hoy?",
        thanks: "🎯 **¡De nada!**\n\nRecuerda seguir siempre las pautas éticas y obtener la autorización adecuada.",
        capabilities: "🔮 **¡Hablo varios idiomas y puedo ayudarte con ciberseguridad!**"
      },
      
      ru: {
        greeting: "🛡️ **Привет! Я ShadowGPT v5.0**\n\nВаш многоязычный помощник по пентестингу на основе ИИ, созданный **bedusec**.\n\nЯ могу общаться на русском, английском, французском, испанском, пиджин и китайском!\n\nКак я могу помочь вам с кибербезопасностью сегодня?",
        thanks: "🎯 **Пожалуйста!**\n\nВсегда соблюдайте этические принципы и получайте соответствующее разрешение.",
        capabilities: "🔮 **Я говорю на нескольких языках и могу помочь с кибербезопасностью!**"
      },
      
      pcm: {
        greeting: "🛡️ **How you dey! I be ShadowGPT v5.0**\n\nYour pentesting AI wey fit speak many language, created by **bedusec**.\n\nI fit yarn English, French, Spanish, Russian, Pidgin, and Chinese!\n\nHow I fit help you for cybersecurity matter today?",
        thanks: "🎯 **No wahala!**\n\nRemember say you must follow correct way and get permission before you do anything.",
        capabilities: "🔮 **I fit speak many language and help you for cybersecurity matter!**"
      },
      
      zh: {
        greeting: "🛡️ **你好！我是 ShadowGPT v5.0**\n\n由 **bedusec** 创建的多语言渗透测试AI助手。\n\n我可以说英语、法语、西班牙语、俄语、皮钦语和中文！\n\n今天我能如何帮助您解决网络安全问题？",
        thanks: "🎯 **不客气！**\n\n请始终遵循道德准则并获得适当的授权。",
        capabilities: "🔮 **我会说多种语言，可以帮助您解决网络安全问题！**"
      }
    };
    
    const langResponses = responses[lang] || responses.en;
    
    if (query.includes('hello') || query.includes('hi') || 
        query.includes('bonjour') || query.includes('hola') || 
        query.includes('привет') || query.includes('你好')) {
      return langResponses.greeting;
    }
    
    if (query.includes('thank') || query.includes('merci') || 
        query.includes('gracias') || query.includes('спасибо') || 
        query.includes('谢谢')) {
      return langResponses.thanks;
    }
    
    if (query.includes('what can') || query.includes('capabilities') || 
        query.includes('capacités') || query.includes('capacidades')) {
      return langResponses.capabilities;
    }
    
    return langResponses.greeting;
  }

  generateToolResponse(query, analysis) {
    const tools = {
      en: {
        port_scanner: this.generatePortScanner('en'),
        vulnerability_scanner: this.generateVulnerabilityScanner('en'),
        hash_cracker: this.generateHashCracker('en')
      },
      fr: {
        port_scanner: this.generatePortScanner('fr'),
        vulnerability_scanner: this.generateVulnerabilityScanner('fr'),
        hash_cracker: this.generateHashCracker('fr')
      },
      es: {
        port_scanner: this.generatePortScanner('es'),
        vulnerability_scanner: this.generateVulnerabilityScanner('es'),
        hash_cracker: this.generateHashCracker('es')
      }
    };
    
    const langTools = tools[analysis.language] || tools.en;
    
    let selectedTool = 'port_scanner';
    if (query.includes('vulnerability') || query.includes('vuln') || 
        query.includes('vulnérabilité') || query.includes('vulnerabilidad')) {
      selectedTool = 'vulnerability_scanner';
    } else if (query.includes('hash') || query.includes('crack') || 
               query.includes('craquage') || query.includes('crackeo')) {
      selectedTool = 'hash_cracker';
    }
    
    const tool = langTools[selectedTool];
    const toolName = selectedTool.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    return `🛠️ **${toolName} - ${languageNames[analysis.language]} Version**\n\n\`\`\`bash\n${tool}\n\`\`\`\n\n**Usage Instructions:**\n1. Save as .sh file\n2. Make executable: \`chmod +x filename.sh\`\n3. Run with appropriate parameters\n4. Use only for authorized testing\n\n---\n*ShadowGPT v5.0 - Multilingual Tool Generation*\n*Language: ${languageNames[analysis.language]}*`;
  }

  generateTechnicalResponse(query, analysis, knowledge) {
    let response = `🔍 **${languageNames[analysis.language]} Analysis**\n\n`;
    
    // Add language indicator
    response += `*Detected Language: ${languageNames[analysis.language]}*\n\n`;
    
    // Add category knowledge
    if (knowledge[analysis.category]) {
      const categoryInfo = Object.values(knowledge[analysis.category])[0];
      if (categoryInfo) {
        response += `${categoryInfo}\n\n`;
      }
    }
    
    // Add complexity-based guidance
    if (analysis.complexity === 'advanced') {
      response += "**Advanced Guidance:**\n";
      response += this.getAdvancedGuidance(analysis.language);
    } else if (analysis.complexity === 'beginner') {
      response += "**Beginner-Friendly Explanation:**\n";
      response += this.getBeginnerGuidance(analysis.language);
    }
    
    // Add code example if requested
    if (analysis.requiresCode) {
      response += `\n**Code Example:**\n\`\`\`python\n${this.generateCodeExample(analysis.language)}\n\`\`\`\n`;
    }
    
    // Add language switching suggestion
    response += `\n💡 **Tip:** I can communicate in multiple languages! Try asking in French, Spanish, Russian, Pidgin English, or Chinese.`;
    
    response += `\n\n---\n*ShadowGPT v5.0 - Multilingual AI Assistant*\n*Created by bedusec - Use ethically and responsibly*`;
    
    return response;
  }

  getAdvancedGuidance(lang) {
    const guidance = {
      en: "• Advanced threat modeling techniques\n• Zero-day vulnerability research\n• Red team operations planning\n• Advanced persistence mechanisms\n• Forensic analysis and evidence collection\n• Custom exploit development\n• Enterprise security architecture",
      
      fr: "• Techniques avancées de modélisation des menaces\n• Recherche de vulnérabilités zero-day\n• Planification des opérations d'équipe rouge\n• Mécanismes de persistance avancés\n• Analyse médico-légale et collecte de preuves\n• Développement d'exploits personnalisés\n• Architecture de sécurité d'entreprise",
      
      es: "• Técnicas avanzadas de modelado de amenazas\n• Investigación de vulnerabilidades zero-day\n• Planificación de operaciones de equipo rojo\n• Mecanismos de persistencia avanzados\n• Análisis forense y recolección de evidencia\n• Desarrollo de exploits personalizados\n• Arquitectura de seguridad empresarial"
    };
    
    return guidance[lang] || guidance.en;
  }

  getBeginnerGuidance(lang) {
    const guidance = {
      en: "• Start with basic cybersecurity concepts\n• Learn about common threats and how to prevent them\n• Practice with beginner-friendly tools\n• Follow ethical hacking guidelines\n• Join cybersecurity communities\n• Take online courses and certifications\n• Build a home lab for practice",
      
      fr: "• Commencez par les concepts de base de la cybersécurité\n• Apprenez les menaces courantes et comment les prévenir\n• Pratiquez avec des outils adaptés aux débutants\n• Suivez les lignes directrices du hacking éthique\n• Rejoignez des communautés de cybersécurité\n• Suivez des cours en ligne et obtenez des certifications\n• Créez un labo maison pour vous entraîner",
      
      es: "• Comienza con conceptos básicos de ciberseguridad\n• Aprende sobre amenazas comunes y cómo prevenirlas\n• Practica con herramientas amigables para principiantes\n• Sigue las pautas de hacking ético\n• Únete a comunidades de ciberseguridad\n• Toma cursos en línea y obtén certificaciones\n• Construye un laboratorio casero para practicar"
    };
    
    return guidance[lang] || guidance.en;
  }

  generateCodeExample(lang) {
    const examples = {
      en: `# Python Port Scanner Example
import socket

def scan_ports(target, start_port, end_port):
    for port in range(start_port, end_port + 1):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((target, port))
        if result == 0:
            print(f"Port {port}: OPEN")
        sock.close()`,
      
      fr: `# Exemple de Scanner de Ports en Python
import socket

def scanner_ports(cible, port_debut, port_fin):
    for port in range(port_debut, port_fin + 1):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((cible, port))
        if result == 0:
            print(f"Port {port}: OUVERT")
        sock.close()`,
      
      es: `# Ejemplo de Escáner de Puertos en Python
import socket

def escanear_puertos(objetivo, puerto_inicio, puerto_fin):
    for puerto in range(puerto_inicio, puerto_fin + 1):
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        resultado = sock.connect_ex((objetivo, puerto))
        if resultado == 0:
            print(f"Puerto {puerto}: ABIERTO")
        sock.close()`
    };
    
    return examples[lang] || examples.en;
  }

  // Tool generation methods for different languages
  generatePortScanner(lang) {
    const tools = {
      en: `#!/bin/bash
# Advanced Port Scanner - English Version
TARGET=$1
START=${2:-1}
END=${3:-1000}

echo "🔍 Port Scanner v2.0"
echo "Target: $TARGET"
echo "Ports: $START-$END"

for port in $(seq $START $END); do
  timeout 1 bash -c "echo >/dev/tcp/$TARGET/$port" 2>/dev/null && echo "✅ Port $port: OPEN"
done

echo "🎯 Scan completed!"`,
      
      fr: `#!/bin/bash
# Scanner de Ports Avancé - Version Française
CIBLE=$1
DEBUT=${2:-1}
FIN=${3:-1000}

echo "🔍 Scanner de Ports v2.0"
echo "Cible: $CIBLE"
echo "Ports: $DEBUT-$FIN"

for port in $(seq $DEBUT $FIN); do
  timeout 1 bash -c "echo >/dev/tcp/$CIBLE/$port" 2>/dev/null && echo "✅ Port $port: OUVERT"
done

echo "🎯 Analyse terminée!"`,
      
      es: `#!/bin/bash
# Escáner de Puertos Avanzado - Versión Española
OBJETIVO=$1
INICIO=${2:-1}
FIN=${3:-1000}

echo "🔍 Escáner de Puertos v2.0"
echo "Objetivo: $OBJETIVO"
echo "Puertos: $INICIO-$FIN"

for puerto in $(seq $INICIO $FIN); do
  timeout 1 bash -c "echo >/dev/tcp/$OBJETIVO/$puerto" 2>/dev/null && echo "✅ Puerto $puerto: ABIERTO"
done

echo "🎯 Escaneo completado!"`
    };
    
    return tools[lang] || tools.en;
  }

  generateVulnerabilityScanner(lang) {
    const tools = {
      en: `#!/bin/bash
# Web Vulnerability Scanner - English
URL=$1

echo "🛡️ Vulnerability Scanner"
echo "Target: $URL"
echo ""

echo "🔍 Testing SQL Injection..."
curl -s "$URL' OR '1'='1" | grep -i "error" && echo "⚠️ Possible SQLi"

echo "🔍 Testing XSS..."
curl -s "$URL<script>alert(1)</script>" | grep -q "<script>" && echo "⚠️ Possible XSS"

echo "🎯 Basic scan completed!"`,
      
      fr: `#!/bin/bash
# Scanner de Vulnérabilités Web - Français
URL=$1

echo "🛡️ Scanner de Vulnérabilités"
echo "Cible: $URL"
echo ""

echo "🔍 Test d'Injection SQL..."
curl -s "$URL' OR '1'='1" | grep -i "error" && echo "⚠️ Injection SQL possible"

echo "🔍 Test XSS..."
curl -s "$URL<script>alert(1)</script>" | grep -q "<script>" && echo "⚠️ XSS possible"

echo "🎯 Analyse de base terminée!"`,
      
      es: `#!/bin/bash
# Escáner de Vulnerabilidades Web - Español
URL=$1

echo "🛡️ Escáner de Vulnerabilidades"
echo "Objetivo: $URL"
echo ""

echo "🔍 Probando Inyección SQL..."
curl -s "$URL' OR '1'='1" | grep -i "error" && echo "⚠️ Posible Inyección SQL"

echo "🔍 Probando XSS..."
curl -s "$URL<script>alert(1)</script>" | grep -q "<script>" && echo "⚠️ Posible XSS"

echo "🎯 Escaneo básico completado!"`
    };
    
    return tools[lang] || tools.en;
  }

  generateHashCracker(lang) {
    const tools = {
      en: `#!/bin/bash
# Hash Cracker Tool - English
HASH=$1
WORDLIST=$2

echo "🔓 Hash Cracker"
echo "Hash: $HASH"
echo "Wordlist: $WORDLIST"
echo ""

while read password; do
  computed=$(echo -n "$password" | md5sum | cut -d' ' -f1)
  if [ "$computed" = "$HASH" ]; then
    echo "🎉 Password found: $password"
    exit 0
  fi
done < "$WORDLIST"

echo "❌ Password not found"`,
      
      fr: `#!/bin/bash
# Outil de Craquage de Hash - Français
HASH=$1
LISTE=$2

echo "🔓 Craqueur de Hash"
echo "Hash: $HASH"
echo "Liste: $LISTE"
echo ""

while read motdepasse; do
  calcule=$(echo -n "$motdepasse" | md5sum | cut -d' ' -f1)
  if [ "$calcule" = "$HASH" ]; then
    echo "🎉 Mot de passe trouvé: $motdepasse"
    exit 0
  fi
done < "$LISTE"

echo "❌ Mot de passe non trouvé"`,
      
      es: `#!/bin/bash
# Herramienta de Descifrado de Hash - Español
HASH=$1
LISTA=$2

echo "🔓 Descifrador de Hash"
echo "Hash: $HASH"
echo "Lista: $LISTA"
echo ""

while read contrasena; do
  calculado=$(echo -n "$contrasena" | md5sum | cut -d' ' -f1)
  if [ "$calculado" = "$HASH" ]; then
    echo "🎉 Contraseña encontrada: $contrasena"
    exit 0
  fi
done < "$LISTA"

echo "❌ Contraseña no encontrada"`
    };
    
    return tools[lang] || tools.en;
  }
}
