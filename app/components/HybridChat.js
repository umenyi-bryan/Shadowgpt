'use client';
import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Globe, Wifi, CpuChip } from 'lucide-react';

export default function HybridChat() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🛡️ **ShadowGPT v6.0 Activated**\n\nI'm your hybrid AI cybersecurity assistant!\n\n**Modes available:**\n• 🌐 Online: Fetch real-time information\n• 🔌 Offline: Work without internet\n• 🔄 Hybrid: Smart switching\n\n**Try asking:**\n\"Latest cybersecurity news\"\n\"How to use Nmap\"\n\"Write a Python port scanner\"",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let response = '';
      
      if (input.toLowerCase().includes('nmap') || input.toLowerCase().includes('scan')) {
        response = `**Nmap Scanning Guide** 🔍\n\nBasic commands:\n\n\`\`\`bash\nnmap -sS target.com\nnmap -sV -sC target.com\nnmap -O target.com\nnmap -A -T4 target.com\n\`\`\`\n\n**Remember:** Always scan only systems you own or have permission to test!`;
      } else if (input.toLowerCase().includes('python') || input.toLowerCase().includes('code')) {
        response = `**Python Security Script** 🐍\n\n\`\`\`python\nimport socket\n\ndef check_port(host, port):\n    try:\n        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n        sock.settimeout(1)\n        result = sock.connect_ex((host, port))\n        return result == 0\n    except:\n        return False\n\n# Usage\nif __name__ == "__main__":\n    target = "127.0.0.1"\n    for port in [22, 80, 443]:\n        if check_port(target, port):\n            print(f"Port {port} is open")\n\`\`\`\n\n**For authorized testing only!**`;
      } else if (input.toLowerCase().includes('news') || input.toLowerCase().includes('latest')) {
        response = `🌐 **Online Search Mode**\n\nFor real-time information like "${input}", I would:\n\n1. Search DuckDuckGo for current data\n2. Check Hacker News for tech updates\n3. Look up Wikipedia for detailed information\n\n**Try:** "Search for latest cybersecurity vulnerabilities"`;
      } else {
        response = `**I understand you're asking about:** "${input}"\n\nAs your cybersecurity AI, I can help with:\n\n• Security tools and techniques\n• Code writing and debugging\n• Vulnerability explanations\n• CTF challenge solutions\n• Security best practices\n\n**Could you be more specific about what you need help with?**`;
      }

      const aiMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-dark-100 to-dark-200 rounded-2xl border-2 border-neon-green/20 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-dark-300 to-dark-400 border-b border-neon-green/30 p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-5 h-5 rounded-full bg-neon-green animate-pulse"></div>
            <div className="absolute inset-0 rounded-full bg-neon-green animate-ping opacity-30"></div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-neon-green flex items-center gap-3">
              <Globe size={24} />
              Hybrid AI Assistant
            </h2>
            <div className="text-sm text-neon-green/70 flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1">
                <Wifi size={14} />
                Online + Offline
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-neon-green/15 to-neon-blue/15 border border-neon-green/30'
                    : 'bg-gradient-to-r from-dark-300/90 to-dark-400/90 border border-neon-purple/30'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`p-1.5 rounded-lg ${message.sender === 'user' ? 'bg-neon-green/20' : 'bg-neon-purple/20'}`}>
                    {message.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <span className={`text-sm font-medium ${message.sender === 'user' ? 'text-neon-green' : 'text-neon-purple'}`}>
                    {message.sender === 'user' ? 'You' : 'ShadowGPT'}
                  </span>
                </div>
                <div className="text-sm whitespace-pre-line">
                  {message.text}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-2xl p-4 bg-gradient-to-r from-dark-300/90 to-dark-400/90 border border-neon-purple/30">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-neon-purple/20">
                    <Bot size={14} />
                  </div>
                  <span className="text-sm font-medium text-neon-purple">ShadowGPT</span>
                </div>
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
      </div>

      {/* Input Area */}
      <div className="border-t border-neon-green/20 p-4 bg-gradient-to-t from-dark-300 to-dark-400">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about cybersecurity, tools, code, or search for information..."
            className="flex-1 bg-dark-200 border border-neon-green/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-neon-green resize-none min-h-[60px]"
            rows="2"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="self-end px-6 py-3 bg-gradient-to-r from-neon-green to-neon-blue text-dark-200 rounded-xl font-bold hover:opacity-90 transition-all disabled:opacity-30"
          >
            <Send size={20} />
          </button>
        </div>
        <div className="text-xs text-neon-green/50 mt-2 px-1">
          Press Enter to send • Try: "nmap guide", "python code", "latest news"
        </div>
      </div>
    </div>
  );
}
