'use client';
import { useState, useEffect, useRef } from 'react';

export default function Terminal() {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState(['ShadowGPT Terminal v6.0 - Type "help" for commands']);
  const terminalRef = useRef(null);

  const commands = {
    'help': 'Available commands: scan, exploit, recon, tools, clear, help, status',
    'scan': 'Starting network reconnaissance...',
    'exploit': 'Exploitation framework loaded',
    'recon': 'Reconnaissance protocols active',
    'tools': 'Available tools: Nmap, Metasploit, Burp Suite, Wireshark',
    'status': 'System Status: OPERATIONAL',
    'clear': 'Terminal cleared'
  };

  const executeCommand = (cmd) => {
    const newOutput = [...output, `$ ${cmd}`];
    
    if (cmd === 'clear') {
      setOutput(['Terminal cleared']);
      return;
    }
    
    if (commands[cmd]) {
      newOutput.push(commands[cmd]);
    } else if (cmd.trim()) {
      newOutput.push(`Command not found: ${cmd}`);
    }
    
    setOutput(newOutput);
    setCommand('');
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="bg-black border-2 border-neon-green rounded-lg p-4 font-mono text-sm h-full">
      <div ref={terminalRef} className="overflow-y-auto h-[80%] mb-2 pr-2">
        {output.map((line, index) => (
          <div key={index} className="text-neon-green mb-1">{line}</div>
        ))}
      </div>
      <div className="flex items-center border-t border-neon-green/30 pt-2">
        <span className="text-neon-green mr-2 animate-pulse">$</span>
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && executeCommand(command)}
          className="bg-transparent text-neon-green outline-none flex-1"
          placeholder="Type a command..."
        />
      </div>
    </div>
  );
}
