#!/bin/bash

# Innovation Screener Setup Script
echo "🚀 Setting up Innovation Screener..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "🔧 Creating environment file..."
    cp env.example .env.local
    echo "⚠️  Please add your Google Gemini API key to .env.local"
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p public/images
mkdir -p logs

# Build the project
echo "🔨 Building the project..."
npm run build

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Add your Google Gemini API key to .env.local"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "🚀 For production deployment:"
echo "1. Push your code to GitHub"
echo "2. Connect your repository to Vercel"
echo "3. Add your Gemini API key to Vercel environment variables"
echo "4. Deploy!"
