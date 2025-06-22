// src/components/Dashboard/FilterBar.js
'use client'
import { useNews } from '@/Context/NextContext'
import { Search, Filter, Calendar, User, Tag } from 'lucide-react'

export default function FilterBar() {
  const { filters, updateFilters } = useNews()

  const handleFilterChange = (key, value) => {
    updateFilters({ [key]: value })
  }

  return (
    <div className="card mb-8">
      <div className="flex flex-wrap gap-4">
        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="input-field pl-10"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
        </div>

        {/* Author Filter */}
        <div className="min-w-[150px]">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Filter by author"
              className="input-field pl-10"
              value={filters.author}
              onChange={(e) => handleFilterChange('author', e.target.value)}
            />
          </div>
        </div>

        {/* Type Filter */}
        <div className="min-w-[120px]">
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              className="input-field pl-10"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="news">News</option>
              <option value="blog">Blog</option>
            </select>
          </div>
        </div>

        {/* Date From */}
        <div className="min-w-[150px]">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="date"
              className="input-field pl-10"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            />
          </div>
        </div>

        {/* Date To */}
        <div className="min-w-[150px]">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="date"
              className="input-field pl-10"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

