
// src/utils/api.js
const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY
const GUARDIAN_API_KEY = process.env.NEXT_PUBLIC_GUARDIAN_API_KEY

// Mock data fallback if APIs are not available
const mockArticles = [
  {
    id: 1,
    title: "Breaking: Tech Industry Sees Major Growth",
    description: "Technology sector continues to expand with new innovations",
    author: "John Smith",
    publishedAt: "2024-06-20T10:00:00Z",
    url: "https://example.com/tech-growth",
    urlToImage: "https://via.placeholder.com/300x200",
    type: "news",
    source: { name: "Tech News" }
  },
  {
    id: 2,
    title: "Climate Change: New Research Findings",
    description: "Scientists discover new patterns in climate data",
    author: "Jane Doe",
    publishedAt: "2024-06-19T15:30:00Z",
    url: "https://example.com/climate-research",
    urlToImage: "https://via.placeholder.com/300x200",
    type: "news",
    source: { name: "Science Daily" }
  },
  {
    id: 3,
    title: "How to Build Better Web Applications",
    description: "A comprehensive guide to modern web development practices",
    author: "Alex Johnson",
    publishedAt: "2024-06-18T09:15:00Z",
    url: "https://example.com/web-dev-guide",
    urlToImage: "https://via.placeholder.com/300x200",
    type: "blog",
    source: { name: "Dev Blog" }
  }
]

export const fetchNewsArticles = async () => {
  try {
    // Try to fetch from News API first
    if (NEWS_API_KEY) {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
      )
      
      if (response.ok) {
        const data = await response.json()
        return data.articles.map((article, index) => ({
          ...article,
          id: index + 1,
          type: 'news'
        }))
      }
    }

    // Fallback to Guardian API
    if (GUARDIAN_API_KEY) {
      const response = await fetch(
        `https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}&show-fields=headline,body,thumbnail`
      )
      
      if (response.ok) {
        const data = await response.json()
        return data.response.results.map((article, index) => ({
          id: index + 1,
          title: article.fields?.headline || article.webTitle,
          description: article.fields?.body?.substring(0, 200) + '...' || '',
          author: 'Guardian Staff',
          publishedAt: article.webPublicationDate,
          url: article.webUrl,
          urlToImage: article.fields?.thumbnail || 'https://via.placeholder.com/300x200',
          type: 'news',
          source: { name: 'The Guardian' }
        }))
      }
    }

    // Fallback to mock data
    console.warn('Using mock data - add API keys to .env.local for real data')
    return mockArticles
    
  } catch (error) {
    console.error('Error fetching articles:', error)
    return mockArticles
  }
}