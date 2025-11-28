'use client';
import { useState, useRef, useEffect } from 'react';
import MatrixRain from './components/MatrixRain';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

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
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { 
        role: 'assistant', 
        content: 'Error: Unable to connect to ShadowGPT. Please try again.',
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
    "Explain SQL injection",
    "How to use nmap",
    "Metasploit basics",
    "Burp Suite tutorial",
    "OWASP Top 10",
    "Web app pentesting",
    "Network security",
    "Cryptography basics"
  ];

  return (
    <div className="min-h-screen bg-dark-200 text-neon-green">
      <MatrixRain />
      
      {/* Header */}
      <header className="border-b border-neon-green/30 bg-dark-100/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-neon-green rounded-full glow"></div>
              <h1 className="text-2xl font-bold hacker-text">ShadowGPT</h1>
            </div>
            <div className="text-sm text-neon-green/70">
              Created by <span className="text-neon-green">bedusec</span>
            </div>
          </div>
          <p className="text-neon-green/60 text-sm mt-2">
            Advanced Pentesting AI Assistant - Use responsibly and ethically
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Quick Commands */}
        <div className="mb-6">
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

        {/* Chat Container */}
        <div className="cyber-border rounded-lg bg-dark-100/50 backdrop-blur-sm h-[500px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto terminal-scrollbar p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-neon-green/50 h-full flex items-center justify-center">
                <div>
                  <div className="text-4xl mb-4">🛡️</div>
                  <p className="text-lg mb-2">ShadowGPT Activated</p>
                  <p className="text-sm">Your advanced pentesting assistant is ready</p>
                  <p className="text-xs mt-4 text-neon-green/40">
                    Ask about penetration testing, ethical hacking, security tools, and more...
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
                    {message.role === 'user' ? 'YOU' : 'SHADOWGPT'}
                  </span>
                  {message.timestamp && (
                    <span className="text-xs text-neon-green/50">{message.timestamp}</span>
                  )}
                </div>
                <div className="text-sm whitespace-pre-wrap">{message.content}</div>
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
                  <span className="text-xs text-neon-purple">ShadowGPT is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-neon-green/20 p-4">
            <div className="flex space-x-3">
              <div className="flex-1">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about pentesting, ethical hacking, security tools..."
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
              Press Enter to send • Shift+Enter for new line
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-6 text-center text-neon-green/40 text-xs">
          <p>⚠️ For educational and authorized testing purposes only</p>
          <p className="mt-1">Created with ❤️ by bedusec • Use responsibly and ethically</p>
        </footer>
      </div>
    </div>
  );
}
