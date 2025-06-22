// 'use client'
// import { createContext, useContext, useState, useEffect } from 'react'
// import { fetchNewsArticles } from '@/Utils/api'

// const NewsContext = createContext()

// export const useNews = () => {
//   const context = useContext(NewsContext)
//   if (!context) {
//     throw new Error('useNews must be used within a NewsProvider')
//   }
//   return context
// }

// export const NewsProvider = ({ children }) => {
//   const [articles, setArticles] = useState([])
//   const [filteredArticles, setFilteredArticles] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [filters, setFilters] = useState({
//     search: '',
//     author: '',
//     dateFrom: '',
//     dateTo: '',
//     type: 'all'
//   })

//   // Payout settings
//   const [payoutRates, setPayoutRates] = useState({
//     news: 10, // $10 per news article
//     blog: 15  // $15 per blog post
//   })

//   useEffect(() => {
//     // Load payout rates from localStorage
//     const savedRates = localStorage.getItem('newsapp_payout_rates')
//     if (savedRates) {
//       setPayoutRates(JSON.parse(savedRates))
//     }
//   }, [])

//   const loadArticles = async () => {
//     setLoading(true)
//     setError(null)
    
//     try {
//       const data = await fetchNewsArticles()
//       setArticles(data)
//       setFilteredArticles(data)
//     } catch (err) {
//       setError('Failed to fetch news articles. Please try again.')
//       console.error('Error fetching articles:', err)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const applyFilters = () => {
//     let filtered = articles

//     // Search filter
//     if (filters.search) {
//       filtered = filtered.filter(article => 
//         article.title.toLowerCase().includes(filters.search.toLowerCase()) ||
//         article.description?.toLowerCase().includes(filters.search.toLowerCase())
//       )
//     }

//     // Author filter
//     if (filters.author) {
//       filtered = filtered.filter(article => 
//         article.author?.toLowerCase().includes(filters.author.toLowerCase())
//       )
//     }

//     // Date range filter
//     if (filters.dateFrom) {
//       filtered = filtered.filter(article => 
//         new Date(article.publishedAt) >= new Date(filters.dateFrom)
//       )
//     }

//     if (filters.dateTo) {
//       filtered = filtered.filter(article => 
//         new Date(article.publishedAt) <= new Date(filters.dateTo)
//       )
//     }

//     // Type filter
//     if (filters.type !== 'all') {
//       filtered = filtered.filter(article => article.type === filters.type)
//     }

//     setFilteredArticles(filtered)
//   }

//   useEffect(() => {
//     applyFilters()
//   }, [filters, articles])

//   const updateFilters = (newFilters) => {
//     setFilters(prev => ({ ...prev, ...newFilters }))
//   }

//   const updatePayoutRates = (rates) => {
//     setPayoutRates(rates)
//     localStorage.setItem('newsapp_payout_rates', JSON.stringify(rates))
//   }

//   const calculateTotalPayout = () => {
//     return filteredArticles.reduce((total, article) => {
//       const rate = payoutRates[article.type] || payoutRates.news
//       return total + rate
//     }, 0)
//   }

//   const value = {
//     articles,
//     filteredArticles,
//     loading,
//     error,
//     filters,
//     payoutRates,
//     loadArticles,
//     updateFilters,
//     updatePayoutRates,
//     calculateTotalPayout
//   }

//   return (
//     <NewsContext.Provider value={value}>
//       {children}
//     </NewsContext.Provider>
//   )
// }


// src/context/NewsContext.js
'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { fetchNewsArticles } from '@/Utils/api'

const NewsContext = createContext()

export const useNews = () => {
  const context = useContext(NewsContext)
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider')
  }
  return context
}

export const NewsProvider = ({ children }) => {
  const [articles, setArticles] = useState([])
  const [filteredArticles, setFilteredArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    search: '',
    author: '',
    dateFrom: '',
    dateTo: '',
    type: 'all'
  })

  // Payout settings
  const [payoutRates, setPayoutRates] = useState({
    news: 10, // $10 per news article
    blog: 15  // $15 per blog post
  })

  useEffect(() => {
    // Load payout rates from localStorage
    const savedRates = localStorage.getItem('newsapp_payout_rates')
    if (savedRates) {
      setPayoutRates(JSON.parse(savedRates))
    }
  }, [])

  const loadArticles = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await fetchNewsArticles()
      setArticles(data)
      setFilteredArticles(data)
    } catch (err) {
      setError('Failed to fetch news articles. Please try again.')
      console.error('Error fetching articles:', err)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = articles

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        article.description?.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    // Author filter
    if (filters.author) {
      filtered = filtered.filter(article => 
        article.author?.toLowerCase().includes(filters.author.toLowerCase())
      )
    }

    // Date range filter
    if (filters.dateFrom) {
      filtered = filtered.filter(article => 
        new Date(article.publishedAt) >= new Date(filters.dateFrom)
      )
    }

    if (filters.dateTo) {
      filtered = filtered.filter(article => 
        new Date(article.publishedAt) <= new Date(filters.dateTo)
      )
    }

    // Type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter(article => article.type === filters.type)
    }

    setFilteredArticles(filtered)
  }

  useEffect(() => {
    applyFilters()
  }, [filters, articles])

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const updatePayoutRates = (rates) => {
    setPayoutRates(rates)
    localStorage.setItem('newsapp_payout_rates', JSON.stringify(rates))
  }

  const calculateTotalPayout = () => {
    return filteredArticles.reduce((total, article) => {
      const rate = payoutRates[article.type] || payoutRates.news
      return total + rate
    }, 0)
  }

  const value = {
    articles,
    filteredArticles,
    loading,
    error,
    filters,
    payoutRates,
    loadArticles,
    updateFilters,
    updatePayoutRates,
    calculateTotalPayout
  }

  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  )
}