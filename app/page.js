'use client';
import { useState } from 'react';
import MatrixRain from './components/MatrixRain';
import Terminal from './components/Terminal';
import ToolsDashboard from './components/ToolsDashboard';
import HybridChat from './components/HybridChat';
import CodeBlock from './components/CodeBlock';

// Import icons safely
import { 
  Shield, 
  Cpu, 
  Terminal as TerminalIcon, 
  MessageSquare, 
  Code as CodeIcon, 
  Zap, 
  CpuChip, 
  Lock, 
  Network, 
  Bug, 
  Key, 
  Brain, 
  DollarSign, 
  Cloud, 
  Wifi, 
  WifiOff, 
  Globe, 
  Download, 
  Search, 
  RefreshCw 
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('chat');

  const tabs = [
    { id: 'chat', label: 'Hybrid AI', icon: <Globe size={18} />, color: 'text-neon-green', badge: 'ONLINE+OFFLINE' },
    { id: 'terminal', label: 'Terminal', icon: <TerminalIcon size={18} />, color: 'text-neon-blue' },
    { id: 'tools', label: 'Tools', icon: <Network size={18} />, color: 'text-neon-purple' },
    { id: 'code', label: 'Code Library', icon: <CodeIcon size={18} />, color: 'text-neon-red' },
  ];

  // Simplified features for now
  const hybridFeatures = [
    {
      icon: <Wifi size={24} />,
      title: 'Online Mode',
      description: 'Fetches real-time information from the web',
      color: 'from-neon-blue to-neon-green'
    },
    {
      icon: <CpuChip size={24} />,
      title: 'Offline Mode',
      description: 'Works completely without internet',
      color: 'from-neon-purple to-neon-blue'
    },
    {
      icon: <Brain size={24} />,
      title: 'Hybrid Intelligence',
      description: 'Smart switching between online/offline',
      color: 'from-neon-green to-neon-purple'
    },
    {
      icon: <Search size={24} />,
      title: 'Web Search',
      description: 'Built-in search interface',
      color: 'from-neon-red to-neon-green'
    }
  ];

  return (
    <>
      <MatrixRain />
      
      <div className="min-h-screen p-4 md:p-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-neon-green animate-glow">
                ShadowGPT <span className="text-neon-purple">v6.0</span>
                <span className="ml-3 text-sm px-3 py-1 bg-gradient-to-r from-neon-green to-neon-blue rounded-full">
                  🌐 HYBRID AI
                </span>
              </h1>
              <p className="text-neon-green/70 mt-2">Online + Offline Intelligence • Real-time Web Search • 100% Free</p>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-xs px-2 py-1 bg-neon-green/20 text-neon-green rounded">by bedusec</span>
                <span className="text-xs px-2 py-1 bg-neon-purple/20 text-neon-purple rounded">Hybrid AI</span>
                <span className="text-xs px-2 py-1 bg-neon-blue/20 text-neon-blue rounded">Web Search</span>
                <span className="text-xs px-2 py-1 bg-neon-red/20 text-neon-red rounded">Real-time</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <div className="text-sm text-neon-green/70">Status</div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse"></div>
                  <span className="text-sm text-neon-green font-bold">ACTIVE</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-neon-green/20 to-neon-blue/20 rounded-xl border border-neon-green/30">
                <Globe className="text-neon-green" size={28} />
              </div>
            </div>
          </div>
        </header>

        {/* Features Banner */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {hybridFeatures.map((feature, index) => (
            <div key={index} className="bg-gradient-to-br from-dark-300 to-dark-400 border border-neon-green/20 rounded-xl p-5">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color}/20 w-fit mb-3`}>
                <div className="text-neon-green">{feature.icon}</div>
              </div>
              <h3 className="font-bold text-lg text-neon-green mb-2">{feature.title}</h3>
              <p className="text-sm text-neon-green/70">{feature.description}</p>
            </div>
          ))}
        </div>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="flex border-b border-neon-green/30 bg-dark-300/50 rounded-t-xl p-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-all relative rounded-lg mx-1 flex-1 justify-center ${
                    activeTab === tab.id
                      ? `${tab.color} bg-gradient-to-r from-dark-400 to-dark-500 font-bold`
                      : 'text-neon-green/60 hover:text-neon-green hover:bg-dark-400/50'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {tab.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-gradient-to-r from-neon-green to-neon-blue text-dark-200 rounded">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Active Tab Content */}
            <div className="bg-gradient-to-b from-dark-200 to-dark-300 border border-neon-green/30 rounded-xl overflow-hidden h-[600px]">
              {activeTab === 'chat' && <HybridChat />}
              {activeTab === 'terminal' && <Terminal />}
              {activeTab === 'tools' && (
                <div className="p-4 h-full overflow-y-auto">
                  <ToolsDashboard />
                </div>
              )}
              {activeTab === 'code' && (
                <div className="p-4 h-full overflow-y-auto">
                  <h3 className="text-lg font-bold text-neon-green mb-4 flex items-center gap-2">
                    <CodeIcon size={20} />
                    Code Library
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-dark-300/50 border border-neon-green/20 rounded-xl p-4">
                      <h4 className="font-bold text-neon-green mb-2">Python Security Script</h4>
                      <CodeBlock code={`import socket
import threading

def port_scanner(target, start_port, end_port):
    """Simple port scanner for educational purposes"""
    print(f"Scanning {target}...")
    
    def scan_port(port):
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(1)
            result = sock.connect_ex((target, port))
            if result == 0:
                print(f"Port {port}: OPEN")
            sock.close()
        except:
            pass
    
    # Scan ports
    for port in range(start_port, end_port + 1):
        scan_port(port)
    
    print("Scan complete!")

# Example usage (for authorized testing only)
if __name__ == "__main__":
    port_scanner("127.0.0.1", 1, 100)`} language="python" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Side Panel */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-gradient-to-b from-dark-200 to-dark-300 border border-neon-green/30 rounded-xl p-5">
              <h3 className="text-lg font-bold text-neon-green mb-4">⚡ Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-dark-400/50 rounded-lg">
                  <span className="text-sm">AI Mode</span>
                  <span className="text-xs px-2 py-1 bg-neon-green/20 text-neon-green rounded">Hybrid</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-dark-400/50 rounded-lg">
                  <span className="text-sm">Tools Available</span>
                  <span className="text-xs px-2 py-1 bg-neon-blue/20 text-neon-blue rounded">50+</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-dark-400/50 rounded-lg">
                  <span className="text-sm">Cost</span>
                  <span className="text-xs px-2 py-1 bg-neon-red/20 text-neon-red rounded">$0.00</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-b from-dark-200 to-dark-300 border border-neon-green/30 rounded-xl p-5">
              <h3 className="text-lg font-bold text-neon-green mb-4">🚀 Quick Start</h3>
              <div className="space-y-3">
                {[
                  'Ask: "Latest cybersecurity news"',
                  'Try: "How to use Nmap"',
                  'Ask: "Write Python security script"',
                  'Try: "Explain SQL injection"'
                ].map((cmd, index) => (
                  <div key={index} className="text-sm p-3 bg-dark-400/50 border border-neon-green/10 rounded-lg">
                    {cmd}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="text-center p-5 border border-neon-green/20 rounded-xl bg-gradient-to-b from-dark-300 to-dark-400">
              <div className="text-3xl mb-2">🔐</div>
              <p className="text-sm font-bold text-neon-green">ShadowGPT v6.0</p>
              <p className="text-xs text-neon-green/70 mt-1">Hybrid AI Cybersecurity Assistant</p>
              
              <div className="mt-4 pt-4 border-t border-neon-green/20">
                <p className="text-xs text-neon-green/50">
                  Ethical Use Required<br/>
                  Always obtain proper authorization
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  <span className="text-[10px] px-2 py-1 bg-neon-green/10 rounded">v6.0</span>
                  <span className="text-[10px] px-2 py-1 bg-neon-purple/10 rounded">Hybrid AI</span>
                  <span className="text-[10px] px-2 py-1 bg-neon-blue/10 rounded">Free</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Banner */}
        <div className="mt-8 p-4 bg-gradient-to-r from-neon-green/10 to-neon-blue/10 border border-neon-green/30 rounded-xl text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-3">
            <div className="text-neon-green font-bold">🚀 Ready to Explore Cybersecurity?</div>
            <div className="text-sm text-neon-green/70">
              Start chatting with your hybrid AI assistant!
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
