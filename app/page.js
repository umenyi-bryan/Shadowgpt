'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Send, Bot, User, Globe, Wifi, WifiOff, Zap, Shield, Brain, Cpu,
  Search, RefreshCw, Download, Copy, Star, MessageSquare, Code,
  Terminal, Lock, ChevronRight, Sparkles, Network, Target,
  CpuCog, BrainCircuit, ShieldAlert, Radar, GitBranch, Infinity,
  Sparkle, ZapOff, Cloud, Server, Database, Cctv, Key, Eye
} from 'lucide-react';
import MatrixRain from './components/MatrixRain';
import AdvancedTerminal from './components/AdvancedTerminal';

// Initialize AI (in production, this would be a proper import)
const initializeAI = () => ({
  generateResponse: async (query, online = false) => {
    // Simulated AI response - in production, call your API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responses = [
      `🕵️‍♂️ **BEDUSEC Intelligence** | *Neural Analysis Complete*\n\n**Query:** "${query}"\n\n**Strategic Assessment:** This query activates multiple neural pathways in our cybersecurity framework. From a BEDUSEC perspective, we analyze threats through three dimensions: technical, tactical, and strategic.\n\n**Technical Breakdown:**\n• Attack Surface Analysis: Expanding digital perimeter\n• Vulnerability Correlation: Pattern matching active threats\n• Countermeasure Matrix: Layered defense protocols\n\n**Tactical Insight:**\nAdopting a proactive defense posture requires continuous monitoring and adaptive learning. The digital frontier demands vigilance and innovation.\n\n**BEDUSEC Protocol:** Always lurking, always securing.`,
      `🧠 **NeuroEvolutionary Response** | *v2.0 Activation*\n\nAnalyzing "${query}" through advanced neural networks...\n\n**Neural Pathways Activated:**\n• Cybersecurity Intelligence Network [92%]\n• Technology Assessment Grid [78%]\n• Strategic Prediction Engine [65%]\n\n**Insight:** The digital landscape evolves rapidly. BEDUSEC's approach combines cutting-edge technology with timeless security principles.`,
      `🌐 **Real-time Intelligence Integration**\n\nFetching current threat data...\n\n**Latest Security Updates:**\n• Zero-day vulnerabilities: 3 new disclosures\n• Attack patterns: Evolving social engineering tactics\n• Defense innovations: AI-powered threat detection rising\n\n**BEDUSEC Analysis:** Staying ahead requires constant learning and adaptation.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }
});

export default function Home() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `🕶️ **BEDUSEC AI NEXUS v2.0**\n\n*"Securing the digital frontier while lurking in darkness"*\n\nI am the advanced NeuroEvolutionary AI created by BEDUSEC. I combine deep cybersecurity expertise with human-like understanding and real-time intelligence.\n\n**Capabilities:**\n• Advanced threat analysis\n• Neural network predictions\n• Real-time intelligence\n• Strategic insights\n• Self-learning algorithms\n\nWhat would you like to explore today?`,
      sender: 'ai',
      timestamp: new Date(),
      mode: 'nexus',
      thinking: false
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('online');
  const [aiMode, setAiMode] = useState('nexus'); // nexus, strategic, technical, human
  const [thinkingProcess, setThinkingProcess] = useState('');
  const [showThinking, setShowThinking] = useState(true);
  const [neuralActivity, setNeuralActivity] = useState(72);
  const [securityThreatLevel, setSecurityThreatLevel] = useState('Low');
  const [learningCycles, setLearningCycles] = useState(0);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const ai = useRef(initializeAI());

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Neural activity simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setNeuralActivity(prev => {
        const change = Math.random() > 0.5 ? 5 : -5;
        return Math.max(50, Math.min(95, prev + change));
      });
      
      // Simulate threat level changes
      if (Math.random() > 0.8) {
        const levels = ['Low', 'Medium', 'High', 'Critical'];
        setSecurityThreatLevel(levels[Math.floor(Math.random() * 3)]);
      }
      
      // Increment learning cycles
      setLearningCycles(prev => prev + 1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Thinking animation
  useEffect(() => {
    if (isTyping) {
      const processes = [
        'Activating neural pathways...',
        'Analyzing threat vectors...',
        'Cross-referencing intelligence databases...',
        'Generating strategic insights...',
        'Applying BEDUSEC security protocols...',
        'Optimizing response patterns...',
        'Integrating real-time data...',
        'Finalizing neural analysis...'
      ];
      
      let index = 0;
      const interval = setInterval(() => {
        setThinkingProcess(processes[index % processes.length]);
        index++;
      }, 800);
      
      return () => clearInterval(interval);
    }
  }, [isTyping]);

  const checkConnection = async () => {
    try {
      setConnectionStatus('online');
    } catch (error) {
      setConnectionStatus('offline');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (customInput = null) => {
    const messageText = customInput || input;
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
      mode: 'user',
      thinking: false
    };

    setMessages(prev => [...prev, userMessage]);
    if (!customInput) setInput('');
    setIsTyping(true);
    setShowThinking(true);

    try {
      const forceOnline = aiMode === 'nexus' && connectionStatus === 'online';
      const aiResponse = await ai.current.generateResponse(messageText, forceOnline);
      
      const aiMessage = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        mode: aiMode,
        thinking: false
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Error:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: `**Neural Network Adjustment**\n\nAdapting to processing challenge...\n\n**Enhanced Response:**\nThe BEDUSEC AI is optimizing its neural pathways. Meanwhile, here's my analysis based on current intelligence:\n\nThis query touches on critical aspects of digital security. The evolving threat landscape requires continuous adaptation and innovative defense strategies.`,
        sender: 'ai',
        timestamp: new Date(),
        mode: 'adaptive',
        thinking: false
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setShowThinking(false);
      setThinkingProcess('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: `🔄 **Neural Reset Complete**\n\nBEDUSEC AI NEXUS v2.0 ready for new analysis.\n\n*"Securing the digital frontier while lurking in darkness"*\n\nWhat intelligence do you require?`,
        sender: 'ai',
        timestamp: new Date(),
        mode: 'nexus',
        thinking: false
      }
    ]);
  };

  const quickPrompts = [
    {
      category: '🔐 Cybersecurity Operations',
      prompts: [
        { text: 'Advanced persistent threat analysis and mitigation', icon: '🕵️‍♂️' },
        { text: 'Quantum-safe cryptography implementation guide', icon: '⚛️' },
        { text: 'Zero-day vulnerability detection and response', icon: '🎯' },
        { text: 'Dark web monitoring and threat intelligence', icon: '🌐' }
      ]
    },
    {
      category: '🧠 Neural Intelligence',
      prompts: [
        { text: 'NeuroEvolutionary AI self-learning patterns', icon: '🧬' },
        { text: 'Predictive threat modeling using neural networks', icon: '🔮' },
        { text: 'Behavioral analysis of cyber attack patterns', icon: '📊' },
        { text: 'AI-driven security automation strategies', icon: '⚡' }
      ]
    },
    {
      category: '🚀 Advanced Technology',
      prompts: [
        { text: 'Post-quantum cryptography algorithms', icon: '🔐' },
        { text: 'Blockchain security for decentralized systems', icon: '⛓️' },
        { text: 'AI-powered intrusion detection systems', icon: '🤖' },
        { text: 'Homomorphic encryption practical applications', icon: '🔒' }
      ]
    }
  ];

  const renderMessage = (message) => {
    const isUser = message.sender === 'user';
    const isSystem = message.sender === 'system';
    
    const modeConfig = {
      nexus: { 
        color: 'text-neon-purple', 
        bg: 'from-neon-purple/10 via-purple-900/20 to-neon-blue/10',
        border: 'border-neon-purple/30',
        icon: <BrainCircuit size={16} />,
        label: 'NEXUS AI'
      },
      strategic: { 
        color: 'text-neon-green', 
        bg: 'from-neon-green/10 via-green-900/20 to-emerald-900/10',
        border: 'border-neon-green/30',
        icon: <Target size={16} />,
        label: 'STRATEGIC'
      },
      technical: { 
        color: 'text-neon-blue', 
        bg: 'from-neon-blue/10 via-blue-900/20 to-cyan-900/10',
        border: 'border-neon-blue/30',
        icon: <Terminal size={16} />,
        label: 'TECHNICAL'
      },
      human: { 
        color: 'text-neon-yellow', 
        bg: 'from-yellow-900/10 via-amber-900/20 to-orange-900/10',
        border: 'border-neon-yellow/30',
        icon: <Brain size={16} />,
        label: 'HUMAN-LIKE'
      },
      adaptive: { 
        color: 'text-neon-pink', 
        bg: 'from-pink-900/10 via-rose-900/20 to-red-900/10',
        border: 'border-neon-pink/30',
        icon: <GitBranch size={16} />,
        label: 'ADAPTIVE'
      },
      user: { 
        color: 'text-blue-400', 
        bg: 'from-blue-900/20 via-sky-900/20 to-cyan-900/20',
        border: 'border-blue-400/30',
        icon: <User size={16} />,
        label: 'USER'
      }
    };
    
    const config = modeConfig[message.mode] || modeConfig.nexus;
    
    return (
      <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fadeIn`}>
        <div className={`max-w-[90%] rounded-2xl p-4 bg-gradient-to-r ${config.bg} border ${config.border} backdrop-blur-lg shadow-lg shadow-${config.color.replace('text-', '')}/10`}>
          {/* Message Header */}
          <div className="flex items-center gap-2 mb-3">
            <div className={`p-2 rounded-lg ${config.color.replace('text', 'bg')}/20 border ${config.border}`}>
              {config.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={`text-sm font-bold ${config.color}`}>
                  {isUser ? 'You' : 'BEDUSEC AI'}
                </span>
                {!isUser && (
                  <span className={`text-xs px-2 py-1 rounded-full ${config.color.replace('text', 'bg')}/20 ${config.color} border ${config.border}`}>
                    {config.label}
                  </span>
                )}
              </div>
              <div className="text-xs opacity-60">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="prose prose-invert max-w-none text-sm">
            {message.text.split('```').map((part, index) => {
              if (index % 2 === 1) {
                // Code block
                const lines = part.split('\n');
                const language = lines[0] || 'bash';
                const code = lines.slice(1).join('\n');

                return (
                  <div key={index} className="my-3">
                    <div className="flex justify-between items-center bg-black/50 px-3 py-2 rounded-t-lg border-b border-neon-green/30">
                      <span className="text-xs font-mono text-neon-green/70">{language}</span>
                      <button
                        onClick={() => navigator.clipboard.writeText(code)}
                        className="text-xs px-2 py-1 bg-neon-green/20 text-neon-green rounded hover:bg-neon-green/30 transition-colors flex items-center gap-1"
                      >
                        <Copy size={12} />
                        Copy
                      </button>
                    </div>
                    <pre className="bg-black/30 p-3 rounded-b-lg overflow-x-auto text-xs font-mono">
                      <code className="text-neon-green">{code}</code>
                    </pre>
                  </div>
                );
              }

              // Regular text with markdown
              return part.split('\n').map((line, lineIndex) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <h3 key={lineIndex} className="text-neon-green font-bold my-2">{line.replace(/\*\*/g, '')}</h3>;
                }
                if (line.startsWith('# ')) {
                  return <h2 key={lineIndex} className="text-xl font-bold text-neon-purple my-3">{line.substring(2)}</h2>;
                }
                if (line.startsWith('- ') || line.startsWith('• ')) {
                  return (
                    <div key={lineIndex} className="flex items-start my-1.5">
                      <span className="text-neon-green mr-2 mt-1">•</span>
                      <span>{line.substring(2)}</span>
                    </div>
                  );
                }
                if (line.trim() === '') {
                  return <br key={lineIndex} />;
                }
                return <p key={lineIndex} className="my-1.5">{line}</p>;
              });
            })}
          </div>
          
          {/* Message Footer */}
          {!isUser && (
            <div className="mt-3 pt-2 border-t border-neon-green/20 text-xs flex items-center justify-between">
              <span className="text-neon-green/60">
                {message.mode === 'nexus' ? '🧬 Neural Network Analysis' : '💡 Intelligence Processing'}
              </span>
              <span className="flex items-center gap-1">
                <Sparkle size={10} className="text-neon-yellow" />
                BEDUSEC v2.0
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-100 via-dark-200 to-dark-300 p-4 md:p-8">
      <MatrixRain />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-neon-green animate-pulse"></div>
                  <div className="absolute inset-0 rounded-full bg-neon-green animate-ping opacity-30"></div>
                </div>
                <span className="text-neon-green/70 text-sm">ACTIVE • SECURE • EVOLVING</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-3">
                <span className="text-gradient bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple">
                  BEDUSEC
                </span>
                <span className="text-white ml-2">AI</span>
                <span className="text-neon-purple ml-2">NEXUS</span>
              </h1>
              
              <p className="text-xl text-neon-green/80 mb-6 max-w-3xl">
                <Lock size={20} className="inline mr-2" />
                "Securing the digital frontier while lurking in darkness"
              </p>
            </div>
            
            {/* Status Panel */}
            <div className="bg-dark-400/50 backdrop-blur-lg rounded-2xl p-6 border border-neon-green/20 shadow-lg shadow-neon-green/10">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-neon-green">{neuralActivity}%</div>
                  <div className="text-xs text-neon-green/70">Neural Activity</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-neon-blue">{learningCycles}</div>
                  <div className="text-xs text-neon-blue/70">Learning Cycles</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${
                    securityThreatLevel === 'Critical' ? 'text-red-400' :
                    securityThreatLevel === 'High' ? 'text-orange-400' :
                    securityThreatLevel === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {securityThreatLevel}
                  </div>
                  <div className="text-xs opacity-70">Threat Level</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-neon-purple">v2.0</div>
                  <div className="text-xs text-neon-purple/70">NEXUS Core</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Feature Badges */}
          <div className="flex flex-wrap gap-3 mt-8">
            <div className="px-4 py-2 bg-gradient-to-r from-neon-green/10 to-neon-blue/10 text-neon-green rounded-full text-sm font-medium flex items-center gap-2 border border-neon-green/20">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              NeuroEvolutionary AI
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 text-neon-blue rounded-full text-sm font-medium flex items-center gap-2 border border-neon-blue/20">
              <div className="w-2 h-2 bg-neon-blue rounded-full animate-pulse"></div>
              Self-Learning Algorithms
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-neon-purple/10 to-neon-pink/10 text-neon-purple rounded-full text-sm font-medium flex items-center gap-2 border border-neon-purple/20">
              <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
              Real-time Intelligence
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-neon-pink/10 to-neon-yellow/10 text-neon-pink rounded-full text-sm font-medium flex items-center gap-2 border border-neon-pink/20">
              <div className="w-2 h-2 bg-neon-pink rounded-full animate-pulse"></div>
              Advanced Cybersecurity
            </div>
            <div className="px-4 py-2 bg-gradient-to-r from-neon-yellow/10 to-neon-green/10 text-neon-yellow rounded-full text-sm font-medium flex items-center gap-2 border border-neon-yellow/20">
              <div className="w-2 h-2 bg-neon-yellow rounded-full animate-pulse"></div>
              100% Open Intelligence
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Quick Access */}
          <div className="lg:w-80 space-y-6">
            {/* AI Mode Selector */}
            <div className="bg-dark-400/50 backdrop-blur-lg rounded-2xl p-5 border border-neon-green/20">
              <h3 className="text-lg font-bold text-neon-green mb-3 flex items-center gap-2">
                <BrainCircuit size={20} />
                AI Processing Mode
              </h3>
              <div className="space-y-2">
                {[
                  { id: 'nexus', label: 'NEXUS Intelligence', icon: <Network size={16} />, desc: 'Full neural activation' },
                  { id: 'strategic', label: 'Strategic Analysis', icon: <Target size={16} />, desc: 'Tactical insights' },
                  { id: 'technical', label: 'Technical Deep Dive', icon: <Terminal size={16} />, desc: 'Detailed specifications' },
                  { id: 'human', label: 'Human-like Interaction', icon: <Brain size={16} />, desc: 'Empathetic analysis' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setAiMode(mode.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      aiMode === mode.id
                        ? 'bg-gradient-to-r from-neon-green/20 to-neon-blue/20 border border-neon-green/30'
                        : 'bg-dark-300 hover:bg-dark-400 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded ${
                        aiMode === mode.id ? 'bg-neon-green/20 text-neon-green' : 'bg-dark-400 text-neon-green/60'
                      }`}>
                        {mode.icon}
                      </div>
                      <div>
                        <div className={`font-medium ${
                          aiMode === mode.id ? 'text-neon-green' : 'text-white'
                        }`}>
                          {mode.label}
                        </div>
                        <div className="text-xs opacity-60">{mode.desc}</div>
                      </div>
                      {aiMode === mode.id && (
                        <div className="ml-auto">
                          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="bg-dark-400/50 backdrop-blur-lg rounded-2xl p-5 border border-neon-blue/20">
              <h3 className="text-lg font-bold text-neon-blue mb-3 flex items-center gap-2">
                <Zap size={20} />
                Quick Intelligence
              </h3>
              <div className="space-y-3">
                {quickPrompts.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <div className="text-sm font-semibold text-neon-green mb-2">{section.category}</div>
                    <div className="space-y-2">
                      {section.prompts.map((prompt, promptIndex) => (
                        <button
                          key={promptIndex}
                          onClick={() => handleSend(prompt.text)}
                          className="w-full text-left p-3 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors group border border-transparent hover:border-neon-green/20"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span>{prompt.icon}</span>
                            <span className="text-xs opacity-60">Quick Access</span>
                          </div>
                          <div className="text-sm text-neon-green/90 group-hover:text-neon-green">
                            {prompt.text}
                          </div>
                          <ChevronRight
                            size={14}
                            className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-neon-green"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-dark-400/50 backdrop-blur-lg rounded-2xl p-5 border border-neon-purple/20">
              <h3 className="text-lg font-bold text-neon-purple mb-3 flex items-center gap-2">
                <Radar size={20} />
                System Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Neural Integrity</span>
                  <span className="text-neon-green font-bold">98%</span>
                </div>
                <div className="w-full bg-dark-300 rounded-full h-2">
                  <div className="bg-gradient-to-r from-neon-green to-neon-blue h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Learning Rate</span>
                  <span className="text-neon-blue font-bold">85%</span>
                </div>
                <div className="w-full bg-dark-300 rounded-full h-2">
                  <div className="bg-gradient-to-r from-neon-blue to-neon-purple h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Threat Intelligence</span>
                  <span className="text-neon-purple font-bold">Live</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Connection</span>
                  <span className={`flex items-center gap-1 ${
                    connectionStatus === 'online' ? 'text-neon-green' : 'text-neon-yellow'
                  }`}>
                    {connectionStatus === 'online' ? <Wifi size={14} /> : <WifiOff size={14} />}
                    {connectionStatus === 'online' ? 'Secure' : 'Offline'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            <div className="flex-1 flex flex-col bg-dark-400/30 backdrop-blur-lg rounded-2xl border border-neon-green/20 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-dark-400 to-dark-500 border-b border-neon-green/30 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse"></div>
                      <div className="absolute inset-0 rounded-full bg-neon-green animate-ping opacity-30"></div>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-neon-green flex items-center gap-2">
                        <BrainCircuit size={20} />
                        NeuroEvolutionary Intelligence
                      </h2>
                      <div className="text-sm text-neon-green/70 flex items-center gap-2">
                        <span className="flex items-center gap-1">
                          {connectionStatus === 'online' ? <Globe size={12} /> : <Server size={12} />}
                          {connectionStatus === 'online' ? 'ShadowGPT-eight.vercel.app' : 'Local Processing'}
                        </span>
                        •
                        <span>BEDUSEC Active</span>
                        •
                        <span className="text-neon-green">v2.0 NEXUS</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={clearChat}
                      className="p-2 rounded-lg bg-neon-purple/10 text-neon-purple hover:bg-neon-purple/20 transition-colors"
                      title="Clear neural memory"
                    >
                      <RefreshCw size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="max-w-4xl mx-auto">
                  {messages.map(renderMessage)}
                  
                  {/* Thinking Indicator */}
                  {isTyping && showThinking && (
                    <div className="flex justify-start mb-4">
                      <div className="max-w-[90%] rounded-2xl p-4 bg-gradient-to-r from-dark-400 to-dark-500 border border-neon-purple/30 backdrop-blur-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 rounded-lg bg-neon-purple/20">
                            <BrainCircuit size={14} className="text-neon-purple" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-neon-purple">
                                Neural Processing
                              </span>
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></div>
                                <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse delay-150"></div>
                                <div className="w-2 h-2 bg-neon-purple rounded-full animate-pulse delay-300"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-neon-purple/90">
                          {thinkingProcess}
                        </div>
                        <div className="mt-2 flex gap-1">
                          <div className="w-full bg-dark-300 rounded-full h-1">
                            <div className="bg-gradient-to-r from-neon-purple to-neon-blue h-1 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input Area */}
              <div className="border-t border-neon-green/20 bg-dark-300/30 p-4">
                <div className="max-w-4xl mx-auto">
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter your intelligence query... (BEDUSEC AI will analyze with neural networks)"
                        className="w-full bg-dark-400/50 border border-neon-green/30 rounded-xl px-4 py-3 text-sm text-neon-green placeholder-neon-green/50 focus:outline-none focus:border-neon-green focus:ring-1 focus:ring-neon-green/50 resize-none min-h-[60px] max-h-[120px] backdrop-blur-sm"
                        rows={3}
                      />
                      <div className="absolute right-2 bottom-2 flex gap-2">
                        <button
                          onClick={() => navigator.clipboard.writeText(input)}
                          disabled={!input}
                          className="p-1.5 rounded-lg bg-dark-300 hover:bg-dark-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Copy query"
                        >
                          <Copy size={14} className="text-neon-green/70" />
                        </button>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleSend()}
                      disabled={isTyping || !input.trim()}
                      className="self-end px-6 py-3 bg-gradient-to-r from-neon-green to-neon-blue text-dark-200 font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isTyping ? (
                        <>
                          <div className="w-4 h-4 border-2 border-dark-200 border-t-transparent rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Analyze
                        </>
                      )}
                    </button>
                  </div>
                  
                  {/* Status Bar */}
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${
                          connectionStatus === 'online' ? 'bg-neon-green' : 'bg-neon-yellow'
                        }`}></div>
                        <span className={connectionStatus === 'online' ? 'text-neon-green' : 'text-neon-yellow'}>
                          {connectionStatus === 'online' ? 'Online • Secure' : 'Offline • Local'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${
                          aiMode === 'nexus' ? 'bg-neon-purple' :
                          aiMode === 'strategic' ? 'bg-neon-green' :
                          aiMode === 'technical' ? 'bg-neon-blue' :
                          'bg-neon-yellow'
                        }`}></div>
                        <span className="text-neon-green/70">
                          Mode: {aiMode}
                        </span>
                      </div>
                      <div className="text-neon-green/70">
                        {messages.length} intelligence exchanges
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-neon-green/70">BEDUSEC AI NEXUS v2.0</span>
                      <span className="text-neon-green/30">•</span>
                      <span className="text-neon-green/70">shadowgpt-eight.vercel.app</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Terminal Panel */}
            <div className="mt-6">
              <AdvancedTerminal />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-neon-green/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-neon-green/60">
              <p className="flex items-center gap-2">
                <ShieldAlert size={14} />
                BEDUSEC AI NEXUS v2.0 • NeuroEvolutionary Intelligence Platform
              </p>
              <p className="mt-1">"Securing the digital frontier while lurking in darkness"</p>
            </div>
            <div className="flex gap-4">
              <a href="https://shadowgpt-eight.vercel.app" className="text-sm text-neon-green hover:text-neon-blue transition-colors">
                Live Platform
              </a>
              <a href="#" className="text-sm text-neon-green hover:text-neon-blue transition-colors">
                Documentation
              </a>
              <a href="#" className="text-sm text-neon-green hover:text-neon-blue transition-colors">
                BEDUSEC Protocol
              </a>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-neon-green/40">
            <p>© 2024 BEDUSEC • Advanced Cybersecurity Intelligence • Always ethical, always evolving</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
