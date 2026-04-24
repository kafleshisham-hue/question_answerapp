# 🌍 AI Country Knowledge Assistant

A Next.js app that answers questions about countries using Google Gemini AI. Built for Assignment 6.

## ✨ What's New (vs. Default Next.js)

This project extends the basic Next.js template with:

- **🤖 AI Integration** - Google Gemini API for intelligent country answers
- **🗺️ Country Database** - 12 countries with detailed information
- **💬 Chat Interface** - Real-time AI conversations with streaming responses
- **🎨 Enhanced UI** - Country cards, maps integration, and modern design
- **🧪 Testing Suite** - Unit tests and end-to-end tests
- **☁️ Cloud Storage** - AWS S3 integration for data management

## 🚀 Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Add API Key**
   ```bash
   # Get key from https://makersuite.google.com/app/apikey
   echo "GEMINI_API_KEY=your-key-here" > .env.local
   ```

3. **Run locally**
   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
├── app/
│   ├── api/chat/     # AI chat endpoint (NEW)
│   └── page.tsx      # Main UI with country cards (ENHANCED)
├── data/gold/        # Country data (NEW)
├── lib/countries.ts  # Country utilities (NEW)
├── e2e/              # End-to-end tests (NEW)
└── test-results/     # Test outputs (NEW)
```

## 🧪 Testing

```bash
# Unit tests
npm test

# E2E tests
npx playwright test
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repo to Vercel
2. Add `GEMINI_API_KEY` to environment variables
3. Deploy automatically

### Manual Build
```bash
npm run build
npm start
```

## 📚 Assignment 6 Features

- **Structured Data Retrieval** - Country lookup from JSON database
- **AI Prompt Engineering** - Context-aware responses using country data
- **Error Handling** - Graceful fallbacks for API issues
- **Performance Testing** - Comprehensive evaluation framework

## 🛠️ Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Google Gemini** - AI responses
- **Vitest** - Unit testing
- **Playwright** - E2E testing

## 📝 Available Countries

🇳🇵 Nepal • 🇨🇦 Canada • 🇯🇵 Japan • 🇧🇷 Brazil • 🇩🇪 Germany • 🇦🇺 Australia • 🇮🇳 India • 🇪🇬 Egypt • 🇲🇽 Mexico • 🇫🇷 France • 🇨🇳 China • 🇿🇦 South Africa

---
