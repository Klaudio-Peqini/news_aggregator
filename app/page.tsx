'use client';

import { useEffect, useState } from 'react';

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: { name: string };
}

const categories = ['general', 'business', 'technology', 'sports', 'health'];

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState('general');

  const fetchNews = async (cat: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/news?category=${cat}`);
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return true;
    return (
      article.title.toLowerCase().includes(normalizedQuery) ||
      (article.description || '').toLowerCase().includes(normalizedQuery) ||
      article.source.name.toLowerCase().includes(normalizedQuery)
    );
  });

  useEffect(() => {
    fetchNews(category);
  }, [category]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-cyan-500/20 via-slate-950 to-slate-950 blur-3xl" />

        <div className="relative px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <header className="mb-10 text-center sm:mb-14">
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">
                Fresh stories on demand
              </p>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Modern News Aggregator
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Browse the latest headlines across business, technology, sports, health, and more with a polished responsive experience.
              </p>
            </header>

            <section className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur-xl sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-200/80">
                    Category
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {category.charAt(0).toUpperCase() + category.slice(1)} headlines
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-200 ${
                        category === cat
                          ? 'bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20'
                          : 'bg-white/10 text-slate-200 hover:bg-white/15'
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="search" className="sr-only">
                  Search headlines
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    🔎
                  </span>
                  <input
                    id="search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search headlines, descriptions, or sources"
                    className="w-full rounded-3xl border border-white/10 bg-slate-950/90 py-3 pl-12 pr-4 text-sm text-slate-100 outline-none transition duration-200 placeholder:text-slate-500 focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
              </div>
            </section>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {loading && (
                <div className="col-span-full rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-8 text-center text-slate-300 shadow-xl shadow-slate-950/30">
                  Loading news...
                </div>
              )}

              {error && (
                <div className="col-span-full rounded-[1.75rem] border border-red-500/20 bg-red-500/10 p-8 text-center text-red-200 shadow-xl shadow-red-950/20">
                  {error}
                </div>
              )}

              {!loading && !error && articles.length === 0 && (
                <div className="col-span-full rounded-[1.75rem] border border-white/10 bg-slate-900/80 p-8 text-center text-slate-300 shadow-xl shadow-slate-950/30">
                  No stories available right now. Try another category or refresh the page.
                </div>
              )}

              {!loading && !error && articles.length > 0 && filteredArticles.length === 0 && (
                <div className="col-span-full rounded-[1.75rem] border border-yellow-400/20 bg-yellow-400/10 p-8 text-center text-yellow-100 shadow-xl shadow-yellow-950/20">
                  No matching stories found for "{query}". Try a different search term or clear the search.
                </div>
              )}

              {filteredArticles.map((article, index) => (
                <article
                  key={index}
                  className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-900/90 shadow-xl shadow-slate-950/40 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30"
                >
                  <div className="relative h-56 overflow-hidden bg-slate-800">
                    {article.urlToImage ? (
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-slate-800 text-slate-500">
                        Image unavailable
                      </div>
                    )}
                    <span className="absolute left-4 top-4 rounded-full bg-cyan-400/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-950">
                      {category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">
                      {article.title}
                    </h2>
                    <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-slate-300">
                      {article.description || 'Tap through for the full article and the latest details.'}
                    </p>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="space-y-1 text-xs text-slate-400">
                        <p>Source: {article.source.name}</p>
                        <p>Published: {new Date(article.publishedAt).toLocaleDateString()}</p>
                      </div>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition duration-200 hover:bg-cyan-300"
                      >
                        Read article
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
