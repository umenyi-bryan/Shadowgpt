'use client';
import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Cpu, Zap, Shield, Code, Globe, Wifi, WifiOff, Download, Search, RefreshCw, CpuChip } from 'lucide-react';
import { hybridAI } from '../utils/HybridAIBrain';
import WebSearch from './WebSearch';

export default function HybridChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: hybridAI.setMode('hybrid'),
      sender: 'ai',
      timestamp: new Date(),
      thinking: false,
      mode: 'hybrid'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiMode, setAiMode] = useState('hybrid'); // offline, hybrid, online
  const [showWebSearch, setShowWebSearch] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const [searchResults, setSearchResults] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
    checkConnection();
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
        setAiMode('offline');
        addAIMessage(hybridAI.setMode('offline'));
      }
    }
  };

  const handleSend = async (customInput = null) => {
    const messageText = customInput || input;
    if (!messageText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
      thinking: false,
      mode: aiMode
    };

    setMessages(prev => [...prev, userMessage]);
    if (!customInput) setInput('');
    setIsTyping(true);

    // Determine if we should use online mode
    const useOnline = aiMode === 'online' || (aiMode === 'hybrid' && hybridAI.requiresOnlineInfo(messageText));
    
    setTimeout(async () => {
      try {
        const aiResponse = await hybridAI.generateResponse(messageText, useOnline);
        
        const aiMessage = {
          id: messages.length + 2,
          text: aiResponse,
          sender: 'ai',
          timestamp: new Date(),
          thinking: false,
          mode: useOnline ? 'online' : 'offline'
        };

        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error('AI error:', error);
        const errorMessage = {
          id: messages.length + 2,
          text: `**Error:** ${error.message}\n\nI'll use offline mode instead.`,
          sender: 'ai',
          timestamp: new Date(),
          thinking: false,
          mode: 'offline'
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
      }
    }, 600 + Math.random() * 900);
  };

  const addAIMessage = (text) => {
    const aiMessage = {
      id: messages.length + 1,
      text: text,
      sender: 'ai',
      timestamp: new Date(),
      thinking: false,
      mode: aiMode
    };
    setMessages(prev => [...prev, aiMessage]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleModeChange = (newMode) => {
    setAiMode(newMode);
    hybridAI.setMode(newMode);
    addAIMessage(hybridAI.setMode(newMode));
  };

  const handleSearchResult = (results) => {
    setSearchResults(results);
    setShowWebSearch(false);
    
    // Create a message from search results
    if (results && !results.error) {
      const searchMessage = `🔍 **Web Search Results**\n\n` +
        `**Query:** "${results.query}"\n` +
        `**Source:** ${results.source}\n\n` +
        `**Summary:** ${results.content.substring(0, 200)}...\n\n` +
        `**Source URL:** ${results.url}\n\n` +
        `*Would you like to know more about this topic?*`;
      
      addAIMessage(searchMessage);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: hybridAI.setMode(aiMode),
        sender: 'ai',
        timestamp: new Date(),
        thinking: false,
        mode: aiMode
      }
    ]);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const conversationStarters = [
    {
      category: '🌐 Online Information',
      prompts: [
        { icon: '📰', text: 'Latest cybersecurity news' },
        { icon: '🔍', text: 'Search for current vulnerabilities' },
        { icon: '📊', text: 'What is the current AI trend?' },
        { icon: '🚀', text: 'Latest SpaceX launch news' }
      ]
    },
    {
      category: '🔐 Offline Security',
      prompts: [
        { icon: '🛡️', text: 'How to use Nmap for scanning?' },
        { icon: '🐍', text: 'Write a Python security script' },
        { icon: '🔑', text: 'Explain encryption methods' },
        { icon: '⚡', text: 'Metasploit tutorial basics' }
      ]
    },
    {
      category: '💬 General Chat',
      prompts: [
        { icon: '🤔', text: 'What is quantum computing?' },
        { icon: '🎭', text: 'Tell me a tech joke' },
        { icon: '💡', text: 'Life advice for programmers' },
        { icon: '🌌', text: 'Explain blockchain technology' }
      ]
    }
  ];

  const handleQuickPrompt = (prompt) => {
    setInput(prompt);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const renderMessage = (message) => {
    const isUser = message.sender === 'user';
    
    return (
      <div
        key={message.id}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 animate-fadeIn`}
      >
        <div
          className={`max-w-[90%] rounded-2xl p-5 ${
            isUser
              ? 'bg-gradient-to-r from-neon-green/15 to-neon-blue/15 border border-neon-green/30'
              : message.mode === 'online'
                ? 'bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border border-neon-blue/30'
                : 'bg-gradient-to-r from-dark-300/90 to-dark-400/90 border border-neon-purple/30'
          } backdrop-blur-sm`}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-full ${
              isUser ? 'bg-neon-green/20' : 
              message.mode === 'online' ? 'bg-neon-blue/20' : 'bg-neon-purple/20'
            }`}>
              {isUser ? <User size={18} /> : <Bot size={18} />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={`font-bold ${
                  isUser ? 'text-neon-green' : 
                  message.mode === 'online' ? 'text-neon-blue' : 'text-neon-purple'
                }`}>
                  {isUser ? 'You' : 'ShadowGPT'}
                </span>
                {!isUser && (
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    message.mode === 'online' 
                      ? 'bg-neon-blue/20 text-neon-blue'
                      : 'bg-neon-purple/20 text-neon-purple'
                  }`}>
                    {message.mode === 'online' ? '🌐 ONLINE' : '🔌 OFFLINE'}
                  </span>
                )}
              </div>
              <div className="text-xs opacity-60 mt-0.5">
                {formatTime(message.timestamp)} • {
                  isUser ? 'You sent' : 
                  message.mode === 'online' ? 'Online response' : 'Local AI response'
                }
              </div>
            </div>
          </div>
          
          <div className="prose prose-invert max-w-none text-sm leading-relaxed">
            {message.text.split('```').map((part, index) => {
              if (index % 2 === 1) {
                // Code block
                const lines = part.split('\n');
                const language = lines[0] || 'bash';
                const code = lines.slice(1).join('\n');
                
                return (
                  <div key={index} className="my-4">
                    <div className="flex justify-between items-center bg-black/50 px-4 py-2 rounded-t-lg border-b border-neon-green/30">
                      <span className="text-xs font-mono text-neon-green/70">{language}</span>
                      <button 
                        onClick={() => navigator.clipboard.writeText(code)}
                        className="text-xs px-3 py-1 bg-neon-green/20 text-neon-green rounded hover:bg-neon-green/30 transition-colors flex items-center gap-1"
                      >
                        📋 Copy
                      </button>
                    </div>
                    <pre className="bg-black/30 p-4 rounded-b-lg overflow-x-auto text-xs font-mono">
                      <code className="text-neon-green">{code}</code>
                    </pre>
                  </div>
                );
              }
              
              // Regular text with markdown
              return part.split('\n').map((line, lineIndex) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <h3 key={lineIndex} className="text-neon-green font-bold my-3 text-lg">{line.replace(/\*\*/g, '')}</h3>;
                }
                if (line.startsWith('# ')) {
                  return <h2 key={lineIndex} className="text-neon-purple font-bold my-3 text-xl">{line.substring(2)}</h2>;
                }
                if (line.startsWith('- ') || line.startsWith('• ')) {
                  return (
                    <div key={lineIndex} className="flex items-start my-2">
                      <span className="text-neon-green mr-2 mt-1">•</span>
                      <span>{line.substring(2)}</span>
                    </div>
                  );
                }
                if (line.trim() === '') {
                  return <br key={lineIndex} />;
                }
                return <p key={lineIndex} className="my-2">{line}</p>;
              });
            })}
          </div>
          
          {!isUser && (
            <div className="mt-4 pt-3 border-t border-neon-purple/20 text-xs text-neon-purple/60 flex items-center justify-between">
              <span className="flex items-center gap-1">
                {message.mode === 'online' ? <Globe size={12} /> : <CpuChip size={12} />}
                {message.mode === 'online' ? 'Online search enabled' : 'Local AI processing'}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
                {message.mode === 'online' ? 'Real-time data' : 'No internet needed'}
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
      <div className="bg-gradient-to-r from-dark-300 to-dark-400 border-b border-neon-green/30 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className={`w-5 h-5 rounded-full ${
                aiMode === 'online' ? 'bg-neon-blue animate-pulse' : 
                aiMode === 'hybrid' ? 'bg-neon-green animate-pulse' : 'bg-neon-purple animate-pulse'
              }`}></div>
              <div className={`absolute inset-0 rounded-full ${
                aiMode === 'online' ? 'bg-neon-blue animate-ping opacity-30' : 
                aiMode === 'hybrid' ? 'bg-neon-green animate-ping opacity-30' : 'bg-neon-purple animate-ping opacity-30'
              }`}></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neon-green flex items-center gap-3">
                <Globe size={24} />
                Hybrid AI Assistant
                <span className="text-sm px-3 py-1 bg-gradient-to-r from-neon-green to-neon-blue text-dark-200 rounded-full">v6.0</span>
              </h2>
              <div className="text-sm text-neon-green/70 flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1">
                  {connectionStatus === 'online' ? <Wifi size={14} /> : <WifiOff size={14} />}
                  {connectionStatus === 'online' ? 'Online' : 'Offline'}
                </span>
                •
                <span className="flex items-center gap-1">
                  <CpuChip size={14} />
                  {aiMode === 'online' ? 'Online Mode' : aiMode === 'hybrid' ? 'Hybrid Mode' : 'Offline Mode'}
                </span>
                •
                <span className="flex items-center gap-1">
                  <Zap size={14} />
                  100% Free
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <div className="text-xs text-neon-green/60 mb-1">AI Mode</div>
              <div className="flex gap-2">
                {['offline', 'hybrid', 'online'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => handleModeChange(mode)}
                    disabled={mode === 'online' && connectionStatus === 'offline'}
                    className={`px-3 py-1 text-xs rounded-full transition-all ${
                      aiMode === mode
                        ? mode === 'online' ? 'bg-neon-blue text-dark-200 font-bold' :
                          mode === 'hybrid' ? 'bg-neon-green text-dark-200 font-bold' :
                          'bg-neon-purple text-dark-200 font-bold'
                        : 'bg-dark-400 text-neon-green/60 hover:text-neon-green'
                    } disabled:opacity-30 disabled:cursor-not-allowed`}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowWebSearch(!showWebSearch)}
                className="px-4 py-2 bg-dark-300 border border-neon-green/30 rounded-lg hover:bg-dark-400 transition-colors text-sm flex items-center gap-2"
              >
                <Search size={16} />
                {showWebSearch ? 'Hide Search' : 'Web Search'}
              </button>
              
              <button
                onClick={clearChat}
                className="px-4 py-2 bg-dark-300 border border-neon-green/30 rounded-lg hover:bg-dark-400 transition-colors text-sm flex items-center gap-2"
              >
                <span>🔄</span>
                <span>New Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Area */}
        <div className={`${showWebSearch ? 'w-2/3' : 'w-full'} flex flex-col`}>
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-neon-green scrollbar-track-dark-300">
            <div className="max-w-4xl mx-auto">
              {messages.map(renderMessage)}
              
              {isTyping && (
                <div className="flex justify-start mb-6">
                  <div className="max-w-[90%] rounded-2xl p-5 bg-gradient-to-r from-dark-300/90 to-dark-400/90 border border-neon-purple/30 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-full bg-neon-purple/20">
                        <Bot size={18} />
                      </div>
                      <div className="flex-1">
                        <span className="font-bold text-neon-purple">ShadowGPT</span>
                        <div className="text-xs opacity-60">
                          {aiMode === 'online' ? 'Searching online...' : 
                           aiMode === 'hybrid' ? 'Checking knowledge...' : 'Processing locally...'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-sm text-neon-green">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 rounded-full bg-neon-green animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-neon-green animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 rounded-full bg-neon-green animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="italic">
                          {aiMode === 'online' ? 'Fetching real-time information...' :
                           aiMode === 'hybrid' ? 'Analyzing query for online needs...' :
                           'Generating response from local knowledge...'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <div className="h-1.5 bg-gradient-to-r from-neon-green to-neon-blue rounded-full animate-pulse"></div>
                        <div className="h-1.5 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="h-1.5 bg-gradient-to-r from-neon-purple to-neon-green rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      
                      <div className="text-xs text-neon-green/50 flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          {aiMode === 'online' ? <Globe size={12} /> : <CpuChip size={12} />}
                          {aiMode === 'online' ? 'Online search' : 'Local processing'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Shield size={12} />
                          100% private
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap size={12} />
                          No API costs
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Conversation Starters */}
          {!showWebSearch && (
            <div className="border-t border-neon-green/10 p-5 bg-dark-300/50 backdrop-blur-sm">
              <div className="max-w-4xl mx-auto">
                <div className="text-sm text-neon-green/80 mb-4 px-2 flex items-center gap-2">
                  <Zap size={16} />
                  Quick Starters ({aiMode.toUpperCase()} mode):
                </div>
                
                <div className="space-y-4">
                  {conversationStarters.map((category, catIndex) => (
                    <div key={catIndex} className="space-y-2">
                      <div className="text-xs font-bold text-neon-green/60 px-2">{category.category}</div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {category.prompts.map((prompt, promptIndex) => (
                          <button
                            key={promptIndex}
                            onClick={() => handleQuickPrompt(prompt.text)}
                            className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-dark-400 to-dark-500 border border-neon-green/20 rounded-xl text-sm hover:border-neon-green hover:scale-[1.02] transition-all group text-left"
                          >
                            <span className="text-lg">{prompt.icon}</span>
                            <span className="text-xs font-medium">{prompt.text}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-neon-green/20 p-6 bg-gradient-to-t from-dark-300 to-dark-400">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={
                      aiMode === 'online' ? 
                      "Ask anything! I'll search the web for real-time information..." :
                      aiMode === 'hybrid' ?
                      "Ask anything! I'll use local knowledge first, then search online if needed..." :
                      "Ask anything! I'll use my local knowledge (works offline)..."
                    }
                    className="w-full bg-dark-200/80 border-2 border-neon-green/30 rounded-2xl px-5 py-4 pr-16 text-sm focus:outline-none focus:border-neon-green resize-none min-h-[80px] max-h-[200px] backdrop-blur-sm placeholder-neon-green/40"
                    rows="3"
                  />
                  <div className="absolute right-4 bottom-4 flex items-center gap-3">
                    <span className="text-xs text-neon-green/40">
                      {input.length}/2000
                    </span>
                    <div className="flex items-center gap-1">
                      <kbd className="px-2 py-1 bg-dark-300 border border-neon-green/30 rounded text-xs">Enter</kbd>
                      <span className="text-xs text-neon-green/40">to send</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                    className="px-8 py-4 bg-gradient-to-r from-neon-green to-neon-blue text-dark-200 rounded-2xl font-bold hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg shadow-neon-green/20 min-w-[100px] justify-center"
                  >
                    <Send size={20} />
                    <span>Send</span>
                  </button>
                  
                  <button
                    onClick={checkConnection}
                    className="px-4 py-2 bg-dark-400 border border-neon-green/30 rounded-lg text-sm hover:bg-dark-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw size={14} />
                    Check Net
                  </button>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center justify-between mt-4 text-xs text-neon-green/40 px-2 gap-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      aiMode === 'online' ? 'bg-neon-blue animate-pulse' :
                      aiMode === 'hybrid' ? 'bg-neon-green animate-pulse' :
                      'bg-neon-purple animate-pulse'
                    }`}></div>
                    <span>
                      {aiMode === 'online' ? 'Online Mode' :
                       aiMode === 'hybrid' ? 'Hybrid Mode' : 'Offline Mode'}
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    {connectionStatus === 'online' ? <Wifi size={12} /> : <WifiOff size={12} />}
                    <span>{connectionStatus === 'online' ? 'Internet available' : 'Offline mode'}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="px-3 py-1.5 bg-gradient-to-r from-neon-green/10 to-neon-blue/10 text-neon-green rounded-lg border border-neon-green/20">
                    {aiMode === 'online' ? '🌐 Real-time Search' :
                     aiMode === 'hybrid' ? '🔌 Hybrid AI' : '💻 Local Processing'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Web Search Panel */}
        {showWebSearch && (
          <div className="w-1/3 border-l border-neon-green/20">
            <WebSearch 
              onSearchResult={handleSearchResult}
              onModeChange={setAiMode}
            />
          </div>
        )}
      </div>
    </div>
  );
}
