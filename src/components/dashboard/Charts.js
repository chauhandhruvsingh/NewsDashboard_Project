// src/components/Dashboard/Charts.js
'use client'
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function Charts({ articles }) {
  // Prepare data for charts
  const typeData = articles.reduce((acc, article) => {
    acc[article.type] = (acc[article.type] || 0) + 1
    return acc
  }, {})

  const pieData = Object.entries(typeData).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count,
    color: type === 'news' ? '#3B82F6' : '#10B981'
  }))

  // Author data for bar chart
  const authorData = articles.reduce((acc, article) => {
    if (article.author) {
      const authorName = article.author.length > 15 
        ? article.author.substring(0, 15) + '...' 
        : article.author
      acc[authorName] = (acc[authorName] || 0) + 1
    }
    return acc
  }, {})

  const barData = Object.entries(authorData)
    .slice(0, 10) // Top 10 authors
    .map(([author, count]) => ({
      author,
      articles: count
    }))

  // Timeline data for line chart
  const timelineData = articles.reduce((acc, article) => {
    const date = new Date(article.publishedAt).toLocaleDateString()
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {})

  const lineData = Object.entries(timelineData)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .slice(-7) // Last 7 days
    .map(([date, count]) => ({
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      articles: count
    }))

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Analytics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Article Types Pie Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">
            Articles by Type
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Articles Timeline */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">
            Articles Timeline
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="articles" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Authors Bar Chart */}
      {barData.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">
            Top Authors
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={barData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="author" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="articles" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}