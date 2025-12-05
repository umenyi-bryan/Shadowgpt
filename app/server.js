const express = require('express');
const path = require('path');
const fs = require('fs');
const UltimateAIBrain = require('./utils/UltimateAIBrain');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Initialize AI
const ai = new UltimateAIBrain();

// API Routes
app.post('/api/chat', async (req, res) => {
  try {
    const { message, online = false } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    console.log(`🤖 Processing: "${message.substring(0, 50)}..."`);
    
    const response = await ai.generateResponse(message, online);
    
    res.json({
      success: true,
      message: response,
      timestamp: new Date().toISOString(),
      mode: online ? 'online' : 'enhanced'
    });
    
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process message',
      details: error.message
    });
  }
});

app.get('/api/stats', (req, res) => {
  res.json({
    conversationHistory: ai.conversationHistory.length,
    knowledgeCache: ai.knowledgeCache.size,
    lastOnlineCheck: ai.lastOnlineCheck,
    status: 'operational'
  });
});

app.post('/api/clear', (req, res) => {
  ai.conversationHistory = [];
  ai.knowledgeCache.clear();
  res.json({ success: true, message: 'AI memory cleared' });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    version: '6.0.0',
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// Serve HTML
app.get('*', (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ShadowGPT - Ultimate AI Assistant</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body {
        background: linear-gradient(135deg, #0a0a0f 0%, #151524 100%);
        min-height: 100vh;
        color: #fff;
      }
      .neon-text {
        text-shadow: 0 0 10px #00ff9d, 0 0 20px #00ff9d;
      }
      .gradient-border {
        border: 2px solid transparent;
        background: linear-gradient(#1a1a2e, #1a1a2e) padding-box,
                    linear-gradient(45deg, #00ff9d, #00d4ff) border-box;
      }
    </style>
  </head>
  <body class="font-mono">
    <div class="container mx-auto px-4 py-8">
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold mb-4 neon-text text-green-400">
          Shadow<span class="text-blue-400">GPT</span>
        </h1>
        <p class="text-xl text-gray-300 mb-6">Ultimate AI Assistant • Cybersecurity Expert • Real-time Intelligence</p>
        
        <div class="flex justify-center gap-4 flex-wrap mb-8">
          <span class="px-4 py-2 bg-green-900/30 text-green-400 rounded-full">AI-Powered</span>
          <span class="px-4 py-2 bg-blue-900/30 text-blue-400 rounded-full">Real-time Data</span>
          <span class="px-4 py-2 bg-purple-900/30 text-purple-400 rounded-full">Advanced Intelligence</span>
          <span class="px-4 py-2 bg-yellow-900/30 text-yellow-400 rounded-full">100% Free</span>
        </div>
      </div>

      <div class="max-w-4xl mx-auto">
        <div class="gradient-border rounded-2xl p-6 mb-6">
          <div id="chat" class="h-96 overflow-y-auto mb-4 p-4 bg-gray-900/50 rounded-lg">
            <div class="text-green-400 mb-4">
              <strong>🤖 ShadowGPT:</strong> Hello! I'm ShadowGPT, your ultimate AI assistant specializing in cybersecurity and technology. I can fetch real-time information when needed and have extensive knowledge about hacking, security, programming, and more. What would you like to explore today?
            </div>
          </div>
          
          <div class="flex gap-2">
            <input 
              type="text" 
              id="message" 
              placeholder="Ask me anything about cybersecurity, technology, or general knowledge..."
              class="flex-1 bg-gray-900/70 border border-green-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500"
              onkeypress="if(event.key === 'Enter') sendMessage()"
            >
            <button 
              onclick="sendMessage()"
              class="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg hover:opacity-90 transition"
            >
              Send
            </button>
          </div>
          
          <div class="mt-4 flex gap-2 justify-center">
            <button onclick="quickPrompt('Explain SQL injection with examples')" class="px-3 py-2 bg-gray-800 rounded text-sm">SQL Injection</button>
            <button onclick="quickPrompt('How to secure a Linux server')" class="px-3 py-2 bg-gray-800 rounded text-sm">Linux Security</button>
            <button onclick="quickPrompt('Latest cybersecurity threats')" class="px-3 py-2 bg-gray-800 rounded text-sm">Latest Threats</button>
            <button onclick="quickPrompt('Nmap scanning techniques')" class="px-3 py-2 bg-gray-800 rounded text-sm">Nmap Guide</button>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="gradient-border rounded-xl p-4">
            <h3 class="text-green-400 font-bold mb-2">🎯 Features</h3>
            <ul class="text-sm text-gray-300 space-y-1">
              <li>• Cybersecurity expertise</li>
              <li>• Real-time information</li>
              <li>• Advanced local AI</li>
              <li>• No API keys needed</li>
              <li>• 100% free & open source</li>
            </ul>
          </div>
          
          <div class="gradient-border rounded-xl p-4">
            <h3 class="text-blue-400 font-bold mb-2">⚡ Quick Commands</h3>
            <ul class="text-sm text-gray-300 space-y-1">
              <li><code>/online</code> - Toggle real-time mode</li>
              <li><code>/clear</code> - Clear conversation</li>
              <li><code>/stats</code> - Show AI statistics</li>
              <li><code>/help</code> - Show all commands</li>
            </ul>
          </div>
          
          <div class="gradient-border rounded-xl p-4">
            <h3 class="text-purple-400 font-bold mb-2">🔧 Technical</h3>
            <ul class="text-sm text-gray-300 space-y-1">
              <li>Version: 6.0.0</li>
              <li>Status: <span id="status" class="text-green-400">Operational</span></li>
              <li>Mode: <span id="mode" class="text-blue-400">Enhanced</span></li>
              <li>Messages: <span id="messageCount">0</span></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="mt-8 text-center text-gray-500 text-sm">
        <p>ShadowGPT v6.0 • Always use AI responsibly for ethical purposes only</p>
      </div>
    </div>

    <script>
      let messageCount = 0;
      let onlineMode = false;
      
      function addMessage(sender, text) {
        const chat = document.getElementById('chat');
        const messageDiv = document.createElement('div');
        messageDiv.className = `mb-4 ${sender === 'user' ? 'text-blue-400' : 'text-green-400'}`;
        messageDiv.innerHTML = `<strong>${sender === 'user' ? '👤 You' : '🤖 ShadowGPT'}:</strong> ${text}`;
        chat.appendChild(messageDiv);
        chat.scrollTop = chat.scrollHeight;
        messageCount++;
        document.getElementById('messageCount').textContent = messageCount;
      }
      
      async function sendMessage() {
        const input = document.getElementById('message');
        const message = input.value.trim();
        
        if (!message) return;
        
        addMessage('user', message);
        input.value = '';
        
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message, online: onlineMode })
          });
          
          const data = await response.json();
          
          if (data.success) {
            addMessage('ai', data.message);
            document.getElementById('mode').textContent = onlineMode ? 'Online' : 'Enhanced';
          } else {
            addMessage('ai', '**Error:** ' + data.error);
          }
        } catch (error) {
          addMessage('ai', '**Connection Error:** ' + error.message);
        }
      }
      
      function quickPrompt(prompt) {
        document.getElementById('message').value = prompt;
        sendMessage();
      }
      
      // Toggle online mode
      function toggleOnline() {
        onlineMode = !onlineMode;
        document.getElementById('mode').textContent = onlineMode ? 'Online' : 'Enhanced';
        document.getElementById('mode').className = onlineMode ? 'text-blue-400' : 'text-green-400';
        addMessage('system', `Switched to ${onlineMode ? 'online' : 'enhanced'} mode`);
      }
      
      // Clear chat
      function clearChat() {
        document.getElementById('chat').innerHTML = '';
        messageCount = 0;
        document.getElementById('messageCount').textContent = '0';
        addMessage('ai', 'Chat cleared. Ready for new conversation!');
      }
      
      // Initialize
      document.getElementById('message').focus();
    </script>
  </body>
  </html>
  `;
  
  res.send(html);
});

// Start server
app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════════════════════╗
  ║                                                          ║
  ║        ███████╗██╗  ██╗ █████╗ ██████╗ ██╗    ██╗       ║
  ║        ██╔════╝██║  ██║██╔══██╗██╔══██╗██║    ██║       ║
  ║        ███████╗███████║███████║██║  ██║██║ █╗ ██║       ║
  ║        ╚════██║██╔══██║██╔══██║██║  ██║██║███╗██║       ║
  ║        ███████║██║  ██║██║  ██║██████╔╝╚███╔███╔╝       ║
  ║        ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝  ╚══╝╚══╝        ║
  ║                                                          ║
  ║                  G P T   A S S I S T A N T              ║
  ║                                                          ║
  ╚══════════════════════════════════════════════════════════╝
  
  🌐 Server running on: http://localhost:${PORT}
  🤖 AI Status: Operational
  💻 Mode: Enhanced + Online available
  📊 Memory: Ready
  
  Commands:
  • Press Ctrl+C to stop
  • Visit http://localhost:${PORT} in your browser
  • API available at /api/chat
  `);
});
