'use client';
import { useState, useEffect, useRef } from 'react';
import { aiEngine } from '../utils/AIEngine';

export default function ChatInterface() {
  const [messages, setMessages] = useState([
    { id: 1, text: aiEngine.generateResponse('hello'), sender: 'ai', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse = aiEngine.generateResponse(input);
      
      const aiMessage = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 500 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    { label: 'Help with Nmap', query: 'How do I use Nmap for network scanning?' },
    { label: 'SQL Injection', query: 'Explain SQL injection with examples' },
    { label: 'Python Scanner', query: 'Show me Python code for port scanning' },
    { label: 'Security Tips', query: 'What are best practices for securing a server?' },
    { label: 'Metasploit Guide', query: 'How do I use Metasploit framework?' },
    { label: 'XSS Attacks', query: 'Explain Cross-Site Scripting attacks' }
  ];

  const handleQuickAction = (query) => {
    setInput(query);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-dark-300 border-b border-neon-green/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse"></div>
            <h2 className="text-xl font-bold text-neon-green">ShadowGPT v6.0</h2>
          </div>
          <div className="text-xs text-neon-green/70">
            Advanced Pentesting AI
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neon-green scrollbar-track-dark-300">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.sender === 'user'
                  ? 'bg-neon-green/20 border border-neon-green/30'
                  : 'bg-dark-300 border border-neon-green/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-medium ${
                  message.sender === 'user' ? 'text-neon-green' : 'text-neon-blue'
                }`}>
                  {message.sender === 'user' ? 'You' : 'ShadowGPT'}
                </span>
                <span className="text-xs text-neon-green/50">
                  {formatTime(message.timestamp)}
                </span>
              </div>
              <div className="whitespace-pre-line text-sm">
                {message.text}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-dark-300 border border-neon-green/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-neon-green animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-neon-green animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 rounded-full bg-neon-green animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="border-t border-neon-green/20 p-3">
        <div className="text-xs text-neon-green/70 mb-2">Quick Actions:</div>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.query)}
              className="px-3 py-1.5 bg-dark-300 border border-neon-green/20 rounded-lg text-xs hover:bg-neon-green/10 hover:border-neon-green/40 transition-colors"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-neon-green/20 p-4">
        <div className="flex space-x-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask me anything about cybersecurity, tools, or coding..."
            className="flex-1 bg-dark-300 border border-neon-green/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-neon-green resize-none"
            rows="2"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-6 bg-neon-green text-dark-200 rounded-lg font-medium hover:bg-neon-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed self-end"
          >
            Send
          </button>
        </div>
        <div className="text-xs text-neon-green/50 mt-2">
          Press Enter to send • Shift+Enter for new line • Ask about tools, security, or code
        </div>
      </div>
    </div>
  );
}
