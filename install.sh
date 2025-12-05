#!/bin/bash

# ShadowGPT v6.0 - Hybrid AI Installation
# Online + Offline Intelligence • Web Search • 100% Free

echo -e "\033[1;32m"
echo "   _____ _                 _ _____ _____ _____ "
echo "  / ____| |               | |  __ \_   _|_   _|"
echo " | (___ | |__   __ _ _ __ | | |__) || |   | |  "
echo "  \___ \| '_ \ / _\` | '_ \| |  ___/ | |   | |  "
echo "  ____) | | | | (_| | |_) | | |    _| |_ _| |_ "
echo " |_____/|_| |_|\__,_| .__/|_|_|   |_____|_____|"
echo "                    | |                         "
echo "                    |_|    v6.0 by bedusec      "
echo -e "\033[0m"

echo "🚀 Starting ShadowGPT v6.0 Installation..."
echo "🌐 HYBRID AI: Online + Offline Intelligence"
echo "🔍 WEB SEARCH: Real-time information fetching"
echo "💰 100% FREE: No API keys • No costs • Unlimited"

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "📦 Installing Node.js..."
    pkg install nodejs -y
fi

echo "✅ Node.js version: $(node --version)"

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    echo "📦 Installing npm..."
    pkg install npm -y
fi

echo "✅ npm version: $(npm --version)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Installation Complete!"
echo ""
echo "🎉 ShadowGPT v6.0 Hybrid AI is READY!"
echo ""
echo "✨ Hybrid Features:"
echo "   • 🌐 Online Mode: Fetches real-time web information"
echo "   • 💻 Offline Mode: Works without internet"
echo "   • 🔍 Web Search: Built-in search interface"
echo "   • 🔄 Smart Switching: Auto online/offline detection"
echo "   • 🆓 Free APIs: DuckDuckGo, Wikipedia, Hacker News"
echo "   • 🔐 Privacy: No tracking, minimal data collection"
echo ""
echo "🚀 To Start:"
echo "   1. Run: npm run dev"
echo "   2. Open: http://localhost:3000"
echo ""
echo "💬 Try These:"
echo "   • 'Latest cybersecurity news' (Online)"
echo "   • 'How to use Nmap' (Offline)"
echo "   • 'What is blockchain?' (Hybrid)"
echo "   • 'Search for Python security libraries' (Web Search)"
echo ""
echo "🔐 Remember: Use web access ethically and legally!"
echo ""
echo "🆓 Enjoy your FREE hybrid AI with web intelligence!"
echo "   Online when available • Offline when not • Always works"
