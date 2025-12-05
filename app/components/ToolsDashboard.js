'use client';
import { useState } from 'react';

export default function ToolsDashboard() {
  const [activeTool, setActiveTool] = useState(null);

  const tools = [
    { id: 1, name: 'Nmap', description: 'Network scanner', icon: '🔍', category: 'Recon' },
    { id: 2, name: 'Metasploit', description: 'Exploitation framework', icon: '⚡', category: 'Exploit' },
    { id: 3, name: 'Burp Suite', description: 'Web app testing', icon: '🌐', category: 'Web' },
    { id: 4, name: 'Wireshark', description: 'Packet analysis', icon: '📡', category: 'Network' },
    { id: 5, name: 'John the Ripper', description: 'Password cracker', icon: '🔑', category: 'Crypto' },
    { id: 6, name: 'SQLMap', description: 'SQL injection tool', icon: '💉', category: 'Web' },
  ];

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold text-neon-green mb-4">Security Tools</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <div
            key={tool.id}
            onClick={() => setActiveTool(tool)}
            className="bg-dark-300 border border-neon-green/20 rounded-lg p-4 hover:border-neon-green cursor-pointer"
          >
            <div className="text-2xl mb-2">{tool.icon}</div>
            <h4 className="font-bold text-neon-green">{tool.name}</h4>
            <p className="text-xs text-neon-green/70 mt-1">{tool.description}</p>
            <div className="text-xs mt-2 px-2 py-1 bg-dark-400 rounded w-fit">
              {tool.category}
            </div>
          </div>
        ))}
      </div>
      
      {activeTool && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-dark-200 border-2 border-neon-green rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-3xl">{activeTool.icon}</div>
                <h3 className="text-xl font-bold text-neon-green mt-2">{activeTool.name}</h3>
              </div>
              <button 
                onClick={() => setActiveTool(null)}
                className="text-neon-green hover:text-neon-red text-2xl"
              >
                ✕
              </button>
            </div>
            <p className="text-white mb-4">{activeTool.description}</p>
            <div className="text-sm text-neon-green/70 mb-4">Category: {activeTool.category}</div>
            <button className="w-full py-2 bg-neon-green text-dark-200 rounded-lg font-medium">
              View Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
