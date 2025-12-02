'use client';
import { useState, useRef, useEffect } from 'react';
import MatrixRain from './components/MatrixRain';
import CodeBlock from './components/CodeBlock';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [analysisInfo, setAnalysisInfo] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const languageNames = {
    en: '🇺🇸 English',
    fr: '🇫🇷 Français',
    es: '🇪🇸 Español',
    ru: '🇷🇺 Русский',
    pcm: '🇳🇬 Pidgin English',
    zh: '🇨🇳 中文'
  };

  const extractCodeBlocks = (content) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index)
        });
      }

      parts.push({
        type: 'code',
        language: match[1] || 'text',
        content: match[2].trim()
      });

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex)
      });
    }

    return parts.length ? parts : [{ type: 'text', content }];
  };

  const renderMessageContent = (message) => {
    const parts = extractCodeBlocks(message.content);
    
    return (
      <div className="space-y-2">
        {parts.map((part, index) => 
          part.type === 'code' ? (
            <CodeBlock key={index} code={part.content} language={part.language} />
          ) : (
            <div key={index} className="text-sm whitespace-pre-wrap leading-relaxed">
              {part.content.split('**').map((text, i) => 
                i % 2 === 1 ? (
                  <strong key={i} className="text-neon-green">{text}</strong>
                ) : (
                  text
                )
              )}
            </div>
          )
        )}
      </div>
    );
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input, type: 'text' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setAnalysisInfo(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      
      if (data.response) {
        const assistantMessage = { 
          role: 'assistant', 
          content: data.response,
          type: data.type || 'text',
          timestamp: new Date().toLocaleTimeString(),
          language: data.language || 'en'
        };
        setMessages(prev => [...prev, assistantMessage]);
        
        if (data.analysis) {
          setAnalysisInfo({
            ...data.analysis,
            language: data.language
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { 
        role: 'assistant', 
        content: 'Error: Unable to connect to ShadowGPT. Please try again.',
        type: 'text',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickCommands = {
    en: [
      "Create port scanner tool",
      "Explain SQL injection",
      "Generate vulnerability scanner",
      "How to use nmap",
      "Web security basics",
      "What is cybersecurity?"
    ],
    fr: [
      "Créer un scanner de ports",
      "Expliquer l'injection SQL",
      "Générer un scanner de vulnérabilités",
      "Comment utiliser nmap",
      "Bases de sécurité web",
      "Qu'est-ce que la cybersécurité?"
    ],
    es: [
      "Crear escáner de puertos",
      "Explicar inyección SQL",
      "Generar escáner de vulnerabilidades",
      "Cómo usar nmap",
      "Conceptos básicos de seguridad web",
      "¿Qué es la ciberseguridad?"
    ],
    ru: [
      "Создать сканер портов",
      "Объяснить SQL-инъекции",
      "Создать сканер уязвимостей",
      "Как использовать nmap",
      "Основы веб-безопасности",
      "Что такое кибербезопасность?"
    ],
    pcm: [
      "Make port scanner tool",
      "Explain SQL injection",
      "Create security checker",
      "How to use network scanner",
      "Web safety basics",
      "Wetin be cybersecurity?"
    ],
    zh: [
      "创建端口扫描工具",
      "解释SQL注入",
      "生成漏洞扫描器",
      "如何使用nmap",
      "Web安全基础",
      "什么是网络安全？"
    ]
  };

  const exampleQueries = {
    en: [
      { query: "Hello! Can you help me with cybersecurity?", desc: "Casual greeting" },
      { query: "Create a port scanner in Python", desc: "Tool creation" },
      { query: "Explain advanced network security", desc: "Technical explanation" },
      { query: "How to prevent phishing attacks?", desc: "Security guidance" }
    ],
    fr: [
      { query: "Bonjour! Pouvez-vous m'aider avec la cybersécurité?", desc: "Salutation" },
      { query: "Créer un scanner de ports en Python", desc: "Création d'outil" },
      { query: "Expliquer la sécurité réseau avancée", desc: "Explication technique" },
      { query: "Comment prévenir les attaques de phishing?", desc: "Conseils de sécurité" }
    ],
    es: [
      { query: "¡Hola! ¿Puedes ayudarme con ciberseguridad?", desc: "Saludo" },
      { query: "Crear un escáner de puertos en Python", desc: "Creación de herramienta" },
      { query: "Explicar seguridad de red avanzada", desc: "Explicación técnica" },
      { query: "¿Cómo prevenir ataques de phishing?", desc: "Consejos de seguridad" }
    ],
    ru: [
      { query: "Привет! Можете помочь с кибербезопасностью?", desc: "Приветствие" },
      { query: "Создать сканер портов на Python", desc: "Создание инструмента" },
      { query: "Объяснить продвинутую сетевую безопасность", desc: "Техническое объяснение" },
      { query: "Как предотвратить фишинговые атаки?", desc: "Советы по безопасности" }
    ],
    pcm: [
      { query: "How you dey! You fit help me for cybersecurity?", desc: "Greeting" },
      { query: "Make port scanner for Python", desc: "Make tool" },
      { query: "Explain network security well-well", desc: "Explain matter" },
      { query: "How to stop fake message attacks?", desc: "Security advice" }
    ],
    zh: [
      { query: "你好！你能帮我解决网络安全问题吗？", desc: "问候" },
      { query: "用Python创建端口扫描器", desc: "工具创建" },
      { query: "解释高级网络安全", desc: "技术解释" },
      { query: "如何防止钓鱼攻击？", desc: "安全建议" }
    ]
  };

  const pentestingPhases = [
    { phase: "Recon", icon: "🔍", description: "Information gathering" },
    { phase: "Scanning", icon: "📡", description: "Vulnerability detection" },
    { phase: "Access", icon: "⚡", description: "Gaining entry" },
    { phase: "Maintain", icon: "🔐", description: "Persistence" },
    { phase: "Cover", icon: "🕵️", description: "Clean traces" }
  ];

  return (
    <div className="min-h-screen bg-dark-200 text-neon-green">
      <MatrixRain />
      
      <header className="border-b border-neon-green/30 bg-dark-100/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-neon-green rounded-full glow"></div>
              <h1 className="text-2xl font-bold hacker-text">ShadowGPT v5.0</h1>
              <span className="text-xs bg-neon-purple/20 text-neon-purple px-2 py-1 rounded">MULTILINGUAL AI</span>
            </div>
            <div className="text-sm text-neon-green/70">
              Enhanced by <span className="text-neon-green glow">bedusec</span>
            </div>
          </div>
          <p className="text-neon-green/60 text-sm mt-2">
            Advanced Multilingual Pentesting AI - Speak 6 Languages!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-3">
            <div className="flex space-x-1">
              {['chat', 'languages', 'analysis'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                    activeTab === tab 
                      ? 'bg-dark-300 border-t border-l border-r border-neon-green text-neon-green' 
                      : 'bg-dark-100 text-neon-green/60 hover:text-neon-green'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-xs text-neon-green/70">Language:</span>
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-dark-300 border border-neon-green/30 rounded px-2 py-1 text-xs text-neon-green"
              >
                {Object.entries(languageNames).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {analysisInfo && activeTab === 'chat' && (
          <div className="mb-4 p-3 bg-dark-300 border border-neon-purple/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-neon-purple font-bold">AI ANALYSIS</span>
                  <span className="text-xs bg-neon-green/20 text-neon-green px-2 py-0.5 rounded">
                    {languageNames[analysisInfo.language] || 'English'}
                  </span>
                </div>
                <div className="text-xs text-neon-green/70 mt-1">
                  Category: <span className="text-neon-green">{analysisInfo.category}</span> • 
                  Level: <span className="text-neon-green">{analysisInfo.complexity}</span>
                  {analysisInfo.topics?.length > 0 && (
                    <> • Topics: <span className="text-neon-green">{analysisInfo.topics.join(', ')}</span></>
                  )}
                </div>
              </div>
              <button 
                onClick={() => setAnalysisInfo(null)}
                className="text-xs text-neon-green/50 hover:text-neon-green"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-neon-green/70 text-sm mb-3">PENTESTING PHASES:</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {pentestingPhases.map((phase, index) => (
              <div key={index} className="bg-dark-300 border border-neon-green/20 rounded p-3 text-center">
                <div className="text-2xl mb-1">{phase.icon}</div>
                <div className="text-xs font-bold text-neon-green">{phase.phase}</div>
                <div className="text-xs text-neon-green/60">{phase.description}</div>
              </div>
            ))}
          </div>
        </div>

        {activeTab === 'chat' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-neon-green/70 text-sm mb-3">QUICK COMMANDS:</h3>
                <div className="flex flex-wrap gap-2">
                  {quickCommands[selectedLanguage]?.map((cmd, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(cmd)}
                      className="px-3 py-1 bg-dark-300 border border-neon-green/30 rounded text-xs hover:bg-neon-green/10 transition-colors"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-neon-green/70 text-sm mb-3">EXAMPLE QUERIES:</h3>
                <div className="flex flex-wrap gap-2">
                  {exampleQueries[selectedLanguage]?.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(item.query)}
                      className="px-3 py-1 bg-neon-purple/10 border border-neon-purple/30 rounded text-xs hover:bg-neon-purple/20 transition-colors"
                      title={item.desc}
                    >
                      {item.query.length > 30 ? item.query.substring(0, 30) + "..." : item.query}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="cyber-border rounded-lg bg-dark-100/50 backdrop-blur-sm h-[500px] flex flex-col">
              <div className="flex-1 overflow-y-auto terminal-scrollbar p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-neon-green/50 h-full flex items-center justify-center">
                    <div>
                      <div className="text-4xl mb-4">🌐</div>
                      <p className="text-lg mb-2 glow">ShadowGPT v5.0 Multilingual</p>
                      <p className="text-sm">Speak to me in English, French, Spanish, Russian, Pidgin, or Chinese!</p>
                      <p className="text-xs mt-4 text-neon-green/40">
                        I understand 6 languages and can help with all cybersecurity topics
                      </p>
                    </div>
                  </div>
                )}
                
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      message.role === 'user' 
                        ? 'bg-neon-green/10 border-neon-green/30 ml-8' 
                        : 'bg-dark-300/50 border-neon-purple/30 mr-8'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-bold ${
                          message.role === 'user' ? 'text-neon-blue' : 'text-neon-purple'
                        }`}>
                          {message.role === 'user' ? 'YOU' : 'SHADOWGPT AI'}
                        </span>
                        {message.language && message.language !== 'en' && (
                          <span className="text-xs bg-neon-green/20 text-neon-green px-1.5 py-0.5 rounded">
                            {languageNames[message.language]?.split(' ')[1] || message.language}
                          </span>
                        )}
                      </div>
                      {message.timestamp && (
                        <span className="text-xs text-neon-green/50">{message.timestamp}</span>
                      )}
                    </div>
                    {renderMessageContent(message)}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="p-3 rounded-lg border border-neon-purple/30 bg-dark-300/50 mr-8">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                      <span className="text-xs text-neon-purple">Multilingual AI processing...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-neon-green/20 p-4">
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={`Ask in ${languageNames[selectedLanguage]?.split(' ')[1] || 'any language'}...`}
                      className="w-full bg-dark-300 border border-neon-green/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon-green resize-none"
                      rows="2"
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={isLoading || !input.trim()}
                    className="px-6 py-2 bg-neon-green text-dark-200 rounded-lg font-bold hover:bg-neon-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    SEND
                  </button>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs text-neon-green/50">
                    Press Enter to send • I understand 6 languages
                  </div>
                  <div className="flex space-x-1">
                    {Object.entries(languageNames).map(([code, name]) => (
                      <button
                        key={code}
                        onClick={() => setSelectedLanguage(code)}
                        className={`text-xs px-2 py-1 rounded transition-colors ${
                          selectedLanguage === code 
                            ? 'bg-neon-green text-dark-200' 
                            : 'bg-dark-300 text-neon-green/60 hover:text-neon-green'
                        }`}
                        title={name}
                      >
                        {name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'languages' && (
          <div className="cyber-border rounded-lg bg-dark-100/50 backdrop-blur-sm p-6">
            <h3 className="text-neon-green text-lg mb-4 glow">🌐 Multilingual Support</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(languageNames).map(([code, name]) => (
                <div key={code} className="bg-dark-300 border border-neon-green/20 rounded-lg p-4">
                  <div className="text-2xl mb-2">{name.split(' ')[0]}</div>
                  <h4 className="font-bold text-neon-green mb-2">{name}</h4>
                  <div className="text-xs text-neon-green/70 mb-3">
                    {code === 'en' && 'Primary language with full capabilities'}
                    {code === 'fr' && 'Complete French translation available'}
                    {code === 'es' && 'Complete Spanish translation available'}
                    {code === 'ru' && 'Basic Russian support available'}
                    {code === 'pcm' && 'Pidgin English/Nigerian support'}
                    {code === 'zh' && 'Basic Chinese (Mandarin) support'}
                  </div>
                  <div className="text-xs space-y-1">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-neon-green rounded-full mr-2"></div>
                      <span>Cybersecurity basics</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-neon-green rounded-full mr-2"></div>
                      <span>Tool generation</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-neon-green rounded-full mr-2"></div>
                      <span>Technical explanations</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-dark-300/50 border border-neon-purple/30 rounded-lg">
              <h4 className="text-neon-purple font-bold mb-2">💡 Language Detection Features</h4>
              <ul className="text-sm space-y-2 text-neon-green/80">
                <li>• Automatic language detection based on your input</li>
                <li>• Context-aware responses in detected language</li>
                <li>• Multilingual tool generation</li>
                <li>• Language switching without losing context</li>
                <li>• Cultural context consideration</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="cyber-border rounded-lg bg-dark-100/50 backdrop-blur-sm p-6">
            <h3 className="text-neon-green text-lg mb-4 glow">🤖 Advanced AI Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-dark-300 border border-neon-green/20 rounded-lg p-4">
                <h4 className="text-neon-green font-bold mb-3">Multilingual Features</h4>
                <ul className="text-sm space-y-2 text-neon-green/80">
                  <li>• Real-time language detection and switching</li>
                  <li>• Comprehensive knowledge in 6 languages</li>
                  <li>• Cultural context awareness</li>
                  <li>• Language-specific tool generation</li>
                  <li>• Automatic translation fallback</li>
                  <li>• Language preference learning</li>
                </ul>
              </div>
              <div className="bg-dark-300 border border-neon-purple/20 rounded-lg p-4">
                <h4 className="text-neon-purple font-bold mb-3">Technical Capabilities</h4>
                <ul className="text-sm space-y-2 text-neon-purple/80">
                  <li>• Advanced query analysis and categorization</li>
                  <li>• Complexity assessment (Beginner/Intermediate/Advanced)</li>
                  <li>• Context-aware response generation</li>
                  <li>• Multi-domain cybersecurity knowledge</li>
                  <li>• Professional tool generation</li>
                  <li>• Real-time conversation analysis</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-6 text-center text-neon-green/40 text-xs">
          <p>⚠️ ShadowGPT v5.0 Multilingual AI - For educational purposes only</p>
          <p className="mt-1">Enhanced by <span className="text-neon-green">bedusec</span> • Supports 6 languages • Use responsibly and ethically</p>
          <p className="mt-2 text-neon-green/30">🇺🇸 🇫🇷 🇪🇸 🇷🇺 🇳🇬 🇨🇳</p>
        </footer>
      </div>
    </div>
  );
}
