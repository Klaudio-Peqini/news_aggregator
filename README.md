# News Aggregator               

A Next.js-based news aggregator app that fetches and displays news articles from various categories using the NewsAPI.

## Getting Started

### Prerequisites

- Node.js 20 or higher
- A NewsAPI key from [newsapi.org](https://newsapi.org/)

### Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your NewsAPI key:
   ```
   NEWS_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the news aggregator.

## Features

- Browse news by categories: General, Business, Technology, Sports, Health
- Responsive design with Tailwind CSS
- Server-side API integration with NewsAPI

## API

The app uses a custom API route at `/api/news` to fetch news articles.

## Learn More

This project is built with [Next.js](https://nextjs.org) and uses TypeScript, Tailwind CSS, and ESLint.

## Deploy on Vercel

Deploy your app to Vercel for free. Make sure to add your `NEWS_API_KEY` as an environment variable in your Vercel project settings.
