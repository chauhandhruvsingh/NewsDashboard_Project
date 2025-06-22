// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
//               src/app/page.js
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }



// src/app/dashboard/page.js
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/Context/AuthContext'
import { useNews } from '@/Context/NextContext'
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