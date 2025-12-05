#!/bin/bash

echo "🚀 Installing ShadowGPT - Ultimate AI Assistant"
echo "=============================================="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create necessary directories
mkdir -p app/sessions
mkdir -p app/exports

echo "🎉 Installation complete!"
echo ""
echo "To start ShadowGPT:"
echo "  CLI Mode:   npm start"
echo "  Web Mode:   node app/server.js"
echo "  Dev Mode:   npm run dev"
echo ""
echo "📖 Documentation: https://github.com/yourusername/shadowgpt"
echo "💬 Issues: https://github.com/yourusername/shadowgpt/issues"

# Make install script executable
chmod +x install.sh
