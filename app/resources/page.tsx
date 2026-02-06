'use client';

import { useState } from 'react';
import Link from 'next/link';
import { articles, articleCategories, type Article } from '@/lib/content/articles';

const categoryColors: Record<string, string> = {
  Photocopiers: 'bg-blue-100 text-blue-700',
  Telecoms: 'bg-green-100 text-green-700',
  CCTV: 'bg-orange-100 text-orange-700',
  IT: 'bg-purple-100 text-purple-700',
  'Business Tips': 'bg-gray-100 text-gray-700',
};

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/resources/${article.slug}`}
      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-purple-200 transition-all"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${categoryColors[article.category]}`}>
            {article.category}
          </span>
          <span className="text-sm text-gray-500">{article.readTime} min read</span>
        </div>
        <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
          {article.title}
        </h2>
        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {new Date(article.publishedDate).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
          <span className="text-purple-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-brand-gradient text-white py-16">
        <div className="section text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Office Equipment Guides & Insights
          </h1>
          <p className="text-lg text-purple-100 max-w-2xl mx-auto">
            Expert advice on photocopiers, telecoms, CCTV, and IT for UK businesses.
            Make informed decisions and save money.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="section py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {articleCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles in this category yet.</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="section pb-16">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to compare suppliers?
          </h2>
          <p className="text-purple-100 mb-6 max-w-xl mx-auto">
            Get free quotes from verified local suppliers. No obligation, no pressure.
          </p>
          <Link
            href="/get-quotes"
            className="inline-flex items-center px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
          >
            Get Quotes Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
