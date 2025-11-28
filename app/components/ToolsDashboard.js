'use client';
import { useState } from 'react';

const securityTools = [
  {
    name: 'Network Scanner',
    description: 'Advanced port and service detection',
    icon: '🔍',
    status: 'READY',
    command: 'nmap -sS -A target'
  },
  {
    name: 'Vulnerability Analyzer',
    description: 'Automated vulnerability assessment',
    icon: '🛡️',
    status: 'ACTIVE',
    command: 'nessus scan start'
  },
  {
    name: 'Web App Scanner',
    description: 'Comprehensive web application testing',
    icon: '🌐',
    status: 'READY',
    command: 'burpsuite scan'
  },
  {
    name: 'Password Cracker',
    description: 'Advanced password recovery tools',
    icon: '🔑',
    status: 'STANDBY',
    command: 'john --wordlist=passwords.txt hash'
  },
  {
    name: 'Exploit Framework',
    description: 'Metasploit integration',
    icon: '⚡',
    status: 'READY',
    command: 'msfconsole'
  },
  {
    name: 'Packet Analyzer',
    description: 'Network traffic analysis',
    icon: '📡',
    status: 'ACTIVE',
    command: 'wireshark -i eth0'
  }
];

export default function ToolsDashboard() {
  const [activeTool, setActiveTool] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {securityTools.map((tool, index) => (
        <div
          key={index}
          className="bg-dark-300 border border-neon-green/30 rounded-lg p-4 hover:border-neon-green transition-colors cursor-pointer"
          onClick={() => setActiveTool(tool)}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="text-2xl">{tool.icon}</div>
            <span className={`text-xs px-2 py-1 rounded ${
              tool.status === 'READY' ? 'bg-neon-green/20 text-neon-green' :
              tool.status === 'ACTIVE' ? 'bg-neon-blue/20 text-neon-blue' :
              'bg-neon-purple/20 text-neon-purple'
            }`}>
              {tool.status}
            </span>
          </div>
          <h4 className="font-bold text-neon-green mb-1">{tool.name}</h4>
          <p className="text-xs text-neon-green/70 mb-2">{tool.description}</p>
          <code className="text-xs bg-black/50 p-1 rounded block overflow-x-auto">
            {tool.command}
          </code>
        </div>
      ))}
      
      {activeTool && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-dark-200 border-2 border-neon-green rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-neon-green">{activeTool.name}</h3>
              <button 
                onClick={() => setActiveTool(null)}
                className="text-neon-green hover:text-neon-red"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-neon-green/70 text-sm">Description</label>
                <p className="text-white">{activeTool.description}</p>
              </div>
              <div>
                <label className="text-neon-green/70 text-sm">Status</label>
                <p className="text-neon-green">{activeTool.status}</p>
              </div>
              <div>
                <label className="text-neon-green/70 text-sm">Command</label>
                <code className="block bg-black/50 p-2 rounded text-sm mt-1">
                  {activeTool.command}
                </code>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
