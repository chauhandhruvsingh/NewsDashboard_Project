// src/app/dashboard/page.js
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/Context/AuthContext'
import { useNews } from '@/Context/NewsContext'
import Header from '@/components/layout/Header'
import FilterBar from '@/components/dashboard/FilterBar'
import NewsCard from '@/components/dashboard/NewsCard'
import PayoutTable from '@/components/dashboard/PayoutTable'
import Charts from '@/components/dashboard/Charts'
import { exportToPDF, exportToCSV } from '@/Utils/export'

export default function DashboardPage() {
  const { isAuthenticated, loading: authLoading } = useAuth()
  const { 
    filteredArticles, 
    loading, 
    error, 
    loadArticles, 
    calculateTotalPayout 
  } = useNews()
  const router = useRouter()
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, authLoading, router])

  useEffect(() => {
    if (isAuthenticated) {
      loadArticles()
    }
  }, [isAuthenticated])

  useEffect(() => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleExport = (format) => {
    if (format === 'pdf') {
      exportToPDF(filteredArticles, calculateTotalPayout())
    } else if (format === 'csv') {
      exportToCSV(filteredArticles, calculateTotalPayout())
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900">
              Total Articles
            </h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {filteredArticles.length}
            </p>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-white">
              Total Payout
            </h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              ${calculateTotalPayout()}
            </p>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-white">
              Authors
            </h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {new Set(filteredArticles.map(a => a.author).filter(Boolean)).size}
            </p>
          </div>
          
          <div className="card">
            <h3 className="text-lg font-semibold text-white">
              Export Options
            </h3>
            <div className="flex gap-2 mt-2">
              <button 
                onClick={() => handleExport('pdf')}
                className="text-sm btn-primary"
              >
                PDF
              </button>
              <button 
                onClick={() => handleExport('csv')}
                className="text-sm btn-secondary"
              >
                CSV
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar />

        {/* Charts */}
        <div className="mb-8">
          <Charts articles={filteredArticles} />
        </div>

        {/* Payout Table */}
        <div className="mb-8">
          <PayoutTable articles={filteredArticles} />
        </div>

        {/* News Articles */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">
            Latest Articles
          </h2>
          
          {loading && (
            <div className="text-center py-8">
              <div className="text-xl">Loading articles...</div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          {!loading && !error && filteredArticles.length === 0 && (
            <div className="text-center py-8">
              <div className="text-xl text-gray-400">
                No articles found
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}