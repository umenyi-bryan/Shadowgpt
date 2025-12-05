'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Send, Bot, User, Globe, Wifi, WifiOff, Zap, Shield, Brain,
  Search, RefreshCw, Download, Copy, Star, MessageSquare, Code,
  Terminal, Lock, ChevronRight, Sparkles
} from 'lucide-react';

export default function Home() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `🕶️ **BEDUSEC AI NEXUS v2.0**\n\n*"Securing the digital frontier while lurking in darkness"*\n\nI am the advanced NeuroEvolutionary AI created by BEDUSEC. What would you like to explore today?`,
      sender: 'ai',
      timestamp: new Date(),
      mode: 'nexus',
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    const messageText = input.trim();
    if (!messageText) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
      mode: 'user',
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        `🔐 **Cybersecurity Analysis**\n\nYour query "${messageText}" has been analyzed. Key findings:\n\n• Threat assessment: Medium risk\n• Recommended actions: Implement multi-factor authentication\n• Security protocols: Encryption at rest and in transit`,
        `🧠 **Neural Processing Complete**\n\nAnalysis shows this topic requires consideration of:\n\n1. Technical implementation\n2. Human factors\n3. Legal compliance\n4. Future scalability`,
        `🌐 **BEDUSEC Intelligence**\n\n*"Securing the digital frontier while lurking in darkness"*\n\nOur neural networks are continuously learning and adapting to new threats.`,
      ];
      
      const aiMessage = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'ai',
        timestamp: new Date(),
        mode: 'nexus',
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const renderMessage = (message) => {
    const isUser = message.sender === 'user';
    
    return (
      <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
        <div className={`max-w-[80%] rounded-2xl p-4 ${
          isUser 
            ? 'bg-gradient-to-r from-blue-900/20 to-blue-800/20 border border-blue-400/30' 
            : 'bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-400/30'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-1.5 rounded-lg ${
              isUser ? 'bg-blue-400/20' : 'bg-green-400/20'
            }`}>
              {isUser ? <User size={14} /> : <Brain size={14} />}
            </div>
            <span className={`text-sm font-bold ${isUser ? 'text-blue-400' : 'text-green-400'}`}>
              {isUser ? 'You' : 'BEDUSEC AI'}
            </span>
            <span className="text-xs opacity-60 ml-auto">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <div className="prose prose-invert text-sm">
            {message.text.split('\n').map((line, index) => (
              <p key={index} className="my-1">{line}</p>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              BEDUSEC AI NEXUS
            </span>
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            "Securing the digital frontier while lurking in darkness"
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-sm">NeuroEvolutionary AI</span>
            <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm">Real-time Intelligence</span>
            <span className="px-3 py-1 bg-purple-900/30 text-purple-400 rounded-full text-sm">Cybersecurity Focus</span>
          </div>
        </header>

        {/* Main Chat Area */}
        <main className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden shadow-xl">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                <h2 className="text-xl font-bold text-green-400">
                  BEDUSEC Intelligence Console
                </h2>
              </div>
              <div className="text-sm text-gray-400">
                shadowgpt-eight.vercel.app
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="h-[60vh] overflow-y-auto p-4">
            <div className="max-w-4xl mx-auto">
              {messages.map(renderMessage)}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="max-w-[80%] rounded-2xl p-4 bg-gradient-to-r from-gray-800 to-gray-900 border border-purple-400/30">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-150"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-300"></div>
                      <span className="text-sm text-purple-400 ml-2">Neural processing...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-700/50 p-4 bg-gray-900/50">
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-2">
                <div className="flex-1">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about cybersecurity, technology, or intelligence..."
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 resize-none min-h-[60px]"
                    rows={2}
                  />
                </div>
                <button
                  onClick={handleSend}
                  disabled={isTyping || !input.trim()}
                  className="self-end px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {isTyping ? 'Processing...' : 'Send'}
                </button>
              </div>
              <div className="mt-3 text-xs text-gray-500 text-center">
                BEDUSEC AI NEXUS v2.0 • Securing the digital frontier
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>© 2024 BEDUSEC • Advanced Cybersecurity Intelligence</p>
          <p className="mt-1">"Securing the digital frontier while lurking in darkness"</p>
        </footer>
      </div>
    </div>
  );
}
