'use client';
import { useState } from 'react';
import MatrixRain from './components/MatrixRain';
import Terminal from './components/Terminal';
import ToolsDashboard from './components/ToolsDashboard';
import HybridChat from './components/HybridChat';
import CodeBlock from './components/CodeBlock';
import { Shield, Cpu, Terminal as TerminalIcon, MessageSquare, Code, Zap, CpuChip, Lock, Network, Bug, Key, Brain, DollarSign, Cloud, Wifi, WifiOff, Globe, Download, Search, RefreshCw } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('chat');

  const tabs = [
    { id: 'chat', label: 'Hybrid AI', icon: <Globe size={18} />, color: 'text-neon-green', badge: 'ONLINE+OFFLINE' },
    { id: 'terminal', label: 'Terminal', icon: <TerminalIcon size={18} />, color: 'text-neon-blue' },
    { id: 'tools', label: 'Tools', icon: <Network size={18} />, color: 'text-neon-purple' },
    { id: 'code', label: 'Code Library', icon: <Code size={18} />, color: 'text-neon-red' },
  ];

  const hybridFeatures = [
    {
      icon: <Wifi size={24} />,
      title: 'Online Mode',
      description: 'Fetches real-time information from the web',
      capabilities: ['Live search', 'Current news', 'Wikipedia access', 'API integration'],
      color: 'from-neon-blue to-neon-green'
    },
    {
      icon: <CpuChip size={24} />,
      title: 'Offline Mode',
      description: 'Works completely without internet',
      capabilities: ['Local AI processing', 'No API needed', '100% private', 'Instant responses'],
      color: 'from-neon-purple to-neon-blue'
    },
    {
      icon: <Brain size={24} />,
      title: 'Hybrid Intelligence',
      description: 'Smart switching between online/offline',
      capabilities: ['Context-aware', 'Fallback handling', 'Resource optimization', 'Smart caching'],
      color: 'from-neon-green to-neon-purple'
    },
    {
      icon: <Search size={24} />,
      title: 'Web Search',
      description: 'Built-in search interface',
      capabilities: ['Multiple sources', 'Privacy-focused', 'No API keys', 'Free access'],
      color: 'from-neon-red to-neon-green'
    }
  ];

  const onlineSources = [
    {
      name: 'DuckDuckGo',
      description: 'Privacy-focused search engine',
      icon: '🦆',
      status: 'Free API',
      uses: ['Instant answers', 'Web search', 'Privacy protection']
    },
    {
      name: 'Wikipedia',
      description: 'Free encyclopedia',
      icon: '📚',
      status: 'Free API',
      uses: ['Detailed articles', 'References', 'Multilingual']
    },
    {
      name: 'Hacker News',
      description: 'Tech & security news',
      icon: '⚡',
      status: 'Free API',
      uses: ['Latest news', 'Tech trends', 'Security updates']
    },
    {
      name: 'Exploit-DB',
      description: 'Security vulnerabilities',
      icon: '🔓',
      status: 'Web access',
      uses: ['Exploit database', 'CVE details', 'Security research']
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
                <span className="text-xs px-2 py-1 bg-gradient-to-r from-neon-green to-neon-blue text-white rounded">Online + Offline</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <div className="text-sm text-neon-green/70">Connection Status</div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse"></div>
                  <span className="text-sm text-neon-green font-bold">HYBRID MODE ACTIVE</span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-r from-neon-green/20 to-neon-blue/20 rounded-xl border border-neon-green/30">
                <Globe className="text-neon-green" size={28} />
              </div>
            </div>
          </div>
        </header>

        {/* Hybrid Features Banner */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {hybridFeatures.map((feature, index) => (
            <div key={index} className="bg-gradient-to-br from-dark-300 to-dark-400 border border-neon-green/20 rounded-xl p-5 hover:border-neon-green transition-all hover:scale-[1.02]">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color}/20 w-fit mb-3`}>
                <div className="text-neon-green">{feature.icon}</div>
              </div>
              <h3 className="font-bold text-lg text-neon-green mb-2">{feature.title}</h3>
              <p className="text-sm text-neon-green/70 mb-3">{feature.description}</p>
              <div className="space-y-1">
                {feature.capabilities.map((cap, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-green"></div>
                    <span>{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Online Sources */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-neon-green mb-4 flex items-center gap-2">
            <Search size={20} />
            Free Online Sources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {onlineSources.map((source, index) => (
              <div key={index} className="bg-gradient-to-b from-dark-300 to-dark-400 border border-neon-green/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{source.icon}</span>
                  <div>
                    <div className="font-bold text-neon-green">{source.name}</div>
                    <div className="text-xs text-neon-green/60">{source.description}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs px-2 py-1 bg-neon-green/20 text-neon-green rounded">
                    {source.status}
                  </span>
                  <div className="text-xs text-neon-green/70">
                    Uses: {source.uses.join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                  {activeTab === tab.id && (
                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-neon-green rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Active Tab Content */}
            <div className="bg-gradient-to-b from-dark-200 to-dark-300 border border-neon-green/30 rounded-xl overflow-hidden h-[600px] shadow-2xl shadow-neon-green/5">
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
                    <Code size={20} />
                    Web Integration Examples
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-dark-300/50 border border-neon-green/20 rounded-xl p-4 backdrop-blur-sm">
                      <h4 className="font-bold text-neon-green mb-2">Fetch Online Data (JavaScript)</h4>
                      <p className="text-xs text-neon-green/70 mb-3">Example of fetching from free APIs</p>
                      <CodeBlock code={`// Fetch from DuckDuckGo API (free, no key)
async function searchDuckDuckGo(query) {
  try {
    const response = await fetch(
      \`https://api.duckduckgo.com/?q=\${encodeURIComponent(query)}&format=json&no_html=1\`
    );
    const data = await response.json();
    
    if (data.Abstract) {
      return {
        answer: data.Abstract,
        source: data.AbstractSource,
        url: data.AbstractURL
      };
    }
    return null;
  } catch (error) {
    console.error('Search failed:', error);
    return null;
  }
}

// Fetch from Wikipedia API
async function searchWikipedia(query) {
  const response = await fetch(
    \`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=\${query}&format=json&origin=*\`
  );
  const data = await response.json();
  return data.query.search[0];
}

// Example usage
const cyberSecurityInfo = await searchDuckDuckGo('latest cybersecurity threats');
console.log(cyberSecurityInfo);`} language="javascript" />
                    </div>
                    
                    <div className="bg-dark-300/50 border border-neon-blue/20 rounded-xl p-4 backdrop-blur-sm">
                      <h4 className="font-bold text-neon-blue mb-2">Hybrid Response System</h4>
                      <p className="text-xs text-neon-blue/70 mb-3">Smart switching between online/offline</p>
                      <CodeBlock code={`class HybridAI {
  constructor() {
    this.mode = 'hybrid'; // offline, hybrid, online
    this.cache = new Map();
  }
  
  async generateResponse(query) {
    // Check cache first
    if (this.cache.has(query)) {
      return this.cache.get(query);
    }
    
    // Determine if we need online info
    const needsOnline = this.requiresOnlineInfo(query);
    
    if (this.mode === 'online' || (this.mode === 'hybrid' && needsOnline)) {
      try {
        const onlineResponse = await this.fetchOnline(query);
        this.cache.set(query, onlineResponse);
        return onlineResponse;
      } catch (error) {
        // Fallback to offline
        console.log('Online failed, using offline:', error);
      }
    }
    
    // Use offline response
    const offlineResponse = this.generateOfflineResponse(query);
    this.cache.set(query, offlineResponse);
    return offlineResponse;
  }
  
  requiresOnlineInfo(query) {
    const onlineKeywords = ['latest', 'current', 'news', 'today', '2024'];
    return onlineKeywords.some(keyword => query.includes(keyword));
  }
  
  async fetchOnline(query) {
    // Try multiple free APIs
    const sources = [
      this.fetchDuckDuckGo,
      this.fetchWikipedia,
      this.fetchHackerNews
    ];
    
    for (const source of sources) {
      try {
        const result = await source(query);
        if (result) return result;
      } catch (error) {
        continue;
      }
    }
    throw new Error('All online sources failed');
  }
}`} language="javascript" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* How It Works */}
            <div className="bg-gradient-to-br from-dark-300 to-dark-400 border border-neon-green/20 rounded-xl p-5">
              <h3 className="text-lg font-bold text-neon-green mb-4">⚡ How Hybrid AI Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="text-neon-green font-bold">1. Query Analysis</div>
                  <div className="text-sm text-neon-green/70">Analyzes if query needs current information or can use local knowledge</div>
                </div>
                <div className="space-y-2">
                  <div className="text-neon-blue font-bold">2. Smart Routing</div>
                  <div className="text-sm text-neon-blue/70">Routes to online sources if needed, falls back to offline if unavailable</div>
                </div>
                <div className="space-y-2">
                  <div className="text-neon-purple font-bold">3. Response Generation</div>
                  <div className="text-sm text-neon-purple/70">Combines online data with local intelligence for comprehensive answers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Side Panel */}
          <div className="space-y-6">
            {/* Connection Status */}
            <div className="bg-gradient-to-b from-dark-200 to-dark-300 border border-neon-green/30 rounded-xl p-5">
              <h3 className="text-lg font-bold text-neon-green mb-4 flex items-center gap-2">
                <Wifi size={20} />
                Connection Status
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-dark-400/50 rounded-lg">
                  <span className="text-sm">Internet</span>
                  <span className="text-xs px-2 py-1 bg-neon-green/20 text-neon-green rounded">Checking...</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-dark-400/50 rounded-lg">
                  <span className="text-sm">Online Sources</span>
                  <span className="text-xs px-2 py-1 bg-neon-blue/20 text-neon-blue rounded">4 Available</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-dark-400/50 rounded-lg">
                  <span className="text-sm">Current Mode</span>
                  <span className="text-xs px-2 py-1 bg-neon-purple/20 text-neon-purple rounded">Hybrid</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-dark-400/50 rounded-lg">
                  <span className="text-sm">API Costs</span>
                  <span className="text-xs px-2 py-1 bg-neon-red/20 text-neon-red rounded">$0.00</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-b from-dark-200 to-dark-300 border border-neon-green/30 rounded-xl p-5">
              <h3 className="text-lg font-bold text-neon-green mb-4">⚡ Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-dark-400 border border-neon-green/20 rounded-xl hover:border-neon-green transition-colors flex flex-col items-center gap-2">
                  <Globe className="text-neon-green" size={22} />
                  <span className="text-xs">Online Search</span>
                </button>
                <button className="p-4 bg-dark-400 border border-neon-blue/20 rounded-xl hover:border-neon-blue transition-colors flex flex-col items-center gap-2">
                  <CpuChip className="text-neon-blue" size={22} />
                  <span className="text-xs">Offline Mode</span>
                </button>
                <button className="p-4 bg-dark-400 border border-neon-purple/20 rounded-xl hover:border-neon-purple transition-colors flex flex-col items-center gap-2">
                  <RefreshCw className="text-neon-purple" size={22} />
                  <span className="text-xs">Check Connection</span>
                </button>
                <button className="p-4 bg-dark-400 border border-neon-red/20 rounded-xl hover:border-neon-red transition-colors flex flex-col items-center gap-2">
                  <Download className="text-neon-red" size={22} />
                  <span className="text-xs">Clear Cache</span>
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-b from-dark-200 to-dark-300 border border-neon-green/30 rounded-xl p-5">
              <h3 className="text-lg font-bold text-neon-green mb-4">✨ Key Benefits</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-neon-green/20 rounded-lg">
                    <DollarSign size={16} className="text-neon-green" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neon-green">100% Free APIs</div>
                    <div className="text-xs text-neon-green/70">DuckDuckGo, Wikipedia, Hacker News - no keys needed</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-neon-blue/20 rounded-lg">
                    <Cloud size={16} className="text-neon-blue" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neon-blue">Works Anywhere</div>
                    <div className="text-xs text-neon-blue/70">Online when available, offline when not</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-neon-purple/20 rounded-lg">
                    <Lock size={16} className="text-neon-purple" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neon-purple">Privacy Focused</div>
                    <div className="text-xs text-neon-purple/70">No tracking, minimal data collection</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-neon-red/20 rounded-lg">
                    <Zap size={16} className="text-neon-red" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neon-red">Fast & Reliable</div>
                    <div className="text-xs text-neon-red/70">Smart caching and fallback systems</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center p-5 border border-neon-green/20 rounded-xl bg-gradient-to-b from-dark-300 to-dark-400">
              <div className="text-4xl mb-3">🌐</div>
              <p className="text-sm font-bold text-neon-green">Hybrid AI Assistant</p>
              <p className="text-xs text-neon-green/70 mt-1">Best of both worlds: online intelligence + offline reliability</p>
              
              <div className="mt-4 pt-4 border-t border-neon-green/20">
                <p className="text-xs text-neon-green/50">
                  🔐 <strong>Ethical Use Required</strong><br/>
                  Use web access responsibly and legally
                </p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  <span className="text-[10px] px-2 py-1 bg-neon-green/10 rounded">v6.0</span>
                  <span className="text-[10px] px-2 py-1 bg-neon-purple/10 rounded">Hybrid AI</span>
                  <span className="text-[10px] px-2 py-1 bg-neon-blue/10 rounded">Web Search</span>
                  <span className="text-[10px] px-2 py-1 bg-neon-red/10 rounded">Free APIs</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Banner */}
        <div className="mt-8 p-5 bg-gradient-to-r from-neon-green/10 to-neon-blue/10 border border-neon-green/30 rounded-xl text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="text-neon-green font-bold text-xl">🚀 Experience Hybrid Intelligence!</div>
            <div className="text-sm text-neon-green/70">
              Get real-time information when online, fall back to local AI when offline
            </div>
          </div>
          <div className="mt-3 text-xs text-neon-green/50">
            No API keys • No costs • Privacy focused • Always available
          </div>
        </div>
      </div>
    </>
  );
}
