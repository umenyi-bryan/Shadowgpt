'use client';
import { useState } from 'react';
import MatrixRain from './components/MatrixRain';
import Terminal from './components/Terminal';
import ToolsDashboard from './components/ToolsDashboard';
import ChatInterface from './components/ChatInterface';
import CodeBlock from './components/CodeBlock';
import { Shield, Cpu, Terminal as TerminalIcon, MessageSquare, Code, Zap } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('chat');

  const tabs = [
    { id: 'chat', label: 'AI Chat', icon: <MessageSquare size={18} /> },
    { id: 'terminal', label: 'Terminal', icon: <TerminalIcon size={18} /> },
    { id: 'tools', label: 'Tools', icon: <Cpu size={18} /> },
    { id: 'code', label: 'Code Library', icon: <Code size={18} /> },
  ];

  const codeExamples = [
    {
      title: 'Python Port Scanner',
      code: 'import socket\n\ndef scan_port(host, port):\n    try:\n        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\n        sock.settimeout(1)\n        result = sock.connect_ex((host, port))\n        sock.close()\n        return result == 0\n    except:\n        return False',
      language: 'python'
    },
    {
      title: 'Bash Automation',
      code: '#!/bin/bash\n\n# Security automation script\nTARGET="$1"\necho "Scanning $TARGET..."\nnmap -sS -sV -O $TARGET',
      language: 'bash'
    },
    {
      title: 'SQL Injection Test',
      code: "SELECT * FROM users WHERE username = '' OR '1'='1' AND password = '' OR '1'='1';",
      language: 'sql'
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
              </h1>
              <p className="text-neon-green/70 mt-2">Ultimate Multilingual Pentesting AI Platform</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs px-2 py-1 bg-neon-green/20 text-neon-green rounded">by bedusec</span>
                <span className="text-xs px-2 py-1 bg-neon-purple/20 text-neon-purple rounded">AI-Powered</span>
                <span className="text-xs px-2 py-1 bg-neon-blue/20 text-neon-blue rounded">Multilingual</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm text-neon-green/70">Status</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
                  <span className="text-sm text-neon-green">OPERATIONAL</span>
                </div>
              </div>
              <Shield className="text-neon-green" size={24} />
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Chat Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="flex border-b border-neon-green/30">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-neon-green border-b-2 border-neon-green'
                      : 'text-neon-green/60 hover:text-neon-green'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Active Tab Content */}
            <div className="bg-dark-200 border border-neon-green/30 rounded-xl overflow-hidden">
              {activeTab === 'chat' && <ChatInterface />}
              {activeTab === 'terminal' && <Terminal />}
              {activeTab === 'tools' && (
                <div className="p-4">
                  <ToolsDashboard />
                </div>
              )}
              {activeTab === 'code' && (
                <div className="p-4">
                  <h3 className="text-lg font-bold text-neon-green mb-4">Code Library</h3>
                  <div className="space-y-4">
                    {codeExamples.map((example, index) => (
                      <div key={index} className="bg-dark-300 border border-neon-green/20 rounded-lg p-4">
                        <h4 className="font-medium text-neon-green mb-2">{example.title}</h4>
                        <CodeBlock code={example.code} language={example.language} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-dark-300 border border-neon-green/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-neon-green">6</div>
                <div className="text-xs text-neon-green/70">Languages</div>
              </div>
              <div className="bg-dark-300 border border-neon-green/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-neon-purple">50+</div>
                <div className="text-xs text-neon-purple/70">Security Tools</div>
              </div>
              <div className="bg-dark-300 border border-neon-green/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-neon-blue">24/7</div>
                <div className="text-xs text-neon-blue/70">Availability</div>
              </div>
              <div className="bg-dark-300 border border-neon-green/20 rounded-lg p-4">
                <div className="text-2xl font-bold text-neon-red">v6.0</div>
                <div className="text-xs text-neon-red/70">Latest Version</div>
              </div>
            </div>
          </div>

          {/* Right Column - Side Panel */}
          <div className="space-y-6">
            {/* System Status */}
            <div className="bg-dark-200 border border-neon-green/30 rounded-xl p-4">
              <h3 className="text-lg font-bold text-neon-green mb-4 flex items-center gap-2">
                <Zap size={20} />
                System Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">AI Engine</span>
                  <span className="text-xs px-2 py-1 bg-neon-green/20 text-neon-green rounded">ACTIVE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Knowledge Base</span>
                  <span className="text-xs px-2 py-1 bg-neon-green/20 text-neon-green rounded">LOADED</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Security Protocols</span>
                  <span className="text-xs px-2 py-1 bg-neon-blue/20 text-neon-blue rounded">ENABLED</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Response Time</span>
                  <span className="text-xs text-neon-green">~0.5s</span>
                </div>
              </div>
            </div>

            {/* Quick Commands */}
            <div className="bg-dark-200 border border-neon-green/30 rounded-xl p-4">
              <h3 className="text-lg font-bold text-neon-green mb-4">Quick Commands</h3>
              <div className="space-y-2">
                {[
                  'help - Show available commands',
                  'scan - Start network reconnaissance',
                  'tools - List security tools',
                  'exploit - Load exploitation framework',
                  'status - Check system status',
                  'clear - Clear terminal'
                ].map((cmd, index) => (
                  <div key={index} className="text-sm font-mono text-neon-green/80 hover:text-neon-green cursor-pointer p-2 hover:bg-dark-300 rounded">
                    {cmd}
                  </div>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div className="bg-dark-200 border border-neon-green/30 rounded-xl p-4">
              <h3 className="text-lg font-bold text-neon-green mb-4">Languages</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { code: 'en', name: 'English', flag: '🇺🇸' },
                  { code: 'fr', name: 'Français', flag: '🇫🇷' },
                  { code: 'es', name: 'Español', flag: '🇪🇸' },
                  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
                  { code: 'pidgin', name: 'Pidgin', flag: '🇳🇬' },
                  { code: 'zh', name: '中文', flag: '🇨🇳' }
                ].map((lang) => (
                  <button
                    key={lang.code}
                    className="flex items-center justify-center gap-2 p-2 bg-dark-300 border border-neon-green/20 rounded-lg hover:border-neon-green transition-colors"
                  >
                    <span>{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Note */}
            <div className="text-center text-xs text-neon-green/50 p-4">
              <p>ShadowGPT v6.0 • Ethical Use Only • Created by bedusec</p>
              <p className="mt-1">Always obtain proper authorization before security testing</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
