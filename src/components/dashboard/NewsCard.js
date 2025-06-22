// src/components/Dashboard/NewsCard.js
'use client'
import { Calendar, User, ExternalLink, Tag } from 'lucide-react'

export default function NewsCard({ article }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <img
          src={article.urlToImage || 'https://via.placeholder.com/300x200'}
          alt={article.title}
          className="w-full h-48 object-cover rounded-lg"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200'
          }}
        />
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            article.type === 'news' 
              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
              : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
          }`}>
            <Tag className="inline h-3 w-3 mr-1" />
            {article.type}
          </span>
          
          <span className="text-xs text-gray-400">
            {article.source?.name}
          </span>
        </div>

        <h3 className="font-semibold text-white line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-sm text-gray-400 line-clamp-3">
          {article.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            {article.author && (
              <div className="flex items-center">
                <User className="h-3 w-3 mr-1" />
                <span>{article.author}</span>
              </div>
            )}
            
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
          
          {article.url && (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

