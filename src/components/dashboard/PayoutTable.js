// src/components/Dashboard/PayoutTable.js
'use client'
import { useState } from 'react'
import { useNews } from '@/context/NewsContext'
import { Edit2, Save, X, DollarSign } from 'lucide-react'

export default function PayoutTable({ articles }) {
  const { payoutRates, updatePayoutRates } = useNews()
  const [isEditing, setIsEditing] = useState(false)
  const [editRates, setEditRates] = useState(payoutRates)

  // Group articles by author
  const authorStats = articles.reduce((acc, article) => {
    const author = article.author || 'Unknown Author'
    if (!acc[author]) {
      acc[author] = { news: 0, blog: 0, total: 0 }
    }
    acc[author][article.type] += 1
    acc[author].total += 1
    return acc
  }, {})

  const calculateAuthorPayout = (stats) => {
    return (stats.news * payoutRates.news) + (stats.blog * payoutRates.blog)
  }

  const handleSaveRates = () => {
    updatePayoutRates(editRates)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditRates(payoutRates)
    setIsEditing(false)
  }

  const totalPayout = Object.values(authorStats).reduce((sum, stats) => {
    return sum + calculateAuthorPayout(stats)
  }, 0)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 text-white">
          Payout Management
        </h2>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 btn-primary"
          >
            <Edit2 className="h-4 w-4" />
            <span>Edit Rates</span>
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleSaveRates}
              className="flex items-center space-x-2 btn-primary"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancelEdit}
              className="flex items-center space-x-2 btn-secondary"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      {/* Payout Rates Settings */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 text-white mb-4">
          Payout Rates
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              News Article Rate ($)
            </label>
            {isEditing ? (
              <input
                type="number"
                min="0"
                step="0.01"
                className="input-field"
                value={editRates.news}
                onChange={(e) => setEditRates({ ...editRates, news: parseFloat(e.target.value) || 0 })}
              />
            ) : (
              <div className="flex items-center text-lg font-semibold text-green-600">
                <DollarSign className="h-5 w-5 mr-1" />
                {payoutRates.news}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Blog Post Rate ($)
            </label>
            {isEditing ? (
              <input
                type="number"
                min="0"
                step="0.01"
                className="input-field"
                value={editRates.blog}
                onChange={(e) => setEditRates({ ...editRates, blog: parseFloat(e.target.value) || 0 })}
              />
            ) : (
              <div className="flex items-center text-lg font-semibold text-green-600">
                <DollarSign className="h-5 w-5 mr-1" />
                {payoutRates.blog}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Author Payout Table */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 text-white mb-4">
          Author Payouts
        </h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  News Articles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Blog Posts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Articles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total Payout
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {Object.entries(authorStats).map(([author, stats]) => (
                <tr key={author} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 text-white">
                      {author}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 text-white">
                      {stats.news}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 text-white">
                      {stats.blog}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 text-white">
                      {stats.total}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-green-600">
                      ${calculateAuthorPayout(stats)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 bg-gray-800">
              <tr>
                <td colSpan="4" className="px-6 py-4 text-sm font-medium text-gray-900 text-white">
                  Total Payout
                </td>
                <td className="px-6 py-4 text-sm font-bold text-green-600">
                  ${totalPayout}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {Object.keys(authorStats).length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No articles available for payout calculation
          </div>
        )}
      </div>
    </div>
  )
}