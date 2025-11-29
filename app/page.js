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
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, assistantMessage]);
        
        if (data.analysis) {
          setAnalysisInfo(data.analysis);
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
    "Create port scanner tool",
    "Explain SQL injection",
    "Generate vulnerability scanner",
    "How to use nmap",
    "Make hash cracker tool",
    "What are OWASP Top 10?",
    "Web security basics",
    "Network scanning techniques"
  ];

  const advancedTools = [
    { name: 'Port Scanner', command: 'Create port scanner tool', lang: 'bash' },
    { name: 'Vulnerability Scanner', command: 'Generate vulnerability scanner', lang: 'bash' },
    { name: 'Hash Cracker', command: 'Make hash cracker tool', lang: 'bash' }
  ];

  const pentestingPhases = [
    { phase: "Reconnaissance", icon: "🔍", description: "Information gathering" },
    { phase: "Scanning", icon: "📡", description: "Vulnerability detection" },
    { phase: "Exploitation", icon: "⚡", description: "Gaining access" },
    { phase: "Post-Exploit", icon: "🔐", description: "Maintaining access" },
    { phase: "Reporting", icon: "📊", description: "Documentation" }
  ];

  return (
    <div className="min-h-screen bg-dark-200 text-neon-green">
      <MatrixRain />
      
      <header className="border-b border-neon-green/30 bg-dark-100/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-neon-green rounded-full glow"></div>
              <h1 className="text-2xl font-bold hacker-text">ShadowGPT v4.0</h1>
              <span className="text-xs bg-neon-purple/20 text-neon-purple px-2 py-1 rounded">ADVANCED AI</span>
            </div>
            <div className="text-sm text-neon-green/70">
              Enhanced by <span className="text-neon-green glow">bedusec</span>
            </div>
          </div>
          <p className="text-neon-green/60 text-sm mt-2">
            Advanced AI Pentesting Assistant - Smart Analysis & Tool Generation
          </p>
          
          <div className="flex space-x-1 mt-4">
            {['chat', 'analysis'].map((tab) => (
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {analysisInfo && activeTab === 'chat' && (
          <div className="mb-4 p-3 bg-dark-300 border border-neon-purple/30 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-neon-purple font-bold">AI ANALYSIS</span>
                <div className="text-xs text-neon-green/70 mt-1">
                  Category: <span className="text-neon-green">{analysisInfo.category}</span> • 
                  Complexity: <span className="text-neon-green">{analysisInfo.complexity}</span>
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
                  {quickCommands.map((cmd, index) => (
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
                <h3 className="text-neon-green/70 text-sm mb-3">TOOLS:</h3>
                <div className="flex flex-wrap gap-2">
                  {advancedTools.map((tool, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(tool.command)}
                      className="px-3 py-1 bg-neon-purple/10 border border-neon-purple/30 rounded text-xs hover:bg-neon-purple/20 transition-colors"
                    >
                      {tool.name} ({tool.lang})
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
                      <div className="text-4xl mb-4">🛡️</div>
                      <p className="text-lg mb-2 glow">ShadowGPT v4.0 Active</p>
                      <p className="text-sm">Advanced AI Pentesting Assistant</p>
                      <p className="text-xs mt-4 text-neon-green/40">
                        Ask questions, create tools, or explore cybersecurity
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
                      <span className={`text-xs font-bold ${
                        message.role === 'user' ? 'text-neon-blue' : 'text-neon-purple'
                      }`}>
                        {message.role === 'user' ? 'YOU' : 'SHADOWGPT AI'}
                      </span>
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
                      <span className="text-xs text-neon-purple">AI processing...</span>
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
                      placeholder="Ask cybersecurity questions or create tools..."
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
                <div className="text-xs text-neon-green/50 mt-2 text-center">
                  Press Enter to send • Advanced AI features active
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'analysis' && (
          <div className="cyber-border rounded-lg bg-dark-100/50 backdrop-blur-sm p-6">
            <h3 className="text-neon-green text-lg mb-4 glow">AI Analysis Dashboard</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-dark-300 border border-neon-green/20 rounded-lg p-4">
                <h4 className="text-neon-green font-bold mb-3">Advanced Features</h4>
                <ul className="text-sm space-y-2 text-neon-green/80">
                  <li>• Smart query categorization</li>
                  <li>• Context-aware responses</li>
                  <li>• Multi-domain knowledge</li>
                  <li>• Advanced tool generation</li>
                  <li>• Complexity assessment</li>
                </ul>
              </div>
              <div className="bg-dark-300 border border-neon-purple/20 rounded-lg p-4">
                <h4 className="text-neon-purple font-bold mb-3">Knowledge Domains</h4>
                <ul className="text-sm space-y-2 text-neon-purple/80">
                  <li>• Pentesting methodologies</li>
                  <li>• Vulnerability analysis</li>
                  <li>• Network security</li>
                  <li>• Web application security</li>
                  <li>• Programming and scripting</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-6 text-center text-neon-green/40 text-xs">
          <p>⚠️ Advanced AI Pentesting Assistant - For educational purposes only</p>
          <p className="mt-1">Enhanced by <span className="text-neon-green">bedusec</span> • Use responsibly and ethically</p>
        </footer>
      </div>
    </div>
  );
}
