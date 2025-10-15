#!/bin/bash

echo "🚀 Setting up Free APIs for Innovation Screener"
echo "=============================================="

echo ""
echo "📋 Step 1: Google Custom Search API"
echo "1. Go to: https://console.cloud.google.com/"
echo "2. Create project: 'Innovation Screener'"
echo "3. Enable 'Custom Search API'"
echo "4. Create API key"
echo "5. Go to: https://cse.google.com/"
echo "6. Create search engine with 'Search the entire web'"
echo "7. Get your Search Engine ID (cx parameter)"
echo ""

echo "📋 Step 2: GitHub Token"
echo "1. Go to: https://github.com/settings/tokens"
echo "2. Generate new token (classic)"
echo "3. Select scopes: public_repo, read:user"
echo "4. Copy the token"
echo ""

echo "📋 Step 3: NewsAPI (Optional)"
echo "1. Go to: https://newsapi.org/"
echo "2. Sign up for free account"
echo "3. Get API key"
echo ""

echo "📋 Step 4: Update .env.local"
echo "Add these to your .env.local file:"
echo ""
echo "GOOGLE_SEARCH_API_KEY=your_google_api_key_here"
echo "GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id_here"
echo "GITHUB_TOKEN=your_github_token_here"
echo "NEWS_API_KEY=your_news_api_key_here"
echo ""

echo "✅ ArXiv API is already working (no key needed)"
echo "✅ DuckDuckGo API is already working (no key needed)"
echo ""

echo "🧪 Test your APIs:"
echo "curl 'https://www.googleapis.com/customsearch/v1?key=YOUR_KEY&cx=YOUR_CX&q=AI+innovation'"
echo "curl -H 'Authorization: token YOUR_TOKEN' 'https://api.github.com/search/repositories?q=AI'"
echo "curl 'http://export.arxiv.org/api/query?search_query=AI&max_results=5'"
echo ""

echo "🎯 Ready to go! Your app will use real web search data."
