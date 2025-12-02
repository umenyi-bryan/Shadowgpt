'use client';
import { useState, useRef, useEffect } from 'react';
import MatrixRain from './components/MatrixRain';
import CodeBlock from './components/CodeBlock';
import Terminal from './components/Terminal';
import ToolsDashboard from './components/ToolsDashboard';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [analysisInfo, setAnalysisInfo] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const languageOptions = {
    en: { name: 'English', flag: '🇺🇸' },
    fr: { name: 'Français', flag: '🇫🇷' },
    es: { name: 'Español', flag: '🇪🇸' },
    ru: { name: 'Русский', flag: '🇷🇺' },
    pcm: { name: 'Pidgin', flag: '🇳🇬' },
    zh: { name: '中文', flag: '🇨🇳' }
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

    const userMessage = { 
      role: 'user', 
      content: input, 
      type: 'text',
      language: selectedLanguage 
    };
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
          language: data.language
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

  const quickCommands = [
    { text: "Create port scanner tool", icon: "🔧" },
    { text: "Explain SQL injection", icon: "💉" },
    { text: "Generate vulnerability scanner", icon: "🛡️" },
    { text: "How to use nmap", icon: "📡" },
    { text: "Web security basics", icon: "🌐" },
    { text: "Network scanning techniques", icon: "🔍" },
    { text: "Pentesting methodology", icon: "⚡" },
    { text: "Create hash cracker", icon: "🔓" }
  ];

  const features = [
    { title: "Multilingual AI", desc: "Speaks 6 languages fluently", icon: "🌍" },
    { title: "Advanced Tools", desc: "Professional security tool generation", icon: "🛠️" },
    { title: "Live Terminal", desc: "Interactive command execution", icon: "💻" },
    { title: "Real-time Analysis", desc: "Smart query processing", icon: "🤖" },
    { title: "CTF Challenges", desc: "Capture The Flag exercises", icon: "🏴‍☠️" },
    { title: "Team Collaboration", desc: "Multi-user pentesting", icon: "👥" }
  ];

  const tabs = [
    { id: 'chat', label: 'Chat', icon: '💬' },
    { id: 'tools', label: 'Tools', icon: '🛠️' },
    { id: 'terminal', label: 'Terminal', icon: '💻' },
    { id: 'labs', label: 'Labs', icon: '🧪' },
    { id: 'ctf', label: 'CTF', icon: '🏴‍☠️' },
    { id: 'team', label: 'Team', icon: '👥' }
  ];

  return (
    <div className="min-h-screen bg-dark-100 text-neon-green">
      <MatrixRain />
      
      <header className="border-b border-neon-green/30 bg-dark-100/90 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-neon-green rounded-full glow absolute -top-1 -right-1"></div>
                <div className="text-2xl animate-pulse">🛡️</div>
              </div>
              <div>
                <h1 className="text-2xl font-bold hacker-text">ShadowGPT v6.0</h1>
                <p className="text-xs text-neon-green/60">Ultimate Pentesting AI Platform</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-dark-300 border border-neon-green/30 rounded-lg hover:bg-dark-400 transition-colors"
                >
                  <span>{languageOptions[selectedLanguage].flag}</span>
                  <span className="text-sm">{languageOptions[selectedLanguage].name}</span>
                  <span className="text-xs">▼</span>
                </button>
                
                {showLanguageMenu && (
                  <div className="absolute top-full right-0 mt-1 bg-dark-300 border border-neon-green/30 rounded-lg shadow-lg z-50 min-w-[150px]">
                    {Object.entries(languageOptions).map(([code, { name, flag }]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setSelectedLanguage(code);
                          setShowLanguageMenu(false);
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-dark-400 transition-colors first:rounded-t-lg last:rounded-b-lg"
                      >
                        <span>{flag}</span>
                        <span>{name}</span>
                        {selectedLanguage === code && <span className="ml-auto text-neon-green">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="text-sm text-neon-green/70">
                by <span className="text-neon-green font-semibold">bedusec</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex overflow-x-auto pb-2 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-neon-green text-dark-200 shadow-lg shadow-neon-green/30'
                    : 'bg-dark-300 text-neon-green/60 hover:text-neon-green hover:bg-dark-400'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {analysisInfo && activeTab === 'chat' && (
          <div className="mb-4 p-4 bg-dark-300/50 border border-neon-purple/30 rounded-lg backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold text-neon-purple">AI ANALYSIS ACTIVE</span>
                </div>
                <div className="text-xs text-neon-green/70">
                  Language: <span className="text-neon-green">{analysisInfo.language?.toUpperCase() || 'EN'}</span>
                  • Category: <span className="text-neon-green">{analysisInfo.category}</span>
                  • Level: <span className="text-neon-green">{analysisInfo.complexity}</span>
                </div>
              </div>
              <button 
                onClick={() => setAnalysisInfo(null)}
                className="text-neon-green/50 hover:text-neon-green"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-2">
                <div className="cyber-border rounded-xl bg-dark-200/50 backdrop-blur-sm p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-neon-green glow">AI Assistant</h3>
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                        <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                        <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                      </div>
                      <span className="text-xs text-neon-green/60">AI Ready</span>
                    </div>
                  </div>
                  
                  <div className="h-[400px] overflow-y-auto terminal-scrollbar p-4 space-y-4">
                    {messages.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center text-neon-green/50">
                        <div className="text-4xl mb-4 animate-float">🤖</div>
                        <h3 className="text-xl font-bold mb-2">ShadowGPT v6.0</h3>
                        <p className="text-sm mb-4">The ultimate multilingual pentesting AI</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          <span className="px-2 py-1 bg-dark-300 rounded text-xs">6 Languages</span>
                          <span className="px-2 py-1 bg-dark-300 rounded text-xs">Advanced Tools</span>
                          <span className="px-2 py-1 bg-dark-300 rounded text-xs">Live Terminal</span>
                          <span className="px-2 py-1 bg-dark-300 rounded text-xs">CTF Challenges</span>
                        </div>
                      </div>
                    ) : (
                      messages.map((message, index) => (
                        <div
                          key={index}
                          className={`p-4 rounded-lg ${
                            message.role === 'user'
                              ? 'bg-neon-green/10 border border-neon-green/20 ml-8'
                              : 'bg-dark-300/70 border border-neon-purple/20 mr-8'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-bold px-2 py-1 rounded ${
                                message.role === 'user'
                                  ? 'bg-neon-green/20 text-neon-green'
                                  : 'bg-neon-purple/20 text-neon-purple'
                              }`}>
                                {message.role === 'user' ? 'YOU' : 'SHADOWGPT'}
                              </span>
                              {message.language && message.language !== 'en' && (
                                <span className="text-xs bg-dark-400 text-neon-green/70 px-1.5 py-0.5 rounded">
                                  {message.language.toUpperCase()}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-neon-green/50">{message.timestamp}</span>
                          </div>
                          {renderMessageContent(message)}
                        </div>
                      ))
                    )}
                    
                    {isLoading && (
                      <div className="p-4 rounded-lg bg-dark-300/70 border border-neon-purple/20 mr-8">
                        <div className="flex items-center gap-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                          </div>
                          <span className="text-sm text-neon-purple">Processing your request...</span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex gap-2 mb-2">
                      {quickCommands.map((cmd, index) => (
                        <button
                          key={index}
                          onClick={() => setInput(cmd.text)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-dark-300 border border-neon-green/20 rounded-lg text-xs hover:bg-dark-400 transition-colors whitespace-nowrap"
                        >
                          <span>{cmd.icon}</span>
                          <span>{cmd.text.split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <textarea
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder={`Ask anything about cybersecurity in ${languageOptions[selectedLanguage].name}...`}
                          className="w-full bg-dark-300 border border-neon-green/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-neon-green resize-none h-20"
                          disabled={isLoading}
                        />
                      </div>
                      <button
                        onClick={sendMessage}
                        disabled={isLoading || !input.trim()}
                        className="px-6 bg-neon-green text-dark-200 rounded-lg font-bold hover:bg-neon-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-neon-green/20 flex items-center justify-center"
                      >
                        <span className="text-lg">⚡</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="cyber-border rounded-xl bg-dark-200/50 backdrop-blur-sm p-6 h-full">
                  <h3 className="text-lg font-bold text-neon-green mb-4">🚀 Features</h3>
                  <div className="space-y-3">
                    {features.map((feature, index) => (
                      <div key={index} className="p-3 bg-dark-300/50 rounded-lg border border-neon-green/10 hover:border-neon-green/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{feature.icon}</div>
                          <div>
                            <h4 className="font-bold text-neon-green">{feature.title}</h4>
                            <p className="text-xs text-neon-green/60">{feature.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-dark-300 rounded-lg">
                    <h4 className="text-sm font-bold text-neon-green mb-2">📊 Stats</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-2 bg-dark-400 rounded">
                        <div className="text-xl font-bold text-neon-green">6</div>
                        <div className="text-xs text-neon-green/60">Languages</div>
                      </div>
                      <div className="text-center p-2 bg-dark-400 rounded">
                        <div className="text-xl font-bold text-neon-green">50+</div>
                        <div className="text-xs text-neon-green/60">Tools</div>
                      </div>
                      <div className="text-center p-2 bg-dark-400 rounded">
                        <div className="text-xl font-bold text-neon-green">∞</div>
                        <div className="text-xs text-neon-green/60">Possibilities</div>
                      </div>
                      <div className="text-center p-2 bg-dark-400 rounded">
                        <div className="text-xl font-bold text-neon-green">v6.0</div>
                        <div className="text-xs text-neon-green/60">Version</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'tools' && (
          <div className="cyber-border rounded-xl bg-dark-200/50 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-neon-green mb-2">🛠️ Security Tools Dashboard</h2>
                <p className="text-neon-green/60">Professional security tools and utilities</p>
              </div>
              <button className="px-4 py-2 bg-neon-green text-dark-200 rounded-lg font-bold hover:bg-neon-green/90 transition-colors">
                + Add Custom Tool
              </button>
            </div>
            <ToolsDashboard />
          </div>
        )}

        {activeTab === 'terminal' && (
          <div className="cyber-border rounded-xl bg-dark-200/50 backdrop-blur-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-neon-green mb-2">💻 Advanced Terminal</h2>
                <p className="text-neon-green/60">Interactive command-line interface</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-sm text-neon-green">Connected</span>
              </div>
            </div>
            <Terminal />
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 bg-dark-300 rounded-lg">
                <div className="text-xs text-neon-green/60 mb-1">Quick Commands</div>
                <div className="text-sm font-mono">help, scan, exploit</div>
              </div>
              <div className="p-3 bg-dark-300 rounded-lg">
                <div className="text-xs text-neon-green/60 mb-1">Status</div>
                <div className="text-sm text-neon-green">Operational</div>
              </div>
              <div className="p-3 bg-dark-300 rounded-lg">
                <div className="text-xs text-neon-green/60 mb-1">Users</div>
                <div className="text-sm">bedusec (admin)</div>
              </div>
              <div className="p-3 bg-dark-300 rounded-lg">
                <div className="text-xs text-neon-green/60 mb-1">Uptime</div>
                <div className="text-sm">100%</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'labs' && (
          <div className="cyber-border rounded-xl bg-dark-200/50 backdrop-blur-sm p-6">
            <h2 className="text-2xl font-bold text-neon-green mb-6">🧪 Virtual Labs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Web Security Lab', 'Network Pentest Lab', 'Cryptography Lab', 'Forensics Lab', 'Mobile Security Lab', 'IoT Security Lab'].map((lab, index) => (
                <div key={index} className="bg-dark-300 border border-neon-green/20 rounded-xl p-6 hover:border-neon-green transition-all duration-300 hover:scale-[1.02]">
                  <div className="text-3xl mb-4">🖥️</div>
                  <h3 className="font-bold text-neon-green mb-2">{lab}</h3>
                  <p className="text-sm text-neon-green/60 mb-4">Practice your skills in a safe environment</p>
                  <button className="w-full px-4 py-2 bg-dark-400 border border-neon-green/30 rounded-lg text-neon-green hover:bg-dark-500 transition-colors">
                    Launch Lab
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ctf' && (
          <div className="cyber-border rounded-xl bg-dark-200/50 backdrop-blur-sm p-6">
            <h2 className="text-2xl font-bold text-neon-green mb-6">🏴‍☠️ CTF Challenges</h2>
            <div className="space-y-4">
              {[
                { name: 'Beginner: Web Basics', difficulty: 'Easy', points: 100, solved: true },
                { name: 'Intermediate: Crypto Challenge', difficulty: 'Medium', points: 250, solved: false },
                { name: 'Advanced: Network Exploitation', difficulty: 'Hard', points: 500, solved: false },
                { name: 'Expert: Zero-Day Simulation', difficulty: 'Expert', points: 1000, solved: false }
              ].map((challenge, index) => (
                <div key={index} className="p-4 bg-dark-300 rounded-lg border border-neon-green/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-neon-green">{challenge.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-xs px-2 py-1 rounded ${
                          challenge.difficulty === 'Easy' ? 'bg-neon-green/20 text-neon-green' :
                          challenge.difficulty === 'Medium' ? 'bg-neon-yellow/20 text-neon-yellow' :
                          challenge.difficulty === 'Hard' ? 'bg-neon-red/20 text-neon-red' :
                          'bg-neon-purple/20 text-neon-purple'
                        }`}>
                          {challenge.difficulty}
                        </span>
                        <span className="text-xs text-neon-green/60">{challenge.points} points</span>
                      </div>
                    </div>
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      challenge.solved
                        ? 'bg-neon-green/20 text-neon-green'
                        : 'bg-neon-green text-dark-200 hover:bg-neon-green/90'
                    }`}>
                      {challenge.solved ? '✅ Solved' : 'Start Challenge'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="cyber-border rounded-xl bg-dark-200/50 backdrop-blur-sm p-6">
            <h2 className="text-2xl font-bold text-neon-green mb-6">👥 Team Collaboration</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-dark-300 rounded-lg">
                  <h3 className="font-bold text-neon-green mb-3">Team Members</h3>
                  <div className="space-y-2">
                    {['bedusec (Admin)', 'shadow_ai (AI)', 'red_team_01', 'blue_team_01'].map((member, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-dark-400 rounded">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                          <span>{member}</span>
                        </div>
                        <span className="text-xs text-neon-green/60">Online</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 bg-dark-300 rounded-lg">
                  <h3 className="font-bold text-neon-green mb-3">Recent Activity</h3>
                  <div className="space-y-2 text-sm">
                    <div className="text-neon-green/70">bedusec started a port scan</div>
                    <div className="text-neon-green/70">shadow_ai generated exploit code</div>
                    <div className="text-neon-green/70">CTF challenge completed</div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-dark-300 rounded-lg">
                <h3 className="font-bold text-neon-green mb-3">Team Chat</h3>
                <div className="h-64 overflow-y-auto mb-3 p-3 bg-dark-400 rounded">
                  <div className="space-y-3">
                    <div className="text-right">
                      <div className="inline-block bg-neon-green/20 rounded-lg p-2 max-w-xs">
                        <div className="text-xs text-neon-green/60">bedusec</div>
                        <div>Starting network reconnaissance</div>
                      </div>
                    </div>
                    <div>
                      <div className="inline-block bg-dark-400 border border-neon-green/30 rounded-lg p-2 max-w-xs">
                        <div className="text-xs text-neon-green/60">shadow_ai</div>
                        <div>I can help with that. Want me to generate a scanner?</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Type a message..."
                    className="flex-1 bg-dark-400 border border-neon-green/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-neon-green"
                  />
                  <button className="px-4 py-2 bg-neon-green text-dark-200 rounded-lg font-bold hover:bg-neon-green/90">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-neon-green/30 mt-8 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <div className="w-2 h-2 bg-neon-green rounded-full glow"></div>
                <h3 className="text-lg font-bold">ShadowGPT v6.0</h3>
              </div>
              <p className="text-xs text-neon-green/40">Ultimate Pentesting AI Platform</p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-neon-green/60 mb-1">Created with ❤️ by <span className="text-neon-green font-semibold">bedusec</span></p>
              <p className="text-xs text-neon-green/40">For educational and authorized testing only</p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs text-neon-green/60">v6.0.0</span>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-neon-green rounded-full"></div>
                <div className="w-1 h-1 bg-neon-green rounded-full"></div>
                <div className="w-1 h-1 bg-neon-green rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
