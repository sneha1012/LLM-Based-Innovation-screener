# Deployment Guide - Innovation Screener

## 🚀 Quick Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Google Gemini API key

### Step 1: Prepare Your Repository
1. Push your code to GitHub:
```bash
git add .
git commit -m "Initial commit: Innovation Screener project"
git push origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables:
   - `GEMINI_API_KEY`: Your Google Gemini API key
6. Click "Deploy"

### Step 3: Configure Environment Variables
In your Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variables:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `NEXT_PUBLIC_APP_NAME`: Innovation Screener
   - `NEXT_PUBLIC_APP_DESCRIPTION`: AI-powered innovation screening platform

## 🔧 Local Development Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation
1. Clone the repository:
```bash
git clone https://github.com/sneha1012/innovation-screener.git
cd innovation-screener
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
# Edit .env.local and add your Gemini API key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔑 Getting Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. Add it to your environment variables

## 📊 Performance Optimization

### Vercel Configuration
The project includes optimized Vercel configuration:
- Function timeout: 30 seconds
- Security headers
- Optimized build settings

### API Rate Limits
- Gemini API has rate limits
- The app includes built-in rate limiting
- Consider upgrading to paid tier for higher limits

## 🚨 Troubleshooting

### Common Issues

#### 1. Build Failures
- Check Node.js version (18+ required)
- Ensure all dependencies are installed
- Check for TypeScript errors

#### 2. API Errors
- Verify Gemini API key is correct
- Check API key permissions
- Ensure sufficient API quota

#### 3. Environment Variables
- Verify all required variables are set
- Check variable names and values
- Restart the application after changes

### Debug Mode
Enable debug mode by setting:
```bash
NODE_ENV=development
DEBUG=true
```

## 📈 Monitoring & Analytics

### Vercel Analytics
- Built-in performance monitoring
- Real-time analytics
- Error tracking

### Custom Metrics
- Response time tracking
- Cost analysis
- Usage statistics

## 🔒 Security Considerations

### API Key Security
- Never commit API keys to version control
- Use environment variables
- Rotate keys regularly

### Data Privacy
- No user data is stored permanently
- All evaluations are processed in real-time
- Consider GDPR compliance for production use

## 🚀 Production Checklist

- [ ] Environment variables configured
- [ ] API keys secured
- [ ] Domain configured (optional)
- [ ] SSL certificate active
- [ ] Performance monitoring enabled
- [ ] Error tracking configured
- [ ] Backup strategy in place

## 📞 Support

For technical support or questions:
- Check the troubleshooting section
- Review the documentation
- Contact the project maintainer

---

**Note**: This deployment guide is designed for the Innovation Screener capstone project. For production use, additional security and monitoring measures should be implemented.
