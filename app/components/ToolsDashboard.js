'use client';
import { useState } from 'react';

const securityTools = [
  {
    id: 1,
    name: 'Network Scanner',
    description: 'Advanced port and service detection with OS fingerprinting',
    icon: '🔍',
    category: 'Reconnaissance',
    status: 'active',
    usage: 'nmap -sS -A target.com'
  },
  {
    id: 2,
    name: 'Vulnerability Analyzer',
    description: 'Automated vulnerability assessment and reporting',
    icon: '🛡️',
    category: 'Assessment',
    status: 'ready',
    usage: 'nessus start scan'
  },
  {
    id: 3,
    name: 'Web App Scanner',
    description: 'Comprehensive web application security testing',
    icon: '🌐',
    category: 'Web Security',
    status: 'active',
    usage: 'burpsuite scan target.com'
  },
  {
    id: 4,
    name: 'Password Cracker',
    description: 'Advanced password recovery and hash analysis',
    icon: '🔑',
    category: 'Cryptanalysis',
    status: 'standby',
    usage: 'john --wordlist=rockyou.txt hash'
  },
  {
    id: 5,
    name: 'Exploit Framework',
    description: 'Metasploit integration for exploit development',
    icon: '⚡',
    category: 'Exploitation',
    status: 'ready',
    usage: 'msfconsole -q'
  },
  {
    id: 6,
    name: 'Packet Analyzer',
    description: 'Network traffic analysis and protocol debugging',
    icon: '📡',
    category: 'Network',
    status: 'active',
    usage: 'wireshark -i eth0'
  },
  {
    id: 7,
    name: 'Social Engineering',
    description: 'Phishing simulation and awareness training',
    icon: '🎭',
    category: 'Human Security',
    status: 'ready',
    usage: 'setoolkit'
  },
  {
    id: 8,
    name: 'Forensics Toolkit',
    description: 'Digital forensics and incident response tools',
    icon: '🕵️',
    category: 'Forensics',
    status: 'standby',
    usage: 'autopsy case1'
  }
];

export default function ToolsDashboard() {
  const [activeTool, setActiveTool] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Reconnaissance', 'Assessment', 'Web Security', 'Cryptanalysis', 'Exploitation', 'Network', 'Human Security', 'Forensics'];

  const filteredTools = securityTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-neon-green/20 text-neon-green';
      case 'ready': return 'bg-neon-blue/20 text-neon-blue';
      case 'standby': return 'bg-neon-purple/20 text-neon-purple';
      default: return 'bg-dark-300 text-neon-green/60';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-dark-300 border border-neon-green/30 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-neon-green"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-neon-green text-dark-200'
                  : 'bg-dark-300 text-neon-green/60 hover:text-neon-green'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredTools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => setActiveTool(tool)}
            className="bg-dark-300 border border-neon-green/20 rounded-lg p-4 hover:border-neon-green transition-all duration-300 hover:scale-[1.02] cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-2xl group-hover:animate-pulse">{tool.icon}</div>
              <span className={`text-xs px-2 py-1 rounded ${getStatusColor(tool.status)}`}>
                {tool.status.toUpperCase()}
              </span>
            </div>
            <h4 className="font-bold text-neon-green mb-1">{tool.name}</h4>
            <p className="text-xs text-neon-green/70 mb-3">{tool.description}</p>
            <div className="text-xs text-neon-green/50 mb-2">{tool.category}</div>
            <code className="text-xs bg-black/50 p-2 rounded block overflow-x-auto font-mono">
              {tool.usage}
            </code>
          </div>
        ))}
      </div>

      {activeTool && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-200 border-2 border-neon-green rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-3xl">{activeTool.icon}</div>
                  <h3 className="text-xl font-bold text-neon-green">{activeTool.name}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded bg-dark-300 text-neon-green/70">
                    {activeTool.category}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(activeTool.status)}`}>
                    {activeTool.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setActiveTool(null)}
                className="text-neon-green hover:text-neon-red text-2xl"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-neon-green/70 text-sm mb-1">Description</h4>
                <p className="text-white">{activeTool.description}</p>
              </div>
              
              <div>
                <h4 className="text-neon-green/70 text-sm mb-1">Usage Command</h4>
                <code className="block bg-black/50 p-3 rounded text-sm font-mono">
                  {activeTool.usage}
                </code>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-neon-green/70 text-sm mb-1">Status</h4>
                  <p className="text-neon-green">{activeTool.status}</p>
                </div>
                <div>
                  <h4 className="text-neon-green/70 text-sm mb-1">Category</h4>
                  <p className="text-neon-green">{activeTool.category}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-neon-green/20">
                <h4 className="text-neon-green/70 text-sm mb-2">Quick Actions</h4>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-neon-green text-dark-200 rounded-lg text-sm font-medium hover:bg-neon-green/90 transition-colors">
                    Execute Tool
                  </button>
                  <button className="px-4 py-2 bg-dark-300 border border-neon-green/30 rounded-lg text-sm text-neon-green hover:bg-dark-400 transition-colors">
                    Generate Script
                  </button>
                  <button className="px-4 py-2 bg-dark-300 border border-neon-green/30 rounded-lg text-sm text-neon-green hover:bg-dark-400 transition-colors">
                    View Documentation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
