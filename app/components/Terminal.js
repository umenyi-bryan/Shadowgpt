'use client';
import { useState, useEffect, useRef } from 'react';

const terminalCommands = {
  'help': 'Available commands: scan, exploit, recon, tools, clear, help, status, users',
  'scan': 'Starting network reconnaissance...\n• Port scanning initialized\n• Service detection active\n• Vulnerability assessment running',
  'exploit': 'Exploitation framework loaded:\n• Metasploit modules: READY\n• Payload generation: ACTIVE\n• Post-exploitation: STANDBY',
  'recon': 'Reconnaissance protocols:\n• WHOIS lookup\n• DNS enumeration\n• Subdomain discovery\n• Port scanning',
  'tools': 'Available tools:\n• Nmap - Network scanning\n• Metasploit - Exploitation\n• Burp Suite - Web app testing\n• Wireshark - Packet analysis\n• John the Ripper - Password cracking',
  'status': 'System Status:\n• AI Engine: OPERATIONAL\n• Knowledge Base: LOADED\n• Security Protocols: ACTIVE\n• Network: SECURE',
  'users': 'Connected Users:\n• bedusec (ADMIN)\n• shadowgpt (AI)\n• system (SERVICE)',
  'clear': 'Terminal cleared'
};

export default function Terminal() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState(['ShadowGPT Terminal v6.0 - Type "help" for commands']);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef(null);

  const executeCommand = (cmd) => {
    const newOutput = [...output, `$ ${cmd}`];
    
    if (cmd === 'clear') {
      setOutput(['Terminal cleared']);
      return;
    }
    
    if (terminalCommands[cmd.toLowerCase()]) {
      newOutput.push(terminalCommands[cmd.toLowerCase()]);
    } else if (cmd.trim()) {
      newOutput.push(`Command not found: ${cmd}. Type "help" for available commands.`);
    }
    
    setOutput(newOutput);
    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      executeCommand(command);
      setCommand('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : 0;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setCommand('');
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="bg-black border-2 border-neon-green rounded-lg p-4 font-mono text-sm h-96">
      <div ref={terminalRef} className="overflow-y-auto h-80 mb-2 pr-2 scrollbar-thin scrollbar-thumb-neon-green scrollbar-track-dark-300">
        {output.map((line, index) => (
          <div key={index} className="text-neon-green mb-1">
            {line.split('\n').map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center border-t border-neon-green/30 pt-2">
        <span className="text-neon-green mr-2 animate-pulse">$</span>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyPress}
          className="bg-transparent text-neon-green outline-none flex-1 caret-neon-green"
          placeholder="Type a command..."
          autoFocus
        />
      </div>
    </div>
  );
}
