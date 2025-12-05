'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, Network, Database, Server, Shield, Zap, Brain } from 'lucide-react';

export default function AdvancedTerminal() {
  const [logs, setLogs] = useState([]);
  const [command, setCommand] = useState('');
  const terminalRef = useRef(null);

  useEffect(() => {
    // Initial logs
    const initialLogs = [
      { time: '12:00:01', type: 'system', message: 'BEDUSEC AI NEXUS v2.0 initialized', color: 'text-neon-green' },
      { time: '12:00:02', type: 'neural', message: 'Neural network calibration complete', color: 'text-neon-blue' },
      { time: '12:00:03', type: 'security', message: 'Threat intelligence database loaded', color: 'text-neon-purple' },
      { time: '12:00:04', type: 'learning', message: 'Self-learning algorithms active', color: 'text-neon-yellow' },
      { time: '12:00:05', type: 'network', message: 'Secure connection established', color: 'text-neon-green' },
    ];
    setLogs(initialLogs);

    // Simulate real-time logs
    const interval = setInterval(() => {
      const logTypes = [
        { type: 'neural', message: 'Neural pathway optimization in progress', color: 'text-neon-blue' },
        { type: 'security', message: 'Threat assessment: Low risk environment', color: 'text-neon-purple' },
        { type: 'learning', message: 'Processing new intelligence patterns', color: 'text-neon-yellow' },
        { type: 'system', message: 'Memory allocation optimized', color: 'text-neon-green' },
        { type: 'network', message: 'Data stream integrity verified', color: 'text-neon-pink' },
      ];
      
      const randomLog = logTypes[Math.floor(Math.random() * logTypes.length)];
      const newLog = {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        ...randomLog
      };
      
      setLogs(prev => [...prev.slice(-9), newLog]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Scroll to bottom
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = (e) => {
    if (e.key === 'Enter' && command.trim()) {
      const newLog = {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        type: 'command',
        message: `$ ${command}`,
        color: 'text-neon-green'
      };
      
      setLogs(prev => [...prev, newLog]);
      
      // Process command
      setTimeout(() => {
        const responses = {
          'status': { type: 'system', message: 'System Status: All systems operational. Neural activity: 92%. Threat level: Low.', color: 'text-neon-blue' },
          'neural': { type: 'neural', message: 'Neural Network: 1456 active pathways. Learning rate: 85%. Memory usage: 42%.', color: 'text-neon-purple' },
          'scan': { type: 'security', message: 'Security Scan: No threats detected. All protocols active. Firewall: Enabled.', color: 'text-neon-yellow' },
          'help': { type: 'system', message: 'Available commands: status, neural, scan, clear, version, protocols', color: 'text-neon-green' },
          'clear': { type: 'system', message: 'Terminal cleared.', color: 'text-neon-green' },
          'version': { type: 'system', message: 'BEDUSEC AI NEXUS v2.0 | NeuroEvolutionary Platform', color: 'text-neon-pink' },
          'protocols': { type: 'security', message: 'Active Protocols: Neural Defense, Threat Prediction, Intelligence Gathering, Self-Learning', color: 'text-neon-blue' },
        };
        
        const cmd = command.toLowerCase().trim();
        const response = responses[cmd] || { 
          type: 'error', 
          message: `Unknown command: ${cmd}. Type 'help' for available commands.`, 
          color: 'text-red-400' 
        };
        
        const responseLog = {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          ...response
        };
        
        setLogs(prev => [...prev, responseLog]);
        
        if (cmd === 'clear') {
          setTimeout(() => setLogs([]), 100);
        }
      }, 500);
      
      setCommand('');
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'neural': return <Brain size={12} />;
      case 'security': return <Shield size={12} />;
      case 'learning': return <Zap size={12} />;
      case 'network': return <Network size={12} />;
      case 'system': return <Server size={12} />;
      case 'database': return <Database size={12} />;
      default: return <Terminal size={12} />;
    }
  };

  return (
    <div className="bg-dark-400/50 backdrop-blur-lg rounded-xl border border-neon-green/20 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neon-green/20 bg-dark-500/50">
        <div className="flex items-center gap-2">
          <Terminal className="text-neon-green" size={18} />
          <span className="text-neon-green font-bold">BEDUSEC TERMINAL</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse delay-150"></div>
            <div className="w-2 h-2 rounded-full bg-neon-purple animate-pulse delay-300"></div>
          </div>
        </div>
        <div className="text-xs text-neon-green/70">
          Real-time System Monitor
        </div>
      </div>
      
      <div ref={terminalRef} className="h-48 overflow-y-auto p-4 font-mono text-sm">
        {logs.map((log, index) => (
          <div key={index} className="mb-1 flex items-start gap-2">
            <span className="text-neon-green/60 text-xs mt-0.5">[{log.time}]</span>
            <span className="text-neon-green/80 mt-0.5">
              {getIcon(log.type)}
            </span>
            <span className={log.color}>
              {log.message}
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <span className="text-neon-green">$</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyPress={handleCommand}
            className="flex-1 bg-transparent border-none outline-none text-neon-green font-mono"
            placeholder="Type command..."
            autoFocus
          />
          <span className="text-neon-green/60 text-xs">Press Enter</span>
        </div>
      </div>
      
      <div className="px-4 py-2 border-t border-neon-green/20 bg-dark-500/30 flex justify-between text-xs">
        <div className="flex gap-4">
          <span className="text-neon-green/70 flex items-center gap-1">
            <Cpu size={10} /> Neural: 92%
          </span>
          <span className="text-neon-blue/70 flex items-center gap-1">
            <Database size={10} /> Memory: 42%
          </span>
          <span className="text-neon-purple/70 flex items-center gap-1">
            <Network size={10} /> Network: Stable
          </span>
        </div>
        <span className="text-neon-green/70">Connected to BEDUSEC AI NEXUS</span>
      </div>
    </div>
  );
}
