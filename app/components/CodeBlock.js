'use client';
import { useState } from 'react';

export default function CodeBlock({ code, language = 'bash' }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getLanguageLabel = () => {
    const labels = {
      bash: 'Bash',
      python: 'Python',
      javascript: 'JavaScript',
      sql: 'SQL',
      html: 'HTML',
      css: 'CSS'
    };
    return labels[language] || language;
  };

  return (
    <div className="relative bg-black border border-neon-green/30 rounded-lg mt-2">
      <div className="flex justify-between items-center px-4 py-2 bg-dark-300 border-b border-neon-green/20">
        <span className="text-xs text-neon-green/70 font-mono">{getLanguageLabel()}</span>
        <button
          onClick={copyToClipboard}
          className="text-xs bg-neon-green/20 text-neon-green px-2 py-1 rounded hover:bg-neon-green/30 transition-colors flex items-center space-x-1"
        >
          <span>{copied ? '✅' : '📋'}</span>
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-neon-green font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}
