'use client';
import { useState, useEffect, useRef } from 'react';
import { 
  Send, Bot, User, Globe, Wifi, WifiOff, Zap, Shield, 
  Brain, Cpu, Search, RefreshCw, Download, Copy, Star,
  MessageSquare, Code, Terminal, Lock, ChevronRight
} from 'lucide-react';
import { ultimateAI } from '../utils/UltimateAIBrain';

export default function UltimateChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: ultimateAI.generateResponse('Hello! Introduce yourself as the ultimate cybersecurity AI'),
      sender: 'ai',
      timestamp: new Date(),
      mode: 'enhanced',
      thinking: false
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [aiMode, setAiMode] = useState('auto'); // auto, local, online
  const [thinkingProcess, setThinkingProcess] = useState('');
  const [showThinking, setShowThinking] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Check connection
  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const checkConnection = async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      await fetch('https://httpbin.org/get', {
        signal: controller.signal,
        mode: 'no-cors'
      });
      clearTimeout(timeoutId);
      setConnectionStatus('online');
    } catch (error) {
      setConnectionStatus('offline');
      if (aiMode === 'online') {
        setAiMode('auto');
        addSystemMessage('Switched to auto mode (offline detected)');
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Thinking animation
  useEffect(() => {
    if (isTyping) {
      const processes = [
        'Analyzing query structure...',
        'Identifying key topics and domains...',
        'Checking knowledge base...',
        'Evaluating online information need...',
        'Formulating comprehensive response...',
        'Adding cybersecurity context...',
        'Enhancing with practical examples...',
        'Finalizing response...'
      ];
      
      let index = 0;
      const interval = setInterval(() => {
        setThinkingProcess(processes[index % processes.length]);
        index++;
      }, 800);

      return () => clearInterval(interval);
    }
  }, [isTyping]);

  const handleSend = async (customInput = null) => {
    const messageText = customInput || input;
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
      mode: 'user',
      thinking: false
    };

    setMessages(prev => [...prev, userMessage]);
    if (!customInput) setInput('');
    setIsTyping(true);
    setShowThinking(true);

    // Determine if we should force online mode
    const forceOnline = aiMode === 'online' && connectionStatus === 'online';
    
    try {
      const aiResponse = await ultimateAI.generateResponse(messageText, forceOnline);
      
      const aiMessage = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        mode: forceOnline ? 'online' : 'enhanced',
        thinking: false
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Error:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: `**System Error**\n\nI encountered an issue: ${error.message}\n\nLet me try again with local intelligence...`,
        sender: 'ai',
        timestamp: new Date(),
        mode: 'local',
        thinking: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setShowThinking(false);
      setThinkingProcess('');
    }
  };

  const addSystemMessage = (text) => {
    const systemMessage = {
      id: messages.length + 1,
      text: `⚙️ **System**: ${text}`,
      sender: 'system',
      timestamp: new Date(),
      mode: 'system'
    };
    setMessages(prev => [...prev, systemMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: ultimateAI.generateResponse('Start a new conversation about cybersecurity'),
        sender: 'ai',
        timestamp: new Date(),
        mode: 'enhanced',
        thinking: false
      }
    ]);
    addSystemMessage('Chat cleared. Ready for new conversation!');
  };

  const clearCache = () => {
    ultimateAI.clearCache();
    addSystemMessage('AI cache cleared. Responses will be freshly generated.');
  };

  const getConversationSummary = () => {
    const summary = ultimateAI.getConversationSummary();
    addSystemMessage(`Conversation Summary:\n\n${summary}`);
  };

  const quickPrompts = [
    {
      category: '🔐 Cybersecurity',
      prompts: [
        { text: 'Comprehensive guide to network penetration testing', icon: '🛡️' },
        { text: 'Latest web application security vulnerabilities', icon: '🌐' },
        { text: 'How to secure a Linux server from attacks', icon: '🐧' },
        { text: 'Explain blockchain security and vulnerabilities', icon: '🔗' }
      ]
    },
    {
      category: '💻 Technology',
      prompts: [
        { text: 'Current AI and machine learning security trends', icon: '🤖' },
        { text: 'Quantum computing impact on cryptography', icon: '⚛️' },
        { text: 'Cloud security best practices for AWS/Azure', icon: '☁️' },
        { text: 'IoT device security challenges and solutions', icon: '📱' }
      ]
    },
    {
      category: '🧠 General',
      prompts: [
        { text: 'Explain the philosophy behind cybersecurity ethics', icon: '⚖️' },
        { text: 'How does psychology relate to social engineering?', icon: '🧠' },
        { text: 'The history of hacking and its evolution', icon: '📜' },
        { text: 'Future predictions for cybersecurity landscape', icon: '🔮' }
      ]
    }
  ];

  const renderMessage = (message) => {
    const isUser = message.sender === 'user';
    const isSystem = message.sender === 'system';
    
    const modeConfig = {
      online: { color: 'text-neon-blue', bg: 'from-neon-blue/10 to-neon-purple/10', border: 'border-neon-blue/30', icon: <Globe size={14} /> },
      enhanced: { color: 'text-neon-green', bg: 'from-neon-green/10 to-neon-blue/10', border: 'border-neon-green/30', icon: <Zap size={14} /> },
      local: { color: 'text-neon-purple', bg: 'from-neon-purple/10 to-dark-400/90', border: 'border-neon-purple/30', icon: <Cpu size={14} /> },
      system: { color: 'text-neon-yellow', bg: 'from-dark-400 to-dark-500', border: 'border-neon-yellow/20', icon: <Brain size={14} /> },
      user: { color: 'text-neon-green', bg: 'from-neon-green/15 to-neon-blue/15', border: 'border-neon-green/30', icon: <User size={14} /> }
    };
    
    const config = modeConfig[message.mode] || modeConfig.enhanced;
    
    return (
      <div
        key={message.id}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fadeIn`}
      >
        <div
          className={`max-w-[90%] rounded-2xl p-4 bg-gradient-to-r ${config.bg} border ${config.border} backdrop-blur-sm`}
        >
          {/* Message Header */}
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-1.5 rounded-lg ${config.color.replace('text', 'bg')}/20`}>
              {config.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${config.color}`}>
                  {isUser ? 'You' : isSystem ? 'System' : 'ShadowGPT'}
                </span>
                {!isUser && !isSystem && (
                  <span className={`text-xs px-1.5 py-0.5 rounded ${config.color.replace('text', 'bg')}/20 ${config.color}`}>
                    {message.mode.toUpperCase()}
                  </span>
                )}
              </div>
              <div className="text-xs opacity-60">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
          
          {/* Message Content */}
          <div className="prose prose-invert max-w-none text-sm">
            {message.text.split('```').map((part, index) => {
              if (index % 2 === 1) {
                // Code block
                const lines = part.split('\n');
                const language = lines[0] || 'bash';
                const code = lines.slice(1).join('\n');
                
                return (
                  <div key={index} className="my-3">
                    <div className="flex justify-between items-center bg-black/50 px-3 py-2 rounded-t-lg border-b border-neon-green/30">
                      <span className="text-xs font-mono text-neon-green/70">{language}</span>
                      <button 
                        onClick={() => navigator.clipboard.writeText(code)}
                        className="text-xs px-2 py-1 bg-neon-green/20 text-neon-green rounded hover:bg-neon-green/30 transition-colors flex items-center gap-1"
                      >
                        <Copy size={12} />
                        Copy
                      </button>
                    </div>
                    <pre className="bg-black/30 p-3 rounded-b-lg overflow-x-auto text-xs font-mono">
                      <code className="text-neon-green">{code}</code>
                    </pre>
                  </div>
                );
              }
              
              // Regular text with markdown
              return part.split('\n').map((line, lineIndex) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <h3 key={lineIndex} className="text-neon-green font-bold my-2">{line.replace(/\*\*/g, '')}</h3>;
                }
                if (line.startsWith('# ')) {
                  return <h2 key={lineIndex} className="text-xl font-bold text-neon-purple my-3">{line.substring(2)}</h2>;
                }
                if (line.startsWith('- ') || line.startsWith('• ')) {
                  return (
                    <div key={lineIndex} className="flex items-start my-1.5">
                      <span className="text-neon-green mr-2 mt-1">•</span>
                      <span>{line.substring(2)}</span>
                    </div>
                  );
                }
                if (line.trim() === '') {
                  return <br key={lineIndex} />;
                }
                return <p key={lineIndex} className="my-1.5">{line}</p>;
              });
            })}
          </div>
          
          {/* Message Footer */}
          {!isUser && !isSystem && (
            <div className="mt-3 pt-2 border-t border-neon-green/20 text-xs flex items-center justify-between">
              <span className="text-neon-green/60">
                {message.mode === 'online' ? '🌐 Real-time data' : '💻 Local intelligence'}
              </span>
              <span className="flex items-center gap-1">
                <Star size={10} className="text-neon-yellow" />
                Ultimate AI v6.0
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-dark-100 to-dark-200 rounded-2xl border-2 border-neon-green/20 overflow-hidden shadow-2xl shadow-neon-green/10">
      {/* Header */}
      <div className="bg-gradient-to-r from-dark-300 to-dark-400 border-b border-neon-green/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse"></div>
              <div className="absolute inset-0 rounded-full bg-neon-green animate-ping opacity-30"></div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-neon-green flex items-center gap-2">
                <Brain size={20} />
                Ultimate AI
                <span className="text-xs px-2 py-1 bg-gradient-to-r from-neon-green to-neon-blue text-dark-200 rounded-full">
                  v6.0
                </span>
              </h2>
              <div className="text-sm text-neon-green/70 flex items-center gap-2">
                <span className="flex items-center gap-1">
                  {connectionStatus === 'online' ? <Wifi size={12} /> : <WifiOff size={12} />}
                  {connectionStatus === 'online' ? 'Online' : 'Offline'}
                </span>
                •
                <span>Cybersecurity Specialist</span>
                •
                <span className="text-neon-green">100% Free</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* AI Mode Selector */}
            <div className="hidden md:block">
              <div className="text-xs text-neon-green/60 mb-1">AI Mode</div>
              <div className="flex gap-1">
                {['auto', 'local', 'online'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setAiMode(mode)}
                    disabled={mode === 'online' && connectionStatus === 'offline'}
                    className={`px-2 py-1 text-xs rounded transition-all ${
                      aiMode === mode
                        ? mode === 'online' ? 'bg-neon-blue text-dark-200' :
                          mode === 'local' ? 'bg-neon-purple text-dark-200' :
                          'bg-neon-green text-dark-200'
                        : 'bg-dark-400 text-neon-green/60 hover:text-neon-green'
                    } disabled:opacity-30 disabled:cursor-not-allowed`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={checkConnection}
                className="p-2 bg-dark-300 border border-neon-green/30 rounded-lg hover:bg-dark-400"
                title="Check Connection"
              >
                <RefreshCw size={16} />
              </button>
              <button
                onClick={clearCache}
                className="p-2 bg-dark-300 border border-neon-green/30 rounded-lg hover:bg-dark-400"
                title="Clear Cache"
              >
                <Download size={16} />
              </button>
              <button
                onClick={clearChat}
                className="px-3 py-2 bg-dark-300 border border-neon-green/30 rounded-lg hover:bg-dark-400 text-sm"
              >
                New Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-neon-green scrollbar-track-dark-300">
            <div className="max-w-3xl mx-auto">
              {messages.map(renderMessage)}
              
              {/* Thinking Indicator */}
              {isTyping && showThinking && (
                <div className="flex justify-start mb-4">
                  <div className="max-w-[90%] rounded-2xl p-4 bg-gradient-to-r from-dark-300/90 to-dark-400/90 border border-neon-purple/30 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 rounded-lg bg-neon-purple/20">
                        <Brain size={16} />
                      </div>
                      <span className="text-sm font-bold text-neon-purple">Ultimate AI Thinking</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-neon-green">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-neon-green animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-neon-green animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 rounded-full bg-neon-green animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="italic">{thinkingProcess}</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-1 bg-gradient-to-r from-neon-green to-neon-blue rounded-full animate-pulse"></div>
                        <div className="h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-1 bg-gradient-to-r from-neon-purple to-neon-green rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      
                      <div className="text-xs text-neon-green/50 flex flex-wrap gap-2">
                        <span className="flex items-center gap-1">
                          {aiMode === 'online' ? <Globe size={10} /> : <Cpu size={10} />}
                          {aiMode === 'online' ? 'Online processing' : 'Local processing'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield size={10} />
                          Security analysis
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap size={10} />
                          Enhanced response
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="border-t border-neon-green/10 p-3 bg-dark-300/50">
            <div className="max-w-3xl mx-auto">
              <div className="text-sm text-neon-green/80 mb-2 px-1">Quick Prompts:</div>
              <div className="space-y-2">
                {quickPrompts.map((category, catIndex) => (
                  <div key={catIndex} className="space-y-1">
                    <div className="text-xs font-bold text-neon-green/60 px-1">{category.category}</div>
                    <div className="flex flex-wrap gap-2">
                      {category.prompts.map((prompt, promptIndex) => (
                        <button
                          key={promptIndex}
                          onClick={() => handleSend(prompt.text)}
                          className="flex items-center gap-2 px-3 py-2 bg-dark-400 border border-neon-green/10 rounded-lg text-sm hover:border-neon-green/30 transition-colors group"
                        >
                          <span className="text-lg group-hover:scale-110 transition-transform">
                            {prompt.icon}
                          </span>
                          <span className="text-xs">{prompt.text.substring(0, 40)}...</span>
                          <ChevronRight size={12} className="text-neon-green/60" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-neon-green/20 p-4 bg-gradient-to-t from-dark-300 to-dark-400">
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={`Ask anything! ${
                      aiMode === 'online' ? 'I will search online for the latest information...' :
                      aiMode === 'local' ? 'I will use my extensive local knowledge...' :
                      'I will intelligently choose the best approach...'
                    }`}
                    className="w-full bg-dark-200/80 border-2 border-neon-green/30 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-neon-green resize-none min-h-[60px] backdrop-blur-sm placeholder-neon-green/40"
                    rows="2"
                  />
                  <div className="absolute right-3 bottom-3 flex items-center gap-2">
                    <span className="text-xs text-neon-green/40">
                      {input.length}/1000
                    </span>
                    <kbd className="px-2 py-1 bg-dark-300 border border-neon-green/30 rounded text-xs">Enter</kbd>
                  </div>
                </div>
                
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="self-end px-6 py-3 bg-gradient-to-r from-neon-green to-neon-blue text-dark-200 rounded-xl font-bold hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send size={18} />
                  <span>Send</span>
                </button>
              </div>
              
              <div className="flex flex-wrap items-center justify-between mt-2 text-xs text-neon-green/40 px-1">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${
                      connectionStatus === 'online' ? 'bg-neon-green animate-pulse' : 'bg-neon-red'
                    }`}></div>
                    <span>{connectionStatus === 'online' ? 'Connected' : 'Offline'}</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${
                      aiMode === 'online' ? 'bg-neon-blue animate-pulse' :
                      aiMode === 'local' ? 'bg-neon-purple animate-pulse' :
                      'bg-neon-green animate-pulse'
                    }`}></div>
                    <span>
                      {aiMode === 'online' ? 'Online Mode' :
                       aiMode === 'local' ? 'Local Mode' : 'Auto Mode'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={getConversationSummary}
                    className="text-xs px-2 py-1 bg-dark-300 border border-neon-green/20 rounded hover:bg-dark-400"
                  >
                    Summary
                  </button>
                  <span className="text-neon-green/60">|</span>
                  <span className="flex items-center gap-1">
                    <Zap size={10} />
                    Ultimate AI v6.0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
              <button
                onClick={clearCache}
                className="p-2 rounded-lg bg-neon-green/10 text-neon-green hover:bg-neon-green/20 transition-colors"
                title="Clear AI cache"
              >
                <RefreshCw size={16} />
              </button>
              <button
                onClick={clearChat}
                className="p-2 rounded-lg bg-neon-purple/10 text-neon-purple hover:bg-neon-purple/20 transition-colors"
                title="Clear chat"
              >
                <MessageSquare size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Status Banner */}
      {connectionStatus === 'offline' && (
        <div className="bg-gradient-to-r from-dark-400 to-dark-500 border-y border-neon-yellow/30 px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-neon-yellow">
              <WifiOff size={14} />
              Offline Mode • Using enhanced local intelligence
            </div>
            <button
              onClick={checkConnection}
              className="text-xs px-2 py-1 bg-neon-yellow/20 text-neon-yellow rounded hover:bg-neon-yellow/30 transition-colors"
            >
              Retry Connection
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Quick Prompts Sidebar */}
        <div className="hidden md:flex flex-col w-80 border-r border-neon-green/20 bg-dark-300/50 p-4">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-neon-green mb-3 flex items-center gap-2">
              <Zap size={18} />
              Quick Prompts
            </h3>
            <p className="text-sm text-neon-green/70 mb-4">
              Start with these expert prompts for instant insights
            </p>
          </div>

          <div className="space-y-4 overflow-y-auto flex-1">
            {quickPrompts.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-dark-400/50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-lg">{section.category.split(' ')[0]}</div>
                  <span className="text-sm font-semibold text-neon-green">
                    {section.category.split(' ').slice(1).join(' ')}
                  </span>
                </div>
                <div className="space-y-2">
                  {section.prompts.map((prompt, promptIndex) => (
                    <button
                      key={promptIndex}
                      onClick={() => handleSend(prompt.text)}
                      className="w-full text-left p-2 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span>{prompt.icon}</span>
                        <span className="text-xs opacity-60">Quick AI</span>
                      </div>
                      <div className="text-sm text-neon-green/90 group-hover:text-neon-green">
                        {prompt.text}
                      </div>
                      <ChevronRight
                        size={14}
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-neon-green"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-neon-green/20">
            <div className="text-xs text-neon-green/60 mb-2">AI Capabilities</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Lock size={12} className="text-neon-green" />
                <span className="text-sm">Cybersecurity Expert</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={12} className="text-neon-blue" />
                <span className="text-sm">Real-time Information</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain size={12} className="text-neon-purple" />
                <span className="text-sm">Advanced Local Intelligence</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-neon-yellow" />
                <span className="text-sm">Code Generation & Analysis</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-4xl mx-auto">
              {messages.map(renderMessage)}
              
              {/* Thinking Indicator */}
              {isTyping && showThinking && (
                <div className="flex justify-start mb-4">
                  <div className="max-w-[90%] rounded-2xl p-4 bg-gradient-to-r from-dark-400 to-dark-500 border border-neon-purple/30 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded-lg bg-neon-purple/20">
                        <Brain size={14} className="text-neon-purple" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-neon-purple">
                            ShadowGPT Thinking
                          </span>
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse delay-150"></div>
                            <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse delay-300"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-neon-purple/90">
                      {thinkingProcess}
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-neon-green/20 bg-dark-300/30 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask anything about cybersecurity, technology, or general knowledge... (Shift+Enter for new line)"
                    className="w-full bg-dark-400/50 border border-neon-green/30 rounded-xl px-4 py-3 text-sm text-neon-green placeholder-neon-green/50 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/50 resize-none min-h-[60px] max-h-[120px] backdrop-blur-sm"
                    rows={3}
                  />
                  <div className="absolute right-2 bottom-2 flex gap-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(input)}
                      disabled={!input}
                      className="p-1.5 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Copy input"
                    >
                      <Copy size={14} className="text-neon-green/70" />
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={() => handleSend()}
                  disabled={isTyping || !input.trim()}
                  className="self-end px-6 py-3 bg-gradient-to-r from-neon-green to-neon-blue text-dark-200 font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isTyping ? (
                    <>
                      <div className="w-4 h-4 border-2 border-dark-200 border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send
                    </>
                  )}
                </button>
              </div>
              
              {/* Status Bar */}
              <div className="mt-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${connectionStatus === 'online' ? 'bg-neon-green' : 'bg-neon-yellow'}`}></div>
                    <span className={connectionStatus === 'online' ? 'text-neon-green' : 'text-neon-yellow'}>
                      {connectionStatus === 'online' ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${
                      aiMode === 'online' ? 'bg-neon-blue' :
                      aiMode === 'local' ? 'bg-neon-purple' :
                      'bg-neon-green'
                    }`}></div>
                    <span className="text-neon-green/70">
                      Mode: {aiMode}
                    </span>
                  </div>
                  <div className="text-neon-green/70">
                    {messages.length} messages
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={getConversationSummary}
                    className="text-neon-green/70 hover:text-neon-green transition-colors flex items-center gap-1"
                  >
                    <Download size={12} />
                    Summary
                  </button>
                  <span className="text-neon-green/30">•</span>
                  <span className="text-neon-green/70">Ultimate AI v6.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
              <button
                onClick={clearCache}
                className="p-2 rounded-lg bg-neon-green/10 text-neon-green hover:bg-neon-green/20 transition-colors"
                title="Clear AI cache"
              >
                <RefreshCw size={16} />
              </button>
              <button
                onClick={clearChat}
                className="p-2 rounded-lg bg-neon-purple/10 text-neon-purple hover:bg-neon-purple/20 transition-colors"
                title="Clear chat"
              >
                <MessageSquare size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Status Banner */}
      {connectionStatus === 'offline' && (
        <div className="bg-gradient-to-r from-dark-400 to-dark-500 border-y border-neon-yellow/30 px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-neon-yellow">
              <WifiOff size={14} />
              Offline Mode • Using enhanced local intelligence
            </div>
            <button
              onClick={checkConnection}
              className="text-xs px-2 py-1 bg-neon-yellow/20 text-neon-yellow rounded hover:bg-neon-yellow/30 transition-colors"
            >
              Retry Connection
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Quick Prompts Sidebar */}
        <div className="hidden md:flex flex-col w-80 border-r border-neon-green/20 bg-dark-300/50 p-4">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-neon-green mb-3 flex items-center gap-2">
              <Zap size={18} />
              Quick Prompts
            </h3>
            <p className="text-sm text-neon-green/70 mb-4">
              Start with these expert prompts for instant insights
            </p>
          </div>

          <div className="space-y-4 overflow-y-auto flex-1">
            {quickPrompts.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-dark-400/50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-lg">{section.category.split(' ')[0]}</div>
                  <span className="text-sm font-semibold text-neon-green">
                    {section.category.split(' ').slice(1).join(' ')}
                  </span>
                </div>
                <div className="space-y-2">
                  {section.prompts.map((prompt, promptIndex) => (
                    <button
                      key={promptIndex}
                      onClick={() => handleSend(prompt.text)}
                      className="w-full text-left p-2 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span>{prompt.icon}</span>
                        <span className="text-xs opacity-60">Quick AI</span>
                      </div>
                      <div className="text-sm text-neon-green/90 group-hover:text-neon-green">
                        {prompt.text}
                      </div>
                      <ChevronRight
                        size={14}
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-neon-green"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-neon-green/20">
            <div className="text-xs text-neon-green/60 mb-2">AI Capabilities</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Lock size={12} className="text-neon-green" />
                <span className="text-sm">Cybersecurity Expert</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={12} className="text-neon-blue" />
                <span className="text-sm">Real-time Information</span>
              </div>
              <div className="flex items-center gap-2">
                <Brain size={12} className="text-neon-purple" />
                <span className="text-sm">Advanced Local Intelligence</span>
              </div>
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-neon-yellow" />
                <span className="text-sm">Code Generation & Analysis</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-4xl mx-auto">
              {messages.map(renderMessage)}
              
              {/* Thinking Indicator */}
              {isTyping && showThinking && (
                <div className="flex justify-start mb-4">
                  <div className="max-w-[90%] rounded-2xl p-4 bg-gradient-to-r from-dark-400 to-dark-500 border border-neon-purple/30 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded-lg bg-neon-purple/20">
                        <Brain size={14} className="text-neon-purple" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-neon-purple">
                            ShadowGPT Thinking
                          </span>
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse delay-150"></div>
                            <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse delay-300"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-neon-purple/90">
                      {thinkingProcess}
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-neon-green/20 bg-dark-300/30 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask anything about cybersecurity, technology, or general knowledge... (Shift+Enter for new line)"
                    className="w-full bg-dark-400/50 border border-neon-green/30 rounded-xl px-4 py-3 text-sm text-neon-green placeholder-neon-green/50 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/50 resize-none min-h-[60px] max-h-[120px] backdrop-blur-sm"
                    rows={3}
                  />
                  <div className="absolute right-2 bottom-2 flex gap-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(input)}
                      disabled={!input}
                      className="p-1.5 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Copy input"
                    >
                      <Copy size={14} className="text-neon-green/70" />
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={() => handleSend()}
                  disabled={isTyping || !input.trim()}
                  className="self-end px-6 py-3 bg-gradient-to-r from-neon-green to-neon-blue text-dark-200 font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isTyping ? (
                    <>
                      <div className="w-4 h-4 border-2 border-dark-200 border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send
                    </>
                  )}
                </button>
              </div>
              
              {/* Status Bar */}
              <div className="mt-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${connectionStatus === 'online' ? 'bg-neon-green' : 'bg-neon-yellow'}`}></div>
                    <span className={connectionStatus === 'online' ? 'text-neon-green' : 'text-neon-yellow'}>
                      {connectionStatus === 'online' ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${
                      aiMode === 'online' ? 'bg-neon-blue' :
                      aiMode === 'local' ? 'bg-neon-purple' :
                      'bg-neon-green'
                    }`}></div>
                    <span className="text-neon-green/70">
                      Mode: {aiMode}
                    </span>
                  </div>
                  <div className="text-neon-green/70">
                    {messages.length} messages
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={getConversationSummary}
                    className="text-neon-green/70 hover:text-neon-green transition-colors flex items-center gap-1"
                  >
                    <Download size={12} />
                    Summary
                  </button>
                  <span className="text-neon-green/30">•</span>
                  <span className="text-neon-green/70">Ultimate AI v6.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
