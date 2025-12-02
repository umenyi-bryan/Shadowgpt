#!/bin/bash

# ShadowGPT v6.0 Installation Script
# Created by bedusec

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

# Create project directory
echo "📁 Setting up project structure..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create necessary directories
mkdir -p app/components app/utils app/api

echo "✅ Project structure created"

# Set permissions
chmod +x install.sh

echo ""
echo "🎉 Installation Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Start the development server:"
echo "   \033[1;32mnpm run dev\033[0m"
echo ""
echo "2. Open your browser and navigate to:"
echo "   \033[1;32mhttp://localhost:3000\033[0m"
echo ""
echo "3. For production build:"
echo "   \033[1;32mnpm run build && npm start\033[0m"
echo ""
echo "🔐 Remember to use ethically and responsibly!"
echo ""
