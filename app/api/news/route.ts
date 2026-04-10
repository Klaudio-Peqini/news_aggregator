import { NextResponse } from 'next/server';

const API_KEY = process.env.NEWS_API_KEY; // Set your NewsAPI key in .env.local
const BASE_URL = 'https://newsapi.org/v2';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'general';
  const country = searchParams.get('country') || 'us';

  if (!API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(`${BASE_URL}/top-headlines?country=${country}&category=${category}&apiKey=${API_KEY}`);
    const data = await response.json();

    if (data.status !== 'ok') {
      return NextResponse.json({ error: data.message }, { status: 500 });
    }

    return NextResponse.json(data.articles);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}